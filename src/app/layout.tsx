import { unstable_ViewTransition as ViewTransition } from 'react'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import PageTransition from "@/components/ui/pageTransition";
import { isMobileUA } from "@/lib/isMobileUa";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-sans",
// });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ELEVATE",
  description: "By ANSA",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = await isMobileUA();

  return (
    <html lang="en">
      <head>
        {/* Favicons */}
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />


        {/* Theme & iOS settings */}
        <meta name="apple-mobile-web-app-title" content="Elevate" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ViewTransition>
        <TooltipProvider>
          <Toaster position="top-center" />
          {isMobile ? (
            <PageTransition>{children}</PageTransition>
          ) : (
            <>{children}</>
          )}
        </TooltipProvider>
        </ViewTransition>
      </body>
    </html>
  );
}
