"use client";

import { useAppServiceContext } from "@/context/appServiceContext";
import { getMyAppointments } from "@/serverActions/halaxy/usersData";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Appointment = {
  resource: {
    id: string;
    start: string;
    [key: string]: unknown;
  };
};

export type AppointmentsResponse = {
  entry: Appointment[];
};

const AppointmentList = ({ count }: { count?: number }) => {
  const dateFormatter = new Intl.DateTimeFormat("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const { currentUser } = useAppServiceContext();
  const [myAppointments, setMyAppointments] =
    useState<AppointmentsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser?.email) return;

    setLoading(true);
    getMyAppointments(currentUser.email)
      .then((r) => setMyAppointments(r))
      .finally(() => setLoading(false));
  }, [currentUser?.email]);

  if (loading) {
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

  if (!myAppointments || myAppointments.entry.length === 0) {
    return (
      <div className="max-md:!bg-[#70958517] rounded-xl p-4 flex flex-row justify-between items-center">
        <div className="text-zinc-500 flex h-[38px] items-center">
          <p className="max-md:!text-sm font-medium">No upcoming appointments</p>
        </div>
      </div>
    );
  }

  // 🔹 Apply `count` limit if provided
  const appointmentsToShow = count
    ? myAppointments.entry.slice(0, count)
    : myAppointments.entry;

  return (
    <div className="space-y-4">
      {appointmentsToShow.map((i) => (
        <Link
          key={i.resource.id}
          className="max-md:!bg-[#70958517] rounded-xl p-4 flex flex-row justify-between items-center"
          href="#"
        >
          <div className="flex-1 text-zinc-500">
            <p className="max-md:!text-sm font-medium">Consultation</p>
            <p className="muted-text">
              {dateFormatter.format(new Date(i.resource.start))}
            </p>
          </div>
          <span className="max-md:hidden text-xl font-medium line-through">
            $120
          </span>
        </Link>
      ))}
    </div>
  );
};

export default AppointmentList;
