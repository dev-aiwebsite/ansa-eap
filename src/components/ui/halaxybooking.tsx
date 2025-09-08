"use client";
import { useEffect } from "react";

type HalaxyMessage =
  | { type: "BOOKING_CONFIRMED"; data: unknown }
  | { type: string; data?: unknown }; // fallback for unknown messages

export default function HalaxyBooking() {
  useEffect(() => {
    const handleMessage = (event: MessageEvent<HalaxyMessage>) => {
      // ✅ Security: Only allow from halaxy.com
      if (!event.origin.includes("halaxy.com")) return;

      console.log("Message received from Halaxy iframe:", event.data);

      if (event.data?.type === "BOOKING_CONFIRMED") {
        console.log("Booking confirmed:", event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <div className="flex-1 h-full overflow-hidden rounded-lg">
      <iframe
        src="https://www.halaxy.com/book/widget/psychologist/adam-stefano/1273761/1328509"
        allow="payment"
        style={{ border: 0, width: "100%", height: "100%" }}
        title="Halaxy booking widget"
        loading="lazy"
      />
    </div>
  );
}
