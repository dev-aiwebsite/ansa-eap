import PostCard from "./postCard";
import PostCardSkeleton from "./postCardSkeleton";

type PostCards = {
    data: Partial<PostCard>[],
    id_prefix: string;
    actionText: "read" | "watch";
    className?: string; 
}
const PostCards = ({data,className,id_prefix,actionText}:PostCards) => {
    return (
       <>
        {data && data.length > 0
          ? data.map((item) => (
              <PostCard
                className={className}
                key={item.id + id_prefix}
                item={item}
                actionText={actionText}
              />
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <PostCardSkeleton key={i} className={className} />
            ))}
            
       </>
    );
}

export default PostCards;