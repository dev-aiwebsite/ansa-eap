"use client"
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { htmlToPlainText, slugifyName, truncateText } from "@/lib/helper";
import { practionersData } from "@/app/demo/demoData";



const Practioners = () => {
  return (
    <div className="grid">
      <div>
        <div className="flex-wrap gap-5 gap-y-10 w-full-sidebar">
          {practionersData.slice(0, 6).map((item) => (
            <PractitionerCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Practioners;

function PractitionerCard({
  item,
}: {
  item: {
    id: string;
    name: string;
    position: string;
    experience: string;
    image: string;
    description: string;
    booking_link: string;
  };
}) {
  return (
    <div className="card p-0 items-center flex flex-row overflow-hidden relative">
      <div className="space-y-4 p-10 pr-0 w-2/3">
        <div className="flex flex-row gap-2 items-center">
          <h3 className="text-xl font-bold">{item.name}</h3>
          <span className="capitalize underline decoration-muted-foreground decoration-[1px]">
            {item.position}
          </span>
        </div>
        <p>{item.experience} experience</p>
        <p className="text-xs">{item.description &&
                  truncateText(htmlToPlainText(item.description), 100)}</p>
        <div className="flex">
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outline"
              className="ring-muted border-muted rounded-full !py-5 text-muted-foreground hover:border-primary"
            >
              <CalendarPlus />
              Book Now
            </Button>
            <Button
              variant="ghost"
              className="rounded-full !py-5 underline decoration-muted"
            ><Link href={`/practioners/${slugifyName(item.name)}`}>View Profile</Link></Button>
          </div>
        </div>
      </div>
      <div className="grid mr-[-20px] mt-auto">
        <Image
          className="mt-auto object-cover"
          width={300}
          height={100}
          src={item.image}
          alt={item.name}
        />
      </div>
    </div>
  );
}
