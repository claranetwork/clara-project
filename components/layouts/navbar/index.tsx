"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navbarListData } from "./data";
import ConnectButton from "./connect-button";
import Logo from "@/components/elements/logo";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on mount (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Don't render on server during hydration
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Logo />
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-8 w-24 bg-gray-800 rounded-lg animate-pulse"></div>
              <div className="lg:hidden p-2 rounded-lg bg-white/5">
                <div className="w-4 h-4"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass-nav py-3 border-b border-white/5" : "py-4"
    )}>
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Logo - make it smaller on mobile */}
          <Link href="/" className="flex items-center">
            <Logo className="h-8 w-8 sm:h-10 sm:w-10" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navbarListData.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "nav-link text-[17px] font-medium text-gray-300 hover:text-white px-1 transition-all duration-200",
                  pathname === item.href && "text-white font-semibold"
                )}
                target={item.type === 'external' ? '_blank' : '_self'}
              >
                <span className="relative py-2">
                  {item.name}
                  {pathname === item.href && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-600 to-pink-600"></span>
                  )}
                  {item.type === 'external' && (
                    <span className="absolute -top-1 -right-4 text-xs text-purple-400">↗</span>
                  )}
                </span>
              </Link>
            ))}
          </nav>

          {/* Right side - Adjusted spacing for mobile */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Connect Button - Visible on all screens */}
            <div className="flex items-center">
              <ConnectButton />
            </div>

            {/* Mobile Menu Button - Smaller on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg sm:rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 mobile-menu-container"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 animate-in slide-in-from-top-5 duration-300 mobile-menu-container">
          <div className="gradient-border rounded-2xl p-1">
            <div className="bg-[#0a0a0a] rounded-xl p-4">
              <div className="space-y-2">
                {navbarListData.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 text-base",
                      pathname === item.href
                        ? "bg-gradient-primary text-white shadow-lg"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    target={item.type === 'external' ? '_blank' : '_self'}
                  >
                    <span className="font-medium text-lg">{item.name}</span>
                    {item.type === 'external' && (
                      <span className="text-sm text-purple-400">↗</span>
                    )}
                  </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;