"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const hiddenRoutes = ["/terms", "/privacy", "/about", "/faq", "/help", "/contact"];
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <footer className="bg-[#1a1625] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.svg"
                alt="OpenTools"
                width={150}
                height={40}
              />
            </Link>
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
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm hover:underline"
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
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:underline"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm hover:underline"
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
            © 2026 OpenTools - 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
