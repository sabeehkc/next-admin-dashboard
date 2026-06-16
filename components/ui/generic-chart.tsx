"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
  Area,
  AreaChart,
  LineChart,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export type ChartType = "bar" | "line" | "area" | "composed";

export interface ChartSeries {
  dataKey: string;
  name: string;
  color: string;
  type?: "bar" | "line" | "area"; // For composed charts
}

interface GenericChartProps {
  title: string;
  description?: string;
  data: any[];
  xAxisKey: string;
  series: ChartSeries[];
  type: ChartType;
  height?: number;
  yAxisFormatter?: (value: any) => string;
}

export function GenericChart({
  title,
  description,
  data,
  xAxisKey,
  series,
  type,
  height = 350,
  yAxisFormatter = (value) => `${value}`
}: GenericChartProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const renderChart = () => {
    switch (type) {
      case "composed":
        return (
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={yAxisFormatter} />
            <Tooltip 
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))", borderRadius: "8px", fontSize: "12px", fontWeight: "500" }}
            />
            {series.map((s, i) => {
              if (s.type === "line") {
                return <Line key={i} type="monotone" dataKey={s.dataKey} name={s.name} stroke={s.color} strokeWidth={2} dot={{ r: 4, fill: s.color, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6, strokeWidth: 0 }} />
              }
              if (s.type === "area") {
                 return <Area key={i} type="monotone" dataKey={s.dataKey} name={s.name} fill={s.color} stroke={s.color} fillOpacity={0.3} />
              }
              return <Bar key={i} dataKey={s.dataKey} name={s.name} fill={s.color} radius={[4, 4, 0, 0]} barSize={40} />
            })}
          </ComposedChart>
        );
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={yAxisFormatter} />
            <Tooltip 
              cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
              contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))", borderRadius: "8px", fontSize: "12px", fontWeight: "500" }}
            />
            {series.map((s, i) => (
              <Bar key={i} dataKey={s.dataKey} name={s.name} fill={s.color} radius={[4, 4, 0, 0]} barSize={40} />
            ))}
          </BarChart>
        );
      case "line":
         return (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey={xAxisKey} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} tickFormatter={yAxisFormatter} />
            <Tooltip 
              contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))", borderRadius: "8px", fontSize: "12px", fontWeight: "500" }}
            />
            {series.map((s, i) => (
              <Line key={i} type="monotone" dataKey={s.dataKey} name={s.name} stroke={s.color} strokeWidth={2} dot={{ r: 4, fill: s.color, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6, strokeWidth: 0 }} />
            ))}
          </LineChart>
        );
      default:
        return null;
    }
  }

  return (
    <Card className="border-sidebar-border/10 shadow-sm overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 lg:pb-8 gap-4">
        <div className="space-y-1">
          <CardTitle className="text-lg lg:text-xl font-bold">{title}</CardTitle>
          {description && <CardDescription className="text-xs lg:text-sm">{description}</CardDescription>}
        </div>
        <div className="flex items-center gap-4 text-[10px] lg:text-xs font-medium">
          {series.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color === "url(#barGradient)" ? "var(--primary)" : s.color }} />
              <span>{s.name}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div style={{ height: `${height}px` }} className="w-full">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
              {renderChart() as any}
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full bg-muted/10 animate-pulse rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-widest">Loading Analytics...</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
