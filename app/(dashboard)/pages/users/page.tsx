"use client"

import { useMemo } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Plus, MoreHorizontal, Check, X } from "lucide-react"

import { PageHeader } from "@/components/ui/page-header"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Define user type
type User = {
  id: string
  name: string
  email: string
  role: "Admin" | "Manager" | "User"
  status: "Active" | "Inactive"
  lastLogin: string
}

// Mock data
const usersData: User[] = [
  { id: "1", name: "Alice Smith", email: "alice@example.com", role: "Admin", status: "Active", lastLogin: "2023-10-24" },
  { id: "2", name: "Bob Johnson", email: "bob@example.com", role: "Manager", status: "Active", lastLogin: "2023-10-23" },
  { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "User", status: "Inactive", lastLogin: "2023-09-15" },
  { id: "4", name: "Diana Prince", email: "diana@example.com", role: "User", status: "Active", lastLogin: "2023-10-24" },
  { id: "5", name: "Edward Teach", email: "edward@example.com", role: "Manager", status: "Active", lastLogin: "2023-10-20" },
  { id: "6", name: "Fiona Gallagher", email: "fiona@example.com", role: "User", status: "Inactive", lastLogin: "2023-08-30" },
  { id: "7", name: "George Costanza", email: "george@example.com", role: "User", status: "Active", lastLogin: "2023-10-22" },
]

export default function UsersPage() {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border border-sidebar-border/20">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.original.name}`} alt={row.original.name} />
                <AvatarFallback>{row.original.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-bold text-sm">{row.original.name}</span>
                <span className="text-xs text-muted-foreground">{row.original.email}</span>
              </div>
            </div>
          )
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.getValue("role") as string
          return (
            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
              {role}
            </Badge>
          )
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          const isActive = status === "Active"
          return (
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center w-4 h-4 rounded-full ${isActive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                {isActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">{status}</span>
            </div>
          )
        },
      },
      {
        accessorKey: "lastLogin",
        header: "Last Login",
        cell: ({ row }) => {
          return <span className="text-xs text-muted-foreground font-medium">{row.getValue("lastLogin")}</span>
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original
          return (
            <DropdownMenu>
              <DropdownMenuTrigger >
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                  Copy user ID
                </DropdownMenuItem>
                <DropdownMenuItem>Edit user</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600 focus:text-red-600">Delete user</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ],
    []
  )

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Users" 
        description="Manage system users, their roles, and access permissions."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Pages" },
          { label: "Users" },
        ]}
        action={
          <Button className="gap-2 shadow-lg shadow-primary/20 text-[10px] sm:text-xs font-black uppercase tracking-widest px-4 sm:px-6">
            <Plus className="w-4 h-4" /> Add User
          </Button>
        }
      />

      <div className="w-full">
        <DataTable columns={columns} data={usersData} searchKey="name" />
      </div>
    </div>
  )
}
