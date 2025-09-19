import { isMobileUA } from "@/lib/isMobileUa";
import Sidebar from "./sidebar";
import SidebarMobile from "./sidebarMobile";


export default async function AppSidebar() {
  const isMobile = await isMobileUA();
  return isMobile ?  <SidebarMobile /> : <Sidebar />;
}
