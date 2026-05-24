"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import gsap from "gsap";

interface ButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const ActionChild = ({
  text,
  arrowSize = "5px",
  className,
}: {
  text: string;
  arrowSize: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(" relative flex items-center gap-2 h-full z-10", className)}
    >
      <span className="grow mt-[2px] relative z-20">{text}</span>
      <ArrowRight
        className={cn(
          "absolute -left-10 opacity-0 scale-0 group-hover/button:left-0 group-hover/button:opacity-100 group-hover/button:scale-100  delay-75 transition-all"
        )}
        style={{
          width: arrowSize,
          height: arrowSize,
          transitionDuration: "450ms",
        }}
      />

      <ArrowRight
        className={cn(
          "absolute right-0 opacity-100 group-hover/button:-right-10 group-hover/button:opacity-0 group-hover/button:scale-0 transition-all"
        )}
        style={{
          width: arrowSize,
          height: arrowSize,
          transitionDuration: "400ms",
        }}
      />
    </div>
  );
};

export const PrimaryButton: React.FC<ButtonProps> = ({
  className,
  children,
  disabled = false,
  type = "button",
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        x: -30,
      });
      gsap.to(buttonRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <Button
      ref={buttonRef}
      className={cn(
        "group/button flex items-center w-max min-w-[200px] h-auto justify-center p-[1px] rounded-[0.5rem] text-[18px] font-khand font-semibold overflow-hidden hover:text-foreground bg-gradient-to-br from-[#020344] to-[#020344] hover:from-[#020344] hover:to-[#020344] opacity-0",
        className
      )}
      variant="ghost"
      type={type}
      disabled={disabled}
      {...props}
    >
      <div className="relative p-3 px-4 pt-[14px] w-full">
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-br from-[#020344] to-[#020344] opacity-100 group-hover/button:opacity-0 transition-opacity duration-300 rounded-[0.5rem]" />
        <span className="absolute inset-0 bg-gradient-to-r from-[#020344] via-[#020344] to-[#ffffff] opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 ease-in rounded-[0.5rem]" />
      </div>
    </Button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  className,
  children,
  type = "button",
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        x: -30,
      });
      gsap.to(buttonRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        delay: 0.1,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <Button
      ref={buttonRef}
      className={cn(
        "group/button flex items-center w-max min-w-[200px] h-auto justify-center p-[1px] rounded-[0.5rem] text-[18px] font-khand font-semibold overflow-hidden hover:text-foreground bg-gradient-to-b from-primary/50 via-primary/50 to-primary hover:from-primary hover:to-secondary opacity-0",
        className
      )}
      type={type}
      variant={"ghost"}
    >
      <div className="relative p-3 px-4 pt-[14px] w-full">
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-b from-background to-background/70 opacity-100 group-hover/button:opacity-0 transition-opacity duration-300  rounded-[0.5rem] backdrop-blur-sm" />
        <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 ease-in  rounded-[0.5rem]" />
      </div>
    </Button>
  );
};

export const PrimaryButtonProto: React.FC<ButtonProps> = ({
  className,
  children,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        x: -30,
      });
      gsap.to(buttonRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: "power4.out",
      });
    }
  }, []);

  return (
    <div
      ref={buttonRef}
      className={cn(
        "group/button flex items-center w-max min-w-[200px] h-auto justify-center p-[1px] rounded-[0.5rem] text-[18px] font-khand font-semibold overflow-hidden hover:text-foreground bg-gradient-to-br from-[#1599c9] to-[#ffffff] hover:from-[#ffffff] hover:to-[#1599c9] opacity-0",
        className
      )}
    >
      <div className="relative p-[10px] px-4 w-full">
        <span className="flex items-center justify-center relative z-10 w-full">
          {children}
        </span>
        <span className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-100 group-hover/button:opacity-0 transition-opacity duration-300 rounded-[0.5rem]" />
        <span className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover/button:opacity-100 transition-opacity duration-300 ease-in rounded-[0.5rem]" />
      </div>
    </div>
  );
};
