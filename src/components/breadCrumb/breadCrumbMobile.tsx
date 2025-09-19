"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadcrumbMobile = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const isRoot = paths.length === 0;

  // Current label
  const currentLabel = isRoot
    ? "Home"
    : decodeURIComponent(paths[paths.length - 1].split("~")[0])
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

  // Back href (remove last segment)
  const backHref =
    "/" + paths.slice(0, Math.max(0, paths.length - 1)).join("/");

  return (
    <nav className="sticky top-0 z-10 flex items-center gap-2 bg-body-blend px-2 py-2 text-sm text-muted-foreground">
      {!isRoot && (
        <Link href={backHref} className="flex items-center gap-1">
          <ChevronLeft className="w-4 h-4" />
          <span className="sr-only">Back</span>
        </Link>
      )}
      <span className="font-medium text-foreground">{currentLabel}</span>
    </nav>
  );
};

export default BreadcrumbMobile;
