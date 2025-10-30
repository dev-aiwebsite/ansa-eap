import { Button } from "@/components/ui/button";



const page = () => {
    return (
      <div className="mt-100">
       <div className="space-y-4">
      {/* {appointmentsToShow.map((i) => ( */}
        <div
          // key={i.resource.id}
          className="card max-md:!bg-[#70958517] rounded-xl p-4 flex flex-row justify-between items-center"
          // href="#"
        >
          <div className="flex-1 text-zinc-500">
            <p className="max-md:!text-sm font-medium">Consultation</p>
            <p className="muted-text">
              {/* {dateFormatter.format(new Date(i.resource.start))} */}
              11 November 2025 at 9:00 am
            </p>
            <Button
            variant="link"
            className="!p-0 text-secondary">
              Cancel
            </Button>
          </div>
          <span className="max-md:hidden text-xl font-medium line-through">
            $120
          </span>
        </div>
      {/* ))} */}
    </div>
      </div>
    );
}

export default page;