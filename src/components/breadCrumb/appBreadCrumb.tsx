import { isMobileUA } from "@/lib/isMobileUa";
import Breadcrumb from "../ui/breadcrumb";
import BreadCrumbMobile from "./breadCrumbMobile";

const AppBreadCrumb = async () => {
const isMobile = await isMobileUA();
  return isMobile ?  <BreadCrumbMobile /> : <Breadcrumb />;
}

export default AppBreadCrumb;