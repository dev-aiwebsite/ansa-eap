"use client"
import { GlobalSearch } from "@/components/ui/globalSearch";
import { Bell } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { UserMenu } from "./userMenu";

const MainHeader = () => {
  return (
    <div className="flex flex-row items-center gap-4 pb-6 pt-0 h-header">
      <div>
        <GlobalSearch />
      </div>
      <div className="ml-auto w-fit flex flex-row gap-2">
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notification</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">


              <DropdownMenuItem>Notification</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

          <UserMenu />
      </div>
    </div>
  );
};

export default MainHeader;
