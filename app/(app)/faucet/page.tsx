"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Droplets,
  ExternalLink,
  Link2,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Twitter,
} from "lucide-react";
import { defineChain, getContract, sendTransaction, waitForReceipt } from "thirdweb";
import { base } from "thirdweb/chains";
import { balanceOf, claimTo } from "thirdweb/extensions/erc721";
import {
  useActiveAccount,
  useActiveWalletChain,
  useReadContract,
  useSwitchActiveWalletChain,
} from "thirdweb/react";

import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { P, Small, Subtle } from "@/components/typo";

const FAUCET_CONFIG = {
  dripAmount: 0.00001,
  tokenSymbol: "ETH",
  accessPassCooldownHours: 24,
  accessPass: {
    // Mirrors configs/nfts.json (hash="access") so the faucet's Claim
    // Access Pass button mints the same contract as the access page.
    name: "Access Pass",
    address: "0x87DC0a9455f00C6426877cD5b8A7E14404acf748",
    chainId: 8453, // Base
    priceEth: 0.001,
    explorerUrl:
      "https://basescan.org/address/0x87DC0a9455f00C6426877cD5b8A7E14404acf748",
  },
  retweetPostUrl: "https://x.com/intent/post?url=https%3A%2F%2Fx.com%2Fclarachainxyz%2Fstatus%2F2059558449609121865&text=Claim%20%24USDC%20FAUCET%20with%20CLARA%20on%20ARC%20Testnet%20%40arc%20testnet",
  networks: [
    // ── Temporarily disabled networks ──
    // Uncomment any block below (and the matching entry in
    // api/faucet/fulfill/route.ts FAUCET_NETWORKS) to bring it back.
    /*
    {
      id: "monad",
      label: "MONAD",
      name: "Monad Testnet",
      chainId: 10143,
      currency: "MON",
      amount: "0.05 MON",
      dripAmount: 0.05,
      rpcUrl: "https://testnet-rpc.monad.xyz",
      explorerUrl: "https://testnet.monadexplorer.com",
      enabled: true,
      accent: "from-violet-400 to-indigo-400",
      icon: "M",
      image: "/images/nfts/monad.jpg",
      logoUrl: "https://www.google.com/s2/favicons?domain=monad.xyz&sz=128",
    },
    {
      id: "sepolia",
      label: "SEPOLIA",
      name: "Sepolia Testnet",
      chainId: 11155111,
      currency: "ETH",
      amount: "0.005 ETH",
      dripAmount: 0.005,
      rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
      explorerUrl: "https://sepolia.etherscan.io",
      enabled: true,
      accent: "from-slate-300 to-indigo-300",
      icon: "S",
      image: "/images/nfts/sahara.png",
      logoUrl: "https://www.google.com/s2/favicons?domain=ethereum.org&sz=128",
    },
    */
    {
      id: "robinhood",
      label: "ROBINHOOD TESTNET",
      name: "Robinhood Testnet",
      chainId: 46630,
      currency: "ETH",
      amount: "0.001 ETH",
      dripAmount: 0.001,
      rpcUrl: "https://rpc.testnet.chain.robinhood.com",
      explorerUrl: "https://explorer.testnet.chain.robinhood.com",
      enabled: true,
      accent: "from-lime-300 to-lime-500",
      icon: "R",
      image: "/images/nfts/rider.png",
      logoUrl: "https://www.google.com/s2/favicons?domain=robinhood.com&sz=128",
    },
    /*
    {
      id: "neura",
      label: "NEURA PROTOCOL",
      name: "Neura Testnet",
      chainId: 267,
      currency: "ANKR",
      amount: "0.0025 ANKR",
      dripAmount: 0.0025,
      rpcUrl: "https://testnet.rpc.neuraprotocol.io",
      explorerUrl: "https://testnet-blockscout.infra.neuraprotocol.io",
      enabled: true,
      accent: "from-blue-300 to-violet-400",
      icon: "N",
      image: "/images/nfts/nexora.png",
      logoUrl:
        "https://www.google.com/s2/favicons?domain=neuraprotocol.io&sz=128",
    },
    */
    {
      id: "arc",
      label: "TESTNET FAUCET",
      name: "Arc Testnet",
      chainId: 5042002,
      currency: "USDC",
      amount: "75 USDC",
      dripAmount: 75,
      rpcUrl: "https://rpc.testnet.arc.network",
      explorerUrl: "https://explorer.testnet.arc.network",
      enabled: true,
      accent: "from-purple-400 to-pink-400",
      icon: "A",
      image: "/images/nfts/arcparlor.png",
      // Circle's Arc Network (arc.io). The chain page uses arc.network for RPC
      // but arc.io is the brand site where the favicon lives.
      logoUrl: "https://www.google.com/s2/favicons?domain=arc.io&sz=128",
    },
    /*
    {
      id: "mona",
      label: "MONA TESTNET",
      name: "Mona Testnet",
      chainId: 0,
      currency: "MONA",
      amount: "0.01 MONA",
      dripAmount: 0.01,
      rpcUrl: "",
      explorerUrl: "",
      // Disabled until chainId/RPC are filled in and a matching
      // entry is added to FAUCET_NETWORKS in api/faucet/fulfill/route.ts.
      enabled: false,
      accent: "from-cyan-300 to-emerald-300",
      icon: "M",
      image: "/images/nfts/mongirl.png",
      logoUrl: "", // Mona is disabled; fall back to alphabet letter
    },
    */
  ],
};

type FaucetNetwork = (typeof FAUCET_CONFIG.networks)[number];

// Resolve the Access Pass chain once. Use thirdweb's built-in base chain
// when chainId === 8453 (cleaner ENS/RPC metadata than defineChain).
const accessPassChain =
  FAUCET_CONFIG.accessPass.chainId === 8453
    ? base
    : defineChain(FAUCET_CONFIG.accessPass.chainId);

const accessPassContract = getContract({
  client,
  chain: accessPassChain,
  address: FAUCET_CONFIG.accessPass.address,
});

const tweetStatusId = (value: string): string | null => {
  try {
    const url = new URL(value.trim());
    const hostOk = ["x.com", "twitter.com", "www.x.com", "www.twitter.com"].includes(
      url.hostname.toLowerCase()
    );
    if (!hostOk) return null;
    const match = url.pathname.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};

const isTweetUrl = (value: string) => tweetStatusId(value) !== null;

// Extract the canonical retweet target's tweet ID from
// FAUCET_CONFIG.retweetPostUrl (which is an `intent/post?url=…` link).
const targetTweetId = (() => {
  try {
    const intent = new URL(FAUCET_CONFIG.retweetPostUrl);
    const inner = intent.searchParams.get("url");
    return inner ? tweetStatusId(inner) : null;
  } catch {
    return null;
  }
})();

const shortenAddress = (address: string) =>
  address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

// Cooldown is tracked per (network, wallet) so claiming on one testnet
// doesn't gate the others. Mirrors the server-side claimKey in
// api/faucet/fulfill/route.ts.
const cooldownKey = (addr: string, networkId: string) =>
  `clara-faucet-access-pass-claim:${networkId}:${addr.toLowerCase()}`;

const formatTimeLeft = (ms: number) => {
  if (ms <= 0) return "Ready";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
};

export default function FaucetPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#130816] px-4 py-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-fuchsia-300" />
          </div>
        </main>
      }
    >
      <FaucetPageContent />
    </Suspense>
  );
}

function FaucetPageContent() {
  const searchParams = useSearchParams();
  const selectedNetwork = searchParams.get("network");
  const selectedFaucetMatch = FAUCET_CONFIG.networks.find(
    (network) => network.id === selectedNetwork
  );
  const selectedFaucet =
    selectedFaucetMatch ??
    FAUCET_CONFIG.networks.find((network) => network.id === "robinhood")!;
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const { toast } = useToast();

  const [now, setNow] = useState(Date.now());
  const [tweetLink, setTweetLink] = useState("");
  const [retweetVerified, setRetweetVerified] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [accessPassMinting, setAccessPassMinting] = useState(false);

  const {
    data: accessPassBalance,
    isLoading: isAccessPassLoading,
    refetch: refetchAccessPass,
  } = useReadContract(balanceOf, {
    contract: accessPassContract,
    owner: account?.address || "0x0000000000000000000000000000000000000000",
    queryOptions: {
      enabled: !!account?.address,
    },
  });

  const hasAccessPass =
    typeof accessPassBalance === "bigint" && accessPassBalance > BigInt(0);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!account?.address) return;
    refetchAccessPass();
  }, [account?.address, refetchAccessPass]);

  useEffect(() => {
    setRetweetVerified(false);
  }, [account?.address]);

  const cooldownMsLeft = useMemo(() => {
    if (typeof window === "undefined") return 0;
    if (!account?.address) return 0;
    const raw = localStorage.getItem(
      cooldownKey(account.address, selectedFaucet.id)
    );
    if (!raw) return 0;
    const last = Number(raw);
    if (Number.isNaN(last)) return 0;
    const until =
      last + FAUCET_CONFIG.accessPassCooldownHours * 60 * 60 * 1000;
    return Math.max(0, until - now);
  }, [account?.address, selectedFaucet.id, now]);

  const completedTasks = Number(hasAccessPass) + Number(retweetVerified);
  const isEligible =
    !!account?.address &&
    hasAccessPass &&
    retweetVerified &&
    cooldownMsLeft === 0 &&
    !isClaiming;

  // Auto-verify the retweet link as the user types. Mirrors the previous
  // handleRetweetCheck logic but without a button — the green/red mark
  // updates immediately when the URL becomes valid.
  const verifyRetweet = (value: string) => {
    const pastedId = tweetStatusId(value);
    const ok =
      pastedId !== null && (!targetTweetId || pastedId !== targetTweetId);
    setRetweetVerified(ok);
  };

  // Lifted from ClaimAccessPassButton so both that card and the inline
  // "Claim Access Pass" action on the task row can trigger the same mint.
  const handleClaimAccessPass = async () => {
    if (accessPassMinting) return;
    if (!account?.address) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Connect a wallet to mint the Access Pass.",
      });
      return;
    }
    if (hasAccessPass) {
      toast({
        title: "Already claimed",
        description: "This wallet already owns an Access Pass.",
      });
      return;
    }

    try {
      setAccessPassMinting(true);

      if (activeChain?.id !== FAUCET_CONFIG.accessPass.chainId) {
        toast({ description: "Switching network…" });
        await switchChain(accessPassChain);
      }

      const transaction = claimTo({
        contract: accessPassContract,
        to: account.address,
        quantity: BigInt(1),
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      await waitForReceipt({
        client,
        chain: accessPassChain,
        transactionHash,
      });

      toast({
        title: "Access Pass minted",
        description: `Tx: ${shortenAddress(transactionHash)}`,
      });
      refetchAccessPass();
    } catch (e) {
      console.error("[handleClaimAccessPass] mint failed:", e);
      toast({
        variant: "destructive",
        title: "Mint failed",
        description: (e as Error)?.message ?? "Unknown error",
      });
    } finally {
      setAccessPassMinting(false);
    }
  };

  const handleRecheck = async () => {
    if (!account?.address) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Connect your wallet to check eligibility.",
      });
      return;
    }

    const result = await refetchAccessPass();
    const nextBalance = result.data;
    const nextHasAccessPass =
      typeof nextBalance === "bigint" && nextBalance > BigInt(0);
    const missingTasks = [
      !nextHasAccessPass ? "Access Pass not claimed" : "",
      !retweetVerified ? "Retweet not verified" : "",
      cooldownMsLeft > 0
        ? `24-hour cooldown active (${formatTimeLeft(cooldownMsLeft)} left)`
        : "",
    ].filter(Boolean);

    if (missingTasks.length === 0) {
      toast({
        title: "Eligible",
        description: "All tasks are complete. You can claim free ETH now.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Not eligible",
        description: `Missing: ${missingTasks.join(", ")}.`,
      });
    }
  };

  const handleClaim = async () => {
    if (!account?.address) {
      toast({
        variant: "destructive",
        title: "Wallet not connected",
        description: "Connect your Access Pass wallet first.",
      });
      return;
    }
    if (!hasAccessPass) {
      toast({
        variant: "destructive",
        title: "Access Pass not claimed",
        description: "This wallet has not claimed the Access Pass.",
      });
      return;
    }
    if (!retweetVerified) {
      toast({
        variant: "destructive",
        title: "Retweet not verified",
        description: "Paste and check your retweet link first.",
      });
      return;
    }
    if (cooldownMsLeft > 0) {
      toast({
        variant: "destructive",
        title: "Daily claim already used",
        description: `Try again in ${formatTimeLeft(cooldownMsLeft)}.`,
      });
      return;
    }

    setIsClaiming(true);
    try {
      const res = await fetch("/api/faucet/fulfill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessPassClaim: true,
          customer: account.address,
          network: selectedFaucet.id,
          payer: account.address,
          retweetUrl: tweetLink,
        }),
      });

      const json = (await res.json()) as
        | { ok: true; ethTxHash: string }
        | { ok: false; error: string };

      if (!res.ok || !("ok" in json) || !json.ok) {
        throw new Error(
          (json as { error?: string })?.error ??
            `Claim failed (HTTP ${res.status}).`
        );
      }

      localStorage.setItem(
        cooldownKey(account.address, selectedFaucet.id),
        String(Date.now())
      );

      toast({
        title: "ETH sent",
        description: `${selectedFaucet.amount} sent to ${shortenAddress(account.address)}.`,
      });
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Claim failed",
        description: (e as Error)?.message ?? "Unknown error",
      });
    } finally {
      setIsClaiming(false);
    }
  };

  if (!selectedFaucetMatch) {
    return <FaucetNetworkSelector />;
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-purple-950/30 to-black pt-28 pb-20 px-4 text-white">
      <PurpleGlowBackground />

      <div className="container relative z-10 mx-auto max-w-5xl">
        {/* Hero — title left, floating network badge right */}
        <div className="mb-10 flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between md:text-left">
          <div className="text-center md:text-left">
            <Link
              href="/faucet"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/30 px-3 py-1 text-xs font-medium text-gray-300 backdrop-blur-md transition-colors hover:border-purple-400 hover:text-white"
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full bg-gradient-to-br",
                  selectedFaucet.accent
                )}
              />
              <span className="font-semibold uppercase tracking-[0.18em]">
                {selectedFaucet.name}
              </span>
              <span className="opacity-50">·</span>
              <span>change</span>
            </Link>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {selectedFaucet.name.replace(/\s*Testnet$/i, "")}{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Faucet
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-lg text-gray-300">
              Complete the tasks and receive{" "}
              <span className="font-semibold text-purple-200">
                {selectedFaucet.amount}
              </span>{" "}
              for free every {FAUCET_CONFIG.accessPassCooldownHours} hour
              {FAUCET_CONFIG.accessPassCooldownHours === 1 ? "" : "s"}.
            </p>
          </div>

          <FloatingHeroBadge network={selectedFaucet} />
        </div>

        {/* Main card */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-purple-900/40 bg-gradient-to-b from-gray-900/80 to-black/80 shadow-xl shadow-purple-900/30 backdrop-blur-sm">
            <div className="grid gap-6 p-6 md:p-8 lg:grid-cols-[1fr_280px]">
              {/* Left: tasks + claim */}
              <div>
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-white md:text-2xl">
                      Complete all tasks
                    </h2>
                    <P className="mt-1 text-sm text-gray-400">
                      Your wallet is checked automatically after connection.
                    </P>
                  </div>
                  <ProgressRing completed={completedTasks} total={2} />
                </div>

                {/* Tasks panel */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-xl">
                  <TaskRow
                    complete={hasAccessPass}
                    loading={isAccessPassLoading}
                    icon={<ShieldCheck className="h-4 w-4" />}
                    title="Access Pass claimed"
                    action={
                      hasAccessPass ? (
                        <VerificationMark complete />
                      ) : (
                        <button
                          type="button"
                          onClick={handleClaimAccessPass}
                          disabled={accessPassMinting || isAccessPassLoading}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-all duration-200",
                            "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:-translate-y-0.5",
                            (accessPassMinting || isAccessPassLoading) &&
                              "cursor-not-allowed opacity-60 hover:translate-y-0"
                          )}
                        >
                          {accessPassMinting ? (
                            <>
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Minting…
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="h-3 w-3" />
                              Claim Access Pass
                            </>
                          )}
                        </button>
                      )
                    }
                  />

                  <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                    <TaskRow
                      complete={retweetVerified}
                      loading={false}
                      icon={<Twitter className="h-4 w-4" />}
                      title="Retweet the post"
                      action={
                        FAUCET_CONFIG.retweetPostUrl ? (
                          <Link
                            href={FAUCET_CONFIG.retweetPostUrl}
                            target="_blank"
                            className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-gray-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:bg-white/15"
                          >
                            Open <ExternalLink className="h-3 w-3" />
                          </Link>
                        ) : (
                          <Badge className="border-white/10 bg-white/10 text-gray-300 hover:bg-white/10">
                            Link soon
                          </Badge>
                        )
                      }
                    />
                    <div className="group relative">
                      <Link2 className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-fuchsia-300" />
                      <Input
                        value={tweetLink}
                        onChange={(e) => {
                          const value = e.target.value;
                          setTweetLink(value);
                          // Auto-verify as the user types — no Check button.
                          verifyRetweet(value);
                        }}
                        placeholder="Paste your retweet link"
                        className={cn(
                          "border-white/15 bg-black/30 pl-10 pr-10 text-white placeholder:text-gray-500 transition-all focus-visible:bg-black/40 focus-visible:ring-2",
                          tweetLink.trim() === ""
                            ? "focus-visible:border-fuchsia-400/60 focus-visible:ring-fuchsia-400/30"
                            : retweetVerified
                            ? "border-emerald-400/50 focus-visible:border-emerald-400/70 focus-visible:ring-emerald-400/30"
                            : "border-red-400/50 focus-visible:border-red-400/70 focus-visible:ring-red-400/30"
                        )}
                      />
                      {/* Inline live-validation indicator */}
                      {tweetLink.trim() !== "" && (
                        <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                          {retweetVerified ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-400" />
                          )}
                        </span>
                      )}
                      {/* Focus glow */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -inset-0.5 rounded-md opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 50%, rgba(217,70,239,0.18), transparent 70%)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 grid gap-3">
                  <Button
                    type="button"
                    onClick={handleRecheck}
                    variant="outline"
                    className="h-12 border-white/15 bg-white/5 text-gray-200 backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:bg-white/10 hover:text-white"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Click here & Press button below 
                  </Button>
                  <ClaimMainButton
                    isEligible={isEligible}
                    isClaiming={isClaiming}
                    cooldownMsLeft={cooldownMsLeft}
                    amountLabel={selectedFaucet.amount}
                    onClick={handleClaim}
                  />
                </div>

                {/* Status pill */}
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-white/[0.02] p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <InfoStatus eligible={isEligible} />
                    <Small className="text-gray-200">
                      {isEligible
                        ? "Eligible to claim"
                        : hasAccessPass
                        ? "Complete the retweet task"
                        : "Access Pass not claimed"}
                    </Small>
                  </div>
                  {account?.address && (
                    <Small className="font-mono text-gray-400">
                      {shortenAddress(account.address)}
                    </Small>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <ClaimAccessPassButton
                  hasAccessPass={hasAccessPass}
                  minting={accessPassMinting}
                  onMint={handleClaimAccessPass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Animated SVG progress ring: 0/2 → 2/2. Smooth stroke-dashoffset
 * transition + scale-in checkmark when complete.
 */
function FloatingHeroBadge({ network }: { network: FaucetNetwork }) {
  return (
    <div className="relative flex h-36 w-36 shrink-0 items-center justify-center md:h-44 md:w-44 motion-safe:animate-float">
      <div
        aria-hidden
        className={cn(
          "absolute inset-1 rounded-[28px] bg-gradient-to-br opacity-30 blur-2xl",
          network.accent
        )}
      />
      <div className="relative flex h-full w-full flex-col items-center justify-center rounded-[28px] border border-purple-900/40 bg-gradient-to-b from-gray-900/80 to-black/80 shadow-xl shadow-purple-900/30 backdrop-blur-sm">
        <NetworkLogo network={network} size="lg" />
        <div className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-300">
          {network.currency}
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the network's brand image as a circular logo. If the image
 * fails to load (or the network has no image set), falls back to the
 * network's alphabet icon over its accent gradient.
 */
function NetworkLogo({
  network,
  size = "md",
}: {
  network: FaucetNetwork;
  size?: "sm" | "md" | "lg";
}) {
  // Two-step fallback: real testnet logo (logoUrl) → alphabet letter on the
  // network's accent gradient. We swap to the letter on any image error.
  const [errored, setErrored] = useState(false);

  const dims =
    size === "lg"
      ? { box: "h-16 w-16 md:h-20 md:w-20", text: "text-3xl md:text-4xl", px: 96 }
      : size === "sm"
      ? { box: "h-9 w-9", text: "text-sm", px: 40 }
      : { box: "h-12 w-12", text: "text-lg", px: 56 };

  const src = network.logoUrl?.trim() || "";

  if (errored || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-gradient-to-br font-extrabold text-black shadow-lg",
          network.accent,
          dims.box,
          dims.text
        )}
      >
        {network.icon}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-white/95 p-1.5 shadow-lg",
        dims.box
      )}
    >
      <Image
        src={src}
        alt={`${network.name} logo`}
        width={dims.px}
        height={dims.px}
        unoptimized
        className="h-full w-full object-contain"
        onError={() => setErrored(true)}
      />
    </div>
  );
}

function ProgressRing({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const size = 64;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = total === 0 ? 0 : completed / total;
  const offset = circumference * (1 - progress);
  const done = completed === total;

  return (
    <div className="relative">
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="60%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ring-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
          style={{
            filter: done
              ? "drop-shadow(0 0 6px rgba(232,121,249,0.7))"
              : undefined,
          }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-center">
        {done ? (
          <CheckCircle2 className="h-5 w-5 text-fuchsia-200" />
        ) : (
          <div>
            <div className="text-base font-bold leading-none text-white">
              {completed}
              <span className="text-gray-500">/{total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Main claim CTA.
 */
function ClaimMainButton({
  isEligible,
  isClaiming,
  cooldownMsLeft,
  amountLabel,
  onClick,
}: {
  isEligible: boolean;
  isClaiming: boolean;
  cooldownMsLeft: number;
  amountLabel: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isEligible}
      className={cn(
        "group/main relative h-14 w-full rounded-2xl text-base font-semibold tracking-wide text-white transition-all duration-300",
        isEligible
          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:-translate-y-1"
          : "cursor-not-allowed bg-purple-950/50 text-gray-400 opacity-80"
      )}
    >
      {/* Homepage-style blurred backdrop glow on hover */}
      {isEligible && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 blur-xl transition-opacity duration-300 group-hover/main:opacity-100"
        />
      )}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {isClaiming ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : cooldownMsLeft > 0 ? (
          <>
            <Clock className="h-4 w-4" />
            Claim again in {formatTimeLeft(cooldownMsLeft)}
          </>
        ) : (
          <>
            <Droplets className="h-4 w-4" />
            Get {amountLabel}
          </>
        )}
      </span>
    </button>
  );
}

function TaskRow({
  action,
  complete,
  icon,
  loading,
  title,
}: {
  action?: React.ReactNode;
  complete: boolean;
  icon: React.ReactNode;
  loading: boolean;
  title: string;
}) {
  return (
    <div className="group/task flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300",
            complete
              ? "border-emerald-400/70 bg-emerald-400/15 text-emerald-300 shadow-[0_0_18px_-2px_rgba(74,222,128,0.55)]"
              : "border-white/20 bg-white/5 text-gray-300 group-hover/task:border-fuchsia-300/40 group-hover/task:text-fuchsia-200"
          )}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : complete ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            icon
          )}
        </div>
        <Small
          className={cn(
            "font-medium transition-colors",
            complete ? "text-white" : "text-gray-300"
          )}
        >
          {title}
        </Small>
      </div>
      {action}
    </div>
  );
}

function FaucetNetworkSelector() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-purple-950/30 to-black pt-28 pb-20 px-4 text-white">
      <PurpleGlowBackground />

      <div className="container relative z-10 mx-auto">
        <div className="mb-12 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/30 px-3 py-1 backdrop-blur-md">
            <span
              className={cn(
                "h-2 w-2 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
              )}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-100">
              Multi-network faucet
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Choose your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              testnet
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Pick a network and complete two quick tasks to claim free testnet
            tokens. 24-hour cooldown per wallet.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FAUCET_CONFIG.networks.map((network) => (
            <NetworkCard key={network.id} network={network} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NetworkCard({ network }: { network: FaucetNetwork }) {
  const inner = (
    <Tilt3D
      enabled={network.enabled}
      maxDeg={6}
      className={cn(
        "group/card relative h-full overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-500 [transform-style:preserve-3d]",
        network.enabled
          ? "border-purple-900/40 bg-gradient-to-b from-gray-900/80 to-black/80 hover:-translate-y-2 hover:border-purple-500/60 hover:shadow-xl hover:shadow-purple-900/30"
          : "border-purple-900/20 bg-gradient-to-b from-gray-900/60 to-black/60 opacity-60"
      )}
    >
      {/* Soft accent glow that intensifies on hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-gradient-to-br opacity-20 blur-3xl transition-opacity duration-500 group-hover/card:opacity-40",
          network.accent
        )}
      />

      <div className="relative z-10 p-6 [transform:translateZ(30px)]">
        <div className="mb-6 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <NetworkLogo network={network} size="md" />
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                {network.label}
              </div>
              <div className="text-lg font-bold text-white">
                {network.name}
              </div>
            </div>
          </div>
          {!network.enabled && (
            <Badge className="border-purple-900/40 bg-purple-950/40 text-gray-300 hover:bg-purple-950/40">
              Soon
            </Badge>
          )}
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-extrabold text-transparent">
            {network.amount}
          </span>
          <span className="text-xs uppercase tracking-wider text-gray-500">
            / 24h
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <span className="text-gray-400">
            {network.enabled ? "Tap to claim" : "Coming soon"}
          </span>
          {network.enabled && (
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-500/40 bg-purple-950/40 text-purple-200 transition-all duration-300 group-hover/card:border-pink-400/70 group-hover/card:bg-purple-900/60 group-hover/card:translate-x-1">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>
    </Tilt3D>
  );

  return network.enabled ? (
    <Link
      href={`/faucet?network=${network.id}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
    >
      {inner}
    </Link>
  ) : (
    <div>{inner}</div>
  );
}

/**
 * 3D tilt wrapper — tracks the cursor over the element and applies
 * `perspective(900px) rotateX/rotateY` proportional to cursor position
 * (default ±6°). Smooth return-to-rest on leave. No tilt on touch
 * devices or when the user prefers reduced motion.
 */
function Tilt3D({
  children,
  className,
  enabled = true,
  maxDeg = 6,
}: {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
  maxDeg?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    const rotY = cx * maxDeg * 2;
    const rotX = -cy * maxDeg * 2;
    setTransform(
      `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
    );
  };

  const onLeave = () => setTransform("");

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("motion-reduce:!transform-none", className)}
      style={{
        transform: transform || "perspective(900px) rotateX(0) rotateY(0)",
        transition: transform
          ? "transform 60ms linear"
          : "transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Background decoration matching the homepage style: two soft
 * purple/pink blurred blobs + a couple of slow-floating Ellipse SVGs
 * for a subtle 3D feel. No infinite-loop maximalist animations.
 */
function PurpleGlowBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-pink-600/5 blur-3xl" />
      <div className="absolute top-0 right-[8%] h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />
      {/* Floating decorative ellipses — gentle up/down motion */}
      <div className="absolute right-[6%] top-[20%] h-24 w-24 opacity-30 motion-safe:animate-float">
        <Image
          src="/images/Ellipse7.svg"
          alt=""
          width={96}
          height={96}
          className="h-full w-full"
          aria-hidden
        />
      </div>
      <div className="absolute left-[6%] bottom-[18%] h-28 w-28 opacity-20 motion-safe:animate-float-slow">
        <Image
          src="/images/Ellipse6.svg"
          alt=""
          width={112}
          height={112}
          className="h-full w-full"
          aria-hidden
        />
      </div>
    </div>
  );
}
function InfoStatus({ eligible }: { eligible: boolean }) {
  return (
    <div className="relative flex h-6 w-6 items-center justify-center">
      {eligible ? (
        <>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-emerald-400/30 blur-md"
          />
          <CheckCircle2 className="relative h-5 w-5 text-emerald-300" />
        </>
      ) : (
        <>
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-amber-400/20 blur-md"
          />
          <AlertCircle className="relative h-5 w-5 text-amber-300" />
        </>
      )}
    </div>
  );
}

function VerificationMark({ complete }: { complete: boolean }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300",
        complete
          ? "border border-emerald-400/40 bg-emerald-400/15 text-emerald-200 shadow-[0_0_14px_-2px_rgba(74,222,128,0.45)]"
          : "border border-white/15 bg-white/10 text-gray-300"
      )}
    >
      {complete ? (
        <CheckCircle2 className="h-3 w-3" />
      ) : (
        <AlertCircle className="h-3 w-3" />
      )}
      {complete ? "Verified" : "Pending"}
    </div>
  );
}

function ClaimAccessPassButton({
  hasAccessPass,
  minting,
  onMint,
}: {
  hasAccessPass: boolean;
  minting: boolean;
  onMint: () => void;
}) {
  // Presentational only — mint state and handler live in FaucetPageContent
  // so both this card and the inline task-row action share the same flow.
  const handleMint = onMint;

  const interactive = !minting && !hasAccessPass;

  return (
    <div className="group/access relative">
      {/* Glow halo behind the card — pulses on hover */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -inset-px rounded-2xl bg-[conic-gradient(from_140deg,rgba(217,70,239,0.55),rgba(236,72,153,0.45),rgba(168,85,247,0.55),rgba(217,70,239,0.55))] opacity-40 blur-md transition-opacity duration-300",
          interactive && "group-hover/access:opacity-90"
        )}
      />

      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#1e0c24]/95 via-[#160819]/95 to-[#0c0510]/95 p-4 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500/30 to-pink-500/20 ring-1 ring-inset ring-white/10">
              <ShieldCheck className="h-3.5 w-3.5 text-fuchsia-200" />
            </div>
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Access Pass
            </span>
          </div>
          {hasAccessPass && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Owned
            </span>
          )}
        </div>
        <div className="group/mint relative mt-4">
          <button
            type="button"
            onClick={handleMint}
            aria-disabled={!interactive}
            className={cn(
              "relative flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold tracking-wide text-white transition-transform duration-200",
              "bg-[linear-gradient(120deg,#a21caf_0%,#db2777_50%,#a21caf_100%)]",
              "shadow-[0_8px_30px_-12px_rgba(217,70,239,0.7)]",
              interactive
                ? "hover:scale-[1.01] active:scale-[0.99]"
                : "cursor-not-allowed opacity-55"
            )}
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              {minting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Minting…
                </>
              ) : hasAccessPass ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Already minted
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Claim Access Pass
                </>
              )}
            </span>
          </button>

          <div className="pointer-events-none absolute left-1/2 top-full z-30 w-56 -translate-x-1/2 pt-3 opacity-0 transition-opacity duration-200 group-hover/mint:opacity-100">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black/80 p-2 shadow-[0_25px_60px_-22px_rgba(217,70,239,0.65)] backdrop-blur-xl">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/images/nfts/access.png"
                  alt="Access Pass"
                  width={208}
                  height={208}
                  className="h-auto w-full"
                  priority={false}
                />
              </div>
              <div className="mt-2 flex items-center justify-between px-1 pb-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-fuchsia-200">
                  {hasAccessPass ? "Owned" : "Free Mint"}
                </span>
                <span className="text-[11px] text-gray-300">1 / wallet</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
