import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  iconSize?: number;
};

export default function ImageWithFallback({
  src,
  alt,
  width = 300,
  height = 200,
  className = "rounded-md object-cover",
  iconSize = 40
}: Props) {
  const isDefault = src?.includes('default')

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        style={{ width, height }}
      >
        <ImageIcon size={iconSize} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(className, isDefault && "bg-gray-200 p-1")}
    />
  );
}
