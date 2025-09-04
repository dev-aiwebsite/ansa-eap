import NavItems from "@/components/sidebar/navItems";
import { Button } from "@/components/ui/button";
import {
  IconLogo,
} from "@/icons";


const Sidebar = () => {
  return (
    <nav className="flex flex-col bg-white rounded-3xl h-full w-sidebar">
      <div className="flex flex-col items-center w-full justify-center p-5">
        <IconLogo width={45} />
        <h1 className="font-medium text-lg">ELEVATE</h1>
        <span className="text-xs">By ANSA</span>
      </div>
      <NavItems />
      <div className="mt-auto p-6">
        <Button href="/critical-response" variant="default" className="w-full shadow-btn">
          <span>Critical Response</span>
        </Button>
      </div>
    </nav>
  );
};


export default Sidebar;
