"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Heart } from "lucide-react";

const WeeklyBites = () => {


  return (
    <div>
      <Tabs defaultValue="all" className="w-full">
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
            <table className="w-full [&_td]:p-2 bordered-rows rounded-rows border-separate border-spacing-x-0 border-spacing-y-2">
                <tbody>
                    <tr className="text-xs rounded-lg border border-muted">
                        <td>
                            image
                        </td>
                        <td className="align-middle">
                            <div>
                                <p>Dealing with Work Stress</p>
                                <p className="text-xs text-muted-foreground">By Author Name</p>
                            </div>
                        </td>
                        <td className="align-middle">
                            
                            <span className="capitalize">3-minute read</span>
                            
                        </td>
                        <td className="align-middle">
                            <div className="flex flex-row gap-2 items-center">
                                <Heart className="w-[1em] h-[1em] fill-red-400 text-red-400"/>
                                <span>4.3k</span>

                            </div>
                        </td>
                        <td className="align-middle w-[80px]">
                                <Button className="h-fit rounded-lg w-full !px-2 !py-1 text-[1em]" variant="outline">
                                    Read
                                </Button>
                        </td>
                    </tr>

                    <tr className="text-xs rounded-lg border border-muted">
                        <td>
                            image
                        </td>
                        <td className="align-middle">
                            <div>
                                <p>Dealing with Work Stress</p>
                                <p className="text-xs text-muted-foreground">By Author Name</p>
                            </div>
                        </td>
                        <td className="align-middle">
                            
                            <span className="capitalize">3-minute read</span>
                            
                        </td>
                        <td className="align-middle">
                            <div className="flex flex-row gap-2 items-center">
                                <Heart className="w-[1em] h-[1em] fill-red-400 text-red-400"/>
                                <span>4.3k</span>

                            </div>
                        </td>
                        <td className="align-middle w-[80px]">
                                <Button className="h-fit rounded-lg w-full !px-2 !py-1 text-[1em] !border-primary !text-primary !ring-primary" variant="outline">
                                    Read
                                </Button>
                        </td>
                    </tr>
                </tbody>
            </table>



        </TabsContent>
        <TabsContent value="clips">Clips content</TabsContent>
        <TabsContent value="blogs">Blogs content</TabsContent>
        <TabsContent value="news">Allied Health News</TabsContent>
      </Tabs>
    </div>
  );
};

export default WeeklyBites;
