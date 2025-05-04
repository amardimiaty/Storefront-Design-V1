"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const brands = [
  { id: 1, name: "Apple", logo: "/brand-apple.png" },
  { id: 2, name: "Samsung", logo: "/brand-samsung.png" },
  { id: 3, name: "Nike", logo: "/brand-nike.png" },
  { id: 4, name: "Adidas", logo: "/brand-adidas.png" },
  { id: 5, name: "Sony", logo: "/brand-sony.png" },
  { id: 6, name: "LG", logo: "/brand-lg.png" },
  { id: 7, name: "Microsoft", logo: "/brand-microsoft.png" },
  { id: 8, name: "Philips", logo: "/brand-philips.png" },
]

export default function BrandsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll effect
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationId: number
    let startTime: number | null = null
    const speed = 0.5 // pixels per millisecond

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const distance = elapsed * speed

      if (container) {
        // Reset when we've scrolled the full width
        if (distance >= container.scrollWidth / 2) {
          startTime = timestamp
          container.scrollLeft = 0
        } else {
          container.scrollLeft = distance % container.scrollWidth
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-10"
        >
          Our Trusted Brands
        </motion.h2>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for seamless scrolling effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-muted/30 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-muted/30 to-transparent" />

          <div ref={containerRef} className="flex items-center space-x-12 overflow-hidden py-8">
            {/* First set of brands */}
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="flex-shrink-0 w-32 h-20 relative grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
              </div>
            ))}

            {/* Duplicate set for seamless scrolling */}
            {brands.map((brand) => (
              <div
                key={`duplicate-${brand.id}`}
                className="flex-shrink-0 w-32 h-20 relative grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
