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
  const [myAppointments, setMyAppointments] = useState<AppointmentsResponse | null>(null);
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
    return <p className="muted-text">No upcoming appointments.</p>;
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
          className="rounded-xl p-4 bg-muted flex flex-row justify-between items-center"
          href="#"
        >
          <div className="flex-1">
            <p className="">Consultation</p>
            <p className="muted-text">
              {dateFormatter.format(new Date(i.resource.start))}
            </p>
          </div>
          <span className="text-xl font-medium line-through">$120</span>
        </Link>
      ))}
    </div>
  );
};

export default AppointmentList;
