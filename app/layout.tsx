import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Fira_Code, Fira_Mono } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Code({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: "400",
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "FinxAI",
  description: "Finance Freedom with Stocks & Crypto with AI, Explore Now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${firaSans.variable} ${firaMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
