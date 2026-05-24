"use client"

import React from "react";
import { cn } from "@/lib/utils";

interface ElementProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const Flex = React.forwardRef<HTMLDivElement, ElementProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        className={cn("flex w-full grow", className)}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

export const Grid = React.forwardRef<HTMLDivElement, ElementProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        className={cn("grid w-full grow", className)}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

