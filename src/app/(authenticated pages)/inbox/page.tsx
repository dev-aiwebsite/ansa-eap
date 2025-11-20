"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { PushNotificationToggle } from "@/components/webpush/PushNotificationToggle";
import { useInbox } from "@/context/InboxContext";
import { cn } from "@/lib/utils";
import { InboxItem } from "@/serverActions/crudInboxItem";
import Link from "next/link";

export default function Inbox() {
  const { inboxItems, loading, markAsRead } = useInbox();

  return (
    <Container className="card">
      <div className="flex flex-row items-center justify-between gap-4 mb-4">
        <h3 className="section-title">Inbox</h3>

          <PushNotificationToggle />
      </div>

      <div className="space-y-2">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse p-4 border rounded-lg bg-gray-100 flex flex-col gap-2"
              >
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
              </div>
            ))
          : inboxItems.length === 0
          ? <p className="text-gray-500">No messages in your inbox.</p>
          : inboxItems.map((item) => (
              <InboxItemComponent markAsRead={markAsRead} key={item.id} item={item} />
            ))}
      </div>
    </Container>
  );
}


function InboxItemComponent({ item, markAsRead }: { item: InboxItem, markAsRead: (itemId: string) => Promise<void> }) {
  const baseClass = 'block p-4 rounded-lg max-md:!bg-[#70958517] bg-gray-50 hover:bg-gray-100 transition-colors';
  const unreadClass = item.status === "unread" ? "bg-blue-50" : "";

  if (item.url) {
    return (
      <Link
        onClick={() => markAsRead(item.id)}
        href={item.url}
        className={cn(baseClass, unreadClass)}
      >
        <div className="flex justify-between mb-1">
          <h4 className="max-md:!text-sm font-medium">{item.title}</h4>
        </div>
        <p className="muted-text">{item.body}</p>
        <p className="mt-3 muted-text">{new Date(item.created_at).toLocaleString()}</p>
      </Link>
    );
  }

  return (
    <Button
      onClick={() => markAsRead(item.id)}
      className={cn(baseClass, unreadClass)}
    >
      <div className="flex justify-between mb-1">
        <h4 className="max-md:!text-sm font-medium">{item.title}</h4>
      </div>
      <p className="muted-text">{item.body}</p>
      <p className="mt-3 muted-text">{new Date(item.created_at).toLocaleString()}</p>
    </Button>
  );
}
