"use client"

import { usePathname } from "next/navigation";
import { navItems } from "../sidebar/navItems";

const PageTitle = () => {
    const pathname = usePathname()
    const activePage = navItems.filter(i => i.link == pathname)
    const pageName = activePage.length ? activePage[0].title : pathname.split('/').at(-1)
    return (
        <span className="capitalize">
            {pageName}
        </span>
    );
}

export default PageTitle;