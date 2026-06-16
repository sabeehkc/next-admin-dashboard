"use client"

import * as React from "react"
import { Search, Calculator, Calendar, Smile, User, FileText, Briefcase, CreditCard } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function GlobalSearch() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <div 
        onClick={() => setOpen(true)}
        className="relative w-full max-w-sm cursor-pointer group"
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors" />
        <div className="h-10 w-full rounded-xl border border-sidebar-border/10 bg-muted/30 px-10 py-2.5 text-xs font-bold text-muted-foreground transition-all focus:bg-background group-hover:bg-muted/50 flex items-center justify-between">
          <span>Search...</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 uppercase">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." className="font-bold border-none h-14" />
        <CommandList className="max-h-[400px]">
          <CommandEmpty className="py-12 text-center text-xs font-black uppercase tracking-widest text-muted-foreground">No matches found.</CommandEmpty>
          <CommandGroup heading="Core Modules" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-4 py-3">
             <CommandItem className="h-12 gap-3 px-4 font-bold cursor-pointer rounded-lg hover:bg-primary/5 transition-colors">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>Jump to Projects</span>
                <CommandShortcut className="font-mono text-[10px] uppercase">⌘P</CommandShortcut>
             </CommandItem>
             <CommandItem className="h-12 gap-3 px-4 font-bold cursor-pointer rounded-lg hover:bg-primary/5 transition-colors">
                <User className="h-4 w-4 text-primary" />
                <span>View Clients</span>
                <CommandShortcut className="font-mono text-[10px] uppercase">⌘C</CommandShortcut>
             </CommandItem>
             <CommandItem className="h-12 gap-3 px-4 font-bold cursor-pointer rounded-lg hover:bg-primary/5 transition-colors">
                <CreditCard className="h-4 w-4 text-primary" />
                <span>Fiscal Ledger</span>
                <CommandShortcut className="font-mono text-[10px] uppercase">⌘L</CommandShortcut>
             </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recent Entities" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-4 py-3">
             <CommandItem className="h-12 gap-3 px-4 font-bold cursor-pointer rounded-lg hover:bg-primary/5 transition-colors">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Horizon Center Redevelopment</span>
             </CommandItem>
             <CommandItem className="h-12 gap-3 px-4 font-bold cursor-pointer rounded-lg hover:bg-primary/5 transition-colors">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Nexus Landscapes Ltd.</span>
             </CommandItem>
             <CommandItem className="h-12 gap-3 px-4 font-bold cursor-pointer rounded-lg hover:bg-primary/5 transition-colors">
                <div className="h-2 w-2 rounded-full bg-amber-500" />
                <span>TX-921 Milestone Payout</span>
             </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
