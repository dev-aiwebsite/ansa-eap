"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Share, SquarePlus } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

declare global {
  interface Window {
    MSStream?: unknown;
  }
}
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nextPromptDate = localStorage.getItem("elevate-install-prompt");
    const today = new Date();
    let isNeedToPrompt = false;

    if (nextPromptDate) {
      isNeedToPrompt = today > new Date(nextPromptDate);
    } else {
      isNeedToPrompt = true; // No record yet, so prompt the first time
    }

    if (!isNeedToPrompt) return;

    const fiveHoursFromToday = new Date(today.getTime() + 5 * 60 * 60 * 1000);
    localStorage.setItem(
      "elevate-install-prompt",
      fiveHoursFromToday.toISOString()
    );
    const isIOSDevice =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(
      navigator.userAgent
    );

    setIsIOS(isIOSDevice);
    setIsSafari(isSafariBrowser);
    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    // If Safari (iOS or macOS), show custom install popup
    if (isSafariBrowser || isIOSDevice) {
      setOpen(true);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    console.log("User choice:", choiceResult.outcome);
    setDeferredPrompt(null);
    setOpen(false);
  };

  if (isStandalone) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Install App</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 text-sm text-muted-foreground">
            {isIOS || isSafari ? (
              <div className="leading-[2]">
                To install this app, tap the share button
                <Share className="inline mx-2 h-4 w-4 text-muted-foreground" />
                and then
                <p className="whitespace-nowrap p-2 mx-2 inline ring-1 ring-border rounded-lg bg-gray-300 text-xs text-white font-medium">
                  <SquarePlus
                    className="inline mr-2"
                    strokeWidth={2}
                    width={14}
                    height={14}
                  />
                  Add to {isSafari && isIOS ? "Home Screen" : "Dock"}
                </p>
              </div>
            ) : (
              "Install this app to your device for a better experience."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end gap-2">
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          {!isIOS && deferredPrompt && (
            <AlertDialogAction onClick={handleInstallClick}>
              Add to Home Screen
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
