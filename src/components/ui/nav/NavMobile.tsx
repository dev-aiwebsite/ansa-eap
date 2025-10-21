"use client";
import {
  IconContents,
  IconEmergency,
  IconGrid,
  IconServices,
} from "@/icons";
import { UserCog } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../button";
import { cn } from "@/lib/utils";
import { UserMenu } from "../userMenu";

const items = [
  { icon: IconGrid, label: "Dashboard", link: "/dashboard" },
  { icon: IconServices, label: "Services", link: "/health-services" },
  {
    icon: IconEmergency,
    label: "Emergency",
    iconClassName: 'fill-red-500',
    className: "",
    textClassName: "",
    link: "/critical-response",
  },
  { icon: IconContents, label: "Resources", link: "/resources" },
  { icon: UserCog, label: "Account", link: "/settings/account" },
];
const NavMobile = () => {
  const path = usePathname();
  
  return (
    <div className="mobile-nav">
      <div className="grid grid-cols-5 gap-2">
        {items.map(({ icon: Icon, label, className, textClassName, link, iconClassName }) => {
          const activeClass = path == link &&  "text-primary [&_>_svg]:stroke-primary";
          if (label == "Account") {
            return (
              <UserMenu
                textClassName="text-[8px]"
                imageClassName="!w-[28px] !h-[28px] block"
                hideIcon
                key={label}
                triggerClassName={`${className} ${activeClass} !p-2 text-zinc-400 rounded-xl text-base flex-col h-auto`}
              />
            );
          }
          return (
            <Button
              href={link}
              key={label}
              className={cn(
                "!p-2 text-zinc-400 rounded-xl text-base flex-col h-auto",
                className,
                activeClass
              )}
              variant="ghost"
            >
              
              <Icon strokeWidth={1.2} className={cn("!w-[28px] !h-[28px] block", iconClassName)} />
              <span className={cn("text-[8px]", textClassName)}>{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default NavMobile;
