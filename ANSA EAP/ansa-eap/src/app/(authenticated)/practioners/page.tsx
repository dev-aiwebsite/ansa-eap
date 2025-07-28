"use client"
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { slugifyName } from "@/lib/helper";


export const practionersData = [
  {
      "id": "7WkBEQxkp8",
      "name": "Liam",
      "position": "Junior Therapist",
      "experience": "5 years",
      "image": "/assets/images/img3.png",
      "description": "Focused on holistic and evidence-based treatments.",
      "booking_link": ""
  },
  {
      "id": "5f12muiL8h",
      "name": "Jane",
      "position": "Junior Counselor",
      "experience": "8 years",
      "image": "/assets/images/img3.png",
      "description": "Focused on holistic and evidence-based treatments.",
      "booking_link": ""
  },
  {
      "id": "wCiLvHDjmY",
      "name": "Isabella",
      "position": "Junior Therapist",
      "experience": "13 years",
      "image": "/assets/images/img3.png",
      "description": "Experienced with adolescents and family therapy.",
      "booking_link": ""
  },
  {
      "id": "LsUN7u1c0j",
      "name": "Ava",
      "position": "Junior Psychologist",
      "experience": "5 years",
      "image": "/assets/images/img3.png",
      "description": "Passionate about mental wellness and helping others thrive.",
      "booking_link": ""
  },
  {
      "id": "pQl97z4Kf9",
      "name": "Lucas",
      "position": "Junior Psychologist",
      "experience": "15 years",
      "image": "/assets/images/img3.png",
      "description": "Passionate about mental wellness and helping others thrive.",
      "booking_link": ""
  },
  {
      "id": "jIqBUQHlp5",
      "name": "Lucas",
      "position": "Senior Psychologist",
      "experience": "5 years",
      "image": "/assets/images/img3.png",
      "description": "Specializes in anxiety and mood disorders.",
      "booking_link": ""
  },
  {
      "id": "D3l69bD53s",
      "name": "Mason",
      "position": "Junior Psychologist",
      "experience": "13 years",
      "image": "/assets/images/img3.png",
      "description": "Focused on holistic and evidence-based treatments.",
      "booking_link": ""
  },
  {
      "id": "gqAq30XhpA",
      "name": "Lucas",
      "position": "Senior Psychologist",
      "experience": "5 years",
      "image": "/assets/images/img3.png",
      "description": "Specializes in anxiety and mood disorders.",
      "booking_link": ""
  },
  {
      "id": "7p2v1Ur_OE",
      "name": "Olivia",
      "position": "Senior Counselor",
      "experience": "15 years",
      "image": "/assets/images/img3.png",
      "description": "Focused on holistic and evidence-based treatments.",
      "booking_link": ""
  }
]


const Practioners = () => {
  return (
    <div className="grid">
      <div>
        <div className="grid grid-cols-3 flex-wrap gap-5 gap-y-10 w-full-sidebar">
          {practionersData.slice(0, 6).map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Practioners;

function Card({
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
        <p className="text-xs">{item.description}</p>
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
