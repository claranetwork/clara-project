"use client";

import { Loader2 } from "lucide-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { defineChain, NFT, sendTransaction, toEther } from "thirdweb";
import { balanceOf, claimTo, getOwnedNFTs } from "thirdweb/extensions/erc721";
import {
  useActiveAccount,
  useActiveWalletChain,
  useReadContract,
  useSwitchActiveWalletChain,
} from "thirdweb/react";

import { getFlair } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { VARIABLES } from "@/configs/constants";
import stakeInfo from "@/configs/stake-info.json";
import Navbar from "@/components/layouts/navbar";
import { H1, P } from "@/components/typo";
import { Flex } from "@/components/elements";
import OwnedNft from "@/components/sections/stake/owned-nft";
import StakedNft from "@/components/sections/stake/staked-nft";
import TokenReward from "@/components/sections/stake/token-reward";
import { NftStakeSkeleton } from "@/components/sections/stake/skeleton";
import {
  mainTokenContract,
  nftContract,
  nftStakingContract,
  stakeNFT,
} from "@/components/sections/stake/contracts";

const Page = () => {
  const { toast } = useToast();
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [ownedNFTS, setOwnedNFTS] = useState<NFT[]>([]);
  const [isNFTLoading, setIsNFTLoading] = useState(false);
  const [claimingLoading, setClaimingLoading] = useState(false);

  const {
    data: stakedInfo,
    refetch: refetchStakedInfo,
    isLoading: isStakedInfoLoading,
    error,
  } = useReadContract({
    contract: nftStakingContract,
    method: "getStakeInfo",
    params: [account?.address || ""],
  });

  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading,
    refetch: refetchTokenBalance,
  } = useReadContract(balanceOf, {
    contract: mainTokenContract,
    owner: account?.address || "",
  });

  const getOwnedNFTS = useCallback(async () => {
    if (!account?.address) return;

    try {
      setIsNFTLoading(true);

      const nfts = await getOwnedNFTs({
        contract: nftContract,
        owner: account.address,
      });

      setOwnedNFTS(nfts);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      toast({
        title: "Error",
        description: "Failed to load NFTs",
        variant: "destructive",
      });
    } finally {
      setIsNFTLoading(false);
    }
  }, [account?.address, toast]);

  const claimNFT = async () => {
    if (account?.address) {
      const transaction = claimTo({
        contract: nftContract,
        to: account.address,
        quantity: BigInt(1),
      });

      try {
        setClaimingLoading(true);

        if (activeChain?.id !== nftContract.chain.id) {
          toast({ description: "switching network..." });
          await switchChain(defineChain(nftContract.chain.id));
        }

        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        });
        toast({
          title: "Claimed Successfully",
          description: `hash: ${transactionHash}`,
          variant: "default",
        });
        getOwnedNFTS();
      } catch (er) {
        console.log(er);
        toast({
          title: "Error",
          description: (er as Error).message || "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setClaimingLoading(false);
      }
    }
  };

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

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (account) {
      getOwnedNFTS();
    }
  }, [account, getOwnedNFTS]);

  return (
    <>
      <Navbar />
      <Flex className="w-max flex-col items-center lg:items-start py-4 gap-1 grow-0 pb-10 lg:pb-4">
        <H1 className="text-[22px] sm:text-[24px] md:text-[28px] lg:text-[32px] mb-3 whitespace-normal">
          Stake {stakeNFT?.name}
        </H1>
        <Flex className="pb-2 lg:pb-4 grow-0 w-max">
          {isTokenBalanceLoading ? (
            <P className="flex items-center gap-2">
              Current Balance: <Loader2 className="animate-spin" size={16} />
            </P>
          ) : (
            tokenBalance !== undefined && (
              <P className="">
                Current Balance:{" "}
                <span className="inline-block">
                  <img
                    src={getFlair("coin")}
                    alt={"coin"}
                    className="w-5 h-5 -mb-1"
                  />{" "}
                </span>{" "}
                <span className="font-semibold font-khand">
                  {" "}
                  {Number(toEther(tokenBalance)).toFixed(2)}
                </span>{" "}
                {VARIABLES.MAIN_TOKEN}
              </P>
            )
          )}
        </Flex>

        <P
          className="max-w-[500px] pb-3 hidden lg:block"
          dangerouslySetInnerHTML={{ __html: stakeInfo[0].description }}
        ></P>
        <button
          className="flex justify-center w-max lg:justify-start items-center bg-foreground/10 px-2 pt-2 font-medium rounded-md"
          onClick={claimNFT}
          disabled={claimingLoading}
        >
          {claimingLoading ? (
            <div className="inline-flex flex-row font-alef items-center gap-3 -pt-1 pb-1 px-4">
              <span>
                <Loader2 className="animate-spin p-[2px] shrink-0" size={16} />{" "}
              </span>
              loading
            </div>
          ) : (
            <P>
              Click here to claim{" "}
              <span className="font-semibold uppercase">{stakeNFT?.name}</span>
            </P>
          )}
        </button>
      </Flex>

      <div className="grow max-w-[400px] lg:max-w-[450px] w-full">
        <Flex className="gap-3 justify-center hidden lg:flex pb-8">
          {isStakedInfoLoading ? (
            <P className="p-1 px-3 bg-foreground/10 rounded-lg flex items-center gap-2">
              Claimable Reward: <Loader2 className="animate-spin" size={16} />
            </P>
          ) : (
            <P className="p-1 px-3 bg-foreground/10 rounded-lg">
              {stakedInfo && stakedInfo[1] > 0 && (
                <span className="inline-block size-[6px] xl:size-2 rounded-full animate-ping bg-green-100 mr-2 mb-[2px]" />
              )}
              Claimable Reward:{" "}
              <span className="inline-block">
                <img
                  src={getFlair("coin")}
                  alt={"coin"}
                  className="w-5 h-5 -mb-1"
                />{" "}
              </span>
              <span className="font-semibold font-khand">
                {" "}
                {stakedInfo && Number(toEther(stakedInfo[1])).toFixed(4)}
              </span>{" "}
              {VARIABLES.MAIN_TOKEN}
            </P>
          )}
        </Flex>

        {isNFTLoading ? (
          <NftStakeSkeleton />
        ) : (
          <>
            <OwnedNft
              ownedNFTS={ownedNFTS}
              refetchNFT={getOwnedNFTS}
              refetchStakedInfo={refetchStakedInfo}
            />
            {stakedInfo && (
              <StakedNft
                stakedInfo={stakedInfo[0]}
                refetchNFT={getOwnedNFTS}
                refetchStakedInfo={refetchStakedInfo}
              />
            )}
          </>
        )}

        <TokenReward
          stakedInfo={stakedInfo}
          refetchNFT={getOwnedNFTS}
          refetchStakedInfo={refetchStakedInfo}
          refetchTokenBalance={refetchTokenBalance}
        />
      </div>
    </>
  );
};

export default Page;
