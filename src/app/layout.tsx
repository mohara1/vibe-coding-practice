import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavTabs from "@/components/NavTabs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "잇다",
  description: "진주 청년을 위한 정책·커뮤니티 공간 연결 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16">
        {children}
        <NavTabs />
      </body>
    </html>
  );
}
