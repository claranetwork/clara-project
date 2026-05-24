"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function NFTMintingSkeleton() {
  return (
    <div className="w-full section-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[40%_1fr] gap-10 xl:gap-16 min-h-[60vh] 2xl:min-h-[65vh]  mt-10">
        <div className="md:sticky  md:self-start">
          <Card className="w-full aspect-square">
            <Skeleton className="w-full h-full" />
          </Card>
        </div>

        <div className="flex flex-col items-start gap-10">
          <div className="space-y-1 w-full">
            <div className="flex items-center gap-3 flex-wrap">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-24" />
            </div>

            <div className="flex items-center gap-3 flex-wrap mt-2">
              <Skeleton className="h-8 w-36" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          <Skeleton className="h-24 w-full" />

          <div className="space-y-2 w-full">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>

          <div className="space-y-4 w-full">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

