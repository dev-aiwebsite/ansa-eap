"use client";

import { updateDailyActivity } from "@/serverActions/crudDailyActivities";
import {
  createDailyCheckIn
} from "@/serverActions/crudDailyCheckIns";
import { User } from "@/serverActions/crudUsers";
import { DailyActivity, DailyCheckIn, DailyCheckinQA } from "@/types"; // adjust path if needed
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type AppServiceContextType = {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;

  users: User[] | [];
  setUsers: Dispatch<SetStateAction<User[]>>;

  dailyActivities: DailyActivity[] | [];
  saveDailyActivities: (
    activity: DailyActivity
  ) => Promise<{ success: boolean; message: string }>;

  dailyCheckIns: DailyCheckIn[] | [];
  saveDailyCheckIns: (
    checkIn: DailyCheckinQA[]
  ) => Promise<{ success: boolean; message: string } | undefined>;

  globalSearchOpen:boolean;
  setGlobalSearchOpen:Dispatch<SetStateAction<boolean>>;
};

type AppServiceContextProviderProps = {
  children?: React.ReactNode;
  data?: {
    currentUser?: User;
    users?: User[];
    dailyActivities?: DailyActivity[];
    dailyCheckIns?: DailyCheckIn[];
  };
};

const appServiceContext = createContext<AppServiceContextType | null>(null);

export function AppServiceContextProvider({
  children,
  data,
}: AppServiceContextProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(
    data?.currentUser || null
  );
  const [users, setUsers] = useState<User[]>(data?.users || []);
  const [dailyActivities, setDailyActivities] = useState<DailyActivity[] | []>(
    data?.dailyActivities || []
  );
  const [dailyCheckIns, setDailyCheckIns] = useState<DailyCheckIn[] | []>(
    data?.dailyCheckIns || []
  );

  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);

  const saveDailyActivities = async (activity: DailyActivity) => {
    const result = {
      success: false,
      message: "",
    };
    if (!currentUser) {
      result.message = "No Current User";
      return result;
    }
    try {
      const res = await updateDailyActivity(currentUser?.id, activity);

      if (!res.ok) throw new Error("Failed to save activity");

      const saved = await res.json();
      setDailyActivities((prev) => [...prev, saved]);
      result.success = true;
    } catch (err) {
      result.message = err instanceof Error ? err.message : "Unknown error";
      console.error("Error saving activity:", err);
    }

    return result;
  };

  const saveDailyCheckIns = async (checkIn: DailyCheckinQA[]) => {
    const result = {
      success: false,
      message: "",
    };

    // if(!currentUser){
    //   result.message = "No Current User"
    //   return result
    // }

    const data = {
      user_id: currentUser?.id ?? "1kj23lk1j2",
      responses: checkIn,
    };
    try {
      const res = await createDailyCheckIn(data);
      setDailyCheckIns((prev) => [...prev, res]);
      result.success = true;
      return result;
    } catch (err) {
      result.message = err instanceof Error ? err.message : "Unknown error";
      console.error("Error saving daily check ins:", err);
    }
  };

  return (
    <appServiceContext.Provider
      value={{
        globalSearchOpen,
        setGlobalSearchOpen,
        currentUser,
        setCurrentUser,
        users,
        setUsers,
        dailyActivities,
        saveDailyActivities,
        dailyCheckIns,
        saveDailyCheckIns,
      }}
    >
      {children}
    </appServiceContext.Provider>
  );
}

export function useAppServiceContext() {
  const context = useContext(appServiceContext);
  if (!context) {
    throw new Error(
      "useAppServiceContext must be used within a appServiceContextProvider"
    );
  }
  return context;
}
