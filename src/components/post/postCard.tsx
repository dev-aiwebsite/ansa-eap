import { htmlToPlainText, truncateText } from "@/lib/helper";
import { Clock } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export type Post = {
  id: string;
  title: string;
  slug: string;
  author: string;
  tags: string;
  video?: string;
  audio?: string;
  thumbnail?: string;
  duration_hours: number;
  duration_minutes: number;
  description?: string;
  created_at: string;
  updated_at: string;
};
type PostCard = Post
const PostCard = ({ item, actionText = "read", className }: { item: PostCard, actionText?: "read" | "watch", className?: string; }) => {
  return (
    <div className={cn("card rounded-lg p-4 w-1/4 min-w-[280px] w-full flex flex-col gap-5 text-sm", className)}>
      {item.thumbnail && (
        <Image
          className="rounded-sm w-full h-[167px] object-cover object-top"
          width={200}
          height={100}
          src={item.thumbnail}
          alt={item.title}
        />
      )}

      <p className="text-base font-medium">{item.title}</p>

      <p className="text-body line-clamp-3 text-muted-foreground text-xs whitespace-pre-wrap">
        {item.description &&
          truncateText(htmlToPlainText(item.description), 200)}
      </p>


      <div className="flex mt-auto">
        <div className="flex flex-row items-center gap-2">
          <Clock width="1em" className="text-app-purple-300 text-base" />
          <span className="text-muted-foreground">
            {item.duration_hours}:{item.duration_minutes}
          </span>
        </div>
        <Button className="ml-auto capitalize" variant="outline" href={item.slug}>
          {actionText}
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
