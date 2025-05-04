"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/products/product-card"

interface TrendingProductsProps {
  title?: string
  subtitle?: string
  products: any[]
  maxProducts?: number
}

export function TrendingProducts({
  title = "Trending Now",
  subtitle = "Discover what's hot this season",
  products,
  maxProducts = 4,
}: TrendingProductsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Get a subset of products
  const displayProducts = products.slice(0, maxProducts)

  return (
    <section className="py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-5 w-5 text-red-500" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
            </div>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link href="/products" className="group flex items-center gap-1">
              View all products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard
                product={product}
                className={hoveredIndex === index ? "ring-2 ring-primary ring-offset-2" : ""}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
