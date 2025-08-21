"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Blog, getBlogBySlug } from "@/serverActions/crudBlogs";
import PostSingle from "@/components/post/singlePost";

const BlogSingle = () => {
  const pathName = usePathname();
  const [data, setData] = useState<Blog | null>(null);

  useEffect(() => {
    getBlogBySlug(pathName).then((res) => {
      if (res.success && res.data) {
        setData(res.data);
      } else {
        console.log(res);
      }
    });
  }, [pathName]);

  return (
    <div className="flex gap-6 h-full">
      <PostSingle data={data}/>
      <div className="right-sidebar"></div>
    </div>
  );
};

export default BlogSingle;
