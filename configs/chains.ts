import { defineChain } from "thirdweb";

// Define Robinhood Testnet
export const robinhoodTestnet = defineChain({
  id: 46630,
  name: "Robinhood Testnet",
  rpc: "https://rpc.testnet.chain.robinhood.com",
  nativeCurrency: {
    name: "Robinhood",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Robinhood Explorer",
      url: "https://explorer.testnet.chain.robinhood.com/",
    },
  ],
  testnet: true,
});

// Define Pharos Testnet
export const pharosTestnet = defineChain({
  id: 688689,
  name: "Pharos Testnet",
  rpc: "https://atlantic.dplabs-internal.com",
  nativeCurrency: {
    name: "Pharos",
    symbol: "PHRS",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Pharos Explorer",
      url: "https://explorer.pharos-testnet.com",
    },
  ],
  testnet: true,
});

// Define DAC Testnet
export const dacTestnet = defineChain({
  id: 21894,
  name: "DAC Testnet",
  rpc: "https://rpctest.dachain.tech",
  nativeCurrency: {
    name: "DAC",
    symbol: "tDACC",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "DAC Explorer",
      url: "https://exptest.dachain.tech:3000",
    },
  ],
  testnet: true,
});

// Add other custom chains here if needed
export const customChains = {
  robinhoodTestnet,
  pharosTestnet,
  dacTestnet,
};
