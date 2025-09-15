"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const Breadcrumb = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean); // remove empty ""

  return (
    <nav className="sticky top-0 breadcrumb bg-body-blend flex items-center gap-2 text-sm text-muted-foreground">
      {/* Home always first */}
      <BreadCrumbItem
        key="home"
        label="Home"
        link="/"
        separator={
          paths.length > 0 && <ChevronRight className="w-4 h-4 mx-1" />
        }
        isLast={paths.length === 0}
      />

      {paths.map((segment, index) => {
        const href = "/" + paths.slice(0, index + 1).join("/");
        const isLast = index === paths.length - 1;
        const label = decodeURIComponent(segment.split("~")[0])
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <BreadCrumbItem
            key={href}
            label={label}
            link={href}
            separator={!isLast && <ChevronRight className="w-4 h-4 mx-1" />}
            isLast={isLast}
          />
        );
      })}
    </nav>
  );
};

export default Breadcrumb;

function BreadCrumbItem({
  label,
  link,
  separator,
  isLast,
}: {
  label: string;
  link: string;
  separator?: ReactNode;
  isLast?: boolean;
}) {
  return (
    <span className="flex items-center">
      {isLast ? (
        <span className="font-medium text-foreground">{label}</span>
      ) : (
        <Link href={link} className="hover:underline">
          {label}
        </Link>
      )}
      {separator}
    </span>
  );
}
