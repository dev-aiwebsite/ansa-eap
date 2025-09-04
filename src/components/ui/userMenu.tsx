"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import ImageWithFallback from "@/components/ui/imageWithFallback";
import { useAppServiceContext } from "@/context/appServiceContext";
import { LogoutUser } from "@/serverActions/login_logout";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
export function UserMenu(){
    const {currentUser} = useAppServiceContext()
   return    <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex flex-row gap-2">
                <ImageWithFallback className="rounded-full object-fit" width={30} height={30} src={currentUser?.profile_img ?? "/assets/images/default-avatar.png"} alt=""/>
                <span>{currentUser?.first_name}</span>
                <span>{currentUser?.last_name}</span>
                <span className="sr-only">Toggle user menu</span>
                <ChevronDown className="h-3 w-3"  />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                href="/settings/account">
                Profile
                </Link>
            </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async() => LogoutUser()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
}