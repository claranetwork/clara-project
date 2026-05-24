"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Lead } from "../typo"
import GradCard from "./grad-card"
import DiscordIcon from "@/assets/svgs/discord"
import { cn } from "@/lib/utils"

const JoinBadge = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Link
      className={cn("fixed bottom-14 z-50 hidden md:flex items-center group/joinBadge shadow-lg shadow-primary/30 rounded-[0.5rem] transition-all duration-300 ease-in-out", isVisible ? "opacity-100 right-14" : "opacity-0 -right-10")}
      href="https://t.co/UXbTbavfVc"
      target="_blank"
    >
      <GradCard className="w-auto p-1 flex items-center px-3">
        <DiscordIcon className="size-5" />
        <Lead className="text-[14px] xl:text-[16px] whitespace-nowrap font-medium leading-[1.3] mt-1 w-0 opacity-0 transition-all duration-300 ease-in-out group-hover/joinBadge:w-auto group-hover/joinBadge:opacity-100 pl-0 group-hover/joinBadge:pl-2">
          Join Our Community
        </Lead>
      </GradCard>
    </Link>
  )
}

export default JoinBadge


