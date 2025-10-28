import { auth } from "@/auth";
import AppHeader from "@/components/header/appHeader";
import AppNav from "@/components/ui/nav/AppNav";
import { AppServiceContextProvider } from "@/context/appServiceContext";
import { GalleryContextProvider } from "@/context/ImageGalleryContext";
import { PostServiceProvider } from "@/context/postServiceContext";
import { getDailyActivities } from "@/serverActions/crudDailyActivities";
import { getDailyCheckIns } from "@/serverActions/crudDailyCheckIns";
import { getUserById } from "@/serverActions/crudUsers";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const session = await auth();
  if(!session) return
  const userId = session.user.id;

  const [currentUser, dailyActivities, dailyCheckIns] = await Promise.all([
    (await getUserById(userId)).data,
    getDailyActivities(userId),
    getDailyCheckIns(userId),
  ]);

  if(!currentUser) return
  const data = {
    currentUser,
    dailyActivities,
    dailyCheckIns,
  };

  return (
    <AppServiceContextProvider data={data}>
      <GalleryContextProvider>
      <PostServiceProvider>
          <main className="flex flex-col md:flex-row flex-nowrap h-screen w-screen md:p-4 md:space-x-6">
            <div>
              <AppNav />
            </div>
            <div className="flex-1">
              <AppHeader />
              <div className="h-screen-header overflow-auto max-sm:p-4 max-sm:pt-0">{children}</div>
            </div>
          </main>
      </PostServiceProvider>
    </GalleryContextProvider>
    </AppServiceContextProvider>
  );
}
