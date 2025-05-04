"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import ProductCard from "@/components/products/product-card"
import ProductCardSkeleton from "@/components/products/product-card-skeleton"
import { Button } from "@/components/ui/button"
import { getProducts } from "@/lib/saleor-api"
import { SearchIcon, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setProducts([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const result = await getProducts({ search: query })
        setProducts(result.products)
      } catch (error) {
        console.error("Error searching products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Search Results</h1>
        {query && (
          <p className="mt-2 text-gray-600">
            Showing results for: <span className="font-medium">"{query}"</span>
          </p>
        )}
      </div>

      {!query ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <SearchIcon className="mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">Enter a search term</h2>
          <p className="mb-6 text-gray-500">Please enter a search term to find products in our store.</p>
          <Button asChild>
            <Link href="/products">Browse All Products</Link>
          </Button>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
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
          <div className="mt-8 flex justify-center">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <SlidersHorizontal className="mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">No products found</h2>
          <p className="mb-6 text-gray-500">We couldn't find any products matching your search for "{query}".</p>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/products">Browse All Products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
