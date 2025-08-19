"use client";
import { useParams } from "next/navigation";
import Video from "@/components/ui/video";
import { useEffect, useState } from "react";
import { Blog, getBlogBySlug } from "@/serverActions/crudBlogs";

const BlogSingle = () => {
  const params = useParams();
  const slug = params.blog_title as string;
  const [data,setData] = useState<Blog | null>(null)

  useEffect(()=>{
    getBlogBySlug( slug )
    .then(res => {
      if(res.success && res.data){
        setData(res.data)
      } else {
        console.log(res)
      }
    })
    


  },[slug])

  return (
    <div className="flex gap-6 h-full">
  
    
  <div className="card flex-1 overflow-hidden">
    <div className="rounded-xl flex-1 mx-h-webkit-fill overflow-auto">
  {data ? (
    <>
      <Video
        className="aspect-[16/9] video-shadow"
        src={data.video}
        title={data.title}
        thumbnail={data.thumbnail}
      ></Video>
      <div className="p-4">
        <h1 className="mt-6 text-xl font-medium">{data.title}</h1>
        <div className="meta-container mt-2">
          <span className="pr-2">{data.author}</span>
          {data.tags &&
            data.tags.split(",").map((i) => (
              <span key={i} className="px-2">
                {i}
              </span>
            ))}
        </div>
        <div className="mt-10">
          <p className="font-medium text-sm">Description</p>
          <p className="text-sm mt-2 text-muted-foreground whitespace-pre-wrap">{data.description}</p>
        </div>
      </div>
    </>
  ) : (
    // Loading skeleton
    <div className="animate-pulse p-4 space-y-4">
      <div className="bg-gray-300 rounded aspect-[16/9] w-full"></div>
      <div className="space-y-2 mt-4">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="flex gap-2">
          <div className="h-5 w-10 bg-gray-300 rounded"></div>
          <div className="h-5 w-12 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="space-y-2 mt-6">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  )}
</div>
</div>
  


      <div className="right-sidebar"></div>
    </div>
  );
};

export default BlogSingle;
