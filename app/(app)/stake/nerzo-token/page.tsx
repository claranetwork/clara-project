"use client"

import Link from "next/link"
import { Loader2 } from "lucide-react"
import { Fragment, useEffect } from "react"
import { balanceOf } from "thirdweb/extensions/erc721"
import { useActiveAccount, useReadContract } from "thirdweb/react"

import { getFlair } from "@/lib/utils"
import { H1, P } from "@/components/typo"
import { Flex } from "@/components/elements"
import { VARIABLES } from "@/configs/constants"
import stakeInfo from "@/configs/stake-info.json"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import TokenReward from "@/components/sections/stake/token-stake/reward"
import OwnedToken from "@/components/sections/stake/token-stake/owned-token"
import StakedToken from "@/components/sections/stake/token-stake/staked-token"
import { mainTokenContract, rewardTokenContract, tokenStakingContract } from "@/components/sections/stake/contracts"
import { toEther } from "thirdweb"

const Page = () => {
  const account = useActiveAccount();

  const {
    data: stakedInfo,
    refetch: refetchStakedInfo,
    isLoading: isStakedInfoLoading
  } = useReadContract({
    contract: tokenStakingContract,
    method: "getStakeInfo",
    params: [account?.address || ""],
  });

  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading,
    refetch: refetchTokenBalance,
  } = useReadContract(
    balanceOf,
    {
      contract: rewardTokenContract,
      owner: account?.address || "",
    }
  )

  const {
    data: mainTokenBalance,
    isLoading: isMainTokenBalanceLoading,
    refetch: refetchMainTokenBalance,
  } = useReadContract(
    balanceOf,
    {
      contract: mainTokenContract,
      owner: account?.address || "",
    }
  )

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (account?.address) {
      refetchStakedInfo();

      intervalId = setInterval(() => {
        refetchStakedInfo();
      }, 10000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [account?.address, refetchStakedInfo]);

  return (
    <Fragment>
      <Flex className="w-max flex-col items-center lg:items-start py-4 gap-1 grow-0 pb-10 lg:pb-4">
        <H1 className="text-[24px] md:text-[28px] lg:text-[32px] mb-3">Stake Nerzo Token</H1>
        <Flex className="pb-2 lg:pb-4 grow-0 w-max">
          {isTokenBalanceLoading ? (
            <P className="flex items-center gap-2">
              Current Balance: <Loader2 className="animate-spin" size={16} />
            </P>
          ) : (
            tokenBalance !== undefined && (
              <P className="">
                Current Balance: <span className="font-semibold font-khand"><span className="inline-block"><img src={getFlair("reward")} alt={"reward"} className="w-[22px] h-[22px] -mb-1" /> </span> {Number(tokenBalance).toFixed(6)}</span> {VARIABLES.REWARD_TOKEN}
              </P>
            )
          )}
        </Flex>

        <P className="max-w-[500px] pb-3 hidden lg:block" dangerouslySetInnerHTML={{ __html: stakeInfo[1].description }}></P>

        <Link
          className="flex justify-center w-max lg:justify-start items-center bg-foreground/10 px-2 pt-2 font-medium rounded-md"
          href={"/stake"}
        >
          <P>Click here to get <span className="font-semibold">{VARIABLES.MAIN_TOKEN}</span> token</P>
        </Link>
      </Flex>

      <ScrollArea className="grow max-w-[400px] lg:max-w-[450px] w-full">

        <Flex className="gap-3 justify-center hidden lg:flex pb-8">
          {isStakedInfoLoading ? (
            <P className="p-1 px-3 bg-foreground/10 rounded-lg flex items-center gap-2">
              Claimable Reward: <Loader2 className="animate-spin" size={16} />
            </P>
          ) : (
            <P className="p-1 px-3 bg-foreground/10 rounded-lg">
              {stakedInfo && stakedInfo[1] > 0 &&
                <span className="inline-block size-[6px] xl:size-2 rounded-full animate-ping bg-green-100 mr-2 mb-[2px]" />}
              Claimable Reward: <span className="font-semibold font-khand"><span className="inline-block"><img src={getFlair("reward")} alt={"reward"} className="w-[22px] h-[22px] -mb-1" /> </span> {stakedInfo && Number(toEther(stakedInfo[1])).toFixed(6)}</span> {VARIABLES.REWARD_TOKEN}
            </P>
          )}
        </Flex>

        {isMainTokenBalanceLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-2/5" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          mainTokenBalance !== undefined && (
            <OwnedToken
              mainBalance={mainTokenBalance}
              refetch={refetchMainTokenBalance}
              refetchStakedInfo={refetchStakedInfo}
            />
          )
        )}

        {isStakedInfoLoading ? (
          <div className="space-y-4 ">
            <Skeleton className="h-12 w-2/5 mt-4" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          stakedInfo && (
            <StakedToken
              stakedInfo={stakedInfo}
              refetch={refetchMainTokenBalance}
              refetchStakedInfo={refetchStakedInfo}
            />
          )
        )}

        <TokenReward
          stakedInfo={stakedInfo}
          refetch={refetchMainTokenBalance}
          refetchStakedInfo={refetchStakedInfo}
          refetchTokenBalance={refetchTokenBalance}
        />
      </ScrollArea>
    </Fragment>
  )
}

export default Page
