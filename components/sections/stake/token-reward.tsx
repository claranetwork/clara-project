import { TransactionButton, } from "thirdweb/react"
import { prepareContractCall, toEther } from "thirdweb";

import { useToast } from "@/hooks/use-toast";
import { VARIABLES } from "@/configs/constants";
import { nftStakingContract } from "./contracts";

import { P } from "@/components/typo";
import { Flex } from "@/components/elements";
import { PrimaryButtonProto } from "@/components/elements/button"

const TokenReward = ({
  stakedInfo,
  refetchNFT,
  refetchStakedInfo,
  refetchTokenBalance
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stakedInfo: any
  refetchNFT: () => void,
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
          Claimable Reward: <span className="font-semibold font-khand">🪙 {stakedInfo && Number(toEther(stakedInfo[1])).toFixed(4)}</span> {VARIABLES.MAIN_TOKEN}
        </P>

      </Flex>

      {stakedInfo && stakedInfo[1] !== undefined && <PrimaryButtonProto className="w-full tracking-wider">
        <TransactionButton
          transaction={() => (
            prepareContractCall({
              contract: nftStakingContract,
              method: "claimRewards",
            })
          )}
          onTransactionConfirmed={() => {
            toast({
              description: "Rewards claimed!"
            })
            refetchNFT()
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
            cursor: stakedInfo[1] < BigInt(1) ? "not-allowed" : "pointer",
            pointerEvents: stakedInfo[1] < BigInt(1) ? "none" : "all",
            fontSize: "18px"
          }}
          disabled={stakedInfo[1] < BigInt(1)}
        >Claim Rewards</TransactionButton>
      </PrimaryButtonProto>}
    </div >
  )
}

export default TokenReward
