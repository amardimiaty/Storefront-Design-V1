"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import ProductCard from "@/components/products/product-card"
import ProductCardSkeleton from "@/components/products/product-card-skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Filter, Loader2, SlidersHorizontal, X } from "lucide-react"
import { getProducts, getCategories } from "@/lib/saleor-api"
import type { Product, Category } from "@/lib/mock-data"
import styles from "./products.module.css"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState("featured")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFiltering, setIsFiltering] = useState(false)

  // Initialize filters from URL params and fetch initial data
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam])
    }

    const fetchInitialData = async () => {
      setIsLoading(true)
      try {
        // Fetch categories
        const categoriesData = await getCategories()
        setCategories(categoriesData.categories)

        // Fetch products with any initial filters
        const options: any = {}
        if (categoryParam) {
          options.category = categoryParam
        }

        const productsData = await getProducts(options)
        setProducts(productsData.products)
      } catch (error) {
        console.error("Error fetching initial data:", error)
      } finally {
        setIsLoading(false)
        setIsInitialized(true)
      }
    }

    fetchInitialData()
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    if (!isInitialized) return

    const applyFilters = async () => {
      setIsFiltering(true)

      try {
        const options: any = {}

        // Apply category filters
        if (selectedCategories.length > 0) {
          options.category = selectedCategories[0] // For simplicity, just use the first selected category
        }

        // Apply search term
        if (searchTerm) {
          options.search = searchTerm
        }

        // Apply sorting
        if (sortOption) {
          options.sort = sortOption
        }

        const productsData = await getProducts(options)
        setProducts(productsData.products)
      } catch (error) {
        console.error("Error applying filters:", error)
      } finally {
        setIsFiltering(false)
      }
    }

    // Use a debounce for search term changes
    const timer = setTimeout(() => {
      applyFilters()
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, sortOption, selectedCategories, isInitialized])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategories([])
    setSortOption("featured")
  }

  // Filter to only top-level categories (those without a parentId)
  const topLevelCategories = categories.filter((category) => !category.parentId)

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>
          {!isLoading && !isFiltering && (
            <p className="mt-2 text-gray-600">
              {products.length} {products.length === 1 ? "product" : "products"} available
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="w-full md:w-auto">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              disabled={isLoading}
            />
          </div>

          <Select value={sortOption} onValueChange={setSortOption} disabled={isLoading}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="md:hidden"
            onClick={() => setMobileFiltersOpen(true)}
            disabled={isLoading}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Desktop Filters */}
        <div className="hidden lg:block">
          <div className={styles.filterSidebar}>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Categories</h3>
              <div className="space-y-3">
                {topLevelCategories.map((category) => (
                  <div key={category.id} className={`flex items-center space-x-2 ${styles.categoryItem}`}>
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                      disabled={isLoading}
                    />
                    <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            {(selectedCategories.length > 0 || searchTerm) && (
              <Button variant="outline" onClick={clearFilters} className="w-full" disabled={isLoading}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Filters */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 p-4 lg:hidden">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="h-full w-full max-w-xs overflow-auto rounded-lg bg-white p-6 shadow-lg"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-4 font-medium">Categories</h4>
                  <div className="space-y-3">
                    {topLevelCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryChange(category.id)}
                          disabled={isLoading}
                        />
                        <Label htmlFor={`mobile-category-${category.id}`}>{category.name}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={clearFilters} className="flex-1" disabled={isLoading}>
                    Clear
                  </Button>
                  <Button onClick={() => setMobileFiltersOpen(false)} className="flex-1">
                    Apply
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {isLoading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : isFiltering ? (
            // Filtering indicator
            <div className="flex h-60 flex-col items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="mt-4 text-sm text-gray-500">Filtering products...</p>
            </div>
          ) : products.length > 0 ? (
            // Product grid
            <div className={styles.productGrid}>
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
                      images: product.images,
                      slug: product.slug,
                      category: product.category?.name,
                      rating: product.rating,
                      isNew: product.isNew,
                      isSale: product.originalPrice && product.originalPrice > product.price,
                      originalPrice: product.originalPrice,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            // No products found
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <SlidersHorizontal className="mb-4 h-10 w-10 text-gray-400" />
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your search or filter to find what you're looking for.
              </p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
