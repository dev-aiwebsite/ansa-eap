"use client";
import { useParams } from "next/navigation";
import { unslugifyName } from "@/lib/helper";
import Video from "@/components/ui/video";
import { useEffect, useState } from "react";
import { getWebinarByTitle, Webinar } from "@/serverActions/crudWebinars";

const WebinarSingle = () => {
  const params = useParams();
  const slug = params.webinar_title as string;
  const webinarTitle = unslugifyName( slug )
  const [data,setData] = useState<Webinar | null>(null)

  useEffect(()=>{
    getWebinarByTitle( webinarTitle )
    .then(res => {
      if(res.success && res.data){
        setData(res.data)
      } else {
        console.log(res)
      }
    })
    


  },[webinarTitle])

  return (
    <div className="flex gap-6 h-full">
  
  <div className="card flex-1">
  {data ? (
    <>
      <Video
        className="aspect-[16/9] video-shadow"
        src=""
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
          <p className="text-sm mt-2 text-muted-foreground">{data.description}</p>
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

  


      <div className="right-sidebar"></div>
    </div>
  );
};

export default WebinarSingle;
