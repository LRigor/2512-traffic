"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import homeData from "@/data/home.json";

interface NavLink {
  name: string;
  href: string;
  highlight?: boolean;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { navLinks } = homeData;

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const hiddenRoutes = ["/terms", "/privacy"];
  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  // 判断当前路径是否匹配链接
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header 
        className={`h-18 px-6 fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#1a1625]/95 backdrop-blur-lg shadow-lg shadow-[#e94560]/10" 
            : "bg-[#1a1625]"
        }`}
      >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            {/* 发光效果 */}
            <div className="absolute inset-0 bg-[#e94560]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Image 
              src="/images/logo.svg" 
              alt="Logo" 
              width={180} 
              height={80} 
              className="relative z-10 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm font-medium transition-all duration-300 group ${
                isActiveLink(link.href)
                  ? "text-[#e94560]"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{
                animation: `fadeInDown 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* 文字 */}
              <span className="relative z-10">{link.name}</span>
              
              {/* 底部动画线条 */}
              <span 
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#e94560] to-[#ff6b81] transition-all duration-300 ${
                  isActiveLink(link.href)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
              
              {/* 悬停发光效果 */}
              <span className="absolute inset-0 bg-[#e94560]/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2 hover:bg-[#e94560]/20 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative">
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMenuOpen ? "rotate-90 scale-0" : "rotate-0 scale-100"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </button>
      </div>
    </header>

      {/* Mobile Menu Overlay - 移到 header 外部 */}
      {isMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[100] animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Menu Content */}
          <nav
            className="absolute top-0 right-0 h-full w-64 p-6 shadow-2xl animate-slideInRight"
            style={{ backgroundColor: '#1a1625' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo & Close Button */}
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="group">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={120}
                  height={50}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <button
                className="text-white p-2 hover:bg-[#e94560]/20 rounded-lg transition-all duration-300 hover:rotate-90 active:scale-90"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link, index) => {
                // 为每个链接定义图标
                let icon = null;
                switch(link.name) {
                  case 'News':
                    icon = (
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                        <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                      </svg>
                    );
                    break;
                  case 'Rankings':
                    icon = (
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    );
                    break;
                  case 'AI Assistant':
                    icon = (
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                      </svg>
                    );
                    break;
                  case 'Content Creation':
                    icon = (
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    );
                    break;
                  case 'Education':
                    icon = (
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                      </svg>
                    );
                    break;
                  case 'Image Generation':
                    icon = (
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    );
                    break;
                  case 'Conversational AI':
                    icon = (
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    );
                    break;
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 text-base font-medium transition-all duration-300 ${
                      isActiveLink(link.href)
                        ? "text-[#e94560] border-l-2 border-[#e94560] pl-2"
                        : "text-gray-300 hover:text-[#e94560]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      animation: `slideInRight 0.4s ease-out ${index * 0.1}s both`
                    }}
                  >
                    {icon}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
