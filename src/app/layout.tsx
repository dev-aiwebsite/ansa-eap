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
