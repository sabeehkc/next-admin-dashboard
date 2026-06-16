import { ReactNode } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatWidgetProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  trendDescription?: string
  className?: string
}

export function StatWidget({
  title,
  value,
  icon,
  trend,
  trendValue,
  trendDescription,
  className,
}: StatWidgetProps) {
  return (
    <div className={cn("rounded-xl border border-sidebar-border/10 p-5 lg:p-6 bg-card shadow-sm flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-wider text-muted-foreground">{title}</h3>
        {icon && (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          {value}
        </div>
        
        {(trendValue || trendDescription) && (
          <div className="flex items-center gap-2 mt-2">
            {trend && trend !== "neutral" && (
              <span className={cn(
                "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-sm",
                trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
              )}>
                {trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {trendValue}
              </span>
            )}
            {trendDescription && (
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                {trendDescription}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
