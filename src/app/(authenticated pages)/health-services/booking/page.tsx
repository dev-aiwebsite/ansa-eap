"use client";
import BookingWidget from "@/components/bookingWidget";
import { useHalaxyServiceContext } from "@/context/HalaxyServiceContext";
import { Loader2 } from "lucide-react";

export default function Page() {
  const { remainingCredit } = useHalaxyServiceContext();
  return (
    <div className="h-full flex-1 overflow-hidden card">
      <div className="h-full max-h-webkit-fill flex-col flex gap-4">
        <div>
          <p className="font-medium text-zinc-700">
            Remaining Credits:{" "}
            <span className="font-semibold ">
              {remainingCredit || "--"}
            </span>
          </p>

        </div>
        <div className="bg-[#e9ecef] flex-1 rounded-lg w-full flex items-center justify-center">
          {remainingCredit ?
            <>
              {remainingCredit > 0 ? (
                <BookingWidget link="https://www.halaxy.com/book/widget/elevate-by-ansa/location/1335519" />
              ) : (
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium text-zinc-700">
                    You’ve reached your booking limit.
                  </p>
                  {/* <p className="text-sm text-muted-foreground">
              Please contact support or your administrator to increase your credits.
            </p> */}
                </div>
              )}
            </>
            :  <div className="flex flex-col items-center justify-center text-zinc-500 space-y-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <p className="text-sm">Gathering data...</p>
            </div>
          }

        </div>
      </div>
    </div>
  );
}
