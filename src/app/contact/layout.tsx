import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | aifinds - Get in Touch",
  description:
    "Have questions or feedback? Contact the aifinds team. We're here to help you find the best AI tools for your needs.",
  keywords: [
    "contact aifinds",
    "support",
    "help",
    "feedback",
    "AI tools support",
    "get in touch",
  ],
  openGraph: {
    title: "Contact Us | aifinds",
    description:
      "Have questions or feedback? Contact the aifinds team and we'll get back to you soon.",
    type: "website",
    url: "https://aifinds.ai/contact",
  },
  twitter: {
    card: "summary",
    title: "Contact Us | aifinds",
    description:
      "Have questions or feedback? Contact the aifinds team and we'll get back to you soon.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
