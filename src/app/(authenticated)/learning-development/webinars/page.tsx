"use client";
import PostCards from "@/components/post/postCards";
import PostFilter from "@/components/post/postFilter";
import { Button } from "@/components/ui/button";
import { useAppServiceContext } from "@/context/appServiceContext";

import { usePostServiceContext } from "@/context/postServiceContext";
import { Post } from "@/serverActions/crudPosts";
import {
  Plus
} from "lucide-react";
import { useState } from "react";

const WebinarPage = () => {
  const { videoContents:data } = usePostServiceContext();
  const [sortedData, setSortedData] = useState<Post[]>(data)
 const { currentUser } = useAppServiceContext();

  const isAdmin = currentUser?.roles.includes("admin");
  return (
    <div className="space-y-2">
      {isAdmin && (
        <div className="flex items-center justify-between">
          <Button
            href="/learning-development/blogs/new"
            className="flex ml-auto"
          >
            <Plus /> Add New
          </Button>
        </div>
      )}

    <PostFilter data={data as Post[]} onChange={setSortedData} >

    </PostFilter>
      <div className="grid">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
          <PostCards
            id_prefix="video-content"
            data={sortedData}
            actionText="view"
          />
        </div>
      </div>
    </div>
  );
};

export default WebinarPage;
