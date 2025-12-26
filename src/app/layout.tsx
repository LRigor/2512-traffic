import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import BannerWrapper from "@/components/BannerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "opentools",
  description: "opentools is a directory of open-source tools for developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <BannerWrapper />
        <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
          <main className="container mx-auto px-4 py-24 max-w-6xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
