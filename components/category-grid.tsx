"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Category {
  id: string
  name: string
  slug: string
  image: string
  productCount: number
}

interface CategoryGridProps {
  categories?: Category[]
  title?: string
  subtitle?: string
}

// Default categories to use when none are provided
const defaultCategories: Category[] = [
  {
    id: "clothing",
    name: "Clothing",
    slug: "clothing",
    image: "/diverse-clothing-tops.png",
    productCount: 42,
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    image: "/wireless-earbuds.png",
    productCount: 38,
  },
  {
    id: "home",
    name: "Home & Decor",
    slug: "home-decor",
    image: "/modern-home-decor.png",
    productCount: 29,
  },
  {
    id: "beauty",
    name: "Beauty",
    slug: "beauty",
    image: "/premium-skincare-luxury.png",
    productCount: 24,
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    slug: "sports",
    image: "/premium-yoga-mat.png",
    productCount: 31,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    image: "/diverse-jewelry-collection.png",
    productCount: 45,
  },
]

export default function CategoryGrid({ categories = defaultCategories, title, subtitle }: CategoryGridProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}

        {/* Categories Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[95%] mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/categories/${category.slug}`}>
                <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  {/* Category Image */}
                  <div className="absolute inset-0 w-full h-full transition-transform duration-500 ease-out transform group-hover:scale-105">
                    <Image
                      src={category.image || "/placeholder.svg?height=400&width=600&query=category"}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-3 group-hover:translate-x-2 transition-transform duration-300 delay-75">
                      {category.productCount} Products
                    </p>
                    <div className="flex items-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
