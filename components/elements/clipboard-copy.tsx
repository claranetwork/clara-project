import React, { useState } from "react";
import type { SVGProps } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { P } from "../typo";
import { Wallet } from "lucide-react";

interface CopyToClipboardProps {
  text: string;
  label: string;
  className?: string
}

export function MageCopy(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" {...props}><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M18.327 7.286h-8.044a1.93 1.93 0 0 0-1.925 1.938v10.088c0 1.07.862 1.938 1.925 1.938h8.044a1.93 1.93 0 0 0 1.925-1.938V9.224c0-1.07-.862-1.938-1.925-1.938"></path><path d="M15.642 7.286V4.688c0-.514-.203-1.007-.564-1.37a1.92 1.92 0 0 0-1.361-.568H5.673c-.51 0-1 .204-1.36.568a1.95 1.95 0 0 0-.565 1.37v10.088c0 .514.203 1.007.564 1.37s.85.568 1.361.568h2.685"></path></g></svg>);
}

export function MageCopyFill(props: SVGProps<SVGSVGElement>) {
  return (<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M18.355 6.54h-1.94V4.69a2.69 2.69 0 0 0-1.646-2.484A2.7 2.7 0 0 0 13.745 2h-8.05a2.68 2.68 0 0 0-2.67 2.69v10.09a2.68 2.68 0 0 0 2.67 2.69h1.94v1.85a2.68 2.68 0 0 0 2.67 2.68h8a2.68 2.68 0 0 0 2.67-2.68V9.23a2.69 2.69 0 0 0-2.62-2.69M7.635 9.23v6.74h-1.94a1.18 1.18 0 0 1-1.17-1.19V4.69a1.18 1.18 0 0 1 1.17-1.19h8.05a1.18 1.18 0 0 1 1.17 1.19v1.85h-4.61a2.69 2.69 0 0 0-2.67 2.69"></path></svg>);
}

const copyToClipboard = async (textToCopy: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}

export default function CopyToClipboard({ text, label, className }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(text)
      setCopied(true);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);

    } catch (error) {
      console.error(error)
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={handleCopy}
          className={cn(
            "inline-flex items-center justify-center  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background   gap-2  bg-foreground/10 p-2 rounded-lg w-max px-3",
            className
          )}
        >
          <Wallet size={16} className={cn(copied ? "text-green-300" : "text-foreground/70")} />
          <P>{label}</P>
          <span className="sr-only">Copy to clipboard</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        className="p-2 px-4 bg-foreground/90 rounded-md text-sm w-max mb-3 border-0 font-alef"
      >
        Copied to clipboard
      </PopoverContent>
    </Popover>
  );
}
