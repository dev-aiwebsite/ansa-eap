"use client";
import { useParams } from "next/navigation";
import { slugifyName } from "@/lib/helper";
import Image from "next/image";
import { practionersData } from "@/app/demo/demoData";
import CalendarFull from "@/components/widgets/calendar/calendarFull";
import Container from "@/components/ui/container";

const PractionerSingle = () => {
  const params = useParams();
  const practioner_name = params.practioner_name;
  const practionerData = practionersData.filter(
    (i) => slugifyName(i.name) == practioner_name
  )[0];

  return (
    <div className="flex gap-6 h-full">
      <Container className="card max-w-[400px]">
        <>
          <div className="flex flex-col items-center p-4">
            <Image
              src={practionerData.image}
              alt=""
              width={100}
              height={100}
              className="mx-auto rounded-full aspect square object-fit"
            />
            <h3 className="font-bold text-center">{practionerData.name}</h3>
            <p className="py-1 px-4 text-sm rounded-full bg-primary text-white w-fit text-center">
              {practionerData.position}
            </p>
            <p>{practionerData.experience}</p>
          </div>
          <div
              className="prose text-sm mt-2 text-muted-foreground max-w-none whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: practionerData.description ?? "" }}
            />
        </>
      </Container>

      <div className="max-w-[800px] flex-1 overflow-hidden">
        <CalendarFull />
        </div>
    </div>
  );
};

export default PractionerSingle;
