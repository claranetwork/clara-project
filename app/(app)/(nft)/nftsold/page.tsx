"use client"

import Image from "next/image"
import { Suspense } from "react"
import { SlidersHorizontal } from "lucide-react"

import { Flex } from "@/components/elements"
import NFTList from "@/components/sections/nfts/list"
import { NFTSort } from "@/components/sections/nfts/sort"
import { NFTFilters } from "@/components/sections/nfts/filter"
import { SearchBar } from "@/components/sections/nfts/search"
import { NFTCardSkeleton } from "@/components/sections/nfts/skeleton"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const LoadingFallback = () => (
  <div className="w-full space-y-8">
    <Flex className="flex-col sm:flex-row justify-between items-center gap-6">
      <div className="h-10 w-full sm:w-[300px] bg-foreground/10 rounded-lg animate-pulse" />
      <div className="h-10 w-[240px] bg-foreground/10 rounded-lg animate-pulse" />
    </Flex>
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <NFTCardSkeleton key={i} />
      ))}
    </div>
  </div>
)

const NFTContent = () => (
  <Flex className="flex-col md:flex-row gap-10 relative">
    <div className="w-full lg:w-3/4 space-y-6">
      <Suspense fallback={<LoadingFallback />}>
        <Flex className="flex-row justify-between items-center gap-3 md:gap-5">
          <SearchBar />
          <NFTSort />
          <Popover>
            <PopoverTrigger className="bg-foreground/10 p-2 px-3 rounded-lg h-10 block lg:hidden">
              <SlidersHorizontal size={20} />
            </PopoverTrigger>
            <PopoverContent className="bg-foreground/95" align="end">
              <NFTFilters />
            </PopoverContent>
          </Popover>
        </Flex>
        <NFTList />
      </Suspense>
    </div>
    <div className="w-full hidden lg:block lg:w-1/4 lg:sticky lg:top-20 self-start ">
      <Suspense fallback={<div className="h-[400px] bg-foreground/10 rounded-lg animate-pulse" />}>
        <NFTFilters />
      </Suspense>
    </div>
  </Flex>
)

const Page = () => {
  return (
    <section id="nfts" className="w-full relative md:-mt-16 py-16">
      <div className="overflow-hidden w-full h-full absolute inset-0">
        <Image
          src="/images/Ellipse6.svg"
          alt="Hero Background"
          width={915}
          height={915}
          quality={100}
          className="absolute top-[5%] -translate-y-1/2 object-contain opacity-80 right-[5%] translate-x-1/2 -z-10"
        />
        <Image
          src="/images/Ellipse7.svg"
          alt="Hero Background 2"
          width={915}
          height={915}
          quality={100}
          className="absolute top-[40%] md:top-[15%] object-contain opacity-80 left-0 -translate-x-1/2 -z-10"
        />
      </div>
      <Flex className="section-padding flex-col lg:min-h-[800px] gap-8 py-12 md:gap-12">
        <h1 className="font-audio-wide text-center text-[28px] md:text-[36px] xl:text-[42px] uppercase">NFT Collection</h1>
        <NFTContent />
      </Flex>
    </section>
  )
}

export default Page
