"use client";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./theme-provider";
import { ThirdwebProvider } from "thirdweb/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      /* disableTransitionOnChange */
    >
      <ThirdwebProvider>
        {children}
        <Toaster />
      </ThirdwebProvider>
    </ThemeProvider>
  );
}
