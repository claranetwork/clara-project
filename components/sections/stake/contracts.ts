import { client } from "@/lib/client";
import nftsData from "@/configs/nfts.json";
import { VARIABLES } from "@/configs/constants";
import { stackingABI } from "@/configs/stakingABI";
import { defineChain, getContract } from "thirdweb";
import { tokenStakeABI } from "@/configs/tokenStackingAbi";

export const stakeNFT = nftsData.find((nft) => nft.id === VARIABLES.NFT_ID);

export const nftContract = getContract({
  client,
  chain: defineChain(stakeNFT?.chainID || VARIABLES.NFT_CHAIN),
  address: stakeNFT?.address || VARIABLES.NFT_ID_ADDR,
});

export const mainTokenContract = getContract({
  client,
  chain: defineChain(VARIABLES.MAIN_TOKEN_CHAIN),
  address: VARIABLES.MAIN_TOKEN_ADDR,
});

export const rewardTokenContract = getContract({
  client,
  chain: defineChain(VARIABLES.REWARD_TOKEN_CHAIN),
  address: VARIABLES.REWARD_TOKEN_ADDR,
});

export const nftStakingContract = getContract({
  client,
  chain: defineChain(VARIABLES.NFT_STAKE_CHAIN),
  address: VARIABLES.NFT_STAKE_ADDR,
  abi: stackingABI,
});

export const tokenStakingContract = getContract({
  client,
  chain: defineChain(VARIABLES.TOKEN_STAKE_CHAIN),
  address: VARIABLES.TOKEN_STAKE_ADDR,
  abi: tokenStakeABI,
});
