"use client"

import { useState } from "react";
import HalaxyBooking from "./ui/halaxybooking";
import { ConsentForm } from "./forms/consentForm";

const BookingWidget = ({link}:{link:string}) => {
  const [agreed, setAgreed] = useState(true);

  return (
    <>
      {agreed ? (
        <HalaxyBooking link={link}/>
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
