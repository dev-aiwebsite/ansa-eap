"use client";

import PostSidebar from "@/components/post/postSidebar";
import PostSingle from "@/components/post/singlePost";
import { usePostServiceContext } from "@/context/postServiceContext";
import {
  useUserActivityContext
} from "@/context/userActivitiesContext";
import { slugifyName } from "@/lib/helper";
import { Post } from "@/serverActions/crudPosts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const HealthNewsSingle = () => {
  const { news_title } = useParams();
  const [data, setData] = useState<Partial<Post> | null>(null);
  const { healthNews } = usePostServiceContext();
  const { useActivityLogger} = useUserActivityContext()
  useActivityLogger({ targetId: data?.id || "", targetType: data?.category || "", action: 'read' })

  // Resolve post data from slug
  useEffect(() => {
    if (!news_title) return;
    if (healthNews.length) {
      const item = healthNews.find(
        (i) => slugifyName(i?.title ?? "") === news_title
      );
      setData(item ?? null);
    }
  }, [news_title, healthNews]);

  return (
    <div className="flex gap-6 h-full">
      <PostSingle data={data} />
      <PostSidebar currentPost={data} currentCategory={data?.category ?? ""} />
    </div>
  );
};

export default HealthNewsSingle;
