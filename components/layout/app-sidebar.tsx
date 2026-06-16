"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Box,
  Layout,
  TableProperties,
  BarChart3,
  Files,
  Settings,
  HelpCircle,
  Component,
  ChevronRight,
  User2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarGroup,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const data = {
  user: {
    name: "Admin User",
    email: "admin@nextadmin.com",
    avatar: "/avatars/admin.jpg",
    role: "System Administrator",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "UI Elements",
      url: "#",
      icon: Box,
      items: [
        {
          title: "Cards",
          url: "/ui-elements/cards",
        },
        {
          title: "Buttons",
          url: "/ui-elements/buttons",
        },
      ],
    },
    {
      title: "Forms",
      url: "#",
      icon: Layout,
      items: [
        {
          title: "Basic Forms",
          url: "/forms/basic",
        },
        {
          title: "Dynamic Forms",
          url: "/forms/dynamic",
        },
      ],
    },
    {
      title: "Tables",
      url: "#",
      icon: TableProperties,
      items: [
        {
          title: "Basic Tables",
          url: "/tables/basic",
        },
        {
          title: "Data Table",
          url: "/tables/data-table",
        },
      ],
    },
    {
      title: "Charts",
      url: "/charts",
      icon: BarChart3,
    },
    {
      title: "Pages",
      url: "#",
      icon: Files,
      items: [
        {
          title: "Profile",
          url: "/pages/profile",
        },
        {
          title: "Settings",
          url: "/pages/settings",
        },
      ],
    },
  ],
  secondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Support",
      url: "/support",
      icon: HelpCircle,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>([])

  // Initialize open items based on current path
  React.useEffect(() => {
    const activeParents = data.navMain
      .filter(item => item.items?.some(sub => pathname.startsWith(sub.url)))
      .map(item => item.title)
    setOpenItems(prev => Array.from(new Set([...prev, ...activeParents])))
  }, [pathname])

  const toggleItem = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]
    )
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border" {...props}>
      <SidebarHeader className="h-20 border-b border-sidebar-border px-6 flex flex-row items-center gap-3">
        <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm group-data-[collapsible=icon]:size-8">
          <Component className="size-5" />
        </div>
        <div className="flex flex-col gap-0 overflow-hidden group-data-[collapsible=icon]:hidden">
          <span className="font-bold text-sm tracking-tight text-sidebar-foreground leading-tight truncate">NextAdmin UI</span>
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold">Dashboard Template</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4 gap-6 no-scrollbar">
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => {
              const hasSubItems = item.items && item.items.length > 0
              const isChildActive = item.items?.some(sub => pathname.startsWith(sub.url))
              const isActive = pathname.startsWith(item.url) || isChildActive
              const isOpen = openItems.includes(item.title)

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    isActive={isActive}
                    onClick={hasSubItems ? () => toggleItem(item.title) : undefined}
                    className={cn(
                      "transition-all duration-200 py-6 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg",
                      isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                    )}
                    render={
                      hasSubItems ? (
                        <button className="w-full flex items-center px-1">
                          {item.icon && <item.icon className={cn("size-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />}
                          <span className="flex-1 text-left ml-3 group-data-[collapsible=icon]:hidden">{item.title}</span>
                          <ChevronRight className={cn(
                            "size-4 transition-transform duration-200 group-data-[collapsible=icon]:hidden ml-auto opacity-50",
                            isOpen && "rotate-90"
                          )} />
                        </button>
                      ) : (
                        <Link href={item.url} className="w-full flex items-center px-1">
                          {item.icon && <item.icon className={cn("size-5 transition-colors", isActive ? "text-primary" : "text-muted-foreground")} />}
                          <span className="ml-3 group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </Link>
                      )
                    } 
                  />
                  {hasSubItems && isOpen ? (
                    <SidebarMenuSub className="ml-4 mt-1 border-l-sidebar-border">
                      {item.items.map((subItem) => {
                        const isSubActive = pathname === subItem.url
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              isActive={isSubActive}
                              render={
                                <Link 
                                  href={subItem.url} 
                                  className={cn(
                                    "transition-colors duration-200 py-2",
                                    isSubActive ? "text-sidebar-foreground font-medium" : "text-muted-foreground hover:text-sidebar-foreground"
                                  )}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              } 
                            />
                          </SidebarMenuSubItem>
                        )
                      })}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4 gap-4">
        <SidebarGroup className="p-0">
          <SidebarMenu>
            {data.secondary.map((item) => {
              const isActive = pathname === item.url
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    size="sm" 
                    isActive={isActive}
                    className="text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg"
                    render={
                      <Link href={item.url} className="flex items-center gap-3 px-1">
                        <item.icon className="size-4" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    } 
                  />
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="h-12 w-full justify-start gap-3 px-2 border-none ring-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-xl transition-colors">
              <Avatar className="h-8 w-8 rounded-lg shadow-sm border border-sidebar-border">
                <AvatarImage src={data.user.avatar} alt={data.user.name} />
                <AvatarFallback className="rounded-lg bg-sidebar-foreground text-sidebar text-[10px]">AS</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold text-sidebar-foreground">{data.user.name}</span>
                <span className="truncate text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{data.user.role}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail className="hover:after:bg-sidebar-border" />
    </Sidebar>
  )
}
