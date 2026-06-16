"use client"

import * as React from "react"
import { format } from "date-fns"
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  MoreHorizontal,
  ArrowUpDown,
  Calendar as CalendarIcon
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const transactions = [
  { id: "TX-921", date: "2024-03-22", entity: "Sterling Plaza Reno", type: "Milestone", amount: 42000.00, status: "PAID", category: "INCOME" },
  { id: "TX-441", date: "2024-03-21", entity: "Material Vendor #04", type: "Procurement", amount: -12850.00, status: "PENDING", category: "EXPENSE" },
  { id: "TX-001", date: "2024-03-20", entity: "Azure Cloud Systems", type: "SaaS Expense", amount: -4200.00, status: "PAID", category: "EXPENSE" },
  { id: "TX-882", date: "2024-03-19", entity: "Julian Sterling", type: "Salary", amount: -8500.00, status: "PAID", category: "SALARY" },
  { id: "TX-771", date: "2024-03-18", entity: "Nexus Landscapes", type: "Milestone", amount: 120000.00, status: "OVERDUE", category: "INCOME" },
  { id: "TX-661", date: "2024-03-15", entity: "Apex Ironworks Ltd.", type: "Sub-Contractor", amount: -25000.00, status: "PAID", category: "VENDOR" },
]

export function TransactionTable() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="space-y-4">
      {/* Filters & Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">
        <div className="relative w-full sm:max-w-xs lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search transactions..." 
            className="h-9 sm:h-10 pl-9 border-sidebar-border/10 bg-muted/30 focus:bg-background text-[11px] sm:text-xs font-medium"
          />
        </div>
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Button variant="outline" size="sm" className="h-8 sm:h-10 gap-1.5 border-sidebar-border/10 font-bold px-3 sm:px-4 text-[10px] sm:text-xs">
            <Filter className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="uppercase">Type</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 sm:h-10 gap-1.5 border-sidebar-border/10 font-bold px-3 sm:px-4 text-[10px] sm:text-xs">
            <CalendarIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="uppercase">Date</span>
          </Button>
          <Button variant="outline" size="sm" className="h-8 sm:h-10 gap-1.5 border-sidebar-border/10 font-bold px-3 sm:px-4 text-[10px] sm:text-xs">
            <Download className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="uppercase">Export</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-sidebar-border/10 overflow-hidden shadow-sm bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[100px] text-[10px] sm:text-xs font-bold uppercase tracking-widest py-4 whitespace-nowrap">ID</TableHead>
                <TableHead className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Date</TableHead>
                <TableHead className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Entity / Description</TableHead>
                <TableHead className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Type</TableHead>
                <TableHead className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Amount</TableHead>
                <TableHead className="text-[10px] sm:text-xs font-bold uppercase tracking-widest whitespace-nowrap">Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-mono text-[10px] font-bold text-muted-foreground whitespace-nowrap">{tx.id}</TableCell>
                  <TableCell className="text-[10px] sm:text-xs font-semibold text-muted-foreground whitespace-nowrap">
                    {mounted ? format(new Date(tx.date), "MMM d, yyyy") : tx.date}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-xs sm:text-sm tracking-tight">{tx.entity}</span>
                      <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-medium opacity-60">PROJ: {tx.entity.split(' ')[0]}</span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant="secondary" className="text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 bg-muted/80 tracking-tight">
                      {tx.type}
                    </Badge>
                  </TableCell>
                  <TableCell className={cn(
                    "font-black tracking-tight whitespace-nowrap text-xs sm:text-sm",
                    tx.amount > 0 ? "text-emerald-600" : "text-foreground"
                  )}>
                    {tx.amount > 0 ? `+` : ``}{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tx.amount)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge 
                      className={cn(
                        "text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 tracking-widest border-0",
                        tx.status === "PAID" ? "bg-emerald-500/10 text-emerald-600" :
                        tx.status === "PENDING" ? "bg-amber-500/10 text-amber-600" :
                        "bg-destructive/10 text-destructive"
                      )}
                    >
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={
                        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground">
                          <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </Button>
                      } />
                      <DropdownMenuContent align="end" className="font-bold">
                        <DropdownMenuItem className="text-[10px] sm:text-xs">VIEW DETAILS</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] sm:text-xs">EDIT LEDGER</DropdownMenuItem>
                        <DropdownMenuItem className="text-[10px] sm:text-xs">DOWNLOAD RECEIPT</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive text-[10px] sm:text-xs">VOID TRANSACTION</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 border-t border-sidebar-border/5 bg-muted/10">
          <div className="flex flex-1 items-center justify-between sm:hidden">
            <Button variant="outline" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest">Prev</Button>
            <div className="text-[10px] font-bold text-muted-foreground">PAGE 1 / 4</div>
            <Button variant="outline" size="sm" className="h-8 text-[9px] font-black uppercase tracking-widest">Next</Button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Showing <span className="text-primary">1</span> to <span className="text-primary">6</span> of <span className="text-primary">24</span> entries
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest border-sidebar-border/10 hover:bg-primary hover:text-white transition-all">Previous</Button>
              <div className="flex gap-1">
                {[1, 2, 3].map((page) => (
                  <Button 
                    key={page} 
                    variant={page === 1 ? "default" : "outline"} 
                    size="sm" 
                    className={cn(
                      "h-8 w-8 p-0 text-[10px] font-black",
                      page === 1 ? "shadow-lg shadow-primary/20" : "border-sidebar-border/10"
                    )}
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button variant="outline" size="sm" className="h-8 px-4 text-[10px] font-black uppercase tracking-widest border-sidebar-border/10 hover:bg-primary hover:text-white transition-all">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
