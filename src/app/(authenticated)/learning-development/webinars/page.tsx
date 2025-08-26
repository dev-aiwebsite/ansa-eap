"use client";
import PostCards from "@/components/post/postCards";
import { Button } from "@/components/ui/button";
import { usePostServiceContext } from "@/context/postServiceContext";
import { Plus } from "lucide-react";

const WebinarPage = () => {
  const { videoContents: data } = usePostServiceContext();

  return (
    <div>
      <Button href="/learning-development/blogs/new" className="flex ml-auto">
        {" "}
        <Plus /> Add New
      </Button>
      <div className="grid">
        <div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
            <PostCards
              id_prefix="video-content"
              data={data ?? []}
              actionText="watch"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default WebinarPage;
