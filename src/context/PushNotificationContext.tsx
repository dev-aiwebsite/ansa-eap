"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { subscribeUser, unsubscribeUser } from "@/serverActions/webPushNotificationactions";
import { useAppServiceContext } from "./appServiceContext";
import { urlBase64ToUint8Array } from "@/lib/helper";


type PushNotificationContextType = {
  isSubscribed: boolean;
  toggleSubscription: () => Promise<void>;
};

const PushNotificationContext = createContext<PushNotificationContextType | undefined>(undefined);

export function PushNotificationProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAppServiceContext();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    const init = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.getSubscription();
        setIsSubscribed(!!sub);
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, [currentUser?.id]);

  const toggleSubscription = async () => {
    if (!currentUser?.id) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      let sub = await registration.pushManager.getSubscription();

      if (sub) {
        await sub.unsubscribe();
        await unsubscribeUser(currentUser.id);
        setIsSubscribed(false);
      } else {
        sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
        });
        await subscribeUser(JSON.parse(JSON.stringify(sub)), currentUser.id);
        setIsSubscribed(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PushNotificationContext.Provider value={{ isSubscribed, toggleSubscription }}>
      {children}
    </PushNotificationContext.Provider>
  );
}

export function usePushNotifications() {
  const context = useContext(PushNotificationContext);
  if (!context) throw new Error("usePushNotifications must be used within PushNotificationProvider");
  return context;
}
