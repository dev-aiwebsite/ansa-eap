"use client";
import { Button } from "@/components/ui/button";
import { usePostServiceContext } from "@/context/postServiceContext";
import { formatDuration } from "@/lib/helper";
import { Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ImageWithFallback from "./ui/imageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { WeeklyBitesTableSkeleton } from "./weeklyBitesSkeleton";
import { ActionText } from "@/types";



const WeeklyBites = () => {

  const [activeTab, setActiveTab] = useState("blogs")
  const {healthNews,blogs,videoContents} = usePostServiceContext()

  const blogData = blogs.sort((a, b) => new Date(b?.created_at ?? "").getTime() - new Date(a?.created_at ?? "").getTime())
  .slice(0,4)
  .map(i => {
    return {
      id: i.id ?? "",
      image: i.thumbnail ?? "",
      title: i.title ?? "",
      author: i.author ?? "",
      likes: 0,
      duration: formatDuration(0, 5),
      action: "view" as ActionText,
      link: i.slug ?? "",
    }
  })
  
  const clipsData = videoContents.sort((a, b) => new Date(b?.created_at ?? "").getTime() - new Date(a?.created_at ?? "").getTime())
  .slice(0,4)
  .map(i => {
    return {
      id: i.id ?? "",
      image: i.thumbnail ?? "",
      title: i.title ?? "",
      author: i.author ?? "",
      likes: 0,
      duration: formatDuration(0, 5),
      action: "view" as ActionText,
      link: i.slug ?? "",
    }
  })

  const newsData = healthNews.sort((a, b) => new Date(b?.created_at ?? "").getTime() - new Date(a?.created_at ?? "").getTime())
  .slice(0,4)
  .map(i => {
    return {
      id: i.id ?? "",
      image: i.thumbnail ?? "",
      title: i.title ?? "",
      author: i.author ?? "",
      likes: 0,
      duration: formatDuration(0, 5),
      action: "view" as ActionText,
      link: i.slug ?? "",
    }
  })


  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">Weekly Bites</h3>
          <TabsList className="bg-transparent rounded-md p-1">
            <Link
            href="/learning-development"
              className="data-[state=active]:text-primary data-[state=active]:text-shadow-medium !py-1 !px-2 !ring-0 !shadow-none"
            >
              See All
            </Link>
            <TabsTrigger
              value="clips"
              className="data-[state=active]:text-primary data-[state=active]:text-shadow-medium !py-1 !px-2 !ring-0 !shadow-none"
            >
              Clips
            </TabsTrigger>
            <TabsTrigger
              value="blogs"
              className="data-[state=active]:text-primary data-[state=active]:text-shadow-medium !py-1 !px-2 !ring-0 !shadow-none"
            >
              Blogs
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:text-primary data-[state=active]:text-shadow-medium !py-1 !px-2 !ring-0 !shadow-none"
            >
              Allied Health News
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="clips">
  {clipsData.length > 0 ? (
    <WeeklyBitesTable data={clipsData} />
  ) : (
    <WeeklyBitesTableSkeleton rows={5} />
  )}
</TabsContent>

<TabsContent value="blogs">
  {blogData.length > 0 ? (
    <WeeklyBitesTable data={blogData} />
  ) : (
    <WeeklyBitesTableSkeleton rows={5} />
  )}
</TabsContent>

<TabsContent value="news">
  {newsData.length > 0 ? (
    <WeeklyBitesTable data={newsData} />
  ) : (
    <WeeklyBitesTableSkeleton rows={5} />
  )}
</TabsContent>

      </Tabs>
    </div>
  );
};


export default WeeklyBites;

type WeeklyBitesData = {
  id: string;
  image?:string;
  title: string;
  author: string;
  likes?:number;
  duration: string;
  action: ActionText;
  link: string;
}

function WeeklyBitesTable ({data}:{data:WeeklyBitesData[]}) {

  return <table className="w-full [&_td]:p-2 bordered-rows rounded-rows border-separate border-spacing-x-0 border-spacing-y-2">
  <tbody>
    { data.map(item => (
             <tr key={item.id} className="text-xs rounded-lg border border-muted">
              <td className="w-[80px]">
                <ImageWithFallback className="max-h-[32px] rounded" width={50} height={32} alt={item.title} src={item.image}/>
              </td>
             <td className="align-middle text-start">
                 <div>
                     <p>{item.title}</p>
                     <p className="text-xs text-muted-foreground">{item.author}</p>
                 </div>
             </td>
             <td className="align-middle w-[100px]">
                 
                 <span className="capitalize">{item.duration} {item.action}</span>
                 
             </td>
             <td className="align-middle w-[80px]">
                 <div className="flex flex-row gap-2 items-center">
                     <Heart className="w-[1em] h-[1em] fill-red-400 text-red-400"/>
                     <span>{item.likes ?? 0}</span>
   
                 </div>
             </td>
             <td className="align-middle w-[100px]">
                     <Button href={item.link} className="h-fit rounded-lg w-full !px-2 !py-1 text-[1em]" variant="outline">
                         {item.action}
                     </Button>
             </td>
         </tr>
    ))}
 
  </tbody>
</table>

}