"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CardsShowcase() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Cards</h1>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">UI Elements Showcase</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic Card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>A simple card layout.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This is the content of the card. You can place any components in here.</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Action</Button>
          </CardFooter>
        </Card>

        {/* Stats Card */}
        <Card className="border-sidebar-border/10 shadow-sm ring-1 ring-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Revenue</p>
            </div>
            <div className="text-2xl font-black text-primary">$45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>

        {/* Image Card */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground text-sm font-semibold">Image Placeholder</span>
          </div>
          <CardHeader>
            <CardTitle>Media Card</CardTitle>
            <CardDescription>Card with header media.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
