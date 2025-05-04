"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AdBannerProps {
  title: string
  description?: string
  ctaText?: string
  ctaLink?: string
  imageSrc?: string
  backgroundColor?: string
  textColor?: string
  position?: "top" | "middle" | "bottom"
  size?: "small" | "medium" | "large" | "full"
  dismissible?: boolean
  className?: string
}

export function AdBanner({
  title,
  description,
  ctaText = "Shop Now",
  ctaLink = "/products",
  imageSrc,
  backgroundColor = "bg-gradient-to-r from-primary/90 to-primary/70",
  textColor = "text-white",
  position = "middle",
  size = "medium",
  dismissible = true,
  className,
}: AdBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const sizeClasses = {
    small: "py-3 px-4",
    medium: "py-5 px-6",
    large: "py-8 px-8",
    full: "py-12 px-8",
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg shadow-md",
        backgroundColor,
        textColor,
        sizeClasses[size],
        className,
      )}
    >
      {/* Background image with overlay */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <img src={imageSrc || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
          <div className={`absolute inset-0 ${backgroundColor} opacity-80`}></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3
            className={cn(
              "font-bold",
              size === "small" ? "text-lg" : size === "large" || size === "full" ? "text-3xl" : "text-2xl",
            )}
          >
            {title}
          </h3>
          {description && (
            <p className={cn("mt-1 opacity-90", size === "small" ? "text-sm" : "text-base")}>{description}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="secondary" className="whitespace-nowrap font-medium">
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>

          {dismissible && (
            <button
              onClick={() => setDismissed(true)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
