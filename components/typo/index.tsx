import React from "react"

import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 className={cn("scroll-m-20 text-[64px] leading-[1.3] font-alef uppercase", "font-audio-wide", className)} {...props}>
      {children}
    </h1>
  )
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2 className={cn("scroll-m-20 pb-2 text-[48px] fon tracking-tight font-audio-wide", className)} {...props}>
      {children}
    </h2>
  )
}

export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 className={cn("scroll-m-20 text-[20px] font-medium font-alef tracking-tight text-foreground/80", className)} {...props}>
      {children}
    </h3>
  )
}

export function H4({ children, className, ...props }: TypographyProps) {
  return (
    <h4 className={cn("scroll-m-20 text-2xl tracking-tight", className)} {...props}>
      {children}
    </h4>
  )
}

export function H5({ children, className, ...props }: TypographyProps) {
  return (
    <h5 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props}>
      {children}
    </h5>
  )
}

export function H6({ children, className, ...props }: TypographyProps) {
  return (
    <h6 className={cn("scroll-m-20 text-base lg:text-lg font-semibold tracking-tight", className)} {...props}>
      {children}
    </h6>
  )
}

export function P({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn("text-[16px] xl:text-[18px] font-alef", className)} {...props}>
      {children}
    </p>
  )
}


export function Lead({ children, className, ...props }: TypographyProps) {
  return (
    <P className={cn("text-[18px] xl:text-[20px] font-khand leading-[1.7] tracking-wider", className)} {...props}>
      {children}
    </P>
  )
}

export function Large({ children, className, ...props }: TypographyProps) {
  return (
    <div className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </div>
  )
}

export function Small({ children, className, ...props }: TypographyProps) {
  return (
    <small className={cn("text-sm font-medium leading-none", className)} {...props}>
      {children}
    </small>
  )
}

export function Subtle({ children, className, ...props }: TypographyProps) {
  return (
    <small className={cn("text-xs leading-none font-light", className)} {...props}>
      {children}
    </small>
  )
}


