"use client"

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Client } from "@/store/slices/dataSlice"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Entity Name",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const id = row.original.id;
      
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary/5 text-primary text-[10px] sm:text-xs font-black ring-1 ring-primary/10">
            {name.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm tracking-tight">{name}</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-widest font-medium opacity-60">ID: {id}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "billing",
    header: "Revenue",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("billing"))
      const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
      return <div className="text-[11px] sm:text-sm font-bold text-muted-foreground">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge 
          className={cn(
            "text-[9px] sm:text-[10px] font-black px-1.5 sm:px-2 py-0.5 tracking-widest border-0",
            status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"
          )}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button variant="ghost" size="icon" className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground">
          <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Button>
      )
    },
  },
]

export default function DataTableShowcase() {
  const data = useSelector((state: RootState) => state.data.clients)

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Data Table</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tables Showcase</p>
      </div>

      <div className="rounded-xl border border-sidebar-border/10 p-6 bg-card shadow-sm">
        <div className="mb-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-primary/80">Interactive Data Grid</h2>
          <p className="text-xs text-muted-foreground mt-1">This table supports sorting, pagination, and filtering out of the box.</p>
        </div>
        <DataTable columns={columns} data={data} searchKey="name" />
      </div>
    </div>
  )
}
