"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import Navbar from "@/components/layouts/navbar";
import { cn } from "@/lib/utils";
import { Lead } from "@/components/typo";
import { Flex, Grid } from "@/components/elements";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const account = useActiveAccount();
  const pathname = usePathname();

  return (
    <main className="relative w-full section-padding overflow-hidden -mt-16">
      <div className=" flex flex-col h-full w-full  justify-center items-center gap-24  py-28 pt-16 md:pt-20">
        <Image
          src="/images/Ellipse6.svg"
          alt="Hero Background"
          width={915}
          height={915}
          quality={100}
          className="absolute top-[5%] -translate-y-1/2  object-contain opacity-80 right-[5%] translate-x-1/2 -z-10"
        />
        <Image
          src="/images/Ellipse7.svg"
          alt="Hero Background 2"
          width={915}
          height={915}
          quality={100}
          className="absolute top-[40%] md:top-[15%] object-contain opacity-70 -left-10 -translate-x-1/2 -z-10"
        />
        <Flex className=" min-h-[650px] border border-white/10 rounded-3xl flex-col items-center justify-start mt-24 md:mt-5 overflow-hidden">
          <Grid className="h-max grow-0 w-full grid-cols-2 justify-items-center border-b border-white/10">
            <Link
              href="/stake"
              className={cn(
                "border-r border-white/10 w-full",
                pathname === "/stake" ? "bg-foreground/10" : ""
              )}
            >
              <Lead className="p-3 w-full text-center font-semibold text-foreground/90">
                Stake NFT
              </Lead>
            </Link>
            <Link
              href="/stake/nerzo-token"
              className={cn(
                "w-full",
                pathname === "/stake/nerzo-token" ? "bg-foreground/10" : ""
              )}
            >
              <Lead className="p-3 w-full text-center font-semibold text-foreground/90">
                Stake Token
              </Lead>
            </Link>
          </Grid>
          {account ? (
            <section
              id="stake"
              className="flex p-8 sm:p-10 md:p-12 w-full grow flex-col lg:flex-row items-center justify-start lg:justify-between xl:justify-evenly gap-4 lg:gap-10"
            >
              {children}
            </section>
          ) : (
            <Flex className="p-5 py-10 w-full h-full flex-col items-center justify-evenly">
              <Lead className="text-center">
                Please connect your wallet to continue
              </Lead>
            </Flex>
          )}
        </Flex>
      </div>
    </main>
  );
};

export default Layout;
