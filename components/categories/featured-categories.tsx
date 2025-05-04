"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Category {
  id: string
  name: string
  description?: string
  image: string
  slug: string
  itemCount?: number
}

interface FeaturedCategoriesProps {
  title?: string
  subtitle?: string
  categories: Category[]
  layout?: "grid" | "masonry"
  className?: string
  gridColumns?: number
  maxCategories?: number
  buttonSize?: "small" | "default" | "large"
  gridGap?: number
  gridWidth?: number
}

export function FeaturedCategories({
  title = "Shop by Category",
  subtitle = "Browse our curated collections",
  categories,
  layout = "grid",
  className,
  gridColumns = 3,
  maxCategories = 6,
  buttonSize = "default",
  gridGap = 6,
  gridWidth = 80,
}: FeaturedCategoriesProps) {
  // Button size classes
  const buttonSizeClasses = {
    small: "px-4 py-1.5 text-xs",
    default: "px-6 py-2.5 text-sm",
    large: "px-8 py-3 text-base",
  }

  return (
    <section
      className={cn("py-8 top-0 after-hero-section bg-white relative z-30", className)}
      style={{ marginTop: "-1px" }}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <div className="h-px w-12 mx-auto bg-gradient-to-r from-[#c7a94e] to-[#e9d5a1]"></div>
            <h2 className="text-4xl font-light tracking-tight mt-4 mb-2">
              <span className="font-normal">{title.split(" ")[0]}</span>{" "}
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#c7a94e] to-[#e9d5a1]">
                {title.split(" ").slice(1).join(" ")}
              </span>
            </h2>
            <div className="h-px w-12 mx-auto bg-gradient-to-r from-[#c7a94e] to-[#e9d5a1]"></div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">{subtitle}</p>
        </div>

        <div
          className={`grid gap-${gridGap} max-w-6xl mx-auto`}
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
            width: `${gridWidth}%`,
          }}
        >
          {categories.slice(0, maxCategories).map((category, index) => (
            <motion.div
              key={category.id}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-1000"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                />
              </div>

              {/* Luxury border overlay */}
              <div className="absolute inset-0 border border-[#c7a94e]/20 group-hover:border-[#c7a94e]/40 transition-colors duration-500 z-20 pointer-events-none"></div>

              {/* Corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#c7a94e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#c7a94e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#c7a94e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#c7a94e] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent h-2/3 z-20"></div>

              <div className="absolute inset-x-0 bottom-0 p-6 z-30">
                <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-medium text-white tracking-wide">{category.name}</h3>

                  {category.itemCount && <p className="text-sm text-white/70 font-light">{category.itemCount} items</p>}

                  <div className="pt-3 transform opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Link
                      href={`/categories/${category.slug}`}
                      className={`inline-flex items-center justify-center ${buttonSizeClasses[buttonSize]} bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-[#c7a94e]/30 hover:border-[#c7a94e] text-white tracking-wide transition-all duration-300`}
                    >
                      Explore
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
