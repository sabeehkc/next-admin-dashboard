"use client"

import { Button } from "@/components/ui/button"

export default function ButtonsShowcase() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Buttons</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">UI Elements Showcase</p>
      </div>

      <div className="rounded-xl border border-sidebar-border/10 p-6 bg-card shadow-sm space-y-8">
        
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase text-muted-foreground">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase text-muted-foreground">Sizes</h2>
          <div className="flex items-center flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">!</Button>
          </div>
        </div>

      </div>
    </div>
  )
}
