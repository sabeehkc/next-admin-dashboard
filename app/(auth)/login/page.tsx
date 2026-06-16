"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2, ArrowRight, Mail, ShieldCheck } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSendOTPMutation, useVerifyOTPMutation } from "@/store/services/authApiSlice"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
})

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = React.useState<"email" | "otp">("email")
  const [email, setEmail] = React.useState("")
  
  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation()
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation()

  const emailForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "" },
  })

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  async function onSendOTP(data: z.infer<typeof loginSchema>) {
    try {
      await sendOTP({ email: data.email }).unwrap()
      setEmail(data.email)
      setStep("otp")
      toast.success("OTP sent successfully", {
        description: "Please check your email for the verification code.",
      })
    } catch (error: any) {
      toast.error("Failed to send OTP", {
        description: error.data?.message || "Something went wrong. Please try again.",
      })
    }
  }

  async function onVerifyOTP(data: z.infer<typeof otpSchema>) {
    try {
      await verifyOTP({ email, otp: data.otp }).unwrap()
      toast.success("Login successful", {
        description: "Welcome back!",
      })
      router.push("/dashboard")
    } catch (error: any) {
      toast.error("Verification failed", {
        description: error.data?.message || "Invalid OTP. Please try again.",
      })
    }
  }

  return (
    <div className="space-y-6">
      {step === "email" ? (
        <Form {...emailForm}>
          <form onSubmit={emailForm.handleSubmit(onSendOTP)} className="space-y-4">
            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="name@company.com" 
                        className="h-11 pl-10 border-sidebar-border/20 bg-muted/30 focus:bg-background transition-colors font-medium" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-11 font-black shadow-lg shadow-primary/20" 
              disabled={isSendingOTP}
            >
              {isSendingOTP ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "CONTINUE WITH EMAIL"}
              {!isSendingOTP && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Form>
      ) : (
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onVerifyOTP)} className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">Verify your email</p>
              <p className="text-xs text-muted-foreground">
                We sent a code to <span className="font-bold text-foreground">{email}</span>
              </p>
            </div>
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">6-Digit Code</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="000000" 
                        className="h-11 pl-10 border-sidebar-border/20 bg-muted/30 focus:bg-background transition-colors font-bold text-2xl tracking-[0.5em]" 
                        maxLength={6}
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-11 font-black shadow-lg shadow-primary/20" 
              disabled={isVerifyingOTP}
            >
              {isVerifyingOTP ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "VERIFY & LOGIN"}
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              className="w-full h-10 text-xs font-bold" 
              onClick={() => setStep("email")}
            >
              BACK TO EMAIL
            </Button>
          </form>
        </Form>
      )}

      <div className="text-center text-sm">
        <span className="text-muted-foreground">New to the platform? </span>
        <Link href="/register" className="font-bold text-primary hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  )
}
