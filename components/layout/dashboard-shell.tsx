"use client"

import * as React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Navbar } from "./navbar"
import { ScrollArea } from "@/components/ui/scroll-area"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <Navbar />
          <ScrollArea className="flex-1">
            <main className="flex-1 p-6 md:p-8">
              <div className="mx-auto max-w-[1400px]">
                {children}
              </div>
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
