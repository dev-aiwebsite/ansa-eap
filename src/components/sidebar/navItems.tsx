"use client";

import {
  IconBookMark,
  IconCalendar,
  IconChatDots,
  IconDocument,
  IconGrid,
} from "@/icons";
import { NavItemsType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
export const navItems: NavItemsType[] = [
  {
    title: "Dasboard",
    link: "/dashboard",
    icon: <IconGrid width="1.1rem" />,
  },
  {
    title: "Health Services",
    link: "/health-services",
    icon: <IconBookMark width="1.1rem" />,
  },
  {
    title: "Practioners",
    link: "/practioners",
    icon: <IconCalendar width="1.1rem" />,
  },
  {
    title: "Chat",
    link: "/chat",
    icon: <IconChatDots width="1.1rem" />,
  },
  {
    title: "Learning & Development",
    link: "/learning-development",
    icon: <IconDocument width="1.1rem" />,
    subitems: [
      {
        title: "Allied Health News",
        link: "/learning-development/health-news",
      },
      {
        title: "Video",
        link: "/learning-development/webinars",
      },
      {
        title: "Audio",
        link: "#",
        // link: "/learning-development/audio",
      },
      {
        title: "Yoga",
        link: "/learning-development/yoga",
      },
      {
        title: "Quick Reads",
        link: "/learning-development/blogs",
      },
      {
        title: "Short Clips",
        link: "#",
        // link: "/learning-development/shorts",
      },
    ],
  },
];

export default function NavItems() {
  const pathname = usePathname();
  return (
    <ul className="space-y-1">
      {navItems.map((navitem) => {
        const isActive = pathname === navitem.link;

        return (
          <React.Fragment key={navitem.title}>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <li
                  key={navitem.title}
                  className={`nav-item flex items-center ${
                    isActive ? "active" : ""
                  }`}
                >
                  <Link href={navitem.link} className="group flex-1">
                    {navitem.icon && navitem.icon}
                    <span className="group-hover:underline decoration-[0.5px] underline-offset-[2px]">
                      {navitem.title}
                    </span>
                  </Link>

                  {navitem.subitems && (
                    <Button
                      size="icon"
                      variant="ghost"
                    >
                      <ChevronRight className="collapsible-arrow h-4 w-4" />
                    </Button>
                  )}
                </li>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {navitem.subitems && (
                  <ul className="submenu" key={navitem.title + "subitem"}>
                    {navitem.subitems.map((subitem) => {
                      const isActive = pathname === subitem.link;
                      return (
                        <li
                          key={subitem.title}
                          className={`nav-item ${isActive ? "active" : ""}`}
                        >
                          <Link href={subitem.link}>
                            {subitem.icon && subitem.icon}
                            <span>{subitem.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </CollapsibleContent>
            </Collapsible>
          </React.Fragment>
        );
      })}
    </ul>
  );
}
