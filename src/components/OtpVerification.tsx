"use client";

import { CheckCircle, RefreshCw, Clock, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import AnimatedOTPInput from "./ui/AnimatedOtpInput";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { sendMail } from "@/lib/email/elasticemail";
import { EMAIL_VERIFICATION_TEMPLATE } from "@/lib/email/email_templates/EmailVerification";
import Link from "next/link";

type OtpVerificationProps = {
  className?: string;
  inputClassName?: string;
  email: string;
  onConfirmChange?: (confirmed: boolean) => void;
};

export function OtpVerification({
  className,
  email,
  onConfirmChange,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState("");
  const [value, setValue] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  // Notify parent when confirmation changes
  useEffect(() => {
    if (onConfirmChange) onConfirmChange(isConfirmed);
  }, [isConfirmed, onConfirmChange]);

  // Handle countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsExpired(true);
          setValue("");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const handleSendOtp = async () => {
    const newOtp = generateOtp();
    
    setIsSending(true);
    try {
      const payload = {
        to: email,
        subject: "One-time verification code",
        htmlBody: EMAIL_VERIFICATION_TEMPLATE({code:newOtp}),
      };

      if(process.env.NODE_ENV == 'development'){
      alert(newOtp)
      } else {
        await sendMail(payload)

      }
      
    } catch (err) {
      console.log(err);
      alert("something went wrong");
    }

    
    
      setOtp(newOtp);
      setValue("");
      setIsExpired(false);
      setTimeLeft(60); // 60 seconds countdown
      setIsComplete(false);
      setIsLoading(false);
      setIsSending(false);
      setIsConfirmed(false);
    
  };

  const handleComplete = (enteredOtp: string) => {
    setValue(enteredOtp);
    setIsComplete(true);
    setIsLoading(true);

    setTimeout(() => {
      const isValid = enteredOtp === otp && !isExpired;
      setIsLoading(false);
      setIsConfirmed(isValid);

      if (!isValid) {
        setIsComplete(false);
        setValue("");
        setErrorMsg(
          isExpired ? "OTP expired. Please request a new one." : "Invalid code."
        );
      }
    }, 500);
  };

  useEffect(() => {
    handleSendOtp();
  }, []);

  // Auto-clear error message after 3s
  useEffect(() => {
    if (!errorMsg) return;
    const timer = setTimeout(() => setErrorMsg(""), 3000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-6 space-y-6",
        className
      )}
    >
      <div className="text-center space-y-2">
        <h3 className="font-bold">Verify with Email</h3>
        {!otp && <Loader2 className="muted-text mx-auto animate-spin" />}
        {otp && (
          <>
            {!isExpired ? (
              <>
                <p className="text-balance muted-text">
                  A verification code was sent to{" "}
                  <span className="font-medium">{email || "your email"}</span>.
                </p>
                <p className="text-balance muted-text">
                  <span>Check your inbox or spam folder and enter the code below.</span>
                </p>
              </>
            ) : (
              <>
                <p className="text-balance muted-text text-red-400">
                  OTP expired.
                </p>
                <p className="text-balance muted-text text-red-400">
                  Please request a new one.
                </p>
              </>
            )}
          </>
        )}
      </div>

      <div className="space-y-8 w-full">
        <div className="space-y-4 flex flex-col items-center justify-center">
          <AnimatedOTPInput
            disabled={isExpired || !otp}
            value={value}
            onChange={setValue}
            onComplete={handleComplete}
            maxLength={6}
            wrapperClassName="space-x-2"
            slotClassName="!p-5 !text-lg rounded-md border-l"
          />

          {errorMsg && (
            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-red-400 text-center"
            >
              {errorMsg}
            </motion.span>
          )}
        </div>

        {/* Status message */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 text-center"
          >
            {isLoading ? (
              <div className="text-muted-foreground flex items-center justify-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Verifying code...</span>
              </div>
            ) : isConfirmed ? (
              <div className="flex items-center justify-center space-x-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Code verified successfully!</span>
              </div>
            ) : null}
          </motion.div>
        )}

        {/* Resend / Send button */}
        <div className="flex justify-center">
          <Button
            isLoading={isSending}
            onClick={handleSendOtp}
            className="w-full"
            disabled={isSending || (timeLeft > 0 && !isExpired)}
          >
            {isSending && <span>Sending code...</span>}

            {!isSending && (
              <>
                {timeLeft > 0 && !isExpired ? (
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Code expires in {timeLeft}s</span>
                  </span>
                ) : (
                  "Resend Code"
                )}
              </>
            )}
          </Button>
        </div>

        <div className="text-center muted-text text-balance">
          <span>Need to change account? </span>
          <Link onClick={() => window.location.reload()} href="#" className="underline underline-offset-4">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;

// ✅ Secure random OTP generator
function generateOtp(length = 6): string {
  const digits = "0123456789";
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues, (val) => digits[val % 10]).join("");
}
