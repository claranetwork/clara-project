"use client";

import React from "react";
import { Flex, Grid } from "@/components/elements";
import { H4, P } from "@/components/typo";
import Link from "next/link";
import Logo from "@/components/elements/logo";
import { footerLinks } from "./footer-links";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden mt-16 bg-gradient-to-b from-black via-purple-950/30 to-black border-t border-purple-500/20">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 py-12 lg:py-16">
        <Grid className="lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo and description */}
          <div className="lg:col-span-4">
            <Flex className="flex-col gap-4">
              <Logo className="h-[50px] w-auto" />
              <P className="text-gray-400 leading-relaxed text-lg max-w-md">
                Your NFTs. Your showcase. Your earnings. Clara brings digital 
                collectibles to life across the multichain world.
              </P>

              {/* Social icons */}
              <div className="flex gap-3 mt-4">
                <Link
                  href="https://x.com/clarachainxyz"
                  target="_blank"
                  className="p-2.5 bg-purple-900/30 border border-purple-500/20 rounded-xl text-purple-300 hover:bg-purple-800/40 hover:text-white hover:border-purple-400/40 transition-all duration-300 text-sm font-medium"
                >
                  Twitter
                </Link>
                <Link
                  href="https://discord.gg/fsP6VrnD"
                  target="_blank"
                  className="p-2.5 bg-purple-900/30 border border-purple-500/20 rounded-xl text-purple-300 hover:bg-purple-800/40 hover:text-white hover:border-purple-400/40 transition-all duration-300 text-sm font-medium"
                >
                  Discord
                </Link>
                <Link
                  href="#"
                  className="p-2.5 bg-purple-900/30 border border-purple-500/20 rounded-xl text-purple-300 hover:bg-purple-800/40 hover:text-white hover:border-purple-400/40 transition-all duration-300 text-sm font-medium"
                >
                  Telegram
                </Link>
                <Link
                  href="#"
                  className="p-2.5 bg-purple-900/30 border border-purple-500/20 rounded-xl text-purple-300 hover:bg-purple-800/40 hover:text-white hover:border-purple-400/40 transition-all duration-300 text-sm font-medium"
                >
                  GitHub
                </Link>
              </div>
            </Flex>
          </div>

          {/* Footer links */}
          <div className="lg:col-span-8">
            <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {footerLinks.map(({ title, links }) => (
                <div key={title} className="space-y-4">
                  <H4 className="text-xl font-bold text-white">
                    {title}
                  </H4>
                  <div className="space-y-3">
                    {links?.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : '_self'}
                        className="block text-gray-400 hover:text-purple-300 transition-colors duration-200 group text-lg"
                      >
                        <span className="flex items-center gap-2">
                          {link.name}
                          {link.href.startsWith('http') && (
                            <span className="text-xs text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                          )}
                        </span>
                        <div className="h-px w-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300 mt-1"></div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </Grid>
          </div>
        </Grid>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-purple-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <P className="text-gray-500 text-center md:text-left">
              © Copyright {new Date().getFullYear()}, All Rights Reserved by Clara.
            </P>

            <div className="flex items-center gap-6">
              <Link href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
                Terms of Service
              </Link>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-gray-500 hover:text-purple-300 transition-colors group"
              >
                <span className="text-sm">Back to top</span>
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
