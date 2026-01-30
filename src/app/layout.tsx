import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerWrapper from "@/components/BannerWrapper";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/ui/Toast";
import UmamiAnalytics from "@/components/UmamiAnalytics";

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
        <ToastProvider>
          <UmamiAnalytics />
          <Header />
          <BannerWrapper />
          <div className="min-h-screen bg-white font-sans dark:bg-black">
            <main className="container mx-auto px-4 pt-24 max-w-6xl">
              {children}
            </main>
          </div>
          <Footer />
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
