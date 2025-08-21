"use client";
import PostSingle from "@/components/post/singlePost";
import { getWebinarBySlug, Webinar } from "@/serverActions/crudWebinars";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const WebinarSingle = () => {
  const pathName = usePathname();
  const [data, setData] = useState<Webinar | null>(null);

  useEffect(() => {
    getWebinarBySlug(pathName).then((res) => {
      if (res.success && res.data) {
        setData(res.data);
      } else {
        console.log(res);
      }
    });
  }, [pathName]);

  return (
    <div className="flex gap-6 h-full">
      <PostSingle data={data} />

      <div className="right-sidebar"></div>
    </div>
  );
};

export default WebinarSingle;
