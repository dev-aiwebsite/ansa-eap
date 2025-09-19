"use client";
import PostCards from "@/components/post/postCards";
import PostFilter from "@/components/post/postFilter";
import { usePostServiceContext } from "@/context/postServiceContext";
import { Post } from "@/serverActions/crudPosts";
import { useState } from "react";

const NewsPage = () => {
  const {healthNews:data} = usePostServiceContext()
const [sortedData, setSortedData] = useState<Post[]>(data);

  return (
    <div className="space-y-2">
      <PostFilter data={data as Post[]} onChange={setSortedData}></PostFilter>
      <div className="grid">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
          <PostCards
            id_prefix="health-news"
            data={sortedData}
            actionText="view"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
