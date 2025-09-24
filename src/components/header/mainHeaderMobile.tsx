"use client";
import { IconLogo2 } from "@/icons";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

const MainHeaderMobile = () => {
  const path = usePathname();
  const paths = path.split("/");
  const prevPage = paths.at(-2);
  const isDashboard = path === "/dashboard";

  console.log(path);
  return (
    <div className="relative flex flex-row items-center gap-4 pt-0 h-header">
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

      <div className="logo-container flex flex-col items-center w-full justify-center p-3">
        <IconLogo2 height={20} />
        <p className="muted-text">By ANSA</p>
      </div>
    </div>
  );
};

export default MainHeaderMobile;
