"use client"

import { useEffect, useState } from "react"
import type React from "react"
import {
  ShieldCheck,
  Truck,
  CreditCard,
  RotateCcw,
  Gift,
  Clock,
  Heart,
  Star,
  Award,
  ThumbsUp,
  Zap,
  Headphones,
  Package,
  RefreshCw,
  Percent,
  Tag,
} from "lucide-react"
import { Container } from "@/components/layout/container"

// Define the benefit interface with color and font properties
interface Benefit {
  icon: string // Store icon name as string
  title: string
  description: string
  color?: string // Optional color property
  titleFont?: string // Optional title font property
  descriptionFont?: string // Optional description font property
}

interface BenefitsSectionProps {
  title?: string
  benefits?: Benefit[]
}

// Map of icon names to components for easy lookup - expanded with more icons
const iconMap: Record<string, React.ReactNode> = {
  Truck: <Truck className="h-10 w-10" />,
  ShieldCheck: <ShieldCheck className="h-10 w-10" />,
  RotateCcw: <RotateCcw className="h-10 w-10" />,
  CreditCard: <CreditCard className="h-10 w-10" />,
  Gift: <Gift className="h-10 w-10" />,
  Clock: <Clock className="h-10 w-10" />,
  Heart: <Heart className="h-10 w-10" />,
  Star: <Star className="h-10 w-10" />,
  Award: <Award className="h-10 w-10" />,
  ThumbsUp: <ThumbsUp className="h-10 w-10" />,
  Zap: <Zap className="h-10 w-10" />,
  Headphones: <Headphones className="h-10 w-10" />,
  Package: <Package className="h-10 w-10" />,
  RefreshCw: <RefreshCw className="h-10 w-10" />,
  Percent: <Percent className="h-10 w-10" />,
  Tag: <Tag className="h-10 w-10" />,
}

// Default benefits data
const defaultBenefits = [
  {
    icon: "Truck",
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
    color: "#7c3aed",
    titleFont: "font-semibold",
    descriptionFont: "font-normal",
  },
  {
    icon: "ShieldCheck",
    title: "Secure Payment",
    description: "100% secure payment methods",
    color: "#7c3aed",
    titleFont: "font-semibold",
    descriptionFont: "font-normal",
  },
  {
    icon: "RotateCcw",
    title: "Easy Returns",
    description: "30-day money-back guarantee",
    color: "#7c3aed",
    titleFont: "font-semibold",
    descriptionFont: "font-normal",
  },
  {
    icon: "CreditCard",
    title: "Flexible Payment",
    description: "Multiple payment options available",
    color: "#7c3aed",
    titleFont: "font-semibold",
    descriptionFont: "font-normal",
  },
]

export function BenefitsSection({
  title: initialTitle = "Why Shop With Us",
  benefits: initialBenefits = defaultBenefits,
}: BenefitsSectionProps) {
  // State to store benefits data
  const [title, setTitle] = useState(initialTitle)
  const [benefits, setBenefits] = useState(initialBenefits)

  // Load benefits data from localStorage on component mount
  useEffect(() => {
    try {
      const savedTitle = localStorage.getItem("benefits-title")
      const savedBenefits = localStorage.getItem("benefits-data")

      if (savedTitle) {
        setTitle(savedTitle)
      }

      if (savedBenefits) {
        const parsedBenefits = JSON.parse(savedBenefits)

        // Add color and font properties if they don't exist in saved data
        const updatedBenefits = parsedBenefits.map((benefit: Benefit) => ({
          ...benefit,
          color: benefit.color || "#7c3aed",
          titleFont: benefit.titleFont || "font-semibold",
          descriptionFont: benefit.descriptionFont || "font-normal",
        }))

        setBenefits(updatedBenefits)
      }
    } catch (error) {
      console.error("Error loading benefits data:", error)
    }
  }, [])

  return (
    <section className="py-12 bg-background">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-md transition-shadow"
            >
              <div
                className="p-4 rounded-full mb-4"
                style={{ backgroundColor: `${benefit.color}15` }} // Using 15% opacity version of the color
              >
                <div style={{ color: benefit.color }}>{iconMap[benefit.icon]}</div>
              </div>
              <h3 className={`text-xl mb-2 ${benefit.titleFont}`}>{benefit.title}</h3>
              <p className={`text-muted-foreground ${benefit.descriptionFont}`}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default BenefitsSection
