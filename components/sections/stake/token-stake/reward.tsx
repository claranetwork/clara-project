import { PrimaryButton, PrimaryButtonProto } from "@/components/elements/button"
import { prepareContractCall, sendTransaction, toEther } from "thirdweb";
import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react"
import { nftContract, rewardTokenContract, tokenStakingContract } from "../contracts";
import { useToast } from "@/hooks/use-toast";
import { Flex } from "@/components/elements";
import { P } from "@/components/typo";
import { balanceOf } from "thirdweb/extensions/erc721";
import { VARIABLES } from "@/configs/constants";
import { cn } from "@/lib/utils";

const TokenReward = ({
  stakedInfo,
  refetch,
  refetchStakedInfo,
  refetchTokenBalance
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stakedInfo: any
  refetch: () => void,
  refetchStakedInfo: () => void
  refetchTokenBalance: () => void
}) => {
  const { toast } = useToast()

  return (
    <div className="mt-5 lg:mt-0 py-2 space-y-3">

      <Flex className="gap-3 justify-between flex lg:hidden">
        <P>
          {stakedInfo && stakedInfo[1] > 0 &&
            <span className="inline-block size-[6px] xl:size-2 rounded-full animate-ping bg-green-100 mr-2 mb-[2px]" />}
          Claimable Reward: 🌟 <span className="font-semibold font-khand">{stakedInfo && Number(toEther(stakedInfo[1])).toFixed(2)}</span> {VARIABLES.REWARD_TOKEN}
        </P>

      </Flex>

      {stakedInfo && stakedInfo[1] !== undefined && <PrimaryButtonProto className={cn("w-full tracking-wider")} >
        <TransactionButton
          transaction={() => (
            prepareContractCall({
              contract: tokenStakingContract,
              method: "claimRewards",
            })
          )}
          onTransactionConfirmed={() => {
            toast({
              description: "Rewards claimed!"
            })
            refetch()
            refetchStakedInfo();
            refetchTokenBalance();
          }}
          onError={(err) => {
            toast({
              title: "Error",
              description: (err as Error).message || "Something went wrong",
              variant: "destructive"
            })
          }}
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: "#fff",
            padding: "0px",
            borderRadius: "10px",
            width: "100%",
            fontSize: "18px",
            cursor: stakedInfo[1] < BigInt(1) ? "not-allowed" : "pointer",
            pointerEvents: stakedInfo[1] < BigInt(1) ? "none" : "auto"
          }}
          disabled={stakedInfo[1] < BigInt(1)}
        >Claim Rewards</TransactionButton>
      </PrimaryButtonProto>
      }
    </div>
  )
}

export default TokenReward

