"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string
  icon: LucideIcon
  description?: string
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
}

export function KPICard({ title, value, icon: Icon, description, trend, className }: KPICardProps) {
  return (
    <Card className={cn("overflow-hidden border-sidebar-border/10 shadow-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 translate-y-0.5">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        {(description || trend) && (
          <div className="mt-1.5 flex items-center gap-2">
            {trend && (
              <span className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                trend.positive ? "text-positive" : "text-destructive"
              )}>
                {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend.value}
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground line-clamp-1">
                {description}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
