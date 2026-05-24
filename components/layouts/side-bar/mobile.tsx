"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, ListFilterPlus, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Lead, P } from "@/components/typo"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function NavMainMobile({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const path = usePathname()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="md:hidden size-10 p-0 bg-foreground/10 hover:bg-foreground/20">
          <ListFilterPlus className="text-foreground/80 size-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-foreground/10 backdrop-blur-lg border-foreground/30" align="start">
        <nav className="space-y-2">
          {items.map((item) => {
            if (!item.items) {
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "flex items-center gap-2 rounded-md p-2 hover:bg-foreground/10",
                    path === item.url && "bg-foreground/10",
                  )}
                >
                  <Lead
                    className={cn(
                      "text-[16px] font-medium whitespace-nowrap",
                      path === item.url ? "text-foreground" : "text-foreground/90",
                    )}
                  >
                    {item.title}
                  </Lead>
                </Link>
              )
            }

            return (
              <Collapsible key={item.title} className="space-y-2">
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md p-2 text-foreground hover:bg-foreground/10">
                  <Lead className="text-[16px] font-medium text-foreground/70">{item.title}</Lead>
                  <ChevronRight
                    size={16}
                    className="transition-transform duration-200 group-data-[state=open]:rotate-90 text-foreground"
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-1 pl-4 text-foreground">
                  {item.items?.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.url}
                      className={cn(
                        "flex items-center rounded-md p-2 text-foreground hover:bg-foreground/10",
                        path === subItem.url && "bg-foreground/10",
                      )}
                    >
                      <P
                        className={cn(
                          "text-[14px] font-medium",
                          path === subItem.url ? "text-foreground" : "text-foreground/80",
                        )}
                      >
                        {subItem.title}
                      </P>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </nav>
      </PopoverContent>
    </Popover>
  )
}


