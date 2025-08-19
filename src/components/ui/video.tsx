import { cn } from "@/lib/utils"
import { VideoOff } from "lucide-react"
import Image from "next/image"

type VideoProps = {
  src?: string
  title: string
  thumbnail?: string
  className?: string
}

const Video = ({ src, title, thumbnail, className }: VideoProps) => {
  return (
    <div className={cn("bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center", className)}>
      {src ? (
        <video src={src} controls className="w-full h-auto">
          <p>Sorry, the video can’t be played. {title}</p>
        </video>
      ) : thumbnail ? (
        <Image
          src={thumbnail}
          alt={`${title} thumbnail`}
          className="w-full h-auto object-cover"
        />
      ) : (
        <div className="p-6 flex flex-col items-center text-gray-500">
          <VideoOff size={48} className="mb-2" />
          <span className="text-sm">No video available</span>
        </div>
      )}
    </div>
  )
}

export default Video
