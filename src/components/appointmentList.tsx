"use client";

import { useHalaxyServiceContext } from "@/context/HalaxyServiceContext";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

type AppointmentListProps = {
  count?: number;
  itemClassName?: string;
  showCancel?: boolean;
}

const AppointmentList = ({ count, itemClassName, showCancel }: AppointmentListProps) => {
  const dateFormatter = new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const { myAppointments, cancelAppointment, rebookAppointment } = useHalaxyServiceContext()


  if (myAppointments == null) {
    return (
      <div className="space-y-4">
        {[...Array(count ?? 1)].map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl p-4 bg-muted animate-pulse h-16"
          />
        ))}
      </div>
    );
  }

  if (myAppointments.length === 0) {
    return (
      <div className={cn("max-md:!bg-[#70958517] rounded-xl p-4 flex flex-row justify-between items-center", itemClassName)}>
        <div className="text-zinc-500 flex h-[38px] items-center">
          <p className="max-md:!text-sm font-medium">No upcoming appointments</p>
        </div>
      </div>
    );
  }

  // 🔹 Apply `count` limit if provided
  const appointmentsToShow = count
    ? myAppointments.slice(0, count)
    : myAppointments;



  return (
    <div className="space-y-4">
      {appointmentsToShow.map((i) => {
        const isCancelled = JSON.stringify(i)?.includes('"code":"cancelled","display":"cancelled"') || false
        
        return (
        <Link
          key={i.id}
          className={cn("max-md:!bg-[#70958517] rounded-xl p-4 flex flex-row justify-between items-center", itemClassName)}
          href={`/user/appointments?${i.id}`}
        >
          <div className="flex-1 text-zinc-500">
            <p className="max-md:!text-sm font-medium flex flex-row items-center gap-1">
                Consultation{" "}
                {isCancelled && (
                  <Badge className="bg-red-400/80 text-[10px] px-1.5 py-0.5 h-auto leading-none">Cancelled</Badge>
                )}
              </p>
            <p className="muted-text">
              {dateFormatter.format(new Date(i.start))}
            </p>
            <div className="space-x-2">
            {!isCancelled && showCancel &&
              <Button
                variant="link"
                className="!p-0 text-secondary cursor-not-allowed"
                onClick={(e) => {
                  e.preventDefault() // stop the parent <Link> navigation
                  e.stopPropagation() // stop bubbling up
                  // your cancel logic here
                  cancelAppointment(i.id)
                }}>
                Cancel
              </Button>
            }
             {isCancelled && <Button
                variant="link"
                className="!p-0 text-secondary"
                onClick={(e) => {
                  e.preventDefault() // stop the parent <Link> navigation
                  e.stopPropagation() // stop bubbling up
                  // your cancel logic here
                  rebookAppointment(i.id)
                }}>
                Rebook
              </Button>}
              </div>
          </div>
          <span className="max-md:hidden text-xl font-medium line-through">
            $120
          </span>
        </Link>
      )
      })}
    </div>
  );
};

export default AppointmentList;
