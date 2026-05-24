"use client"

import { Combine, Package } from "lucide-react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { NFTCard } from "./card"
import nftData from "@/configs/nfts.json"
import { NFTCardSkeleton } from "./skeleton"
import { P } from "@/components/typo"

export default function NFTList() {
  const [nfts, setNfts] = useState(nftData)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    setLoading(true)
    const filterAndSortNFTs = () => {
      const chain = searchParams.get("chain")
      const tag = searchParams.get("tag")
      const sort = searchParams.get("sort")
      const search = searchParams.get("search")

      let filteredNFTs = [...nftData]

      if (chain) {
        filteredNFTs = filteredNFTs.filter((nft) => nft.chain === chain)
      }
      if (tag) {
        if (tag === "free") {
          filteredNFTs = filteredNFTs.filter((nft) => nft.price === 0)
        } else {
          filteredNFTs = filteredNFTs.filter((nft) => nft.tags === tag)
        }
      }
      if (search) {
        filteredNFTs = filteredNFTs.filter((nft) =>
          nft.name.toLowerCase().includes(search.toLowerCase())
        )
      }

      if (sort) {
        switch (sort) {
          case "time-asc":
            filteredNFTs.sort((a, b) => b.id - a.id)
            break
          case "time-desc":
            filteredNFTs.sort((a, b) => a.id - b.id)
            break
          case "popular":
            filteredNFTs.sort((a, b) => a.priority - b.priority)
            break
          case "name-asc":
            filteredNFTs.sort((a, b) => a.name.localeCompare(b.name))
            break
          case "name-desc":
            filteredNFTs.sort((a, b) => b.name.localeCompare(a.name))
            break
        }
      }

      setNfts(filteredNFTs)
    }

    filterAndSortNFTs()
    setLoading(false)
  }, [searchParams])

  return (
    <div className=" border border-foreground/10 rounded-lg">
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <NFTCardSkeleton key={i} />
          ))}
        </div>
      ) :

        nfts.length < 1 ? (
          <div className="flex flex-row gap-4 p-4">
            <Package className="text-foreground/70" />
            <p className="text-foreground font-khand font-medium text-[18px] tracking-wider">No NFTs found</p>
          </div>
        ) :
          <div className="flex flex-col gap-5 p-4">
            <div className="flex flex-row items-center gap-3 text-foreground/90 bg-foreground/5 p-2 px-3 rounded-md -mb-1 ">
              <Combine className="size-[14px]" />
              <P className="italic text-[13px] xl:text-[15px]">Showing <span className="font-bold">{nfts.length}</span> of <span className="font-bold">{nftData.length}</span> NFTs</P>
            </div>
            {nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} />
            ))}
          </div>
      }
    </div>
  )
}
