"use client";
import { TypeWebinar, webinarsData } from "@/app/demo/demoData";
import { Button } from "@/components/ui/button";
import { slugifyName } from "@/lib/helper";
import { Clock } from "lucide-react";
import Image from "next/image";

const WebinarPage = () => {
  return (
    <div className="grid">
      <div>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
          {webinarsData.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default WebinarPage;

function Card({ item }: { item: TypeWebinar }) {
  return (
    <div className="card rounded-lg p-4 w-1/4 min-w-[280px] w-full flex flex-col gap-5 text-sm">
      <Image
        className="rounded-sm w-full h-[140px] object-cover object-top"
        width={200}
        height={100}
        src={item.thumbnail}
        alt={item.name}
      />
      <p className="text-base font-medium">{item.name}</p>

      <p className="text-muted-foreground text-xs">{item.description}</p>
      <div className="flex">
        <div className="flex flex-row items-center gap-2">
          <Clock width="1em" className="text-app-purple-300 text-base" />
          <span className="text-muted-foreground">1 - 2 hours</span>
        </div>
        <Button className="ml-auto" variant="outline" href={`/learning-development/webinar/${slugifyName(item.name)}`}>
          Watch
        </Button>
      </div>
    </div>
  );
}
