import { alliedHealthData, mentalHealthData } from "@/app/demo/demoData";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Image from "next/image";
const HealthServices = () => {
  return (
    <div className="grid">
      <div>
        <h3 className="my-5 text-xl text-muted-foreground">Mental Health</h3>
        <div className="overflow-auto max-w-full flex flex-row flex-nowrap gap-5 overflow-auto w-full-sidebar">
        {mentalHealthData.map((item,index) => (
            <Card key={item.title + index} item={item} />
        ))}

        </div>
      </div>

      <div>
        <h3 className="my-5 text-xl text-muted-foreground">Allied Health</h3>
        <div className="overflow-auto max-w-full flex flex-row flex-nowrap gap-5 overflow-auto w-full-sidebar">
        {alliedHealthData.map((item,index) => (
            <Card key={item.title + index} item={item} />
        ))}

        </div>
      </div>
      <div></div>
    </div>
  );
};

export default HealthServices;

function Card({item}:{item:{
    title: string;
    image: string;
    duration: string;
    list: string[];
}}){

      return (
        <div className="card rounded-lg p-4 w-1/4 min-w-[350px] flex flex-col gap-5 text-sm">
          <Image
            className="rounded-sm w-full h-[140px] object-cover"
            width={200}
            height={100}
            src={item.image}
            alt={item.title}
          />
          <p className="text-base font-medium">{item.title}</p>

          <ul className="list-disc px-[inherit] text-muted-foreground text-xs">
            {
            item.list.map((i,index) => {
                return <li key={index}>{i}</li>
            })
            }
          </ul>
          <div className="flex">
            <div className="flex flex-row items-center gap-2">
              <Clock
                width="1em"
                className="text-app-purple-300 text-base"
              />
              <span className="text-muted-foreground">1 - 2 hours</span>
            </div>
            <Button className="ml-auto" variant="outline">
              Book Now
            </Button>
          </div>
        </div>
    );

}
