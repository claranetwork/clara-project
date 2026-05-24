"use client";

import Link from "next/link";
import FadeInImage from "@/components/elements/fade-in-image";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export const SecondaryCard = ({ className }: { className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            y: 50,
            rotate: -5,
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1,
            ease: "power4.out",
          }
        );

        // Float animation
        gsap.to(cardRef.current, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Glow animation
        gsap.to(cardRef.current, {
          boxShadow: "0 0 40px rgba(147, 51, 234, 0.4)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });
    
    return () => ctx.revert();
  }, [cardRef]);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative bg-gradient-to-br from-purple-900/40 via-purple-800/20 to-pink-900/30 backdrop-blur-xl rounded-3xl border-2 border-purple-500/30 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-500",
        "hover:border-purple-400/50 hover:scale-[1.02]",
        className
      )}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 -z-10"></div>
      
      <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
        <FadeInImage
          src="/images/nfts/access.png"
          alt="Hero NFT"
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
          priority
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* View Details button - Links to genesis page */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex justify-center">
            <Link
              href="/access"
              className="w-full max-w-xs py-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-lg border border-purple-300/30 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-pink-500 hover:border-purple-300/50 transition-all duration-300 transform hover:-translate-y-0.5 text-base shadow-lg flex items-center justify-center"
            >
              View Details
            </Link>
          </div>
        </div>
        
        {/* Trending badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-semibold text-white shadow-lg">
          Trending
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-300"></div>
    </div>
  );
};

// Main hero card
const HeroCard = ({ className }: { className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            opacity: 0,
            rotate: 10,
            scale: 0.9,
          },
          {
            opacity: 1,
            rotate: 0,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
            delay: 0.3,
          }
        );

        gsap.to(cardRef.current, {
          rotate: 3,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(cardRef.current, {
          y: -15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5,
        });
      }
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative aspect-[9/12] bg-gradient-to-br from-purple-900/30 via-purple-800/15 to-pink-900/25 backdrop-blur-xl rounded-3xl border-2 border-purple-500/25 shadow-2xl shadow-purple-500/15 hover:shadow-purple-500/30",
        "transition-all duration-500 hover:border-purple-400/40 hover:scale-[1.02]",
        className
      )}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-15 -z-10"></div>
      
      <div className="relative w-full h-full rounded-2xl overflow-hidden p-2">
        <FadeInImage
          src="/images/nfts/signature2.gif"
          alt="Featured NFT"
          fill
          className="object-cover object-center rounded-xl transition-transform duration-700 hover:scale-105"
          unoptimized={true}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl"></div>
        
        {/* View Details button - Links to genesis page */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <Link
            href="/access"
            className="w-full max-w-xs py-2.5 bg-gradient-to-r from-purple-500/80 to-pink-500/80 backdrop-blur-lg border border-purple-300/30 rounded-xl font-semibold text-white hover:from-purple-500 hover:to-pink-500 hover:border-purple-300/50 transition-all duration-300 shadow-lg flex items-center justify-center text-sm"
          >
            View Details
          </Link>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
        <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default HeroCard;