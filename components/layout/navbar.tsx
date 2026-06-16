"use client"

import * as React from "react"
import { Bell, Search, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import navimage from "../../public/Mohammed_Sabeeh_kc.jpg"

export function Navbar() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-white/80 dark:bg-black/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="-ml-1" />
        <div className="relative w-full max-w-sm hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-foreground" />
          <Input
            placeholder="Search..."
            className="h-10 w-full rounded-lg bg-accent/50 dark:bg-accent/10 border-none pl-10 focus:ring-1 focus:ring-foreground/20 transition-all font-medium"
          />
        </div>
        <Button variant="ghost" size="icon" className="md:hidden flex h-10 w-10 text-muted-foreground">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        )}

        <Button variant="ghost" size="icon" className="relative h-10 w-10 text-muted-foreground hover:text-primary hover:bg-accent transition-colors">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary border-2 border-white dark:border-background" />
        </Button>

        <div className="h-8 w-px bg-border mx-2 hidden sm:block" />

        <div className="hidden lg:flex flex-col items-end mr-2">
          <span className="text-[10px] font-bold text-foreground uppercase tracking-widest leading-none">Architecture Firm HQ</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-offset-background transition-all hover:ring-2 hover:ring-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <Avatar className="h-10 w-10 border shadow-sm">
                <AvatarImage src={navimage.src} alt="Alex Sterling" />
                <AvatarFallback className="bg-primary text-primary-foreground">AS</AvatarFallback>
              </Avatar>
            </Button>
          } />
          <DropdownMenuContent className="w-56 mt-2" align="end" sideOffset={8}>
            <DropdownMenuLabel className="font-normal px-3 py-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold text-foreground leading-none">Alex Sterling</p>
                <p className="text-[11px] font-medium leading-none text-muted-foreground">
                  alex@architectural-ledger.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive cursor-pointer font-medium">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
