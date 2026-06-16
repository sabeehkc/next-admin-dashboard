"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"

const transactionSchema = z.object({
  type: z.enum(["income", "expense", "salary", "vendor", "investment"]),
  amount: z.string().min(1, "Amount is required"),
  date: z.date({
    message: "Date is required",
  }),
  entityId: z.string().min(1, "Recipient/Source is required"),
  projectId: z.string().optional(),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.enum(["paid", "pending", "overdue"]),
})

type TransactionFormValues = z.infer<typeof transactionSchema>

export function TransactionForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "income",
      amount: "",
      date: new Date(),
      status: "pending",
      description: "",
    },
  })

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const transactionType = form.watch("type")

  async function onSubmit(data: TransactionFormValues) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    
    toast.success("Transaction recorded successfully", {
      description: `${data.type.toUpperCase()} of ${data.amount} has been added to the ledger.`,
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Transaction Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 border-sidebar-border/20 bg-muted/30 focus:bg-background transition-colors font-semibold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-semibold">
                    <SelectItem value="income">Client Payment (Income)</SelectItem>
                    <SelectItem value="expense">Company Expense</SelectItem>
                    <SelectItem value="salary">Employee Salary</SelectItem>
                    <SelectItem value="vendor">Vendor Payout</SelectItem>
                    <SelectItem value="investment">Investment / Loan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Amount (USD)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                    <Input 
                      placeholder="0.00" 
                      className="h-11 pl-7 border-sidebar-border/20 bg-muted/30 focus:bg-background transition-colors font-bold text-lg" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Transaction Date</FormLabel>
                <Popover>
                  <PopoverTrigger render={
                    <Button
                      variant={"outline"}
                      className={cn(
                        "h-11 w-full pl-3 text-left font-semibold border-sidebar-border/20 bg-muted/30 hover:bg-muted/40",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        mounted ? format(field.value, "PPP") : field.value.toDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  } />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                  {transactionType === "income" ? "Client" : 
                   transactionType === "salary" ? "Employee" : 
                   transactionType === "vendor" ? "Vendor" : "Source/Recipient"}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-11 border-sidebar-border/20 bg-muted/30 focus:bg-background transition-colors font-semibold">
                      <SelectValue placeholder="Select entity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-semibold">
                    <SelectItem value="ent-1">Nexus Landscapes Ltd.</SelectItem>
                    <SelectItem value="ent-2">Meridian Hospitality</SelectItem>
                    <SelectItem value="ent-3">Vanguard Urban Holdings</SelectItem>
                    <SelectItem value="emp-1">Julian Sterling (In-House)</SelectItem>
                    <SelectItem value="ven-1">Apex Ironworks Ltd.</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {(transactionType === "income" || transactionType === "vendor") && (
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Linked Project</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-11 border-sidebar-border/20 bg-muted/30 focus:bg-background transition-colors font-semibold">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-semibold">
                      <SelectItem value="prj-1">Horizon Center Redevelopment</SelectItem>
                      <SelectItem value="prj-2">Nexus Quantum Labs</SelectItem>
                      <SelectItem value="prj-3">The Obsidian Spire</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Memo / Description</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Briefly describe the purpose of this transaction..." 
                    className="h-11 border-sidebar-border/20 bg-muted/30 focus:bg-background transition-colors font-medium" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-sidebar-border/10">
          <Button type="button" variant="ghost" className="h-11 font-bold px-6">CANCEL</Button>
          <Button 
            type="submit" 
            className="h-11 px-8 font-black shadow-lg shadow-primary/20" 
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            POST TRANSACTION
          </Button>
        </div>
      </form>
    </Form>
  )
}
