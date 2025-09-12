import Breadcrumb from "@/components/ui/breadcrumb";
import { ReactNode } from "react";

export type LayoutWithChildrenProps = {
    children: ReactNode;
}

const LayoutWithBreadcrumb = ({children}:LayoutWithChildrenProps) => {
    return (
      <>
        <Breadcrumb />
        {children}
      </>
    );
}

export default LayoutWithBreadcrumb;