"use client"
import { IconAiChat, IconCalendar, IconContents, IconEmergency, IconLogo, IconPractitioner, IconPublicSession, IconServices } from "@/icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";



const items = [
  { icon: IconServices, label: "Services", link: "/health-services" },
  { icon: IconPractitioner, label: "Practitioners", link: "/practioners" },
  { icon: IconCalendar, label: "Appointments", link:"/critical-response" },
  { icon: IconEmergency, label: "Emergency", className: 'bg-red-500', textClassName: "text-white", link: "" },
  { icon: IconPublicSession, label: "Public Session", link: "" },
  { icon: IconContents, label: "Contents", link: "/learning-development" },
  { icon: IconAiChat, label: "AI Chat", link: "/chat" },
  { icon: UserCog, label: "Account", link: "/settings/account" },
];
const SidebarMobile = () => {
  return (
    
      <Popover>
        <PopoverTrigger className="z-[9999999999] overflow-hidden flex flex-col items-center p-5 rounded-full border-2 border-white shadow-lg bg-primary fixed bottom-2 right-2 min-w-[80px] w-[80px] h-[80px] max-h-[80px] p-3 bg-linear-330 from-60% to-100% from-primary to-white">
                <IconLogo fill="white" height={45} width={45}/>
                <p className="mt-[2px] text-[8px] font-medium text-white">Menu</p>
        </PopoverTrigger>
        <PopoverContent className="mx-[2vw] w-screen max-w-[96vw] rounded-xl">
            <div className="grid grid-cols-4 gap-3">
               {items.map(({ icon: Icon, label, className,textClassName, link }) => (
                <Button
                href={link}
                key={label}
                className={cn("text-zinc-400 rounded-xl p-2 text-base border-1 border-current/40 flex-col aspect-square h-auto", className)}
                variant="ghost"
                >
                <Icon className="!w-auto !h-auto block" />
                <span className={cn("text-[8px]",textClassName)}>{label}</span>
                </Button>
            ))}
            </div>
        </PopoverContent>
      </Popover>
    
  );
};

export default SidebarMobile;
