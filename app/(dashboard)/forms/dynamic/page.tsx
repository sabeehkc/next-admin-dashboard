"use client"

import { DynamicForm } from "@/components/ui/dynamic-form"
import * as z from "zod"
import { toast } from "sonner"

const userSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "user", "editor"]),
})

export default function DynamicFormShowcase() {
  const onSubmit = async (data: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Form submitted successfully", {
      description: `Data: ${JSON.stringify(data)}`,
    })
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Dynamic Forms</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Forms Showcase</p>
      </div>

      <div className="rounded-xl border border-sidebar-border/10 p-6 bg-card shadow-sm">
        <DynamicForm 
          schema={userSchema}
          defaultValues={{ fullName: "", email: "", role: "user" }}
          fields={[
            { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
            { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
            { 
              name: "role", 
              label: "System Role", 
              type: "select", 
              options: [
                { label: "Admin", value: "admin" },
                { label: "Editor", value: "editor" },
                { label: "User", value: "user" },
              ]
            }
          ]}
          onSubmit={onSubmit}
          submitText="Create User"
        />
      </div>
    </div>
  )
}
