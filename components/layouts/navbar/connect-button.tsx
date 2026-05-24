"use client";

import React from "react";
import { client } from "@/lib/client";
import { arcTestnet, robinhoodTestnet } from "@/lib/chain";
import { ethereum } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";
import { ConnectButton as ThirdwebConnectButton, darkTheme } from "thirdweb/react";

// Force the balance / secondary text on the connected button to stay readable
// on top of the purple→pink gradient.
const buttonTheme = darkTheme({
  colors: {
    primaryText: "#ffffff",
    secondaryText: "rgba(255,255,255,0.85)",
  },
});

const ConnectButton = () => {
  const wallets = [
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
  ];

  return (
    <ThirdwebConnectButton
      client={client}
      wallets={wallets}
      theme={buttonTheme}
      // Default to Ethereum mainnet so the connected button shows the
      // user's "real" ETH balance. Robinhood Testnet (testnet ETH) and
      // Arc Testnet (USDC native) are still reachable via the wallet's
      // chain switcher.
      chain={ethereum}
      chains={[ethereum, robinhoodTestnet, arcTestnet]}
      connectButton={{
        className:
          "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold font-khand text-lg px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 hover:scale-105 transition-all duration-300",
        label: "Connect Wallet",
        style: {
          height: "auto",
          width: "max-content",
          minWidth: "max-content",
          background: "linear-gradient(to right, #9333ea, #db2777)",
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 24,
          paddingRight: 24,
          fontSize: "18px",
          fontWeight: 700,
          fontFamily: "Khand, sans-serif",
          color: "white",
          borderRadius: "12px",
          textAlign: "center",
          border: "none",
        },
      }}
      detailsButton={{
        className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold font-khand px-5 py-2.5 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300",
        style: {
          flexDirection: "row-reverse",
          height: "auto",
          width: "max-content",
          minWidth: "max-content",
          background: "linear-gradient(to right, #9333ea, #db2777)",
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          fontSize: "16px",
          fontWeight: 700,
          fontFamily: "Khand, sans-serif",
          color: "white",
          borderRadius: "12px",
          border: "none",
        },
      }}
    />
  );
};

export default ConnectButton;