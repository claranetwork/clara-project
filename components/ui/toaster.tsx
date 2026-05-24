"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function({ id, title, description, action, ...props }) {
        const color = props.variant === "destructive" ? "text-red-600" : "text-green-700"
        return (
          <Toast key={id} {...props} className="bg-foreground/90 w-full">
            <div className="grid gap-1 w-full">
              {title && <ToastTitle className={cn("text-[18px]", color)}>{title}</ToastTitle>}
              {description && (
                <ToastDescription className="     
                  font-alef 
                  tracking-normal 
                  break-words 
                  whitespace-normal 
                  overflow-y-auto 
                  max-h-[200px]
                  pr-4
                  [&::-webkit-scrollbar]:w-1
                  [&::-webkit-scrollbar-track]:bg-transparent
                  [&::-webkit-scrollbar-thumb]:bg-foreground/50
                  [&::-webkit-scrollbar-thumb]:rounded-full">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
