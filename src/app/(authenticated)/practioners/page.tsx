"use client"
import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ui/imageWithFallback";
import { useAppServiceContext } from "@/context/appServiceContext";
import { htmlToPlainText, slugifyName, truncateText } from "@/lib/helper";
import { getPractitioners, Practitioner } from "@/serverActions/crudPractitioners";
import { CalendarPlus, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";



const Practitioners = () => {
  const {currentUser} = useAppServiceContext()
  const isAdmin = !!currentUser

  return (<>
    {isAdmin && (
        <div className="flex items-center justify-between">
          <Button
            href="/learning-development/blogs/new"
            className="flex ml-auto"
          >
            <Plus /> Add New
          </Button>
        </div>
      )}
    <Content/>
    </>
  );
};

export default Practitioners;

function PractitionerCard({
  item,
}: {
  item: Practitioner;
}) {

  const professionalName = (`${item.title} ${item.first_name} ${item.last_name}`).trim()
  return (<>
    <div className="card p-0 items-center flex flex-row overflow-hidden relative">
      <div className="space-y-4 p-10 pr-0 w-2/3">
        <div className="flex flex-row gap-2 items-center">
          <h3 className="text-xl font-bold">{professionalName}</h3>
          <span className="capitalize underline decoration-muted-foreground decoration-[1px]">
            {item.profession}
          </span>
        </div>
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
            ><Link href={`/practioners/${slugifyName(professionalName)}~${item.id}`}>View Profile</Link></Button>
          </div>
        </div>
      </div>
      <div className="grid mr-[-20px] mt-auto">
        <ImageWithFallback
        className="mt-auto object-cover rounded-tl-3xl w-[200px] h-[125px] object-top bg-gray-100"
         width={300}
          height={100}
          src={item.profile_img}
          alt={professionalName}
         />
      </div>
    </div>
    </>
  );
}


function Content(){

  const [practitioners, setPractitioners] = useState<Practitioner[]>([])
  useEffect(()=>{
    getPractitioners()
    .then(r => {
      if(r.data){
        setPractitioners(r.data)
      }
    })
  },[])

  return   <div className="grid">
      <div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 flex-wrap gap-5 gap-y-10 w-full-sidebar">
          {practitioners?.map((item) => (
            <PractitionerCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div></div>
    </div>
}