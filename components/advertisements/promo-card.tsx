import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface PromoCardProps {
  title: string
  subtitle?: string
  description?: string
  imageSrc: string
  ctaText?: string
  ctaLink?: string
  discount?: string
  tag?: string
  variant?: "light" | "dark" | "primary" | "accent"
  size?: "small" | "medium" | "large"
  className?: string
}

export function PromoCard({
  title,
  subtitle,
  description,
  imageSrc,
  ctaText = "Shop Now",
  ctaLink = "/products",
  discount,
  tag,
  variant = "light",
  size = "medium",
  className,
}: PromoCardProps) {
  const variantClasses = {
    light: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
  }

  const sizeClasses = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end">
        {tag && (
          <Badge variant="secondary" className="mb-4 self-start">
            {tag}
          </Badge>
        )}

        {discount && (
          <div className="absolute right-0 top-0 bg-red-600 px-3 py-1 text-sm font-bold text-white">{discount}</div>
        )}

        <div className="mt-auto">
          {subtitle && <p className="mb-1 text-sm font-medium uppercase tracking-wider text-white/90">{subtitle}</p>}
          <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">{title}</h3>
          {description && <p className="mb-4 text-sm text-white/80">{description}</p>}

          <Link
            href={ctaLink}
            className="mt-2 inline-flex items-center text-sm font-medium text-white underline-offset-4 hover:underline"
          >
            {ctaText} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
