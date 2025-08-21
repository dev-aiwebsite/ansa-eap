"use client";
import PostSingle from "@/components/post/singlePost";
import { getYogaBySlug, Yoga } from "@/serverActions/crudYogas";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const YogaSingle = () => {
  const pathName = usePathname();
  const [data, setData] = useState<Yoga | null>(null);

  useEffect(() => {
    getYogaBySlug(pathName).then((res) => {
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

export default YogaSingle;
