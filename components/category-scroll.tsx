"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Sample category data
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/category-electronics.png",
    icon: "💻",
  },
  {
    id: 2,
    name: "Clothing",
    image: "/category-clothing.png",
    icon: "👕",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "/category-home.png",
    icon: "🏠",
  },
  {
    id: 4,
    name: "Beauty",
    image: "/category-beauty.png",
    icon: "✨",
  },
  {
    id: 5,
    name: "Sports",
    image: "/category-sports.png",
    icon: "🏀",
  },
  {
    id: 6,
    name: "Books",
    image: "/category-books.png",
    icon: "📚",
  },
  {
    id: 7,
    name: "Toys",
    image: "/category-toys.png",
    icon: "🧸",
  },
]

export default function CategoryScroll() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -current.clientWidth / 2 : current.clientWidth / 2
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            Shop by Category
          </motion.h2>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll("left")}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={() => scroll("right")}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[180px] sm:w-[220px]"
            >
              <Link href={`/category/${category.id}`} className="block">
                <div className="bg-background rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="relative h-[160px]">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <h3 className="font-bold text-white text-lg text-center px-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-shadow-sm">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
