"use client";
import PostSidebar from "@/components/post/postSidebar";
import PostSingle from "@/components/post/singlePost";
import { usePostServiceContext } from "@/context/postServiceContext";
import { usePathname } from "next/navigation";

const BlogSingle = () => {
  const pathName = usePathname();
  const { blogs } = usePostServiceContext();

  const data = blogs.find((b) => b.slug == pathName) ?? null;

  return (
    <div className="flex gap-6 h-full">
      <PostSingle data={data} />
      <PostSidebar currentPost={data} currentCategory="7p2v1Ur_O6"/>
    </div>
  );
};

export default BlogSingle;
