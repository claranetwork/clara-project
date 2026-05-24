"use client"

import Link from "next/link";
import Image from "next/image";
import { Wallet } from "lucide-react";

import { shortenAddress } from "@/lib/utils";
import { Flex, Grid } from "@/components/elements";
import { H1, H2, Lead, P } from "@/components/typo";
import GradCard from "@/components/elements/grad-card";
import CopyToClipboard from "@/components/elements/clipboard-copy";

export default function Page() {
  return (
    <main className="w-full flex flex-col relative min-h-[90vh] overflow-hidden md:-mt-16 py-28">
      <section id="trade" className="flex flex-col h-full w-full section-padding justify-center items-center gap-16 lg:gap-24 grow">
        <Image src="/images/Ellipse6.svg" alt="Hero Background" width={915} height={915} quality={100} className="absolute top-[5%] -translate-y-1/2  object-contain opacity-80 right-[5%] translate-x-1/2 -z-10" />
        <Image src="/images/Ellipse7.svg" alt="Hero Background 2" width={915} height={915} quality={100} className="absolute top-[50%] md:top-[15%] object-contain opacity-80 -left-10 -translate-x-1/2 -z-10" />
        <Flex className="flex-col items-center gap-3 grow-0">
          <H1 className="text-[32px] sm:text-[36px] lg:text-[42px] text-center">Nerzo Token Trading Platforms</H1>
          <H2 className="text-[20px] sm:text-[24px] lg:text-[32px] font-khand font-medium tracking-wider text-foreground/80 text-center">Explore platforms to trade your Nerzo Token</H2>
          <div className="sm:hidden">
            <CopyToClipboard text={"0xCE7Edd2405fc6B0a0dc0c2DDC5Bc3562f119bE9c"} label={shortenAddress("0xCE7Edd2405fc6B0a0dc0c2DDC5Bc3562f119bE9c")} />
          </div>
          <div className="hidden sm:block">
            <CopyToClipboard text={"0xCE7Edd2405fc6B0a0dc0c2DDC5Bc3562f119bE9c"} label={"0xCE7Edd2405fc6B0a0dc0c2DDC5Bc3562f119bE9c"} />
          </div>
        </Flex>

        <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 grow-0">
          <GradCard className="w-full">
            <Link className="flex items-center justify-center flex-col p-6 gap-4" href="#">
              <div className="relative size-28 rounded-full bg-foreground/90 overflow-hidden">
                <Image src="/images/tools/uniswap.png" alt="Uniswap" fill quality={100} className="absolute object-cover" />
              </div>
              <Lead className="mb-1 font-khand font-medium tracking-wider text-[20px]">Uniswap</Lead>
              <P className="text-center">Trade tokens on the leading decentralized exchange.</P>
            </Link>
          </GradCard>
          <GradCard className="w-full">
            <Link className="flex items-center justify-center flex-col p-6 gap-4" href="#">
              <div className="relative size-28 rounded-full bg-foreground/90 overflow-hidden">
                <Image src="/images/tools/dextools.png" alt="Uniswap" fill quality={100} className="absolute object-cover" />
              </div>
              <Lead className="mb-1 font-khand font-medium tracking-wider text-[20px]">DexTools</Lead>
              <P className="text-center">Explore pairs on the Polygon network with DexTools.</P>
            </Link>
          </GradCard>
          <GradCard className="w-full">
            <Link className="flex items-center justify-center flex-col p-6 gap-4" href="#">
              <div className="relative size-28 rounded-full bg-foreground/90 overflow-hidden">
                <Image src="/images/tools/cex.png" alt="Uniswap" fill quality={100} className="absolute object-cover" />
              </div>
              <Lead className="mb-1 font-khand font-medium tracking-wider text-[20px]">CEX</Lead>
              <P className="text-center">Coming Soon.</P>
            </Link>
          </GradCard>
        </Grid>
      </section>
    </main>
  );
}
