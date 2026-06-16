"use client"

import { GenericChart } from "@/components/ui/generic-chart"
import { cashFlowData } from "@/lib/data/mock-data"

export default function ChartsShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Charts</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Recharts Wrapper Showcase</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <GenericChart
          title="Composed Chart"
          description="Bar and Line combination"
          data={cashFlowData}
          xAxisKey="month"
          type="composed"
          series={[
            { dataKey: "income", name: "Income", color: "hsl(var(--primary))", type: "bar" },
            { dataKey: "forecast", name: "Forecast", color: "#10B981", type: "line" }
          ]}
        />

        <GenericChart
          title="Line Chart"
          description="Basic line chart"
          data={cashFlowData}
          xAxisKey="month"
          type="line"
          series={[
            { dataKey: "income", name: "Income", color: "hsl(var(--primary))", type: "line" },
            { dataKey: "expense", name: "Expense", color: "#EF4444", type: "line" }
          ]}
        />
        
        <GenericChart
          title="Bar Chart"
          description="Multiple bars"
          data={cashFlowData}
          xAxisKey="month"
          type="bar"
          series={[
            { dataKey: "income", name: "Income", color: "hsl(var(--primary))" },
            { dataKey: "expense", name: "Expense", color: "#EF4444" }
          ]}
        />
        
        <GenericChart
          title="Area Chart"
          description="Stacked area visual"
          data={cashFlowData}
          xAxisKey="month"
          type="composed"
          series={[
            { dataKey: "income", name: "Income", color: "hsl(var(--primary))", type: "area" },
            { dataKey: "expense", name: "Expense", color: "#EF4444", type: "area" }
          ]}
        />
      </div>
    </div>
  )
}
