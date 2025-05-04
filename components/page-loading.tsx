"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface PageLoadingProps {
  children: React.ReactNode
}

export default function PageLoading({ children }: PageLoadingProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if document is already complete
    if (document.readyState === "complete") {
      const timer = setTimeout(() => setLoading(false), 500)
      return () => clearTimeout(timer)
    }

    // Otherwise wait for load event
    const handleLoad = () => {
      // Small delay for smoother transition
      setTimeout(() => setLoading(false), 800)
    }

    window.addEventListener("load", handleLoad)

    // Fallback in case load event doesn't fire
    const fallbackTimer = setTimeout(() => setLoading(false), 3000)

    return () => {
      window.removeEventListener("load", handleLoad)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center space-y-4"
          >
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg font-medium text-foreground"
            >
              Loading your experience...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
      <motion.div initial={{ opacity: loading ? 0 : 1 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    </>
  )
}
