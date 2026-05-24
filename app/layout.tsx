import React from "react";
import "@/styles/globals.css";
import "@/styles/styles.css";

import Navbar from "@/components/layouts/navbar";
import { TailwindIndicator } from "@/components/tailwind-indicator";

import { cn } from "@/lib/utils";
import AdSense from "@/components/layouts/adsense";
import { Providers } from "@/app/providers/providers";
import JoinBadge from "@/components/elements/join-badge";
import { alef, audioWide, gudea, khand, ptSansCaption } from "@/lib/fonts";

export const metadata = {
  title: "Clara",
  description: "Clara ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-adsense-account"
          content={`ca-${process.env.NEXT_PUBLIC_ADSENSE_ID as string}`}
        />
        <AdSense pId={process.env.NEXT_PUBLIC_ADSENSE_ID as string} />
      </head>
      <body
        className={cn(
          "flex flex-col min-h-screen max-w-screen overflow-x-hidden",
          `${ptSansCaption.variable} ${gudea.variable} ${alef.variable} ${audioWide.variable} ${khand.variable} antialiased`
        )}
      >
        <Providers>
          <Navbar />
          {children}
          <TailwindIndicator />
          {/* <JoinBadge /> */}
        </Providers>
      </body>
    </html>
  );
}
