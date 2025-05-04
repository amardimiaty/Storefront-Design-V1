"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { login } from "@/lib/saleor-api"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    setIsLoading(true)

    try {
      // Call the mock login API
      const result = await login(email, password)

      // Store the token in localStorage (in a real app, you might use a more secure method)
      localStorage.setItem("authToken", result.token)

      toast({
        title: "Login successful",
        description: `Welcome back, ${result.user.firstName}!`,
      })

      // In a real app, you would redirect to a dashboard or home page
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your email and password and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8 rounded-lg border p-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/account/reset-password" className="text-xs text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-xs text-gray-500">OR</span>
          </div>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full" disabled={isLoading}>
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" disabled={isLoading}>
            Continue with Facebook
          </Button>
        </div>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/account/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
