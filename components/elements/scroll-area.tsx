"use client"

import { FC, ReactNode, useLayoutEffect, useRef, useState } from "react"
import { ScrollArea } from "../ui/scroll-area"
import { ScrollAreaProps } from "@radix-ui/react-scroll-area";
import { cn } from "@/lib/utils";

interface Props extends Omit<ScrollAreaProps, 'dir'> {
  children: ReactNode,
  overlayColor?: string
  shadow?: boolean
}

const CustomScrollArea: FC<Props> = ({ children, overlayColor, shadow, ...rest }) => {
  const divRef = useRef<HTMLDivElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [hasScroll, setHasScroll] = useState<boolean>(false);

  useLayoutEffect(() => {
    const area = scrollAreaRef.current
    const divEl = divRef.current
    if (area && divEl) {
      const hasScroll = divEl.scrollHeight > area.clientHeight
      setHasScroll(hasScroll)
    }
  }, [scrollAreaRef, divRef])

  return (
    <ScrollArea className="relative overflow-auto grow mt-2" ref={scrollAreaRef} dir={"ltr"} {...rest}>
      <div ref={divRef}>
        {children}
        {shadow && hasScroll && <div
          className={cn(
            "sticky bottom-0 inset-x-0 h-12 bg-gradient-to-t to-transparent pointer-events-none transition-opacity duration-300 opacity-100",
            overlayColor ? overlayColor : "from-white/80",
          )}
        />}
      </div>
    </ScrollArea>
  )
}

export default CustomScrollArea
