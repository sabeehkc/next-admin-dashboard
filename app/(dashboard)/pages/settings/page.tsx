"use client"

import { z } from "zod"
import { PageHeader } from "@/components/ui/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DynamicForm, FieldConfig } from "@/components/ui/dynamic-form"

const profileSchema = z.object({
  fullName: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  role: z.string(),
})

const profileFields: FieldConfig[] = [
  { name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe" },
  { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
  { 
    name: "role", 
    label: "Role", 
    type: "select", 
    options: [
      { label: "Administrator", value: "admin" },
      { label: "Manager", value: "manager" },
      { label: "User", value: "user" },
    ]
  },
]

export default function SettingsPage() {
  const handleProfileSubmit = async (data: any) => {
    console.log("Profile Data:", data)
    // Add success toast here
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader 
        title="Settings" 
        description="Manage your account settings and preferences."
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Pages" },
          { label: "Settings" },
        ]}
      />

      <div className="rounded-xl border border-sidebar-border/10 bg-card shadow-sm p-6">
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="max-w-2xl">
            <div className="mb-6">
              <h3 className="text-lg font-black uppercase tracking-tight">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Update your account's profile information and email address.</p>
            </div>
            <DynamicForm 
              schema={profileSchema}
              defaultValues={{ fullName: "John Doe", email: "john@example.com", role: "admin" }}
              fields={profileFields}
              onSubmit={handleProfileSubmit}
              submitText="Save Changes"
            />
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="mb-6">
              <h3 className="text-lg font-black uppercase tracking-tight">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">Choose what updates you want to receive.</p>
            </div>
            {/* Additional content could go here */}
            <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-md border border-sidebar-border/10">
              Notification settings form coming soon...
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="mb-6">
              <h3 className="text-lg font-black uppercase tracking-tight">Security Settings</h3>
              <p className="text-sm text-muted-foreground">Manage your password and security preferences.</p>
            </div>
            {/* Additional content could go here */}
            <div className="text-sm text-muted-foreground p-4 bg-muted/20 rounded-md border border-sidebar-border/10">
              Security settings form coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
