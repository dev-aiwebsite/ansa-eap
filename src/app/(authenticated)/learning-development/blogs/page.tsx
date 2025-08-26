"use client"
import PostCards from "@/components/post/postCards";
import { Button } from "@/components/ui/button";
import { usePostServiceContext } from "@/context/postServiceContext";
import { Plus } from "lucide-react";

const BlogPage = () => {
  const {blogs:data} = usePostServiceContext()

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
            id_prefix="blog"
            data={data ?? []}
            actionText="read"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BlogPage;


