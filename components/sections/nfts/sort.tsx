"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NFTSort() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("sort", value)
    router.push(`/nfts?${params.toString()}`)
  }

  return (
    <Select onValueChange={handleSortChange} defaultValue={searchParams.get("sort") || ""}>
      <SelectTrigger className="w-[240px] border-0 bg-foreground/10 text-alef gap-4 h-10 lg:h-11 text-[16px] font-khand font-medium tracking-wider">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent className="bg-foreground/90 cursor-pointer">
        <SelectItem value="time-asc">Time: Newest First</SelectItem>
        <SelectItem value="time-desc">Time: Oldest First</SelectItem>
        <SelectItem value="popular">Popular: Most Popular</SelectItem>
        <SelectItem value="name-asc">Name: A to Z</SelectItem>
        <SelectItem value="name-desc">Name: Z to A</SelectItem>
      </SelectContent>
    </Select>
  )
}


