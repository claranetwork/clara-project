import { cn } from "@/lib/utils"

const GradCard = ({ className, children }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className="group relative p-[2px] rounded-lg cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-primary to-secondary opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className={cn("relative h-full rounded-lg bg-gradient-to-br from-background to-background/90 p-2 z-10", className)}>
        {children}
      </div>
    </div>
  )
}

export default GradCard


