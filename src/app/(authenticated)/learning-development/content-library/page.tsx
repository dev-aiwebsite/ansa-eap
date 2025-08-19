"use client";
import { BookOpen, Check, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { slugifyName } from "@/lib/helper";
import { coursesData, TypeCoursesData } from "@/app/demo/demoData";
import { iconMap } from "@/lib/icon-map";

const ContentLibraryPage = () => {
  return (
    <div className="grid">
      <div>
        <div className="grid grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
          {coursesData.slice(0, 8).map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default ContentLibraryPage;

function Card({ item }: { item: TypeCoursesData }) {
    const slug = slugifyName(item.name)
    const IconComponent = iconMap[item.icon];

  return (
    <Link href={"/learning-development/content-library/" + slug}>
    <div className="card flex flex-col overflow-hidden relative gap-4">
      <div className="rounded-full text-2xl">  {IconComponent && <IconComponent />}</div>
      <h3 className="text-lg font-medium">{item.name}</h3>
      <div className="mt-auto space-y-2">
        <div className="flex flex-row gap-2 items-center">
          <div className="bg-gray-200 w-[30px] aspect-square rounded-full">
            {item.author_image && (
              <Image
                className="object-cover rounded-full"
                src={item.author_image}
                width={30}
                height={30}
                alt=""
              />
            )}
          </div>
          <span className="text-sm text-muted-foreground">{item.author}</span>
        </div>
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
        <div className="bg-green-400 aspect-square w-fit rounded-full p-[3px] text-[10px]">
          <Check
            className="text-white"
            strokeWidth={3}
            height="1em"
            width="1em"
          />
        </div>
        <span className="capitalize">{item.status}</span>
      </div>
    </div>
    </Link>
  );
}
