"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFlair } from "@/lib/utils"

export function NFTCard({ nft }: { nft: NFT }) {
  return (
    <Link href={`/${nft.hash}`} className="w-full ">
      <Card className="flex overflow-hidden border border-card hover:border-foreground/20 w-full h-[230px] md:h-[210px] rounded-md">
        <CardHeader className="p-0 space-y-0 w-[45%] sm:w-[40%] md:w-[35%] min-w-[150px]">
          <div className="relative aspect-square h-full">
            <Image src={nft.imageURI || "/placeholder.svg"} alt={nft.name} fill className="object-cover rounded-md" />
          </div>
        </CardHeader>
        <CardContent className="p-5 md:p-6 px-5 md:px-8 flex flex-col w-full">
          <CardTitle className="text-lg sm:text-xl md:text-2xl font-normal mb-2 font-audio-wide text-foreground line-clamp-2">{nft.name}</CardTitle>
          <div className="flex flex-col md:flex-row-reverse justify-between md:items-start mb-2 grow gap-3">
            <span className="text-md sm:text-xl font-medium font-khand text-foreground/90 mr-3"><span className="inline-block"><img src={getFlair("coin")} alt={"coin"} className="size-5 md:size-6 -mb-1" /> </span> {nft.price} {nft.symbol}</span>
            <Badge variant="secondary" className="hiddem sm:block text-foreground px-2 py-1 opacity-70 text-[12px] md:text-[14px] w-max">{nft.chain}</Badge>
          </div>
          <p className="text-sm text-foreground/90 line-clamp-2 md:line-clamp-3 font-alef" dangerouslySetInnerHTML={{ __html: nft.description }} />
        </CardContent>
      </Card>
    </Link>
  )
}


