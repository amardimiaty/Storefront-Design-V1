"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  image?: string
  video?: string
  ctaText: string
  ctaLink: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

interface ModernHeroProps {
  slides: HeroSlide[]
  autoplay?: boolean
  interval?: number
  height?: "small" | "medium" | "large" | "full"
  overlay?: "none" | "light" | "medium" | "dark"
  contentPosition?: "left" | "center" | "right"
  className?: string
}

export function ModernHero({
  slides,
  autoplay = true,
  interval = 5000,
  height = "large",
  overlay = "medium",
  contentPosition = "left",
  className,
}: ModernHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay)

  const heightClasses = {
    small: "h-[50vh] min-h-[400px]",
    medium: "h-[65vh] min-h-[500px]",
    large: "h-[80vh] min-h-[600px]",
    full: "h-screen",
  }

  const overlayClasses = {
    none: "",
    light: "bg-black/20",
    medium: "bg-black/40",
    dark: "bg-black/60",
  }

  const contentPositionClasses = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  }

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
      className={cn("relative w-full overflow-hidden h-screen", className)}
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
            {/* Background Media */}
            <div className="absolute inset-0">
              {slide.video ? (
                <video src={slide.video} autoPlay muted loop playsInline className="h-full w-full object-cover" />
              ) : (
                <img
                  src={slide.image || `/hero-image-${(index % 5) + 1}.png`}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}

              {/* Overlay */}
              <div className={`absolute inset-0 ${overlayClasses[overlay]}`}></div>
            </div>

            {/* Content */}
            <div className="relative h-full w-full container mx-auto px-4 flex items-center justify-center">
              <motion.div
                className={cn("flex flex-col max-w-2xl", contentPositionClasses[contentPosition])}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <motion.h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  {slide.title}
                </motion.h1>

                {slide.description && (
                  <motion.p
                    className="text-white/90 text-lg md:text-xl mb-8 max-w-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                  >
                    {slide.description}
                  </motion.p>
                )}

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.1 }}
                >
                  <Button asChild size="lg" className="rounded-md px-8 text-base">
                    <Link href={slide.ctaLink}>
                      <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {slide.ctaText}
                      </motion.span>
                    </Link>
                  </Button>
                  {slide.secondaryCtaText && slide.secondaryCtaLink && (
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="rounded-md px-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30 text-base"
                    >
                      <Link href={slide.secondaryCtaLink}>
                        <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          {slide.secondaryCtaText}
                        </motion.span>
                      </Link>
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
