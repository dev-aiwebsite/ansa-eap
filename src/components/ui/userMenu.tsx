"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ImageWithFallback from "@/components/ui/imageWithFallback";
import { useAppServiceContext } from "@/context/appServiceContext";
import { cn } from "@/lib/utils";
import { LogoutUser } from "@/serverActions/login_logout";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

type UserMenuProps = {
  triggerClassName?: string;
  hideIcon?: boolean
  imageClassName?:string;
  textClassName?:string;
};

export function UserMenu({textClassName, imageClassName, triggerClassName, hideIcon = false }: UserMenuProps) {
  const { currentUser } = useAppServiceContext();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("flex flex-row gap-2", triggerClassName)}
        >
          <ImageWithFallback
            className={cn("rounded-full object-fit", imageClassName)}
            width={30}
            height={30}
            src={
              currentUser?.profile_img ?? "/assets/images/default-avatar.png"
            }
            alt=""
          />
          <div className={textClassName}>
            <span>{currentUser?.first_name}</span>
            <span>{currentUser?.last_name}</span>
          </div>
          <span className="sr-only">Toggle user menu</span>
          {!hideIcon && <ChevronDown className="h-3 w-3" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[9999999]">
        <DropdownMenuItem asChild>
          <Link href="/settings/account">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => LogoutUser()}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
