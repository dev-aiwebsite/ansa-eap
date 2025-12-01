"use client";
import { ConsentForm } from "@/components/forms/consentForm";
import HalaxyBookingWidget from "@/components/HalaxyBookingWidget";
import BookingRemainingCredit from "@/components/services/BookingRemainingCredit";
import Container from "@/components/ui/container";
import { useHalaxyServiceContext } from "@/context/HalaxyServiceContext";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const { remainingCredit } = useHalaxyServiceContext();
  const [agreed, setAgreed] = useState(false);
  return (
    <Container className="md:card">
      <div className="h-full space-y-4">
        <div>
          <p className="font-medium text-zinc-700">
            Remaining Credits:{" "}
            <span className="font-semibold ">
              <BookingRemainingCredit />
            </span>
          </p>

        </div>
        {agreed ?
          <div className="bg-[#e9ecef] flex-1 rounded-lg w-full flex items-center justify-center">
            {remainingCredit != undefined ?
              <>
                {remainingCredit > 0 ? (
                  <HalaxyBookingWidget />
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
              : <div className="min-h-[160px] flex flex-col items-center justify-center text-zinc-500 space-y-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm">Gathering data...</p>
              </div>
            }

          </div>
          :
          <div className="card">
            <h2 className="mb-5">Please read and agree to consent form to proceed with booking</h2>
            <ConsentForm onSubmit={(v) => setAgreed(v)} />
          </div>
        }
      </div>
    </Container>
  );
}
