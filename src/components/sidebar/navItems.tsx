"use client";

import {
  IconGrid,
  IconBookMark,
  IconCalendar,
  IconChatDots,
  IconDocument,
} from "@/icons";
import { NavItemsType } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
export const navItems: NavItemsType[] = [
  {
    title: "Dasboard",
    link: "/dashboard",
    icon: <IconGrid width="1.3rem" />,
  },
  {
    title: "Health Services",
    link: "/health-services",
    icon: <IconBookMark width="1.3rem" />,
  },
  {
    title: "Practioners",
    link: "/practioners",
    icon: <IconCalendar width="1.3rem" />,
  },
  {
    title: "Chat",
    link: "/chat",
    icon: <IconChatDots width="1.3rem" />,
  },
  {
    title: "Learning & Development",
    link: "/learning-development",
    icon: <IconDocument width="1.3rem" />,
    subitems: [
      {
        title: "Content Library",
        link: "/learning-development/content-library",
      },
      {
        title: "Webinar",
        link: "/learning-development/webinar",
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
            <li key={navitem.title}>
              <Link
                href={navitem.link}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                {navitem.icon && navitem.icon}
                <span>{navitem.title}</span>
              </Link>
            </li>
            {navitem.subitems && (
              <ul className="submenu" key={navitem.title + "subitem"}>
                {navitem.subitems.map((subitem) => {
                  const isActive = pathname === subitem.link;
                  return (
                      <li key={subitem.title}>
                        <Link
                          href={subitem.link}
                          className={`nav-item ${isActive ? "active" : ""}`}
                        >
                          {subitem.icon && subitem.icon}
                          <span>{subitem.title}</span>
                        </Link>
                      </li>
                  );
                })}
              </ul>
            )}
          </React.Fragment>
        );
      })}
    </ul>
  );
}
