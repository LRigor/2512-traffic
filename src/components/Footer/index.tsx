"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/utils/umami";

const Footer = () => {
  const pathname = usePathname();

  const hiddenRoutes = ["/terms", "/privacy", "/about", "/faq", "/help", "/contact"];
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  // 处理链接点击事件
  const handleLinkClick = (linkName: string, linkUrl: string) => {
    trackEvent("footer_link_click", {
      link_name: linkName,
      link_url: linkUrl,
    });
  };

  return (
    <footer className="bg-[#1a1625] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
              <Image
                src="/images/logo.svg"
                alt="OpenTools"
                width={150}
                height={40}
              />
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevate your game with AI tools that redefine possibility.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:underline"
                  onClick={() => handleLinkClick("About Us", "/about")}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:underline"
                  onClick={() => handleLinkClick("Privacy Policy", "/privacy")}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:underline"
                  onClick={() => handleLinkClick("Terms of Service", "/terms")}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-base font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-sm hover:underline"
                  onClick={() => handleLinkClick("Help Center", "/help")}
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:underline"
                  onClick={() => handleLinkClick("FAQs", "/faq")}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:underline"
                  onClick={() => handleLinkClick("Contact Us", "/contact")}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-gray-400 text-sm">
            © 2026 OpenTools - All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
