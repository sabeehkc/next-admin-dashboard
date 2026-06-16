"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

export default function BasicFormsShowcase() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Basic Forms</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Forms Showcase</p>
      </div>

      <div className="rounded-xl border border-sidebar-border/10 p-6 bg-card shadow-sm space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Accept terms and conditions
          </Label>
        </div>

        <Button type="submit">Submit</Button>
      </div>
    </div>
  )
}
