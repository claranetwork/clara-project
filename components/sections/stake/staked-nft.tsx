import Image from "next/image";
import { prepareContractCall } from "thirdweb";
import { TransactionButton } from "thirdweb/react";

import { toast } from "@/hooks/use-toast";
import { nftStakingContract, stakeNFT } from "./contracts";

import { Lead, P } from "@/components/typo"
import { Flex } from "@/components/elements";

const StackedNft = ({
  stakedInfo,
  refetchNFT,
  refetchStakedInfo
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stakedInfo: any,
  refetchNFT: () => void,
  refetchStakedInfo: () => void
}) => {

  return (
    <div className="mt-3 md:mt-5" >
      <div className="pb-1 border-b-2 border-white/10">
        <Lead className="font-medium text-[22px] xl:text-[26px]">
          Staked NFTs
        </Lead>
      </div>

      {stakedInfo && stakedInfo[0] ?
        <Flex className="items-center  gap-7 md:gap-10 py-4">
          <div className="min-h-[90] bg-foreground/70 rounded-lg overflow-hidden">
            {stakeNFT &&
              <Image src={stakeNFT.imageURI}
                alt="Hero Background"
                height={120}
                width={120}
                quality={100}
                className="object-contain"
              />}
          </div>

          <Lead className="grow text-[24px] xl:text-[28px]">X{stakedInfo.length}</Lead>

          <TransactionButton
            transaction={() => (
              prepareContractCall({
                contract: nftStakingContract,
                method: "withdraw",
                params: [[stakedInfo[0]]]
              })
            )}
            onTransactionConfirmed={() => {
              refetchNFT();
              refetchStakedInfo();
              toast({
                description: "Withdrawn!"
              });
            }}
            onError={(err) => {
              toast({
                description: (err as Error).message,
                variant: "destructive"
              })
            }}
            style={{
              minWidth: "auto",
              backgroundColor: "hsla(var(--foreground)/0.2)",
              padding: "0.75rem",
              fontWeight: 600,
              borderRadius: "0.375rem",
              color: "hsl(var(--foreground))",
              fontFamily: "var(--font-alef)",
            }}
          >
            Withdraw
          </TransactionButton>
        </Flex>
        :
        <P className="py-3">
          No NFTs Staked
        </P>
      }
    </div >
  )
}

export default StackedNft
