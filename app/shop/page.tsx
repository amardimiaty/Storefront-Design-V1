"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Filter, Grid3x3, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductCard from "@/components/products/product-card"
import ProductCardSkeleton from "@/components/products/product-card-skeleton"
import { products, categories, brands, type Product } from "@/lib/mock-data"

export default function ShopPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const brandParam = searchParams.get("brand")

  const [isLoading, setIsLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [activeView, setActiveView] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(brandParam)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sortBy, setSortBy] = useState<string>("featured")

  // Load products based on filters
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      let filtered = [...products]

      // Apply category filter
      if (selectedCategory) {
        filtered = filtered.filter((product) => product.category === selectedCategory)
      }

      // Apply brand filter
      if (selectedBrand) {
        filtered = filtered.filter((product) => product.brand === selectedBrand)
      }

      // Apply price range filter
      filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

      // Apply sorting
      switch (sortBy) {
        case "price-low-high":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "price-high-low":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "newest":
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
        case "rating":
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case "featured":
        default:
          filtered = filtered
            .filter((product) => product.featured)
            .concat(filtered.filter((product) => !product.featured))
          break
      }

      setFilteredProducts(filtered)
      setIsLoading(false)
    }

    loadProducts()
  }, [selectedCategory, selectedBrand, priceRange, sortBy])

  // Update URL when filters change
  useEffect(() => {
    const url = new URL(window.location.href)

    if (selectedCategory) {
      url.searchParams.set("category", selectedCategory)
    } else {
      url.searchParams.delete("category")
    }

    if (selectedBrand) {
      url.searchParams.set("brand", selectedBrand)
    } else {
      url.searchParams.delete("brand")
    }

    window.history.replaceState({}, "", url.toString())
  }, [selectedCategory, selectedBrand])

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
  }

  const handleBrandChange = (brandId: string | null) => {
    setSelectedBrand(brandId)
  }

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max])
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setSelectedBrand(null)
    setPriceRange([0, 1000])
    setSortBy("featured")
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop All Products</h1>
        <p className="mt-2 text-gray-600">Browse our collection of high-quality products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className={`w-full lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"} mb-6 lg:mb-0`}>
          <div className="lg:sticky lg:top-24 space-y-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 rounded-lg border lg:border-0">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Categories</h3>
                {selectedCategory && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCategoryChange(null)}
                    className="h-auto p-0 text-sm text-gray-500 hover:text-primary"
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {categories
                  .filter((category) => !category.parentId)
                  .map((category) => (
                    <div key={category.id} className="space-y-1">
                      <button
                        onClick={() => handleCategoryChange(category.id)}
                        className={`w-full text-left px-2 py-1 rounded-md text-sm transition-colors ${
                          selectedCategory === category.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 dark:hover:text-white"
                        }`}
                      >
                        {category.name}
                        {category.productCount && (
                          <span
                            className={`ml-1 text-xs ${selectedCategory === category.id ? "text-primary/70" : "text-gray-500"}`}
                          >
                            ({category.productCount})
                          </span>
                        )}
                      </button>

                      {/* Subcategories */}
                      {selectedCategory === category.id && (
                        <div className="ml-4 border-l border-gray-200 pl-2 space-y-1">
                          {categories
                            .filter((subcat) => subcat.parentId === category.id)
                            .map((subcat) => (
                              <button
                                key={subcat.id}
                                onClick={() => handleCategoryChange(subcat.id)}
                                className={`w-full text-left px-2 py-1 rounded-md text-sm transition-colors ${
                                  selectedCategory === subcat.id
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 dark:hover:text-white"
                                }`}
                              >
                                {subcat.name}
                                {subcat.productCount && (
                                  <span
                                    className={`ml-1 text-xs ${selectedCategory === subcat.id ? "text-primary/70" : "text-gray-500"}`}
                                  >
                                    ({subcat.productCount})
                                  </span>
                                )}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Brands</h3>
                {selectedBrand && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleBrandChange(null)}
                    className="h-auto p-0 text-sm text-gray-500 hover:text-primary"
                  >
                    Clear
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                {brands.slice(0, 8).map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => handleBrandChange(brand.id)}
                    className={`w-full text-left px-2 py-1 rounded-md text-sm transition-colors ${
                      selectedBrand === brand.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-primary/10 hover:text-primary dark:hover:bg-white/10 dark:hover:text-white"
                    }`}
                  >
                    {brand.name}
                    {brand.productCount && (
                      <span
                        className={`ml-1 text-xs ${selectedBrand === brand.id ? "text-primary/70" : "text-gray-500"}`}
                      >
                        ({brand.productCount})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-medium text-lg mb-4">Price Range</h3>
              <div className="px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">${priceRange[0]}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(priceRange[0], Number.parseInt(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>
            </div>

            <Separator />

            <Button onClick={clearFilters} variant="outline" className="w-full">
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Products */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFilters}
              className="lg:hidden flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <div className="w-full sm:w-auto">
                <Tabs defaultValue={sortBy} onValueChange={(value) => setSortBy(value)} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="featured">Featured</TabsTrigger>
                    <TabsTrigger value="newest">Newest</TabsTrigger>
                    <TabsTrigger value="price-low-high">Price: Low-High</TabsTrigger>
                    <TabsTrigger value="price-high-low">Price: High-Low</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="hidden sm:flex border rounded-md ml-auto">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-r-none ${activeView === "grid" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveView("grid")}
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-l-none ${activeView === "list" ? "bg-gray-100" : ""}`}
                  onClick={() => setActiveView("list")}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
              {Array(9)
                .fill(0)
                .map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
              <Button onClick={clearFilters}>Clear All Filters</Button>
            </div>
          ) : (
            <motion.div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && filteredProducts.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
