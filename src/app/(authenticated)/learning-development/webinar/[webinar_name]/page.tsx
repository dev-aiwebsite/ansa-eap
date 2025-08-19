"use client";
import { useParams } from "next/navigation";
import { slugifyName } from "@/lib/helper";
import { webinarsData } from "@/app/demo/demoData";
import Video from "@/components/ui/video";

const WebinarSingle = () => {
  const params = useParams();
  const webinarName = params.webinar_name;
  const data = webinarsData.filter(
    (i) => slugifyName(i.name) == webinarName
  )[0];

  return (
    <div className="flex gap-6 h-full">
      <div className="card flex-1">
        <Video
          className="aspect-[16/9] video-shadow"
          src=""
          title={data.name}
        ></Video>
        <div className="p-4">
          <h1 className="mt-6 text-xl font-medium">{data.name}</h1>
          <div className="meta-container mt-2">
            <span className="pr-2">{data.author}</span>
            <span className="px-2">{data.tag}</span>
          </div>
          <div className="mt-10">
            <p className="font-medium text-sm">Description</p>
            <p className="text-sm mt-2 text-muted-foreground">{data.description}</p>
          </div>
        </div>
      </div>

      <div className="right-sidebar"></div>
    </div>
  );
};

export default WebinarSingle;
