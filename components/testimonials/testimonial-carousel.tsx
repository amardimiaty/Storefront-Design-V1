"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  content: string
  author: string
  role?: string
  company?: string
  avatar?: string
  rating?: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoplay?: boolean
  interval?: number
}

export function TestimonialCarousel({ testimonials, autoplay = true, interval = 5000 }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoplay)

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
  }

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      next()
    }, interval)

    return () => clearInterval(timer)
  }, [current, isAutoPlaying, interval])

  // Pause autoplay on hover
  const handleMouseEnter = () => {
    if (autoplay) setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    if (autoplay) setIsAutoPlaying(true)
  }

  return (
    <div
      className="relative overflow-hidden bg-background py-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container px-4 md:px-6">
        <div className="relative mx-auto max-w-4xl">
          {/* Large quote icon */}
          <div className="absolute -top-6 left-0 opacity-10">
            <Quote className="h-24 w-24 text-primary" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center px-6"
            >
              <blockquote className="mb-8 text-xl md:text-2xl font-medium leading-relaxed">
                "{testimonials[current].content}"
              </blockquote>

              <div className="flex flex-col items-center">
                {testimonials[current].avatar && (
                  <div className="mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-primary">
                    <img
                      src={testimonials[current].avatar || "/placeholder.svg"}
                      alt={testimonials[current].author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div>
                  <div className="font-semibold">{testimonials[current].author}</div>
                  {(testimonials[current].role || testimonials[current].company) && (
                    <div className="text-sm text-muted-foreground">
                      {testimonials[current].role}
                      {testimonials[current].role && testimonials[current].company && ", "}
                      {testimonials[current].company}
                    </div>
                  )}
                </div>

                {testimonials[current].rating && (
                  <div className="mt-2 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonials[current].rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Dots navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === current ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
