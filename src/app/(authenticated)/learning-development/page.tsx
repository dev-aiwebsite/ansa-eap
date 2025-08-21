"use client";
import { iconMap } from "@/lib/icon-map";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";

export type LearningDevelopment = {
  name: string;
  icon: keyof typeof iconMap;
  lessons_count: string;
  total_time: string;
  status: string;
  link: string;
};

const coursesData: LearningDevelopment[] = [
  {
    name: "Video Contents",
    icon: "IconBookMarkOrange",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "completed",
    link: "/learning-development/webinars"
  },
  {
    name: "Yoga",
    icon: "IconRulerPencil",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "completed",
    link: "/learning-development/yoga"
  },
  {
    name: "3 minute read",
    icon: "IconPouringCup",
    lessons_count: "15",
    total_time: "40 Hours",
    status: "completed",
    link: "/learning-development/blogs"
  },
 
  
];

const ContentLibraryPage = () => {
  return (
    <div className="grid">
      <div>
        <div className="grid grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
          {coursesData.slice(0, 8).map((item) => (
            <Card key={item.link} item={item} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ContentLibraryPage;

function Card({ item }: { item: LearningDevelopment }) {
    const IconComponent = iconMap[item.icon];

  return (
    <Link href={item.link}>
    <div className="card flex flex-col overflow-hidden relative gap-4">
      <div className="rounded-full text-2xl">  {IconComponent && <IconComponent />}</div>
      <h3 className="text-lg font-medium">{item.name}</h3>
      <div className="mt-auto space-y-2">
        <div className="flex flex-row gap-5 items-center">
          <div className="flex flex-row items-center gap-2 text-xs text-app-purple-300">
            <BookOpen width="1.2em" className="text-inherit" />
            <span className="text-muted-foreground">{item.lessons_count}</span>
          </div>
          <div className="flex flex-row items-center gap-2 text-xs text-app-purple-300">
            <Clock width="1.2em" className="text-inherit" />
            <span className="text-muted-foreground">{item.total_time}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 text-xs text-muted-foreground">
        {/* <div className="bg-green-400 aspect-square w-fit rounded-full p-[3px] text-[10px]">
          <Check
            className="text-white"
            strokeWidth={3}
            height="1em"
            width="1em"
          />
        </div> */}
        <span>4 / 20</span>
        <span className="capitalize">{item.status}</span>
      </div>
    </div>
    </Link>
  );
}
