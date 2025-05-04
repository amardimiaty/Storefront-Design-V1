"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Slide {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

const defaultSlides: Slide[] = [
  {
    id: "1",
    title: "Summer Collection 2023",
    subtitle: "New Arrivals",
    description: "Elevate your style with our premium selection of summer essentials. Limited time offers available.",
    image: "/minimalist-fashion-store.png",
    ctaText: "Shop Now",
    ctaLink: "/products",
    secondaryCtaText: "Learn More",
    secondaryCtaLink: "/collections",
  },
  {
    id: "2",
    title: "Premium Accessories",
    subtitle: "Complete Your Look",
    description: "Handcrafted accessories that make a statement. Free shipping on orders over $50.",
    image: "/modern-accessories.png",
    ctaText: "Explore",
    ctaLink: "/products?category=accessories",
  },
  {
    id: "3",
    title: "Home Collection",
    subtitle: "Transform Your Space",
    description: "Discover our curated selection of premium home decor. Exclusive designs for modern living.",
    image: "/modern-home-decor.png",
    ctaText: "View Collection",
    ctaLink: "/products?category=home-decor",
  },
]

interface HeroBannerProps {
  slides?: Slide[]
  autoplay?: boolean
  interval?: number
}

export default function HeroBanner({ slides = defaultSlides, autoplay = true, interval = 5000 }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (autoplay) setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    if (autoplay) setIsAutoPlaying(true)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [currentSlide, isAutoPlaying, interval])

  return (
    <div
      className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute inset-0 ${index === currentSlide ? "block" : "hidden"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Background Gradient with Glass Effect */}
            <div className="absolute inset-0">
              {/* Glass Elements */}
              <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-purple-600/30 blur-3xl"></div>
              <div className="absolute bottom-[30%] right-[15%] w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl"></div>
              <div className="absolute top-[40%] right-[25%] w-40 h-40 rounded-full bg-violet-500/30 blur-3xl"></div>

              {/* Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <motion.div
                className="max-w-xl text-white backdrop-blur-sm bg-white/5 p-8 rounded-xl border border-white/10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <h2 className="text-sm md:text-base uppercase tracking-wider mb-2 text-primary">{slide.subtitle}</h2>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-white/80 text-base md:text-lg mb-8 max-w-md">{slide.description}</p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="rounded-full px-8">
                    <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
