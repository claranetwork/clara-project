import { defineChain } from "thirdweb";

/**
 * Arc Testnet — the network the Clara faucet drips on.
 *
 * Reuse this single definition anywhere a chain is needed
 * (ConnectButton, contract calls, useReadContract, etc.).
 */
export const arcTestnet = defineChain({
  id: 5042002,
  name: "Arc Testnet",
  rpc: "https://rpc.testnet.arc.network",
  nativeCurrency: {
    name: "USD Coin",
    symbol: "USDC",
    // Arc Testnet's native gas currency follows the standard EVM 18-decimal
    // convention even though the symbol is USDC. (Mainnet ERC20 USDC uses 6.)
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Arc Explorer",
      url: "https://explorer.testnet.arc.network",
    },
  ],
  testnet: true,
});

export const robinhoodTestnet = defineChain({
  id: 46630,
  name: "Robinhood Chain Testnet",
  rpc: "https://rpc.testnet.chain.robinhood.com",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Robinhood Testnet Explorer",
      url: "https://explorer.testnet.chain.robinhood.com",
    },
  ],
  testnet: true,
});
