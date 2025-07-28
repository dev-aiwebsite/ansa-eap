"use client"
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Image from "next/image";

type TypeWebinarsData = {
  id: string;
  name: string;
  position: string;
  experience: string;
  image: string;
  description: string;
  booking_link: string;
  video: string;

}

export const webinarsData = [
  {
      "id": "7WkBEQxkp8",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Junior Therapist",
      "experience": "5 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Focused on holistic and evidence-based treatments.",
      "booking_link": ""
  },
  {
      "id": "5f12muiL8h",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Junior Counselor",
      "experience": "8 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Focused on holistic and evidence-based treatments.",
      "booking_link": ""
  },
  {
      "id": "wCiLvHDjmY",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Junior Therapist",
      "experience": "13 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Experienced with adolescents and family therapy.",
      "booking_link": ""
  },
  {
      "id": "LsUN7u1c0j",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Junior Psychologist",
      "experience": "5 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Passionate about mental wellness and helping others thrive.",
      "booking_link": ""
  },
  {
      "id": "pQl97z4Kf9",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Junior Psychologist",
      "experience": "15 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Passionate about mental wellness and helping others thrive.",
      "booking_link": ""
  },
  {
      "id": "jIqBUQHlp5",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Senior Psychologist",
      "experience": "5 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Specializes in anxiety and mood disorders.",
      "booking_link": ""
  },
  {
      "id": "D3l69bD53s",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Junior Psychologist",
      "experience": "13 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Focused on holistic and evidence-based treatments.",
      "booking_link": ""
  },
  {
      "id": "gqAq30XhpA",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Senior Psychologist",
      "experience": "5 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Specializes in anxiety and mood disorders.",
      "booking_link": ""
  },
  {
      "id": "7p2v1Ur_OE",
      "name": "Mind Matters: A Conversation on Mental Health & Wellbeing",
      "position": "Senior Counselor",
      "experience": "15 years",
      "image": "/assets/images/webinar.jpg",
      "video": "/assets/images/webinar.jpg",
      "description": "Focused on holistic and evidence-based treatments.",
      "booking_link": ""
  }
]


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

function Card({item}:{item:TypeWebinarsData}) {

      return (
        <div className="card rounded-lg p-4 w-1/4 min-w-[280px] w-full flex flex-col gap-5 text-sm">
          <Image
            className="rounded-sm w-full h-[140px] object-cover object-top"
            width={200}
            height={100}
            src={item.image}
            alt={item.name}
          />
          <p className="text-base font-medium">{item.name}</p>

          <p className="text-muted-foreground text-xs">
            {item.description}
          </p>
          <div className="flex">
            <div className="flex flex-row items-center gap-2">
              <Clock
                width="1em"
                className="text-app-purple-300 text-base"
              />
              <span className="text-muted-foreground">1 - 2 hours</span>
            </div>
            <Button className="ml-auto" variant="outline">
              Watch
            </Button>
          </div>
        </div>
    );
}
