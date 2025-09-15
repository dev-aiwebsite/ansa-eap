"use client";
import PostSidebar from "@/components/post/postSidebar";
import PostSingle from "@/components/post/singlePost";
import { usePostServiceContext } from "@/context/postServiceContext";
import { useUserActivityContext } from "@/context/userActivitiesContext";
import { usePathname } from "next/navigation";

const YogaSingle = () => {
  const pathName = usePathname();
  const {yogas} = usePostServiceContext()
  const data = yogas.find(b => b.slug == pathName) ?? null
  const { useActivityLogger} = useUserActivityContext()
  useActivityLogger({ targetId: data?.id || "", targetType: data?.category || "", action: 'read' })
  return (
    <div className="flex gap-6 h-full">
      <PostSingle data={data} />
      <PostSidebar currentPost={data} currentCategory="7p2v1Ur_O5"/>
    </div>
  );
};

export default YogaSingle;
