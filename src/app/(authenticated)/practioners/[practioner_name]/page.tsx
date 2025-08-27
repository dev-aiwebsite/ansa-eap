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
          <div className="space-y-4 mt-10">
            <p>{practionerData.description}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              sint, consequatur nemo neque dolor et laboriosam hic veritatis
              sed, quidem, obcaecati consectetur ipsam pariatur sit facilis a
              dolorum quod!
            </p>
            <p>
              Repellat sequi quis quod deserunt in facilis. Aliquam non
              accusantium consectetur laboriosam, debitis deserunt optio quo
              dolor quam laborum ullam sed voluptates necessitatibus rerum
              minus, odit dolorum soluta eos.
            </p>
            <p>
              Voluptas vero non eaque incidunt velit sapiente facilis animi,
              error voluptatum ab odit tempora excepturi accusantium repudiandae
              ex? Alias assumenda voluptate quasi sunt, qui a accusantium quas
              maiores ad.
            </p>
            <p>
              Cum voluptatum iste ex architecto debitis, asperiores maxime
              expedita accusantium incidunt ea nemo voluptate est animi corrupti
              tenetur nobis assumenda quasi autem atque omnis magni ducimus?
              Ipsam, minima atque.
            </p>
          </div>
        </>
      </Container>

      <div className="max-w-[800px] flex-1 overflow-hidden">
        <CalendarFull />
        </div>
    </div>
  );
};

export default PractionerSingle;
