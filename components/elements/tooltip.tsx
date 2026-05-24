import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function CustomToolTip({
  hidden,
  children,
  tooltipLabel,
  position,
  offset,
  variant,
}: ToolTipProps) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          hidden={hidden ? hidden : false}
          side={position ? position : "top"}
          sideOffset={offset ? offset : 10}
          className="bg-foreground/90"
        >
          <div
            className={cn(
              variant && "text-red-500",
              "font-alef font-medium max-w-[250px] text-background text-[13px] leading-1",
            )}
          >
            {tooltipLabel}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
