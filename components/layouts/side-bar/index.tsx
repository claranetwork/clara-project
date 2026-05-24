"use client"

import type * as React from "react"
import { NavMain } from "./nav-main"
import sideBarData from "@/configs/docs.json"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-0">
      <SidebarHeader>

      </SidebarHeader>
      <SidebarContent className="h-full w-full">
        <NavMain items={sideBarData} />

      </SidebarContent>
      <SidebarFooter>

      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}



