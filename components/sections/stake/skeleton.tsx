import { Flex } from "@/components/elements"
import { Skeleton } from "@/components/ui/skeleton"

export const NftStakeSkeleton = () => {
  return (
    <Flex className="justify-start items-start flex-col w-full">
      <div>
        <Skeleton className="h-8 w-[200px]" />
      </div>
      <div className="flex items-center gap-10 py-4 justify-between w-full">
        <Skeleton className="h-[90px] w-[120px] rounded-lg" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      <div>
        <Skeleton className="h-8 w-[200px]" />
      </div>
      <div className="flex items-center gap-10 py-4 justify-between w-full">
        <Skeleton className="h-[90px] w-[120px] rounded-lg" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
    </Flex>
  )
}



