"use client"

import sideBarData from "@/configs/docs.json"

import { Fragment, } from "react";
import { SearchDocs } from "./search-docs";
import { NavMainMobile } from "../side-bar/mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const PortalHeader = ({ navItems }: { navItems: DocPage[] }) => {


  return (
    <header className="flex md:pl-10 pt-4 md:pt-10 pb-2 shrink-0 items-center  transition-[width,height] ease-linear ">
      <div className="flex items-center justify-between gap-3 md:gap-2 w-full">
        <Breadcrumb className="grow hidden md:block">
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:flex gap-2 items-center">
              <BreadcrumbLink href="#" className="text-foreground/80 font-khand text-[14px] xl:text-[16px]  mt-[2px] font-medium tracking-wider">{navItems[0]?.title || "Layout"}</BreadcrumbLink>
            </BreadcrumbItem>
            {navItems.length > 1 &&
              <Fragment>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:flex gap-2 items-center">
                  <BreadcrumbLink href="#" className="font-khand text-[14px] xl:text-[16px]  mt-[2px] font-medium tracking-wider">{navItems[1].title}</BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            }
          </BreadcrumbList>
        </Breadcrumb>
        <NavMainMobile items={sideBarData} />
        <SearchDocs />
      </div>
    </header>
  )
}

export default PortalHeader
