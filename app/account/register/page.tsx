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
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { register } from "@/lib/saleor-api"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !password) return

    if (!termsAccepted) {
      toast({
        title: "Terms and Conditions",
        description: "Please accept the Terms of Service and Privacy Policy to continue.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Call the mock register API
      const result = await register({
        firstName,
        lastName,
        email,
        password,
      })

      // Store the token in localStorage (in a real app, you might use a more secure method)
      localStorage.setItem("authToken", result.token)

      toast({
        title: "Registration successful",
        description: `Welcome to ModernStore, ${firstName}!`,
      })

      // In a real app, you would redirect to a dashboard or home page
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
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
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="mt-2 text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input
                id="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                id="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </div>

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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500">
              Password must be at least 8 characters long and include a number and a special character.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              disabled={isLoading}
            />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
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
            Sign up with Google
          </Button>
          <Button variant="outline" className="w-full" disabled={isLoading}>
            Sign up with Facebook
          </Button>
        </div>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/account/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
