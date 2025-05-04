"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"
import { X, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()

  // Define closePopup as a useCallback to ensure it's stable
  const closePopup = useCallback(() => {
    console.log("Closing popup")
    setShowPopup(false)
    localStorage.setItem("newsletterPopupSeen", "true")
  }, [])

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showPopup) {
        closePopup()
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [showPopup, closePopup])

  // Listen for the custom event from the cookie consent component
  useEffect(() => {
    // Don't show on admin dashboard pages
    if (pathname?.startsWith("/admin")) return

    const handleShowNewsletter = () => {
      // Only show if user hasn't seen it before
      if (!localStorage.getItem("newsletterPopupSeen")) {
        setShowPopup(true)
      }
    }

    // Add event listener for the custom event
    window.addEventListener("showNewsletter", handleShowNewsletter)

    // Check if we should show the newsletter on initial load
    // This is a fallback for page refreshes
    const hasSeenPopup = localStorage.getItem("newsletterPopupSeen")
    const cookieConsentHandled = localStorage.getItem("cookieConsentHandled")

    if (!hasSeenPopup && cookieConsentHandled === "true") {
      setShowPopup(true)
    }

    // Clean up event listener
    return () => {
      window.removeEventListener("showNewsletter", handleShowNewsletter)
    }
  }, [pathname])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      localStorage.setItem("newsletterSubscribed", "true")

      // Close popup after showing success message
      setTimeout(() => {
        closePopup()
      }, 3000)
    }, 1500)
  }

  // If popup shouldn't be shown or we're on admin pages, return null early
  if (!showPopup || pathname?.startsWith("/admin")) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closePopup}>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button - Made larger and more prominent */}
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-20 transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
        </div>

        <div className="p-6 md:p-8 relative z-10">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <div className="bg-primary/10 rounded-full p-3 inline-flex mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Join Our Newsletter</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  style={{
                    backgroundColor: "#7c3aed",
                    color: "white",
                    "--tw-hover-bg": "#6d28d9",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6d28d9")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#7c3aed")}
                >
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
                    "Subscribe Now"
                  )}
                </Button>
              </form>

              {/* Added explicit "No thanks" button */}
              <div className="text-center mt-4">
                <button
                  onClick={closePopup}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
                >
                  No thanks, maybe later
                </button>
              </div>

              <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </>
          ) : (
            <div className="text-center py-6">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
              <p className="text-gray-600 dark:text-gray-300">You've successfully subscribed to our newsletter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
