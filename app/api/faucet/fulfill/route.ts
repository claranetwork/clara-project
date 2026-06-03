import { NextResponse } from "next/server";
import {
  createThirdwebClient,
  defineChain,
  eth_getTransactionByHash,
  eth_getTransactionReceipt,
  getContract,
  getRpcClient,
  prepareTransaction,
  sendTransaction,
  toWei,
  waitForReceipt,
} from "thirdweb";
import { base } from "thirdweb/chains";
import { balanceOf } from "thirdweb/extensions/erc721";
import { privateKeyToAccount } from "thirdweb/wallets";

import { arcTestnet, robinhoodTestnet } from "@/lib/chain";

const PAYMENT_USDC = 1;
// Access Pass on Base — must match configs/nfts.json (hash="access") and
// FAUCET_CONFIG.accessPass in app/(app)/faucet/page.tsx.
const ACCESS_PASS_ADDRESS = "0x87DC0a9455f00C6426877cD5b8A7E14404acf748";
const ACCESS_PASS_CHAIN = base;
// Must match FAUCET_CONFIG.accessPassCooldownHours in app/(app)/faucet/page.tsx
const ACCESS_PASS_COOLDOWN_MS = 24 * 60 * 60 * 1000;
// ── Temporarily disabled networks ──
// Uncomment any entry below (and the matching network in
// app/(app)/faucet/page.tsx FAUCET_CONFIG.networks) to bring it back.
const FAUCET_NETWORKS = {
  arc: {
    amount: 100,
    chain: arcTestnet,
    symbol: "USDC",
  },
  /*
  monad: {
    amount: 0.05,
    chain: defineChain({
      id: 10143,
      name: "Monad Testnet",
      rpc: "https://testnet-rpc.monad.xyz",
      nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
      blockExplorers: [{ name: "Monad Explorer", url: "https://testnet.monadexplorer.com" }],
      testnet: true,
    }),
    symbol: "MON",
  },
  neura: {
    amount: 0.0025,
    chain: defineChain({
      id: 267,
      name: "Neura Testnet",
      rpc: "https://testnet.rpc.neuraprotocol.io",
      nativeCurrency: { name: "ANKR", symbol: "ANKR", decimals: 18 },
      blockExplorers: [
        { name: "Neura Explorer", url: "https://testnet-blockscout.infra.neuraprotocol.io" },
      ],
      testnet: true,
    }),
    symbol: "ANKR",
  },
  */
  robinhood: {
    amount: 0.001,
    chain: robinhoodTestnet,
    symbol: "ETH",
  },
  /*
  sepolia: {
    amount: 0.005,
    chain: defineChain({
      id: 11155111,
      name: "Sepolia Testnet",
      rpc: "https://ethereum-sepolia-rpc.publicnode.com",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      blockExplorers: [{ name: "Etherscan", url: "https://sepolia.etherscan.io" }],
      testnet: true,
    }),
    symbol: "ETH",
  },
  */
} as const;

type Ok = { ok: true; ethTxHash: string };
type Err = { ok: false; error: string };

const LOG = "[faucet/fulfill]";

// ⚠️  Process-local state — NOT production-safe.
//
// The three structures below live in Node's memory and are wiped on every
// dev hot-reload, server restart, or fresh Lambda/edge invocation. They are
// also NOT shared between multiple Next.js instances behind a load balancer,
// so two pods will happily fulfill the same claim twice.
//
// For production, back these with a persistent + shared store:
//   • Vercel KV / Upstash Redis (`SETNX` for pending, `SET EX` for cooldown,
//     a sorted-set or hash for processed hashes).
//   • Or a Postgres/Mongo table keyed on payment hash / wallet address.
//
// Keeping the in-memory shim during local dev is fine — just swap before
// deploying.
const processedPaymentHashes = new Set<string>();
const pendingPaymentHashes = new Set<string>();
const accessPassClaims = new Map<string, number>();

function err(message: string, status = 400): NextResponse<Err> {
  console.error(`${LOG} -> ${status}: ${message}`);
  return NextResponse.json({ ok: false, error: message }, { status });
}

function receiptOk(status: unknown): boolean {
  return status === "success" || status === "0x1" || status === 1;
}

// The canonical target tweet — the one the user is supposed to retweet.
// Must mirror FAUCET_CONFIG.retweetPostUrl on the client.
const TARGET_TWEET_ID = "2042694730564469010";

function tweetStatusId(value: string | undefined): string | null {
  if (!value) return null;
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
}

export async function POST(req: Request): Promise<NextResponse<Ok | Err>> {
  const ct = req.headers.get("content-type") ?? "(none)";
  const cl = req.headers.get("content-length") ?? "(none)";
  console.log(`${LOG} POST received. content-type=${ct} content-length=${cl}`);

  let rawBody = "";
  try {
    rawBody = await req.text();
  } catch (e) {
    return err(`Could not read request body: ${(e as Error).message}`);
  }
  console.log(`${LOG} raw body (${rawBody.length} chars): ${rawBody.slice(0, 200)}`);

  if (!rawBody.trim()) {
    return err("Empty request body.");
  }

  let body: {
    accessPassClaim?: boolean;
    customer?: string;
    network?: string;
    payer?: string;
    paymentTxHash?: string;
    retweetUrl?: string;
  };
  try {
    body = JSON.parse(rawBody) as typeof body;
  } catch (e) {
    return err(`Invalid JSON body: ${(e as Error).message}.`);
  }

  const customer = body.customer?.trim();
  const requestedNetwork = body.network?.trim() || "robinhood";
  const payer = body.payer?.trim();
  const paymentTxHash = body.paymentTxHash?.trim();
  const accessPassClaim = body.accessPassClaim === true;
  console.log(`${LOG} customer=${customer} network=${requestedNetwork} payer=${payer} paymentTxHash=${paymentTxHash} accessPassClaim=${accessPassClaim}`);

  if (!customer || !/^0x[a-fA-F0-9]{40}$/.test(customer)) {
    return err("Missing or invalid `customer` address.");
  }
  if (payer && !/^0x[a-fA-F0-9]{40}$/.test(payer)) {
    return err("Invalid `payer` address.");
  }
  if (!accessPassClaim && (!paymentTxHash || !/^0x[a-fA-F0-9]{64}$/.test(paymentTxHash))) {
    return err("Missing or invalid `paymentTxHash`.");
  }
  const faucetNetwork =
    FAUCET_NETWORKS[requestedNetwork as keyof typeof FAUCET_NETWORKS];
  if (!faucetNetwork) {
    return err(`Faucet network '${requestedNetwork}' is not configured yet.`, 400);
  }

  const secretKey = process.env.THIRDWEB_SECRET_KEY;
  const devPrivateKey = process.env.DEVELOPER_PRIVATE_KEY;
  const devWallet = process.env.NEXT_PUBLIC_DEVELOPER_WALLET;

  if (!secretKey) {
    return err("Server misconfigured: THIRDWEB_SECRET_KEY missing in .env.local.", 500);
  }
  if (!devPrivateKey) {
    return err("Server misconfigured: DEVELOPER_PRIVATE_KEY missing in .env.local.", 500);
  }
  if (!devWallet) {
    return err("Server misconfigured: NEXT_PUBLIC_DEVELOPER_WALLET missing.", 500);
  }

  const serverClient = createThirdwebClient({ secretKey });
  const devAccount = privateKeyToAccount({
    client: serverClient,
    privateKey: devPrivateKey,
  });

  console.log(
    `${LOG} signer ready. devAccount=${devAccount.address}; paymentChain=${arcTestnet.name}; payoutChain=${faucetNetwork.chain.name}`
  );

  if (devAccount.address.toLowerCase() !== devWallet.toLowerCase()) {
    return err(
      `DEVELOPER_PRIVATE_KEY signs ${devAccount.address} but NEXT_PUBLIC_DEVELOPER_WALLET is ${devWallet}. They must match.`,
      500
    );
  }

  const arcRpc = getRpcClient({ client: serverClient, chain: arcTestnet });

  if (accessPassClaim) {
    if (!payer || payer.toLowerCase() !== customer.toLowerCase()) {
      return err("Access Pass claims must be sent to the connected wallet.");
    }
    const pastedTweetId = tweetStatusId(body.retweetUrl);
    if (!pastedTweetId) {
      return err("Retweet verification is required before claiming.");
    }
    if (pastedTweetId === TARGET_TWEET_ID) {
      return err(
        "The pasted link is the original post, not your retweet/quote. Retweet the post and paste your quote tweet's link."
      );
    }
    // NOTE: this only proves the URL *looks* like a different status — it
    // does not prove the user actually retweeted our target. For real
    // verification, wire X API v2 (GET /2/tweets/:id/retweeted_by) here.

    const claimKey = `${requestedNetwork}:${customer.toLowerCase()}`;
    const lastClaimedAt = accessPassClaims.get(claimKey) ?? 0;
    const nextClaimAt = lastClaimedAt + ACCESS_PASS_COOLDOWN_MS;
    if (Date.now() < nextClaimAt) {
      return err(
        `Access Pass free claim is on cooldown until ${new Date(nextClaimAt).toISOString()}.`
      );
    }

    const accessPassContract = getContract({
      client: serverClient,
      chain: ACCESS_PASS_CHAIN,
      address: ACCESS_PASS_ADDRESS,
    });

    let accessPassBalance: bigint;
    try {
      accessPassBalance = await balanceOf({
        contract: accessPassContract,
        owner: customer,
      });
    } catch (e) {
      // Most likely cause: ACCESS_PASS_ADDRESS doesn't point at a standard
      // ERC721 with `balanceOf(address)` on the configured chain (wrong
      // address, ERC1155, custom interface, or RPC issue).
      return err(
        `Could not verify Access Pass ownership at ${ACCESS_PASS_ADDRESS} on ${ACCESS_PASS_CHAIN.name}. ` +
          `Confirm the address is a standard ERC721 contract. Underlying error: ${(e as Error).message}`,
        500
      );
    }

    console.log(`${LOG} access pass balance for ${customer} = ${accessPassBalance.toString()}`);
    if (accessPassBalance < BigInt(1)) {
      return err("This wallet has not claimed the Access Pass.");
    }

    try {
      const transferTx = prepareTransaction({
        client: serverClient,
        chain: faucetNetwork.chain,
        to: customer,
        value: toWei(String(faucetNetwork.amount)),
      });

      console.log(`${LOG} sending free Access Pass drip ${faucetNetwork.amount} ${faucetNetwork.symbol} on ${faucetNetwork.chain.name} -> ${customer}`);
      const sent = await sendTransaction({
        transaction: transferTx,
        account: devAccount,
      });

      const ethReceipt = await waitForReceipt({
        client: serverClient,
        chain: faucetNetwork.chain,
        transactionHash: sent.transactionHash,
      });

      if (!receiptOk(ethReceipt.status)) {
        throw new Error(
          `Faucet transfer transaction did not succeed on ${faucetNetwork.chain.name} (status=${String(ethReceipt.status)}).`
        );
      }

      accessPassClaims.set(claimKey, Date.now());
      console.log(`${LOG} free Access Pass drip confirmed on ${faucetNetwork.chain.name}. hash=${sent.transactionHash}`);
      return NextResponse.json<Ok>({ ok: true, ethTxHash: sent.transactionHash });
    } catch (e) {
      console.error(`${LOG} free Access Pass drip threw:`, e);
      return err(
        `Free Access Pass drip failed on ${faucetNetwork.chain.name}: ${(e as Error)?.message ?? "unknown error"}`,
        500
      );
    }
  }

  const normalizedPaymentHash = paymentTxHash!.toLowerCase();
  if (processedPaymentHashes.has(normalizedPaymentHash)) {
    return err("This payment transaction has already been fulfilled.");
  }
  if (pendingPaymentHashes.has(normalizedPaymentHash)) {
    return err("This payment transaction is already being fulfilled. Please wait.");
  }

  let paymentReceipt: { status?: unknown; to?: string | null };
  try {
    paymentReceipt = await waitForReceipt({
      client: serverClient,
      chain: arcTestnet,
      transactionHash: paymentTxHash! as `0x${string}`,
    });
  } catch (waitErr) {
    console.warn(`${LOG} waitForReceipt failed, trying raw Arc RPC:`, waitErr);
    try {
      paymentReceipt = await eth_getTransactionReceipt(arcRpc, {
        hash: paymentTxHash! as `0x${string}`,
      });
    } catch (e) {
      return err(`Could not fetch payment receipt on Arc: ${(e as Error).message}`);
    }
  }

  console.log(
    `${LOG} payment receipt ok. status=${String(paymentReceipt.status)} to=${paymentReceipt.to}`
  );

  if (!receiptOk(paymentReceipt.status)) {
    return err(
      `Payment transaction did not succeed on Arc (status=${String(paymentReceipt.status)}).`
    );
  }
  if (!paymentReceipt.to || paymentReceipt.to.toLowerCase() !== devWallet.toLowerCase()) {
    return err(
      `Payment was sent to ${paymentReceipt.to ?? "null"}, expected ${devWallet}.`
    );
  }

  let paymentTx:
    | { from?: string | null; to?: string | null; value?: bigint | string | null }
    | undefined;
  try {
    paymentTx = await eth_getTransactionByHash(arcRpc, {
      hash: paymentTxHash! as `0x${string}`,
    });
  } catch (e) {
    return err(`Could not fetch payment transaction on Arc: ${(e as Error).message}`);
  }

  console.log(
    `${LOG} payment tx ok. from=${paymentTx.from} to=${paymentTx.to} value=${String(paymentTx.value)}`
  );

  if (payer && paymentTx.from?.toLowerCase() !== payer.toLowerCase()) {
    return err(
      `Payment was sent by ${paymentTx.from ?? "unknown"}, expected connected wallet ${payer}.`
    );
  }
  if (!paymentTx.to || paymentTx.to.toLowerCase() !== devWallet.toLowerCase()) {
    return err(
      `Payment transaction target is ${paymentTx.to ?? "null"}, expected ${devWallet}.`
    );
  }

  const paymentValue =
    typeof paymentTx.value === "bigint"
      ? paymentTx.value
      : BigInt(paymentTx.value ?? 0);
  const requiredPaymentWei = toWei(String(PAYMENT_USDC));
  if (paymentValue < requiredPaymentWei) {
    return err(
      `Payment amount is too low. Received ${paymentValue.toString()} wei, need ${requiredPaymentWei.toString()} wei (${PAYMENT_USDC} USDC).`
    );
  }

  pendingPaymentHashes.add(normalizedPaymentHash);
  try {
    const transferTx = prepareTransaction({
      client: serverClient,
      chain: faucetNetwork.chain,
      to: customer,
      value: toWei(String(faucetNetwork.amount)),
    });

    console.log(`${LOG} sending ${faucetNetwork.amount} native ${faucetNetwork.symbol} on ${faucetNetwork.chain.name} -> ${customer}`);
    const sent = await sendTransaction({
      transaction: transferTx,
      account: devAccount,
    });

    console.log(`${LOG} ETH transfer sent. hash=${sent.transactionHash}; waiting for receipt...`);
    const ethReceipt = await waitForReceipt({
      client: serverClient,
      chain: faucetNetwork.chain,
      transactionHash: sent.transactionHash,
    });

    if (!receiptOk(ethReceipt.status)) {
      throw new Error(
        `Faucet transfer transaction did not succeed on ${faucetNetwork.chain.name} (status=${String(ethReceipt.status)}).`
      );
    }

    processedPaymentHashes.add(normalizedPaymentHash);
    console.log(`${LOG} faucet transfer confirmed on ${faucetNetwork.chain.name}. hash=${sent.transactionHash}`);
    return NextResponse.json<Ok>({ ok: true, ethTxHash: sent.transactionHash });
  } catch (e) {
    console.error(`${LOG} ETH transfer threw:`, e);
    return err(
      `Faucet transfer failed on ${faucetNetwork.chain.name}: ${(e as Error)?.message ?? "unknown error"}`,
      500
    );
  } finally {
    pendingPaymentHashes.delete(normalizedPaymentHash);
  }
}
