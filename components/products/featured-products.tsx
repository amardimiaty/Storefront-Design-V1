"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProductCard from "@/components/products/product-card"
import ProductCardSkeleton from "@/components/products/product-card-skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getProducts } from "@/lib/saleor-api"
import type { Product } from "@/lib/mock-data"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setIsLoading(true)
      try {
        const result = await getProducts({ featured: true })
        setProducts(result.products)
      } catch (error) {
        console.error("Error fetching featured products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? // Loading skeletons
            [...Array(4)].map((_, index) => <ProductCardSkeleton key={index} />)
          : // Featured products
            products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    slug: product.slug,
                  }}
                />
              </motion.div>
            ))}
      </div>
      <div className="flex justify-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="/products">View All Products</Link>
        </Button>
      </div>
    </div>
  )
}
