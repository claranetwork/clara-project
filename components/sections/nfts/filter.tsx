"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import nftData from "@/configs/nfts.json"

export function NFTFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [chains, setChains] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const uniqueChains = [...new Set(nftData.map((nft) => nft.chain))]
    const uniqueTags = [...new Set(nftData.flatMap((nft) => nft.tags))]
    setChains(uniqueChains)
    setTags(uniqueTags)
  }, [])

  const handleFilterChange = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams)
    const currentValue = params.get(type)

    if (currentValue === value) {
      params.delete(type)
    } else {
      params.set(type, value)
    }

    router.push(`/nfts?${params.toString()}`)
  }

  return (
    <Accordion type="multiple" defaultValue={["chain", "tags"]} className="w-full h-full bg-foreground/10 rounded-lg py-1 pb-5 px-5">
      <AccordionItem value="tags" className="border-foreground/20 border-dashed">
        <AccordionTrigger className="data-[state=open]:border-b-0 font-khand text-[18px] font-medium">Categories</AccordionTrigger>
        <AccordionContent className=" space-y-3">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2 mb-2 ">
              <Checkbox
                id={`tag-${tag}`}
                checked={searchParams.get("tag") === tag}
                onCheckedChange={() => handleFilterChange("tag", tag)}
              />
              <Label htmlFor={`tag-${tag}`} className="cursor-pointer font-alef text-[16px]">{tag}</Label>
            </div>
          ))}
          <div key={"free"} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={`chain-free`}
              checked={searchParams.get("tag") === "free"}
              onCheckedChange={() => handleFilterChange("tag", "free")}
            />
            <Label htmlFor={`chain-free`} className="cursor-pointer font-alef text-[16px]">free</Label>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="chain" className="border-foreground/20 border-dashed">
        <AccordionTrigger className="data-[state=open]:border-b-0 font-khand text-[18px] font-medium">Chain</AccordionTrigger>
        <AccordionContent className=" space-y-3">
          {chains.map((chain) => (
            <div key={chain} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`chain-${chain}`}
                checked={searchParams.get("chain") === chain}
                onCheckedChange={() => handleFilterChange("chain", chain)}
              />
              <Label htmlFor={`chain-${chain}`} className=" cursor-pointer font-alef text-[16px]">{chain}</Label>
            </div>
          ))}

        </AccordionContent>

      </AccordionItem>
    </Accordion>
  )
}


