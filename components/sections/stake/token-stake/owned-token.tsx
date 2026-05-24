import { useState } from "react";
import { TransactionButton } from "thirdweb/react";
import { prepareContractCall, toEther, toWei } from "thirdweb";

import { Lead, P } from "@/components/typo";
import { Flex, Grid } from "@/components/elements";

import { useToast } from "@/hooks/use-toast";
import { VARIABLES } from "@/configs/constants";
import { mainTokenContract, tokenStakingContract, } from "../contracts";
import { getFlair } from "@/lib/utils";

const OwnedToken = ({
  mainBalance,
  refetch,
  refetchStakedInfo
}: {
  mainBalance: bigint,
  refetch: () => void,
  refetchStakedInfo: () => void
}) => {
  const { toast } = useToast()
  const [isApproved, setIsApproved] = useState(false);
  const [stakeAmount, setStakeAmount] = useState<string>("1");

  return (
    <div>
      <div className="pb-1 border-b-2 border-white/10">
        <Lead className="font-medium text-[22px] xl:text-[26px]">
          Owned Token
        </Lead>
      </div>

      {
        mainBalance > BigInt(0) ?
          <Flex className="flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-4">
            <Lead className="grow text-[20px] xl:text-[22px] whitespace-nowrap text-foreground/80"><span className="font-medium text-foreground">
              <span className="inline-block"><img src={getFlair("coin")} alt={"coin"} className="size-5 sm:size-6 -mb-1 mr-1" /> </span>  {Number(toEther(mainBalance)).toFixed(2)}</span> {VARIABLES.MAIN_TOKEN}</Lead>

            <Grid className="grid-cols-2 ">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="min-w-[60px] h-full bg-transparent border border-white/20 border-r-0 rounded-tl-lg rounded-bl-lg ring-0 -mr-1 px-3 ml-2 text-[18px] focus:outline-none focus:ring-0 "
              />

              {!isApproved ?
                <TransactionButton
                  transaction={() => (
                    prepareContractCall({
                      contract: mainTokenContract,
                      method:
                        "function approve(address spender, uint256 amount) returns (bool)",
                      params: [VARIABLES.TOKEN_STAKE_ADDR, toWei(stakeAmount)],
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
                  onTransactionSent={() => {
                    toast({
                      description: "Preparing to stake! please wait until the transaction is confirmed..."
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
                      contract: tokenStakingContract,
                      method: "stake",
                      params: [toWei(stakeAmount)],
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
                  onTransactionSent={() => {
                    toast({
                      description: "Staking! please wait until the transaction is confirmed..."
                    });
                  }}
                  onTransactionConfirmed={() => {
                    toast({
                      description: "Staked!"
                    });
                    refetch()
                    refetchStakedInfo();
                    setIsApproved(false);
                    setStakeAmount("1");
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
            </Grid>

          </Flex>
          :
          <P className="py-3">
            You haven&apos;t owned any NFTs
          </P>
      }
    </div >
  )
}

export default OwnedToken

