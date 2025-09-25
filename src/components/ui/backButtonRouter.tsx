"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";
import { usePathname } from "next/navigation";

export default function BackButtonRouter() {
    const path = usePathname();
    const paths = path.split("/").filter(Boolean);
    paths.pop();
    const prevPage = "/" + paths.join("/");
    const isDashboard = path === "/dashboard";
  return (
    <>
      {!isDashboard && (
        <Button
          href={prevPage || "/dashboard"}
          variant="ghost"
          className="
        absolute top-4 left-4
        border-px border border-current text-muted-foreground rounded-full !w-[30px] !h-[30px]"
        >
          <ArrowLeft />
        </Button>
      )}
    </>
  );
}
