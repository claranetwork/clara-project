"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  useSidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarMenuSub,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Lead, P } from "@/components/typo"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function NavMain({
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
  const { state } = useSidebar()
  const path = usePathname()

  return (
    <SidebarGroup className="h-full w-full">
      <SidebarMenu className="space-y-1 pt-3 h-full">
        {items.map((item) => {
          if (!item.items || state === "collapsed") {

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} className="flex items-center gap-2 group/nav" asChild>
                  <Link href={item.url} className={cn("space-x-1 group/nav", path === item.url && "bg-foreground/5", state === "collapsed" && path.includes(item.url) && "bg-foreground/5")}>
                    <Lead
                      className={cn(
                        "text-[16px] xl:text-[18px] font-medium   whitespace-nowrap tracking-widest",
                        path === item.url ? "text-foreground" : "text-foreground/90 group-hover/nav:text-foreground"
                      )}

                    >
                      {item.title}
                    </Lead>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <Collapsible key={item.title} asChild defaultOpen={true} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} className="flex items-center gap-3 group/nav">
                    <Lead className="text-[17px] xl:text-[18px] font-medium  tracking-widest text-foreground/70 group-hover/nav:text-foreground whitespace-nowrap">{item.title}</Lead>
                    <ChevronRight size={16} className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub className="gap-0 py-0 pr-0">
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link
                            href={subItem.url}
                            className={cn("space-x-1 group/nav", path === subItem.url && "bg-foreground/5")}
                          >
                            <P className={
                              cn("ml-2 text-[12px] md:text-[13px] xl:text-[14px] font-semibold text-foreground/90 group-hover/nav:text-foreground",
                                path === subItem.url ? "text-foreground" : "text-foreground/80 group-hover/nav:text-foreground")}
                            >
                              {subItem.title}
                            </P>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        }
        )}
      </SidebarMenu>
    </SidebarGroup >
  )
}


