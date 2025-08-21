import Image from "next/image";
import { ImageIcon } from "lucide-react";

type Props = {
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  width = 300,
  height = 200,
  className = "rounded-md object-cover",
}: Props) {
  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        style={{ width, height }}
      >
        <ImageIcon size={40} />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
