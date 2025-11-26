import NavItems from "@/components/sidebar/navItems";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AppLogo from "../AppLogo";


const Sidebar = () => {
  return (
    <nav className="main-sidebar flex flex-col bg-white rounded-3xl h-full w-sidebar">
      <AppLogo />
      <NavItems />
      <div className="mt-auto p-6">
        <div className="mb-4">
          <Image
          className="w-[150px] mx-auto"
          width={200}
          height={300}
          alt="available on mobile"
          src="/assets/images/mobileavailable.png" />
          <span className="text-xs text-muted-foreground">
            Elevate is available on <span className="text-app-purple-300">Mobile</span>
          </span>
        </div>
        <Button href="/critical-response" variant="default" className="w-full shadow-btn">
          <span>Phone Support</span>
        </Button>
      </div>
    </nav>
  );
};


export default Sidebar;
