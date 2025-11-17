import { IconLogo2 } from "@/icons";
import BackButtonRouter from "../ui/backButtonRouter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { PushNotificationToggle } from "../webpush/PushNotificationToggle";

const MainHeaderMobile = () => {
  return (
    <div className="relative flex flex-row items-center gap-4 pt-0 h-header">
      <BackButtonRouter />
      <div className="logo-container flex flex-col items-center w-full justify-center p-3">
        <IconLogo2 height={20} />
        <p className="muted-text">By ANSA</p>
      </div>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notification</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <PushNotificationToggle />
            <DropdownMenuSeparator/>
              <DropdownMenuItem>Notification</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
    </div>
  );
};

export default MainHeaderMobile;
