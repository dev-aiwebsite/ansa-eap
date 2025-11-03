import { ElevateAdminContextProvider } from "@/context/ElevateAdminContext";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return <>
        <ElevateAdminContextProvider>
            {children}
        </ElevateAdminContextProvider>
    </>
}