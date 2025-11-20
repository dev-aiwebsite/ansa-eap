"use client";

import { usePushNotifications } from "@/context/PushNotificationContext";
import { Switch } from "@/components/ui/switch";

export function PushNotificationToggle() {
  const { isSubscribed, toggleSubscription } = usePushNotifications();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="toggleNotification" className="text-sm text-gray-700">Notifications</label>
      
      <Switch 
      className="cursor-pointer"
      id="toggleNotification"
        checked={isSubscribed} 
        onCheckedChange={toggleSubscription} 
      />
       
    </div>
  );
}
