import NavItems from "@/components/sidebar/navItems";
import { Button } from "@/components/ui/button";
import {
  IconLogo,
} from "@/icons";
import Image from "next/image";


const Sidebar = () => {
  return (
    <nav className="main-sidebar flex flex-col bg-white rounded-3xl h-full w-sidebar">
      <div className="logo-container flex flex-col items-center w-full justify-center p-5">
        <IconLogo width={45} />
        <h1 className="font-medium text-lg">ELEVATE</h1>
        <span className="text-xs">By ANSA</span>
      </div>
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
          <span>Critical Response</span>
        </Button>
      </div>
    </nav>
  );
};


export default Sidebar;
