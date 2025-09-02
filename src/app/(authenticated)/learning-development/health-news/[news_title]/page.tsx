"use client";
import PostSidebar from "@/components/post/postSidebar";
import PostSingle from "@/components/post/singlePost";
import { usePostServiceContext } from "@/context/postServiceContext";
import { slugifyName } from "@/lib/helper";
import { Post } from "@/serverActions/crudPosts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const HealthNewsSingle = () => {
  const {news_title} = useParams()
  const [data, setData] = useState<Partial<Post> | null>(null)
  const {healthNews} = usePostServiceContext()
  
    useEffect(()=>{
      if(!news_title) return
      if(healthNews.length){
        console.log('has healthnewsposts')
        const item = healthNews.find(i => slugifyName(i?.title ?? "") == news_title)
        setData(item ?? null)  
      
      }
    },[news_title, healthNews])
    

console.log(healthNews, 'healthNews')
  return (
    <div className="flex gap-6 h-full">
      <PostSingle data={data}/>
      <PostSidebar currentPost={data} currentCategory="7p2v1Ur_O4"/>
    </div>
  );
};

export default HealthNewsSingle;
