"use client"
import { usePostServiceContext } from "@/context/postServiceContext";
import PostCards from "./postCards";
import { cn } from "@/lib/utils";

export default function HealthNewsCarousel({className}:{className?:string}) {
    const {healthNews} = usePostServiceContext()
    return (
        <div className={cn("post-carousel w-full-sidebar flex w-full overflow-auto space-x-6", className)}>
        <PostCards
        className="max-w-[280px]"
        data={healthNews}
        id_prefix="healthnews"
        actionText="view"/>
      </div>
    );
}