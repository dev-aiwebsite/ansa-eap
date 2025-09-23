import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";


const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "ELEVATE",
  description: "By ANSA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="Elevate" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <body
        className={`${montserrat.variable} ${montserrat.variable} antialiased`}
      >
        <TooltipProvider>
          <Toaster position="top-right" />
        {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
