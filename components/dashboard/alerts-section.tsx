"use client"

import { AlertCircle, CheckCircle2, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    title: "Partner Credits Approved",
    description: "Line of credit #420-X has been activated. $250k available for draw.",
    type: "success",
    icon: CheckCircle2,
  },
  {
    id: 2,
    title: "Client Receivables Delay",
    description: "3 invoices for \"Nexus Tower\" are 15 days overdue. Total: $114,000.",
    type: "error",
    icon: AlertCircle,
  },
]

export function AlertsSection() {
  return (
    <Card className="border-sidebar-border/10 shadow-sm bg-primary/5">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          Critical Liquidity Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "relative flex gap-4 rounded-lg border p-4 transition-all duration-200",
              alert.type === "success" 
                ? "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10" 
                : "border-destructive/20 bg-destructive/5 hover:bg-destructive/10"
            )}
          >
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm",
              alert.type === "success" 
                ? "border-emerald-500/20 bg-emerald-500/20 text-emerald-600" 
                : "border-destructive/20 bg-destructive/20 text-destructive"
            )}>
              <alert.icon className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h4 className={cn(
                "text-sm font-semibold leading-none tracking-tight",
                alert.type === "success" ? "text-emerald-900 dark:text-emerald-400" : "text-destructive"
              )}>
                {alert.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {alert.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
