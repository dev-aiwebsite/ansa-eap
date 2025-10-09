"use client";
import {
  IconBookMark,
  IconDocument,
  IconGrid
} from "@/icons";
import { slugifyName } from "@/lib/helper";
import { NavItemsType } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { usePostServiceContext } from "@/context/postServiceContext";


export function useNavItems(): NavItemsType[] {
  const { categories } = usePostServiceContext();

  const navItems: NavItemsType[] = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: <IconGrid style={{ width: "1.1rem", height: "1.1rem" }} />,
    },
    {
      title: "Health Services",
      link: "/health-services",
      icon: <IconBookMark style={{ width: "1.1rem", height: "1.1rem" }} />,
    },
    {
      title: "Learning & Development",
      link: "/learning-development",
      icon: <IconDocument style={{ width: "1.1rem", height: "1.1rem" }} />,
      subitems: categories.map((i) => ({
        title: i.label,
        link: `/learning-development/${i.id}~${slugifyName(i.label)}`,
      })),
    },
  ];

  return navItems;
}


export default function NavItems() {
  const pathname = usePathname();
  const navItems = useNavItems()
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
                    <span className="capitalize group-hover:underline decoration-[0.5px] underline-offset-[2px]">
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
                            <span className="capitalize">{subitem.title}</span>
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
