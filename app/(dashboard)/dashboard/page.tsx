"use client"

import { Plus, Download, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { KPICard } from "@/components/dashboard/kpi-card"
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { AlertsSection } from "@/components/dashboard/alerts-section"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { ActivityLog } from "@/components/dashboard/activity-log"
import { kpiMetrics } from "@/lib/data/mock-data"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1 sm:space-y-1.5">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/60">Overview</p>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground uppercase">Dashboard</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button variant="outline" className="h-9 sm:h-10 border-sidebar-border/10 shadow-sm gap-2 text-[10px] sm:text-xs font-bold px-3 sm:px-4 uppercase">
            <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="hidden xs:inline">OCT 1 - MAR 31</span>
            <span className="xs:hidden">DATE RANGE</span>
          </Button>
          <Button variant="outline" className="h-9 sm:h-10 border-sidebar-border/10 shadow-sm gap-2 text-[10px] sm:text-xs font-bold px-3 sm:px-4 uppercase">
            <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            EXPORT
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger render={
              <Button className="h-9 sm:h-10 shadow-lg shadow-primary/20 gap-2 text-[10px] sm:text-xs font-black px-4 sm:px-6 uppercase tracking-widest">
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                ACTIONS
              </Button>
            } />
            <DropdownMenuContent align="end" className="w-56 font-bold">
              <DropdownMenuItem className="gap-2 focus:bg-primary focus:text-primary-foreground text-xs">
                <Plus className="h-3.5 w-3.5" /> ADD REPORT
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-xs">
                <Plus className="h-3.5 w-3.5" /> CREATE USER
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-xs">
                <Plus className="h-3.5 w-3.5" /> ADD EVENT
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((kpi, index) => (
          <KPICard 
            key={index}
            {...kpi}
            icon={Plus} // Placeholder icon, logic can be added later
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-12 min-w-0">
        {/* Left Column (Wide) */}
        <div className="lg:col-span-8 space-y-6 lg:space-y-8 min-w-0">
          <CashFlowChart />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base lg:text-lg font-black uppercase tracking-wider text-primary/80">Recent Transaction Ledger</h2>
              <Button variant="link" className="text-xs font-bold text-muted-foreground pr-0">VIEW ALL</Button>
            </div>
            <RecentTransactions />
          </div>
        </div>

        {/* Right Column (Narrow) */}
        <div className="lg:col-span-4 space-y-6 lg:space-y-8 min-w-0">
          <AlertsSection />
          
          <div className="rounded-xl border border-sidebar-border/10 p-5 lg:p-6 bg-card shadow-sm">
             <ActivityLog />
          </div>
          
          <div className="rounded-xl border border-sidebar-border/10 p-5 lg:p-6 bg-card shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-muted-foreground">Efficiency Analytics</h3>
            <div className="space-y-6">
              {[
                { label: "Operating Burn", value: "$122K / MO", progress: 65, color: "bg-primary" },
                { label: "Cloud Infrastructure", value: "$12K / MO", progress: 40, color: "bg-primary" },
                { label: "Payroll Efficiency", value: "92.4%", progress: 92, color: "bg-emerald-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="uppercase tracking-tight text-muted-foreground/80">{item.label}</span>
                    <span className="text-primary">{item.value}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className={cn("h-full transition-all duration-1000", item.color)} 
                      style={{ width: `${item.progress}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-primary/10 p-6 lg:p-8 bg-primary text-primary-foreground shadow-2xl shadow-primary/20 flex flex-col items-center text-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Projected Runway</p>
            <div className="text-4xl lg:text-5xl font-black">17.4 <span className="text-base lg:text-lg opacity-80 uppercase">Months</span></div>
            <p className="text-xs font-medium leading-relaxed opacity-70">Based on current burn rate and receivables. We recommend reducing R&D reserves for Q3.</p>
            <Button className="w-full mt-2 bg-white text-primary hover:bg-white/90 font-black text-xs uppercase tracking-widest shadow-xl">
              APPLY STRATEGY
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
