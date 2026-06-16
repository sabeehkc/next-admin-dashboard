"use client"

import * as React from "react"
import { 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  FileText, 
  AlertCircle, 
  TrendingUp, 
  UserPlus 
} from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "PAYMENT",
    title: "Milestone Payout Disbursed",
    description: "Apex Ironworks Ltd. received $1,470,450.00 for Phase 03.",
    time: "2h ago",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    id: 2,
    type: "BUDGET",
    title: "Budget Adjustment Approved",
    description: "Horizon Center budget increased by $150k for Facade materials.",
    time: "5h ago",
    icon: TrendingUp,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 3,
    type: "INVOICE",
    title: "New Client Invoice Generated",
    description: "INV-2024-118 for Beacon Properties ($850,000.00).",
    time: "Yesterday",
    icon: FileText,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: 4,
    type: "ALERT",
    title: "Liquidity Threshold Warning",
    description: "Operating account dipped below the 3-month burn reserve.",
    time: "Yesterday",
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    id: 5,
    type: "PEOPLE",
    title: "New Vendor Registered",
    description: "Verdant Systems added to the Strategic Vendor network.",
    time: "2 days ago",
    icon: UserPlus,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
]

export function ActivityLog() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-black uppercase tracking-widest text-primary/80">System Audit Log</h2>
        <span className="text-[10px] font-bold text-muted-foreground uppercase bg-muted px-2 py-0.5 rounded-full">REAL-TIME</span>
      </div>

      <div className="relative space-y-4 before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-sidebar-border/10">
        {activities.map((item) => (
          <div key={item.id} className="relative pl-12 group">
            {/* Icon Dot */}
            <div className={cn(
              "absolute left-0 top-1 p-2 rounded-lg border border-sidebar-border/5 shadow-sm transition-all duration-300 group-hover:scale-110",
              item.bg
            )}>
              <item.icon className={cn("h-4 w-4", item.color)} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold tracking-tight text-primary uppercase">{item.title}</p>
                <span className="text-[10px] font-black font-mono text-muted-foreground/60">{item.time}</span>
              </div>
              <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 px-2">
        <button className="w-full h-10 rounded-xl border border-sidebar-border/10 text-[10px] font-black uppercase tracking-widest hover:bg-muted/50 transition-colors">
          VIEW FULL AUDIT HISTORY
        </button>
      </div>
    </div>
  )
}
