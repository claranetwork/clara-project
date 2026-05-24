"use client"

import Link from "next/link";
import { Flex } from "@/components/elements";
import countData from "@/configs/counts.json";
import HeroCard, { SecondaryCard } from "./hero-card";
import { FadeIn } from "@/components/animated/fade-in";
import CountComponent from "@/components/animated/count-up";

const HeroSection = () => {
  const counts: CountData[] = countData;

  return (
    <>
      <section
        id="hero"
        className="w-full min-h-screen bg-gradient-to-br from-black via-purple-950/30 to-black pt-24 pb-20 px-4"
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-full h-auto items-center justify-center">
            {/* Left content */}
            <div className="flex flex-col gap-6 lg:gap-10 items-center lg:items-start w-full lg:w-1/2 lg:pr-10">
              <div className="space-y-3 text-center lg:text-left">
                <FadeIn direction="up" delay={0.1}>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                     <br className="hidden sm:block" />
                     <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Open, Decentralized,
                    </span>
                  </h1>
                </FadeIn>
                
                <FadeIn direction="up" delay={0.2}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                    Connected NFT Economy                 
                  </h2>
                </FadeIn>
              </div>
              
              <FadeIn direction="up" delay={0.3}>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl text-center lg:text-left leading-relaxed">
                  One multichain platform & endless possibilities.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.4}>
                <Flex className="mt-6 gap-5 sm:gap-6 md:gap-8 flex-col sm:flex-row items-center">
                  <Link
                    href="https://clara-2.gitbook.io/clara-docs/"
                    target="_blank"
                    className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-white text-base hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <span className="relative z-10">Explore Docs</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </Link>
                  
                  <Link
                    href="/access"
                    className="px-8 py-4 bg-transparent border-2 border-purple-500 rounded-2xl font-semibold text-purple-300 hover:bg-purple-900/30 hover:text-white hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-1 text-base"
                  >
                    Access Pass
                  </Link>
                </Flex>
              </FadeIn>
            </div>

            {/* Right side - Card */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <FadeIn direction="left" delay={0.5}>
                <div className="relative max-w-2xl mx-auto">
                  <div className="absolute -top-8 -left-8 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
                  <SecondaryCard className="w-full max-w-md lg:max-w-lg mx-auto" />
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Count Section */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-950/20">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                {counts.map((item, index) => (
                  <div 
                    key={index} 
                    className="text-center space-y-3"
                  >
                    {/* Number */}
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                      <CountComponent number={item.count} />
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {item.suffix}
                      </span>
                    </div>
                    
                    {/* Label */}
                    <div>
                      <p className="text-base md:text-lg text-gray-300 uppercase tracking-wider font-medium">
                        {item.label}
                      </p>
                      <div className="mt-2 w-10 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default HeroSection;