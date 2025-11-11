import { auth } from "@/auth";
import AppHeader from "@/components/header/appHeader";
import AppNav from "@/components/ui/nav/AppNav";
import { AppServiceContextProvider } from "@/context/appServiceContext";
import { ConfirmProvider } from "@/context/ConfirmContext";
import { HalaxyServiceContextProvider } from "@/context/HalaxyServiceContext";
import { GalleryContextProvider } from "@/context/ImageGalleryContext";
import { PostServiceProvider } from "@/context/postServiceContext";
import { getUserDashboardData } from "@/serverActions/crudUsers";

const isTestMode = process.env.TEST_MODE === "true";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
const session = await auth();
const userId = session?.user.id || "7lCw6u7zmY";

if (!isTestMode && !session) return;

const dashboardResult = await getUserDashboardData(userId);

if (!dashboardResult.success || !dashboardResult.data) return;

const data = {
  currentUser: dashboardResult.data.user,
  dailyActivities: dashboardResult.data.daily_activities,
  dailyCheckIns: dashboardResult.data.daily_check_ins,
  company: dashboardResult.data.company_data,
};


  return (
    <AppServiceContextProvider data={data}>
      <ConfirmProvider>
      <HalaxyServiceContextProvider>
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
    </HalaxyServiceContextProvider>
    </ConfirmProvider>
    </AppServiceContextProvider>
  );
}
