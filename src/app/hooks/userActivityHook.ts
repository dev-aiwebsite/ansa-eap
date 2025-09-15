"use client";

import { useAppServiceContext } from "@/context/appServiceContext";
import {
    LogActivityProps,
    useUserActivityContext,
} from "@/context/userActivitiesContext";
import { Post } from "@/serverActions/crudPosts";
import { useEffect, useRef } from "react";


type UserActivityHookProps = {
    action: "read" | "watch";
    data: Partial<Post> | null;
}
export const UserActivityHook = ({action,data}:UserActivityHookProps) => {

  const { currentUser } = useAppServiceContext();

  // ⬇️ from context
  const { logActivity, isUserActive } = useUserActivityContext();

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Logging activity while reading
  useEffect(() => {
    const currentUserId = currentUser?.id;
    if (!currentUserId || !data?.id) return;

    const intervalDuration = 5000; // 5 seconds
    const secondsIncrement = intervalDuration / 1000;

    intervalRef.current = setInterval(() => {
      if (!isUserActive) return; // ✅ Skip logging if idle/hidden

      const activity: LogActivityProps = {
        userId: currentUserId,
        targetId: data.id!,
        targetType: data.category ?? "",
        action: action,
        seconds: secondsIncrement,
      };

      logActivity(activity);
    }, intervalDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data?.id, currentUser?.id, logActivity, isUserActive]);

};


