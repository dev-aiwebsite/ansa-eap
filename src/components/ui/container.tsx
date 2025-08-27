import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Container = {
    children: ReactNode;
    className?: string;
}

const Container = ({children, className}:Container) => {
  return (
    <div className={cn("h-full min-w-2/5 flex-1 overflow-hidden", className)}>
      <div className="max-h-webkit-fill h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Container;
