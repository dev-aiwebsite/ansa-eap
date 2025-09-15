"use client";
import { useEffect, useState } from "react";
import { getPublicEvents, PublicEvent } from "@/serverActions/crudPublicEvents";
import ImageWithFallback from "../ui/imageWithFallback";
import { Ellipsis } from "lucide-react";

// This replaces PublicEventsList with client-side fetching
export default function PublicEventsList() {
  const [events, setEvents] = useState<PublicEvent[] | null>(null);

  
  useEffect(() => {
    getPublicEvents({
      limit: 2,
      orderBy: 'date',
      order: 'DESC'
    }).then((res) => setEvents(res.data || []));
  }, []);

  if (!events) return <PublicEventsSkeleton />;

  return (
    <div className="space-y-2">
      {events.map((event) => (
        <PublicEventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

function PublicEventCard({ event }: { event: PublicEvent }) {
    const dateFormatter = new Intl.DateTimeFormat('en-AU', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  
});
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={event.link || "#"}
      className="flex items-center justify-between p-4 border rounded-xl space-x-4"
    >
      <ImageWithFallback
        iconSize={30}
        className="object-cover w-10 h-10 rounded-full bg-gray-200"
        width={40}
        height={40}
        alt={event.title}
        src={event.image || ""}
      />
      <div className="flex-1">
        <p className="font-medium text-muted-foreground text-sm">{event.title}</p>
        <p className="text-xs text-muted-foreground">{dateFormatter.format(event.date)}</p>
        <p className="text-xs text-muted-foreground">{event.time} @ {event.location}</p>
      </div>
      <Ellipsis size={18} className="text-muted-foreground" />
    </a>
  );
}

// Simple skeleton while loading
function PublicEventsSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse flex items-center justify-between p-4 border rounded-xl space-x-4"
        >
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1 space-y-1">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-2 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
        </div>
      ))}
    </div>
  );
}


