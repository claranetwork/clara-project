"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function NFTCardSkeleton() {
  return (
    <div className="flex overflow-hidden border border-card hover:border-foreground/20 w-full h-[230px] md:h-[210px] rounded-md animate-pulse">
      <CardHeader className="p-0 space-y-0 w-[45%] sm:w-[40%] md:w-[35%] min-w-[150px]">
        <div className="relative aspect-square h-full">
          <Skeleton className="w-full h-full rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="p-5 md:p-6 px-5 md:px-8 flex flex-col w-full space-y-3">
        <Skeleton className="h-7 w-3/4" />
        <div className="flex flex-col md:flex-row-reverse justify-between md:items-start mb-2 grow gap-3">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </div>
  )
}

// Optional: Grid skeleton for multiple cards
export function NFTCardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <NFTCardSkeleton key={index} />
      ))}
    </div>
  )
}