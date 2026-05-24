import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { claimTo } from "thirdweb/extensions/erc721";
import { ContractOptions, defineChain, sendTransaction, waitForReceipt } from "thirdweb";
import { useActiveAccount, useActiveWalletChain, useSwitchActiveWalletChain } from "thirdweb/react";

import { cn } from "@/lib/utils";
import { P } from "@/components/typo";
import { client } from "@/lib/client";
import { Flex } from "@/components/elements";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import AlertIcon from "@/components/elements/icon";
import { zodResolver } from "@hookform/resolvers/zod";
import ConnectButton from "@/components/layouts/navbar/connect-button";
import { ActionChild, PrimaryButton, PrimaryButtonProto } from "@/components/elements/button";
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/components/ui/form";
import { robinhoodTestnet, pharosTestnet, dacTestnet } from "@/configs/chains";

const formSchema = z.object({
  quantity: z.number()
    .min(1, "Min 1")
    .max(10, "Max 10")
});

export default function MintForm(
  {
    nft,
    contract,
    claimedMint,
    reservedMints,
    refetchCondition,
    taskRemaining = 0,
    refetchClaimedMint,
  }
    :
    {
      nft: NFT,
      taskRemaining?: number,
      refetchCondition: () => void,
      refetchClaimedMint: () => void,
      claimedMint?: bigint | undefined,
      reservedMints?: bigint | undefined,
      contract: Readonly<ContractOptions<[], `0x${string}`>>
    }
) {
  const { toast } = useToast()
  const account = useActiveAccount();
  const activeChain = useActiveWalletChain();
  const switchChain = useSwitchActiveWalletChain();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1
    },
  });

  const { quantity } = form.watch()

  const getTotalPrice = (quantity: number, price: number) => {
    const totalPrice = quantity * price
    return totalPrice > 0 ? totalPrice : "free"
  }

  // Helper function to get chain configuration
  const getChainConfig = (chainId: number) => {
    if (chainId === 46630) { // Robinhood Testnet
      return robinhoodTestnet;
    }
    if (chainId === 688689) { // Pharos Testnet
      return pharosTestnet;
    }
    if (chainId === 21894) { // DAC Testnet
      return dacTestnet;
    }
    return defineChain(chainId);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.quantity > 0 && account?.address) {
      const transaction = claimTo({
        contract,
        to: account.address,
        quantity: BigInt(values.quantity),
      });

      try {
        setLoading(true)

        if (activeChain?.id !== nft.chainID) {
          toast({ description: "switching..." })
          await switchChain(getChainConfig(nft.chainID))
        }

        const { transactionHash } = await sendTransaction({
          transaction,
          account,
        });

        const receipt = await waitForReceipt({ 
          client, 
          chain: getChainConfig(nft.chainID), 
          transactionHash 
        });

        if (receipt) {
          toast({
            title: "Minted",
            description: `hash: ${transactionHash.substring(0, 10)}...`,
            variant: "default"
          })
          refetchCondition()
          refetchClaimedMint()
        }

      } catch (er) {
        console.log(er)
        toast({
          title: "Error",
          description: (er as Error).message || "Something went wrong",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
  }

  const ifDisabled = (): boolean => {
    if (nft.soldOut) return true
    if (!!nft.tasks) {
      if (claimedMint !== undefined && reservedMints !== undefined) {
        if (!!form.formState.errors.quantity || claimedMint >= reservedMints || taskRemaining > 0) {
          return true
        } else {
          return false
        }
      } else {
        return true
      }
    }
    if (loading || taskRemaining > 0) return true
    return false
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md rounded-2xl space-y-6 min-w-[35%] p-6 bg-gradient-to-b from-gray-900/80 to-black/80 border border-purple-900/40 backdrop-blur-sm">
        
        {/* Mint price info - Ultra Compact */}
        <div className="bg-gradient-to-b from-purple-900/60 to-purple-950/80 border border-purple-800/50 rounded-xl p-5 backdrop-blur-sm">
          <P className="text-gray-300 text-lg font-medium">
            {taskRemaining < 1 ?
              (quantity > 0 ?
                <Fragment>
                  Mint for <b><span className="text-white">{getTotalPrice(quantity, nft.price)}</span>{nft.price > 0 && ` ${nft.symbol}`}</b>
                </Fragment> :
                <Fragment>
                  Mint <b><span className="text-white">{nft.price}</span> {nft.symbol}</b>
                </Fragment>
              ) :
              <Flex className="items-start gap-3">
                <AlertIcon type={"info"} className="size-5 mt-[6px] flex-shrink-0 text-purple-400" />
                <span className="text-gray-300">
                  {account ?
                    "Complete tasks first" :
                    "Connect wallet"}
                </span>
              </Flex>
            }
          </P>
        </div>

        {!nft.tasks &&
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="pb-2">
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Qty (1-10)"
                    className="h-12 p-3 px-4 w-full text-base bg-gradient-to-b from-purple-900/40 to-black/80 border border-purple-800/50 text-white placeholder-gray-500 rounded-xl focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/30 transition-all"
                    disabled={!account}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <Flex className="items-center gap-3 mt-3">
                  <AlertIcon type={account ? form.formState.errors.quantity ? "error" : "success" : "info"} className="size-5 text-purple-400" />
                  <FormDescription className="text-gray-400 text-sm">
                    {account ?
                      form.formState.errors.quantity ?
                        form.formState.errors.quantity.message :
                        claimedMint !== undefined && reservedMints !== undefined && `${claimedMint}/${reservedMints > 1000000000000 ? "∞" : reservedMints}`
                      :
                      "Connect wallet"
                    }
                  </FormDescription>
                </Flex>
              </FormItem>
            )}
          />
        }

        <div className={cn(
          "space-y-2 min-w-[300px] max-w-[350px]",
          (!!form.formState.errors.quantity || loading || taskRemaining > 0) && account ? "cursor-not-allowed opacity-70" : "cursor-pointer"
        )}
        >
          {account ? 
            <PrimaryButton
              type="submit"
              className={cn("w-full")}
              disabled={ifDisabled()}
            >
              <Fragment>
              {loading ? (
                <Flex className="relative items-center gap-2" >
                  <p className="mt-1 tracking-wider text-center grow">
                    Minting...
                  </p>
                  <Loader2 className="absolute h-4 w-4 animate-spin right-0" />
                </Flex>
              ) :
                <ActionChild arrowSize={"20px"} text="Mint Now" />
              }
            </Fragment>
            </PrimaryButton>
            :
            <div className="flex justify-center w-full">
              <div className="w-full max-w-xs">
                <ConnectButton />
              </div>
            </div>
          }
        </div>

        {!!nft.tasks && account &&
          <Flex className="items-center gap-3">
            <AlertIcon type={account ? form.formState.errors.quantity ? "error" : "success" : "info"} className="size-5 text-purple-400" />
            <FormDescription className="text-gray-400 text-sm">
              {form.formState.errors.quantity ?
                form.formState.errors.quantity.message :
                claimedMint !== undefined && reservedMints !== undefined && `${claimedMint}/${reservedMints > 1000000000000 ? "∞" : reservedMints}`
              }
            </FormDescription>
          </Flex>
        }
      </form>
    </Form>
  );
}
