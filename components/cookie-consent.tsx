"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

// Create a custom event for communication between components
const triggerNewsletterEvent = () => {
  // Use a custom event to signal that the newsletter should show
  const event = new CustomEvent("showNewsletter")
  window.dispatchEvent(event)
}

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const pathname = usePathname()

  // Don't show on admin dashboard pages
  const isAdminPage = pathname?.startsWith("/admin")

  useEffect(() => {
    // Don't show on admin pages
    if (isAdminPage) {
      return
    }

    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent")

    // If no choice has been made, show the banner after a short delay
    if (!cookieConsent) {
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isAdminPage])

  const handleCookieChoice = (choice: string) => {
    localStorage.setItem("cookieConsent", choice)
    localStorage.setItem("cookieConsentHandled", "true")
    setShowConsent(false)

    // Trigger the newsletter popup after a very short delay
    // This ensures the cookie popup has time to animate out
    setTimeout(() => {
      triggerNewsletterEvent()
    }, 300)
  }

  const acceptCookies = () => {
    handleCookieChoice("accepted")
  }

  const declineCookies = () => {
    handleCookieChoice("declined")
  }

  return (
    <AnimatePresence>
      {showConsent && !isAdminPage && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6">
              <div className="flex items-start md:items-center mb-4 md:mb-0 pr-8">
                <Cookie className="h-6 w-6 text-primary mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-base mb-1">We use cookies</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze
                    our traffic. By clicking "Accept All", you consent to our use of cookies.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <Button variant="outline" onClick={declineCookies} className="w-full sm:w-auto">
                  Decline
                </Button>
                <Button
                  onClick={acceptCookies}
                  className="w-full sm:w-auto"
                  style={{ backgroundColor: "#7c3aed", color: "white" }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6d28d9")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#7c3aed")}
                >
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
