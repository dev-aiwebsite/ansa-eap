import { auth } from "@/auth";
import AppHeader from "@/components/header/appHeader";
import AppNav from "@/components/ui/nav/AppNav";
import { AppServiceContextProvider } from "@/context/appServiceContext";
import { ConfirmProvider } from "@/context/ConfirmContext";
import { HalaxyServiceContextProvider } from "@/context/HalaxyServiceContext";
import { GalleryContextProvider } from "@/context/ImageGalleryContext";
import { PostServiceProvider } from "@/context/postServiceContext";
import { getCompanyByCode } from "@/serverActions/crudCompanies";
import { getDailyActivities } from "@/serverActions/crudDailyActivities";
import { getDailyCheckIns } from "@/serverActions/crudDailyCheckIns";
import { getUserById } from "@/serverActions/crudUsers";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
const session = await auth();
if (!session) return;

const userId = session.user.id;

// Get user first since you need its company
const userResult = await getUserById(userId);
const currentUser = userResult?.data;
if (!currentUser) return;

// Now you can run the rest in parallel
const [dailyActivities, dailyCheckIns, company] = await Promise.all([
  getDailyActivities(userId),
  getDailyCheckIns(userId),
  getCompanyByCode(currentUser.company),
]);

const data = {
  currentUser,
  dailyActivities,
  dailyCheckIns,
  company: company.data,
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
