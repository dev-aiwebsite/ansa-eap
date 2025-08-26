"use client";
import { Post } from "@/components/post/postCard";
import PostSingle from "@/components/post/singlePost";
import { usePostServiceContext } from "@/context/postServiceContext";
import { slugifyName } from "@/lib/helper";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const HealthNewsSingle = () => {
  const {news_title} = useParams()
  const [data, setData] = useState<Partial<Post> | null>(null)
  const {healthNewsPosts} = usePostServiceContext()
  
    useEffect(()=>{
      if(!news_title) return
      if(healthNewsPosts.length){
        console.log('has healthnewsposts')
        const item = healthNewsPosts.find(i => slugifyName(i?.title ?? "") == news_title)
        setData(item ?? null)  
      
      }
    },[news_title, healthNewsPosts])
    

console.log(healthNewsPosts, 'healthNewsPosts')
  return (
    <div className="flex gap-6 h-full">
      <PostSingle data={data}/>
      <div className="right-sidebar"></div>
    </div>
  );
};

export default HealthNewsSingle;
