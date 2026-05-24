export const tags = ["dustlings", "starbound", "phoenixar"] as const;

export const VARIABLES = {
  THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
 

  NFT_ID: Number(process.env.NEXT_PUBLIC_NFT_ID) || 1,
  NFT_CHAIN: Number(process.env.NEXT_PUBLIC_NFT_CHAIN) || 137,
  NFT_ID_ADDR: process.env.NEXT_PUBLIC_NFT_ADDR || "",

  MAIN_TOKEN: process.env.NEXT_PUBLIC_MAIN_TOKEN || "",
  MAIN_TOKEN_CHAIN: Number(process.env.NEXT_PUBLIC_MAIN_TOKEN_CHAIN) || 137,
  MAIN_TOKEN_ADDR: process.env.NEXT_PUBLIC_MAIN_TOKEN_ADDR || "",

  REWARD_TOKEN: process.env.NEXT_PUBLIC_REWARD_TOKEN || "",
  REWARD_TOKEN_CHAIN: Number(process.env.NEXT_PUBLIC_REWARD_TOKEN_CHAIN) || 137,
  REWARD_TOKEN_ADDR: process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDR || "",

  NFT_STAKE_CHAIN: Number(process.env.NEXT_PUBLIC_NFT_STAKE_CHAIN) || 137,
  NFT_STAKE_ADDR: process.env.NEXT_PUBLIC_NFT_STAKE_ADDR || "",

  TOKEN_STAKE_CHAIN: Number(process.env.NEXT_PUBLIC_TOKEN_STAKE_CHAIN) || 137,
  TOKEN_STAKE_ADDR: process.env.NEXT_PUBLIC_TOKEN_STAKE_ADDR || "",
};
