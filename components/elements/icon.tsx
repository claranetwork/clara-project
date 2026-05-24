import { cn } from "@/lib/utils"
import { BadgeAlert, BadgeCheck, BadgeX, InfoIcon } from "lucide-react"

const AlertIcon = ({ className, type }: { type: "error" | "success" | "info", className?: string }) => {
  const Icon = type === "error" ? BadgeX : type === "success" ? BadgeCheck : BadgeAlert
  const color = type === "error" ? "text-red-300" : type === "success" ? "text-green-300" : "text-yellow-300"
  return (
    <Icon className={cn("size-5", color, className)} />
  )
}

export default AlertIcon
