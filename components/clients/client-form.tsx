"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { useDispatch } from "react-redux"
import { addClient } from "@/store/slices/dataSlice"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

const clientSchema = z.object({
  name: z.string().min(2, "Client name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  industry: z.string().min(1, "Industry is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormProps {
  onSuccess?: () => void
  onCancel?: () => void
  initialData?: any
}

export function ClientForm({ onSuccess, onCancel, initialData }: ClientFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const dispatch = useDispatch()

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      industry: "Real Estate",
      status: "ACTIVE",
    },
  })

  async function onSubmit(data: ClientFormValues) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSubmitting(false)
    
    if (!initialData) {
      dispatch(addClient({
        name: data.name,
        status: data.status as "ACTIVE" | "INACTIVE",
        billing: 0,
        received: 0,
        outstanding: 0,
      }))
    }
    
    toast.success(initialData ? "Client updated successfully" : "Client created successfully", {
      description: `${data.name} has been saved to the directory.`,
    })
    
    if (!initialData) {
      form.reset()
    }
    
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Client Entity Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Nexus Landscapes" className="bg-muted/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Contact Email</FormLabel>
              <FormControl>
                <Input placeholder="billing@client.com" className="bg-muted/30" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Industry Sector</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-muted/30">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-sidebar-border/10">
          {onCancel && (
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
              CANCEL
            </Button>
          )}
          <Button 
            type="submit" 
            className="flex-1 font-black shadow-lg shadow-primary/20" 
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "UPDATE CLIENT" : "CREATE CLIENT"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
