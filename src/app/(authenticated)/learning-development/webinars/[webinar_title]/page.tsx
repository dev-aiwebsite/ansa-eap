"use client";
import PostSingle from "@/components/post/singlePost";
import { usePostServiceContext } from "@/context/postServiceContext";
import { usePathname } from "next/navigation";

const WebinarSingle = () => {
  const pathName = usePathname();
  const {videoContents} = usePostServiceContext()
  const data = videoContents.find(b => b.slug == pathName) ?? null

  return (
    <div className="flex gap-6 h-full">
      <PostSingle data={data} />

      <div className="right-sidebar"></div>
    </div>
  );
};

export default WebinarSingle;
