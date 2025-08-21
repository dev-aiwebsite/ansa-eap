"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heart } from "lucide-react";
import ImageWithFallback from "./ui/imageWithFallback";
import { getBlogs } from "@/serverActions/crudBlogs";
import { useEffect, useState } from "react";
import { formatDuration } from "@/lib/helper";



const WeeklyBites = () => {
  const [blogData, setBlogData] = useState<WeeklyBitesData[]>([])

  useEffect(()=>{
    if(!blogData.length){
      getBlogs()
      .then(res => {
        if(res.success){
          const resData = res.data
          console.log(res, 'res')
          if(resData){
            const forBlogData:WeeklyBitesData[] = resData.map(i => {
              return {
                id: i.id,
                image: i.thumbnail,
                title: i.title,
                author: i.author,
                likes: 0,
                duration: formatDuration(0, 5),
                action: "read",
                link: i.slug,

              }
            })
            setBlogData(forBlogData)
          }
        }
      })
    }
  },[])

  console.log(blogData, 'blogData')
  return (
    <div>
      <Tabs defaultValue="blogs" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title">Weekly Bites</h3>
          <TabsList className="bg-transparent rounded-md p-1">
            <TabsTrigger
              value="all"
              className="data-[state=active]:text-primary data-[state=active]:font-bold !py-1 !px-2 !ring-0 !shadow-none"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="clips"
              className="data-[state=active]:text-primary data-[state=active]:font-bold !py-1 !px-2 !ring-0 !shadow-none"
            >
              Clips
            </TabsTrigger>
            <TabsTrigger
              value="blogs"
              className="data-[state=active]:text-primary data-[state=active]:font-bold !py-1 !px-2 !ring-0 !shadow-none"
            >
              Blogs
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:text-primary data-[state=active]:font-bold !py-1 !px-2 !ring-0 !shadow-none"
            >
              Allied Health News
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          


        </TabsContent>
        <TabsContent value="clips">Clips content</TabsContent>
        <TabsContent value="blogs">
          { (blogData.length) && 
            <WeeklyBitesTable data={blogData}/>
          }
        </TabsContent>
        <TabsContent value="news">Allied Health News</TabsContent>
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
  action: "read" | "watch";
  link: string;
}

function WeeklyBitesTable ({data}:{data:WeeklyBitesData[]}) {

  return <table className="w-full [&_td]:p-2 bordered-rows rounded-rows border-separate border-spacing-x-0 border-spacing-y-2">
  <tbody>
    { data.map(item => (
             <tr key={item.id} className="text-xs rounded-lg border border-muted">
             <td>
               <ImageWithFallback width={60} height={60} alt={item.title} src={item.image}/>
             </td>
             <td className="align-middle">
                 <div>
                     <p>{item.title}</p>
                     <p className="text-xs text-muted-foreground">By {item.author}</p>
                 </div>
             </td>
             <td className="align-middle">
                 
                 <span className="capitalize">{item.duration} {item.action}</span>
                 
             </td>
             <td className="align-middle">
                 <div className="flex flex-row gap-2 items-center">
                     <Heart className="w-[1em] h-[1em] fill-red-400 text-red-400"/>
                     <span>{item.likes ?? 0}</span>
   
                 </div>
             </td>
             <td className="align-middle w-[80px]">
                     <Button href={item.link} className="h-fit rounded-lg w-full !px-2 !py-1 text-[1em]" variant="outline">
                         {item.action}
                     </Button>
             </td>
         </tr>
    ))}
 
  </tbody>
</table>

}