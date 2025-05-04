"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Heart, Eye, ShoppingCart, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useWishlist } from "@/components/wishlist/wishlist-context"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  images: string[]
  category?: string
  rating?: number
  isNew?: boolean
  isSale?: boolean
  isFeatured?: boolean
}

interface FeaturedProductsGridProps {
  title?: string
  subtitle?: string
  products?: Product[]
  categories?: string[]
}

// Default products data
const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Minimalist Cotton T-Shirt",
    slug: "minimalist-cotton-t-shirt",
    price: 29.99,
    originalPrice: 39.99,
    images: ["/minimalist-cotton-t-shirt.png", "/minimalist-cotton-t-shirt-back.png"],
    category: "Clothing",
    rating: 4.5,
    isNew: true,
    isSale: true,
    isFeatured: true,
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    price: 89.99,
    images: ["/classic-denim-jacket.png", "/denim-jacket-back.png"],
    category: "Clothing",
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    price: 59.99,
    originalPrice: 79.99,
    images: ["/leather-crossbody-bag.png"],
    category: "Accessories",
    rating: 4.2,
    isSale: true,
    isFeatured: true,
  },
  {
    id: "4",
    name: "Wool Blend Sweater",
    slug: "wool-blend-sweater",
    price: 69.99,
    images: ["/wool-blend-sweater.png"],
    category: "Clothing",
    rating: 4.6,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "5",
    name: "Minimalist Watch",
    slug: "minimalist-watch",
    price: 129.99,
    images: ["/minimalist-watch.png"],
    category: "Accessories",
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: "6",
    name: "Canvas Sneakers",
    slug: "canvas-sneakers",
    price: 49.99,
    originalPrice: 59.99,
    images: ["/canvas-sneakers.png"],
    category: "Footwear",
    rating: 4.3,
    isSale: true,
    isFeatured: true,
  },
  {
    id: "7",
    name: "Ceramic Planter",
    slug: "ceramic-planter",
    price: 24.99,
    images: ["/ceramic-planter.png"],
    category: "Home",
    rating: 4.7,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "8",
    name: "Linen Throw Pillow",
    slug: "linen-throw-pillow",
    price: 34.99,
    images: ["/linen-throw-pillow.png"],
    category: "Home",
    rating: 4.4,
    isFeatured: true,
  },
]

// Extract unique categories from default products
const defaultCategories = ["All", ...Array.from(new Set(defaultProducts.map((p) => p.category || "Other")))]

export default function FeaturedProductsGrid({
  title = "Featured Products",
  subtitle,
  products = defaultProducts,
  categories = defaultCategories,
}: FeaturedProductsGridProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleProducts, setVisibleProducts] = useState(products)
  const { toast } = useToast()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)

    if (category === "All") {
      setVisibleProducts(products)
    } else {
      setVisibleProducts(products.filter((product) => product.category === category))
    }
  }

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleQuickView = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast({
      title: "Quick view",
      description: `Quick view for ${product.name}.`,
    })
  }

  const handleWishlistToggle = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        slug: product.slug,
        category: product.category,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-2">
        {/* Section Header */}
        <div className="text-center mb-6">
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>}
          {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto text-sm">{subtitle}</p>}
        </div>

        {/* Category Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-1 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className="rounded-full text-xs py-1 h-8"
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Products Grid - With hover buttons and rating badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2"
          >
            {visibleProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="aspect-square relative overflow-hidden rounded-md group"
              >
                <Link href={`/products/${product.slug}`} className="block h-full w-full">
                  <Image
                    src={product.images[0] || "/diverse-products-still-life.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Rating badge at top left */}
                  {product.rating && (
                    <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-0.5 shadow-sm">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Quick action buttons */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <button
                      onClick={(e) => handleQuickView(product, e)}
                      className="w-8 h-8 rounded-full bg-black/70 text-white border border-white/20 backdrop-blur-md flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      aria-label="Quick view"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleWishlistToggle(product, e)}
                      className={`w-8 h-8 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center transition-colors ${
                        isInWishlist(product.id)
                          ? "bg-primary text-white"
                          : "bg-black/70 text-white hover:bg-primary hover:text-white"
                      }`}
                      aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  {/* Add to cart button */}
                  <div className="absolute bottom-2 left-2 right-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full py-2 px-4 rounded-full bg-black/70 text-white border border-white/20 backdrop-blur-md hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1.5 text-xs font-medium"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button asChild size="sm" variant="outline" className="rounded-full px-6">
            <a href="/products">View All</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
