"use client"

import * as React from "react"
import { GenericChart } from "@/components/ui/generic-chart"
import { cashFlowData } from "@/lib/data/mock-data"

export function CashFlowChart() {
  return (
    <GenericChart
      title="6-Month Cash Flow Projection"
      description="Forecasted vs. Actual Liquidity (USD)"
      data={cashFlowData}
      xAxisKey="month"
      type="composed"
      yAxisFormatter={(value) => `$${value / 1000}k`}
      series={[
        {
          dataKey: "income",
          name: "Actual",
          color: "hsl(var(--primary))",
          type: "bar"
        },
        {
          dataKey: "forecast",
          name: "Forecast",
          color: "#10B981",
          type: "line"
        }
      ]}
    />
  )
}
