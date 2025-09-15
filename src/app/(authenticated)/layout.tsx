import { auth } from "@/auth";
import Sidebar from "@/components/sidebar/sidebar";
import MainHeader from "@/components/ui/mainHeader";
import { AppServiceContextProvider } from "@/context/appServiceContext";
import { PostServiceProvider } from "@/context/postServiceContext";
import { ExtendedSession } from "@/next-auth";
import { getDailyActivities } from "@/serverActions/crudDailyActivities";
import { getDailyCheckIns } from "@/serverActions/crudDailyCheckIns";
import { getUserById } from "@/serverActions/crudUsers";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await auth()) as ExtendedSession;
  const userId = session.user_id;
  if (!userId) return;

  const [currentUser, dailyActivities, dailyCheckIns] = await Promise.all([
    (await getUserById(userId)).data,
    getDailyActivities(userId),
    getDailyCheckIns(userId),
  ]);

  const data = {
    currentUser,
    dailyActivities,
    dailyCheckIns,
  };

  return (
    <AppServiceContextProvider data={data}>
      <PostServiceProvider>
          <main className="flex flex-row flex-nowrap h-screen w-screen p-4 space-x-6">
            <div>
              <Sidebar />
            </div>
            <div className="flex-1">
              <MainHeader />
              <div className="h-screen-header overflow-auto">{children}</div>
            </div>
          </main>
      </PostServiceProvider>
    </AppServiceContextProvider>
  );
}
