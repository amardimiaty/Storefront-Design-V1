"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { categories } from "@/lib/mock-data"
import { getCategories } from "@/lib/saleor-api"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CollectionsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [allCategories, setAllCategories] = useState(categories)

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true)
      try {
        const result = await getCategories()
        setAllCategories(result.categories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Filter to only top-level categories (those without a parentId)
  const topLevelCategories = allCategories.filter((category) => !category.parentId)

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Our Collections</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Explore our carefully curated collections designed to meet your everyday needs with style and functionality.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-8 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="aspect-[3/2] w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {topLevelCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/products?category=${category.id}`}
                className="group relative block overflow-hidden rounded-lg"
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                    <h2 className="text-3xl font-bold">{category.name}</h2>
                    <p className="mt-2 max-w-md">{category.description}</p>
                    <Button className="mt-4 rounded-full" variant="outline" size="sm">
                      Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Featured Collections</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [...Array(3)].map((_, index) => <Skeleton key={index} className="aspect-[2/1] w-full rounded-lg" />)
          ) : (
            <>
              <Link href="/products?featured=true" className="group relative block overflow-hidden rounded-lg">
                <div className="relative aspect-[2/1] overflow-hidden">
                  <Image
                    src="/featured-products-collection.png"
                    alt="Featured Products"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <h3 className="text-xl font-bold">Featured Products</h3>
                    <p className="mt-1 text-sm">Our most popular items</p>
                  </div>
                </div>
              </Link>

              <Link href="/products?sort=newest" className="group relative block overflow-hidden rounded-lg">
                <div className="relative aspect-[2/1] overflow-hidden">
                  <Image
                    src="/new-arrivals-collection.png"
                    alt="New Arrivals"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <h3 className="text-xl font-bold">New Arrivals</h3>
                    <p className="mt-1 text-sm">The latest additions to our store</p>
                  </div>
                </div>
              </Link>

              <Link href="/products?sale=true" className="group relative block overflow-hidden rounded-lg">
                <div className="relative aspect-[2/1] overflow-hidden">
                  <Image
                    src="/sale-items.png"
                    alt="Sale Items"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
                    <h3 className="text-xl font-bold">Sale Items</h3>
                    <p className="mt-1 text-sm">Special discounts on selected items</p>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
