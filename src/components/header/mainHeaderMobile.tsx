import { IconLogo2 } from "@/icons";
import BackButtonRouter from "../ui/backButtonRouter";

const MainHeaderMobile = () => {
  return (
    <div className="relative flex flex-row items-center gap-4 pt-0 h-header">
      <BackButtonRouter />
      <div className="logo-container flex flex-col items-center w-full justify-center p-3">
        <IconLogo2 height={20} />
        <p className="muted-text">By ANSA</p>
      </div>
    </div>
  );
};

export default MainHeaderMobile;
