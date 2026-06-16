"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfileShowcase() {
  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">User Profile</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pages Showcase</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-sidebar-border/10 shadow-sm">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
              <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
              <AvatarFallback className="text-2xl font-black bg-primary text-primary-foreground">AU</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Admin User</h2>
              <p className="text-sm text-muted-foreground">System Administrator</p>
            </div>
            <div className="w-full flex gap-2 pt-4">
              <Button className="w-full" variant="outline">Message</Button>
              <Button className="w-full">Follow</Button>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <Card className="lg:col-span-2 border-sidebar-border/10 shadow-sm">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Admin" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="User" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@nextadmin.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue="NextAdmin Inc." />
            </div>
            <Button className="mt-4">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
