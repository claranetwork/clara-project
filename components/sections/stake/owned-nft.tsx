import Image from "next/image";
import { useState } from "react";
import { NFT, prepareContractCall } from "thirdweb";

import { Lead, P } from "@/components/typo";
import { Flex } from "@/components/elements";
import { TransactionButton } from "thirdweb/react";
import { approve } from "thirdweb/extensions/erc721";

import { useToast } from "@/hooks/use-toast";
import { VARIABLES } from "@/configs/constants";
import { nftContract, nftStakingContract, stakeNFT } from "./contracts";

const OwnedNft = ({
  ownedNFTS,
  refetchNFT,
  refetchStakedInfo
}: {
  ownedNFTS: NFT[],
  refetchNFT: () => void,
  refetchStakedInfo: () => void
}) => {
  const { toast } = useToast()
  const [isApproved, setIsApproved] = useState(false);

  return (
    <div>
      <div className="pb-1 border-b-2 border-white/10">
        <Lead className="font-medium text-[22px] xl:text-[26px]">
          #
        </Lead>
      </div>

      {
        ownedNFTS && ownedNFTS[0] ?
          <Flex className="items-center gap-7 md:gap-10 py-4">
            <div className=" bg-foreground/70 rounded-lg overflow-hidden">
              {stakeNFT &&
                <Image
                  src={stakeNFT.imageURI}
                  alt="Hero Background"
                  height={120}
                  width={120}
                  quality={100}
                  className="object-contain"
                />
              }
            </div>
            <Lead className="grow text-[24px] xl:text-[28px]">X{ownedNFTS.length}</Lead>

            {!isApproved ?
              <TransactionButton
                transaction={() => (
                  approve({
                    contract: nftContract,
                    to: VARIABLES.NFT_STAKE_ADDR,
                    tokenId: ownedNFTS[0]?.id
                  })
                )}
                style={{
                  minWidth: "auto",
                  backgroundColor: "hsla(var(--foreground)/0.2)",
                  padding: "0.75rem",
                  fontWeight: 600,
                  borderRadius: "0.375rem",
                  color: "hsl(var(--foreground))",
                  fontFamily: "var(--font-alef)",
                }}
                onError={(error) => {
                  console.error("Approve error:", error);
                  toast({
                    title: "Approve Failed",
                    description: error.message,
                    variant: "destructive"
                  });
                }}
                onTransactionConfirmed={() => setIsApproved(true)}
              >
                Approve
              </TransactionButton>
              :
              <TransactionButton
                transaction={() => (
                  prepareContractCall({
                    contract: nftStakingContract,
                    method: "stake",
                    params: [[ownedNFTS[0]?.id]]
                  })
                )}
                style={{
                  minWidth: "auto",
                  backgroundColor: "hsla(var(--foreground)/0.2)",
                  padding: "0.75rem",
                  fontWeight: 600,
                  borderRadius: "0.375rem",
                  color: "hsl(var(--foreground))",
                  fontFamily: "var(--font-alef)",
                }}
                onTransactionConfirmed={() => {
                  toast({
                    description: "Staked!"
                  });
                  refetchNFT()
                  refetchStakedInfo();
                  setIsApproved(false);
                }}
                onError={(error) => {
                  console.error("Staking error:", error);
                  toast({
                    title: "Staking Failed",
                    description: error.message,
                    variant: "destructive"
                  });
                }}
              >
                Stake
              </TransactionButton>
            }

          </Flex>
          :
          <P className="py-3">
            You haven&apos;#
          </P>
      }
    </div >
  )
}

export default OwnedNft
