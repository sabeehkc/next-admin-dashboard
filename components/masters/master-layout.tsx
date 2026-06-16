"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MasterLayoutProps {
  title: string;
  description: string;
  list: React.ReactNode;
  form: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function MasterLayout({ title, description, list, form, isOpen, onOpenChange }: MasterLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className={cn("flex-1 w-full transition-all duration-300", isOpen ? "lg:w-2/3" : "lg:w-full")}>
        <Card className="border-none shadow-md bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>{title} List</CardTitle>
              <CardDescription>View and manage existing records.</CardDescription>
            </div>
            {!isOpen && (
              <Button 
                onClick={() => onOpenChange(true)}
                className="h-8 gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                <Plus className="h-3.5 w-3.5" />
                Add New {title}
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0 sm:p-6 sm:pt-0">
            {list}
          </CardContent>
        </Card>
      </div>
      
      {isOpen && (
        <div className="w-full lg:w-1/3 sticky top-6 animate-in slide-in-from-right-4 duration-300">
          <Card className="border-none shadow-md bg-card ring-1 ring-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-lg">Add / Edit {title}</CardTitle>
                <CardDescription className="text-[10px] sm:text-[11px] font-medium leading-tight">
                  {description}
                </CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {form}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


