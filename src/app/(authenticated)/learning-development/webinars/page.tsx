import { Button } from "@/components/ui/button";
import { stripHtml, truncateText } from "@/lib/helper";
import { getWebinars, Webinar } from "@/serverActions/crudWebinars";
import { Clock, Plus } from "lucide-react";
import Image from "next/image";

const WebinarPage = async () => {
  const { data } = await getWebinars();

  return (
    <div>
      <Button
        href="/learning-development/webinars/new"
        className="flex ml-auto"
      >
        {" "}
        <Plus /> Add New
      </Button>
      <div className="grid">
        <div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
            {data && data.map((item) => <Card key={item.id} item={item} />)}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default WebinarPage;

function Card({ item }: { item: Webinar }) {
  return (
    <div className="card rounded-lg p-4 w-1/4 min-w-[280px] w-full flex flex-col gap-5 text-sm">
      {item.thumbnail && (
        <Image
          className="rounded-sm w-full h-[140px] object-cover object-top"
          width={200}
          height={100}
          src={item.thumbnail}
          alt={item.title}
        />
      )}

      <p className="text-base font-medium">{item.title}</p>
      <p className="text-muted-foreground text-xs">
        {item.description && truncateText(stripHtml(item.description), 200)}
      </p>

      <div className="flex">
        <div className="flex flex-row items-center gap-2">
          <Clock width="1em" className="text-app-purple-300 text-base" />
          <span className="text-muted-foreground">
            {item.duration_hours}:{item.duration_minutes}
          </span>
        </div>
        <Button className="ml-auto" variant="outline" href={item.slug}>
          Watch
        </Button>
      </div>
    </div>
  );
}
