import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import BannerWrapper from "@/components/BannerWrapper";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastContainer from "@/components/ui/Toast";
import UmamiAnalytics from "@/components/UmamiAnalytics";
import LazyFooter from "@/components/Footer/LazyFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aifinds",
  description: "aifinds is a directory of open-source tools for developers.",
  icons: {
    icon: "/images/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = "https://aifinds.ai";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "aifinds",
      url: siteUrl,
      logo: `${siteUrl}/images/logo.webp`,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "aifinds",
      url: siteUrl,
    },
  ] as const;

  return (
    <html lang="en">
      <head>
        {structuredData.map((jsonLd, idx) => (
          <script
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            key={idx}
            type="application/ld+json"
          />
        ))}
      </head>
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
          <LazyFooter />
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}
