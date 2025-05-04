"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ModernNewsletterProps {
  title?: string
  subtitle?: string
  backgroundImage?: string
  backgroundColor?: string
}

export function ModernNewsletter({
  title = "Join Our Newsletter",
  subtitle = "Get exclusive offers, new arrivals, and style inspiration delivered to your inbox.",
  backgroundImage,
  backgroundColor = "bg-gradient-to-r from-primary/10 to-primary/5",
}: ModernNewsletterProps) {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail("")
    }, 1500)
  }

  return (
    <section className={`py-16 relative overflow-hidden ${backgroundColor}`}>
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-10">
          <img src={backgroundImage || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto bg-background rounded-2xl shadow-lg p-8 md:p-12 border border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground">{subtitle}</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            {!isSubmitted ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 rounded-md"
                  />
                </div>
                <Button type="submit" disabled={isLoading} className="h-12 rounded-md px-6">
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Subscribe <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-4"
              >
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Thank you for subscribing!</h3>
                <p className="text-muted-foreground">
                  You've been added to our newsletter. We'll keep you updated with the latest news and offers.
                </p>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}
