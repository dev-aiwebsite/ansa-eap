"use client";

import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "../ui/input";

type ConsentFormProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  onSubmit?: (v: boolean) => void;
};

export function ConsentForm({ checked, onChange, onSubmit }: ConsentFormProps) {
  // If parent controls it, use that. Otherwise fallback to local state.
  const [internalChecked, setInternalChecked] = React.useState(false);
  const isControlled = checked !== undefined;
  const agreed = isControlled ? checked : internalChecked;

  function handleCheck(value: boolean) {
    if (!isControlled) setInternalChecked(value);
    onChange?.(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      alert("You must agree to the consent form before continuing.");
      return;
    }
    onSubmit?.(agreed);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-item">
        <label className="form-item-label">Full name</label>
        <Input placeholder="John Doe" required />
      </div>
      <div className="flex items-start space-x-2">
        <Checkbox
          id="consent"
          checked={agreed}
          onCheckedChange={(val) => handleCheck(!!val)}
        />
        <label
          htmlFor="consent"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="px-1 text-sm">
                Consent Form
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Consent Form</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    <strong>Elevate by ANSA</strong> provides confidential
                    counselling, psychology, and wellbeing support services to
                    employees and organisations. As part of your care, we
                    collect and record relevant health information.
                  </p>

                  <h4 className="font-semibold">Your Rights as a Client</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Respect at all times, including recognition of your
                      cultural background, identity, and language.
                    </li>
                    <li>Clear explanation of the services you will receive.</li>
                    <li>
                      Your informed consent sought before and during services.
                    </li>
                    <li>Explanation of confidentiality and its limits.</li>
                    <li>
                      Skilled and professional care tailored to your needs.
                    </li>
                    <li>The right to ask questions at any time.</li>
                  </ul>
                  <p>
                    If you have concerns about your clinician, you may raise
                    them directly with Elevate by ANSA, or with the relevant
                    professional registration body.
                  </p>

                  <h4 className="font-semibold">
                    Why Do We Collect Information?
                  </h4>
                  <p>
                    We collect information to support assessment, counselling,
                    and treatment planning. Information helps us deliver
                    effective, evidence-based services.
                  </p>
                  <p>
                    Routine outcome measures may be used to monitor your
                    progress and ensure care remains responsive to your needs.
                    De-identified information may also be used for service
                    evaluation and quality improvement.
                  </p>

                  <h4 className="font-semibold">Confidentiality</h4>
                  <p>
                    Your information is confidential and will not be shared with
                    your employer. Information may only be disclosed if:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Required by law (e.g. subpoena, mandatory reporting of
                      child safety concerns).
                    </li>
                    <li>
                      There is a serious or imminent risk of harm to yourself or
                      others.
                    </li>
                    <li>
                      You provide written consent to share information with
                      another professional or service.
                    </li>
                    <li>
                      Care is transitioned to another Elevate clinician (unless
                      you withdraw consent).
                    </li>
                  </ul>
                  <p>
                    Reports provided to your organisation are limited to
                    de-identified usage data (e.g. number of employees accessing
                    services). No personal or clinical details are disclosed
                    without your consent.
                  </p>

                  <h4 className="font-semibold">
                    Professional Development & Supervision
                  </h4>
                  <p>
                    To maintain service quality, Elevate clinicians engage in
                    professional supervision and development. Case material may
                    be discussed, but your identity and personal details are
                    always protected.
                  </p>

                  <h4 className="font-semibold">
                    Digital Innovation – AI-Assisted Notes
                  </h4>
                  <p>
                    As part of Elevate’s commitment to innovation, we use
                    AI-assisted note-writing tools to support our clinicians.
                  </p>
                  <p>
                    <strong>Purpose:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Help generate accurate and structured session notes.
                    </li>
                    <li>
                      Improve efficiency and free more time for direct client
                      care.
                    </li>
                  </ul>
                  <p>
                    <strong>Safeguards:</strong>
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>
                      Notes are confidential, securely stored, and accessible
                      only to authorised Elevate clinicians.
                    </li>
                    <li>
                      AI tools comply with strict privacy and data-security
                      standards.
                    </li>
                    <li>
                      All notes are reviewed and approved by your clinician.
                    </li>
                  </ul>
                  <p>
                    Consent for AI-assisted note-writing is optional and can be
                    withdrawn at any time.
                  </p>

                  <h4 className="font-semibold">Agreement</h4>
                  <p>
                    I, (print) ..................................., have read
                    and understood this Consent Form. I consent to receive
                    services under Elevate by ANSA and agree to the conditions
                    outlined.
                  </p>
                  <p>
                    Signature
                    .................................................... Date
                    ............................
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </label>
      </div>

      <Button type="submit">Continue</Button>
    </form>
  );
}
