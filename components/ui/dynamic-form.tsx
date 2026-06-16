"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface FieldConfig {
  name: string
  label: string
  type: "text" | "email" | "password" | "number" | "select"
  placeholder?: string
  options?: { label: string; value: string }[]
}

interface DynamicFormProps {
  schema: z.ZodType<any, any, any>
  defaultValues: any
  fields: FieldConfig[]
  onSubmit: (data: any) => Promise<void> | void
  submitText?: string
}

export function DynamicForm({
  schema,
  defaultValues,
  fields,
  onSubmit,
  submitText = "Submit",
}: DynamicFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                {field.type === "select" ? (
                  <Select
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <FormControl>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  </FormControl>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">{submitText}</Button>
      </form>
    </Form>
  )
}
