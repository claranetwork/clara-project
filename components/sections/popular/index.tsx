"use client"

import * as React from "react"
import { H2, H3 } from "@/components/typo"
import { Flex } from "@/components/elements"

import nftData from "@/configs/nfts.json"
import PopularCarousel from "./popular-carousel"
import { FadeIn } from "@/components/animated/fade-in"

const PopularSection = () => {
  const popularNfts = nftData.filter((nft) => nft.priority < 3).sort((a, b) => a.priority - b.priority).slice(0, 4)

  return (
    <section id="popular" className="relative w-full min-h-[800px]">
      <Flex className="relative section-padding flex-col justify-center items-center gap-14 mt-14 md:mt-8 lg:mt-4">
        <div className="space-y-4 text-center">
          <FadeIn direction="up" delay={0.2}>
            <H2 className="text-[32px] sm:text-[36] md:text-[44px] lg:text-[48px]">Popular this week</H2>
          </FadeIn>
          <H3>The nfts that crafted smoothly all around this week</H3>
        </div>
        <PopularCarousel nfts={popularNfts} />
      </Flex>
    </section>
  )
}

export default PopularSection
