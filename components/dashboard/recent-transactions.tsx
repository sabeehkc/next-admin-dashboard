"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { recentTransactions } from "@/lib/data/mock-data"
import { cn } from "@/lib/utils"

export function RecentTransactions() {
  return (
    <div className="rounded-lg border border-sidebar-border/10 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[200px] text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entity / Project</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Type</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Amount</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right whitespace-nowrap">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentTransactions.map((tx) => (
              <TableRow key={tx.id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-sm">{tx.entity}</span>
                    <span className="text-[10px] text-muted-foreground tracking-tight font-medium uppercase">Project ID: {tx.id}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {tx.type}
                </TableCell>
                <TableCell className={cn(
                  "text-sm font-bold whitespace-nowrap",
                  tx.amount.startsWith("+") ? "text-emerald-600" : "text-foreground"
                )}>
                  {tx.amount}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-[10px] font-bold px-1.5 py-0 h-5 border-0 tracking-wider",
                      tx.status === "PAID" 
                        ? "bg-emerald-500/10 text-emerald-600" 
                        : "bg-amber-500/10 text-amber-600"
                    )}
                  >
                    {tx.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
