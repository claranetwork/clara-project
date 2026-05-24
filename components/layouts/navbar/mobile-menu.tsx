"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarListData } from "./data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ConnectButton from "./connect-button";

const MobileMenu = () => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="lg:hidden p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300"
        >
          <Menu className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/5 p-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold text-white">
                Menu
              </SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              <div className="space-y-3">
                {navbarListData.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-4 px-5 rounded-xl transition-all duration-300",
                      pathname === item.href
                        ? "bg-gradient-primary text-white shadow-lg"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                    target={item.type === 'external' ? '_blank' : '_self'}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-lg">{item.name}</span>
                      {item.type === 'external' && (
                        <span className="text-sm text-blue-400">↗</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Connect Button Section */}
              <div className="mt-8 pt-8 border-t border-white/5">
                <p className="text-sm text-gray-400 mb-6 text-center">
                  Connect your wallet to access all features
                </p>
                <ConnectButton />
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;