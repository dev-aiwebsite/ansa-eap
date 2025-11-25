"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { usePostServiceContext } from "@/context/postServiceContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ImageWithFallback from "../ui/imageWithFallback";
import { motion } from "motion/react";

const DURATION = 5000; // ms
const BAR_WIDTH = 40;
const CIRCLE_SIZE = 8;

export default function HealthNewsCarousel({
  className,
  maxCount,
}: {
  className?: string;
  maxCount?: number;
}) {
  const { healthNews, generatePostLink } = usePostServiceContext();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Apply maxCount to the list of items
  const displayedNews = maxCount ? healthNews.slice(0, maxCount) : healthNews;

  useEffect(() => {
    if (!api) return;

    const total = displayedNews.length;
    setCount(total);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Always clear old interval before setting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Only autoplay if we have real content
    if (displayedNews.length > 0) {
      intervalRef.current = setInterval(() => {
        if (!api) return;
        const nextIndex = (api.selectedScrollSnap() + 1) % total;
        api.scrollTo(nextIndex);
      }, DURATION);
    }

    // Cleanup
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api, displayedNews]);

  return (
    <div>
      <Carousel
        setApi={setApi}
        className={cn("w-full post-carousel", className)}
      >
        <CarouselContent>
          {displayedNews.length > 0
            ? displayedNews.map((post, index) => (
                <CarouselItem key={post.id + index} className="basis-[80%]">
                  <Link href={generatePostLink(post)}>
                    <ImageWithFallback
                      className="img rounded-sm w-full h-[167px] object-cover object-top"
                      width={200}
                      height={100}
                      src={post.thumbnail}
                      alt={post.title || ""}
                    />
                  </Link>
                </CarouselItem>
              ))
            : Array.from({ length: count }).map((_, index) => (
                <CarouselItem key={index} className="basis-[80%]">
                  <div className="img rounded-sm w-full h-[167px] bg-zinc-200" />
                </CarouselItem>
              ))}
        </CarouselContent>
      </Carousel>

      {/* Progress indicators */}
      <div className="mx-auto mt-4 flex w-full max-w-lg justify-center gap-3">
        {Array.from({ length: count }).map((_, index) => {
          const isActive = current === index + 1;
          return (
            <motion.span
              key={index}
              layout
              initial={false}
              animate={{
                width: isActive ? BAR_WIDTH : CIRCLE_SIZE,
                height: CIRCLE_SIZE,
                borderRadius: isActive ? 8 : 999,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              className="bg-foreground/10 relative block overflow-hidden"
              style={{
                minWidth: CIRCLE_SIZE,
                maxWidth: BAR_WIDTH,
                border: "none",
              }}
            >
              {displayedNews.length > 0 && isActive && (
                <motion.div
                  key={`progress-${index}-${current}`}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: DURATION / 1000, ease: "linear" }}
                  className="bg-primary absolute top-0 left-0 h-full rounded-lg"
                />
              )}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}
