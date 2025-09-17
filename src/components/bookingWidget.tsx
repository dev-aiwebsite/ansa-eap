"use client"

import { useState } from "react";
import HalaxyBooking from "./ui/halaxybooking";
import { ConsentForm } from "./forms/consentForm";

const BookingWidget = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      {agreed ? (
        <HalaxyBooking />
      ) : (
        <div className="card">
            <h2 className="mb-5">Please read and agree to consent form to proceed with booking</h2>
          <ConsentForm onSubmit={(v) => setAgreed(v)} />
        </div>
      )}
    </>
  );
};

export default BookingWidget;
