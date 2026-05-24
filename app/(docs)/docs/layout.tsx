"use client"

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Lead } from "@/components/typo";
import { Flex } from "@/components/elements";
import PortalHeader from "@/components/layouts/header";
import { AppSidebar } from "@/components/layouts/side-bar"
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import HeadingListComponent from "@/components/layouts/side-bar/heading-list";
import sideBarData from "@/configs/docs.json"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const path = usePathname()
  const navData = sideBarData
  const [navItems, setNavItems] = useState<DocPage[]>([])

  const getItem = useCallback(() => {
    const headers = []
    const item = navData.find((item) => path.includes(item.url))

    if (item) {
      headers.push(item)
      if (item.items) {
        const subItem = item.items.find((item) => path === item.url)
        if (subItem) {
          headers.push(subItem)
        }
      }
    }

    setNavItems(headers)
  }, [navData, path])

  useEffect(() => {
    getItem()
  }, [getItem])

  return (
    <main
      className={`relative font-nunito h-screen md:-mt-16  pt-24  overflow-hidden`}
    >
      <Image src="/images/Ellipse6.svg" alt="Hero Background" width={915} height={915} quality={100} className="absolute top-[5%] -translate-y-1/2  object-contain  right-[5%] translate-x-1/2 -z-10 opacity-50" />
      <Image src="/images/Ellipse7.svg" alt="Hero Background 2" width={915} height={915} quality={100} className="h-[50vh] absolute top-[30vh] object-contain -translate-x-1/2 -z-10 opacity-50" />
      <div className="flex flex-col w-full h-full section-padding border-t border-foreground/5 overflow-hidden" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <SidebarProvider className="h-full overflow-hidden">
          <AppSidebar />
          <SidebarInset>
            <PortalHeader navItems={navItems} />
            <Flex className="h-full flex items-start overflow-hidden w-full">
              <div className="h-full p-1 overflow-hidden w-full">
                <ScrollArea className="h-full md:p-2 md:px-7 pt-0 overflow-y-auto min-w-full">
                  {children}
                  <Flex className="py-2 w-full max-w-[95vw] items-center gap-3 my-2">
                    {navItems[navItems.length - 1]?.prev &&
                      <Link
                        className="flex items-center justify-between bg-foreground/5 border border-foreground/20  p-1 px-2 rounded-md w-full hover:border-foreground/30"
                        href={navItems[navItems.length - 1]?.prev?.url || ""}
                      >
                        <ChevronLeft className="m-2" />
                        <div className="p-3 space-y-1">
                          <p className="font-alef text-[14px] text-foreground/60 text-right">prev</p>
                          <Lead className="font-pt-sans">{navItems[navItems.length - 1]?.prev?.title}</Lead>
                        </div>
                      </Link>
                    }
                    {navItems[navItems.length - 1]?.next &&
                      <Link
                        className="flex items-center justify-between bg-foreground/5 border border-foreground/20 p-1 px-2 rounded-md w-full hover:border-foreground/30"
                        href={navItems[navItems.length - 1]?.next?.url || ""}
                      >
                        <div className="p-3 space-y-1">
                          <p className="font-alef text-[14px] text-foreground/60">next</p>
                          <Lead className="font-pt-sans">{navItems[navItems.length - 1]?.next?.title}</Lead>
                        </div>
                        <ChevronRight className="m-2" />
                      </Link>
                    }
                  </Flex>
                </ScrollArea>
              </div>
              <HeadingListComponent />
            </Flex>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </main >
  );
}


