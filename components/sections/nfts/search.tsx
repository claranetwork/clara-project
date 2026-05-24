"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "")

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)
    params.set("search", searchTerm)
    router.push(`/nfts?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2 bg-foreground/10 grow rounded-lg">
      <Input
        type="text"
        placeholder="Search NFTs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-0 h-10 lg:h-11 text-[16px]"
      />
      <Button type="submit" size="icon" className="bg-transparent">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}


