import { prepareContractCall, toEther } from "thirdweb";
import { TransactionButton } from "thirdweb/react";

import { toast } from "@/hooks/use-toast";
import { tokenStakingContract } from "../contracts";

import { Lead, P } from "@/components/typo"
import { Flex } from "@/components/elements";
import { VARIABLES } from "@/configs/constants";
import { getFlair } from "@/lib/utils";

const StakedToken = ({
  stakedInfo,
  refetch,
  refetchStakedInfo
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stakedInfo: any,
  refetch: () => void,
  refetchStakedInfo: () => void
}) => {

  return (
    <div className="mt-5" >
      <div className="pb-1 border-b-2 border-white/10">
        <Lead className="font-medium text-[22px] xl:text-[26px]">
          Staked Token
        </Lead>
      </div>

      {stakedInfo[0] > 0 ?
        <Flex className="items-center gap-10 py-4">
          <Lead className="grow text-[20px] xl:text-[22px] whitespace-nowrap text-foreground/80"><span className="font-medium text-foreground"><span className="inline-block"><img src={getFlair("coin")} alt={"coin"} className="size-5 sm:size-6 -mb-1 mr-1" /> </span>  {Number(toEther(stakedInfo[0])).toFixed(2)}</span> {VARIABLES.MAIN_TOKEN}</Lead>

          <TransactionButton
            transaction={() => (
              prepareContractCall({
                contract: tokenStakingContract,
                method: "withdraw",
                params: [stakedInfo[0]]
              })
            )}
            onTransactionConfirmed={() => {
              refetch();
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
          No token&apos;s Staked
        </P>
      }
    </div >
  )
}

export default StakedToken

