"use client"
import { GlobalSearch } from "@/components/ui/globalSearch";
import { useAppServiceContext } from "@/context/appServiceContext";
import { Bell, ChevronDown } from "lucide-react";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import ImageWithFallback from "./imageWithFallback";
import PageTitle from "./pageTitle";

const MainHeader = () => {
  const {currentUser} = useAppServiceContext()
  return (
    <div className="flex flex-row items-center gap-4 pb-6 pt-0 h-header">
      <h1 className="text-lg font-bold">
        <PageTitle />
      </h1>
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
        

       <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-row gap-2">
                <ImageWithFallback className="rounded-full" width={30} height={30} src={""} alt=""/>
                <span>{currentUser?.first_name}</span>
                <span>{currentUser?.last_name}</span>
                <span className="sr-only">Toggle user menu</span>
                <ChevronDown className="h-3 w-3"  />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </div>
  );
};

export default MainHeader;
