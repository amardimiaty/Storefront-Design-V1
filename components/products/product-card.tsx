"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/components/wishlist/wishlist-context"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    price: number
    originalPrice?: number
    images?: string[]
    image?: string
    category?: string
    rating?: number
    isNew?: boolean
    isSale?: boolean
    isFeatured?: boolean
  }
  className?: string
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const inWishlist = isInWishlist(product.id)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex(1)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCurrentImageIndex(0)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
        variant: "default",
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || product.image || "/diverse-products-still-life.png",
        slug: product.slug,
        category: product.category,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
        variant: "default",
      })
    }
  }

  // Get the image source with proper fallbacks
  const getImageSrc = () => {
    if (imageError) {
      return "/diverse-products-still-life.png"
    }

    return product.images?.[currentImageIndex] || product.image || "/diverse-products-still-life.png"
  }

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm transition-all duration-300 hover:shadow-lg",
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <div className="relative h-full w-full transition-transform duration-700 ease-out transform group-hover:scale-105">
            <Image
              src={getImageSrc() || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center"
              priority={product.isFeatured}
              onError={handleImageError}
            />

            {/* Image overlay on hover */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <Badge variant="default" className="bg-emerald-600 text-white px-2.5 py-1 text-xs font-medium">
              New
            </Badge>
          )}
          {product.isSale && product.originalPrice && (
            <Badge variant="destructive" className="px-2.5 py-1 text-xs font-medium">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div
          className={cn(
            "absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 z-10",
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5",
          )}
        >
          <Button
            size="icon"
            variant="secondary"
            className={cn(
              "h-9 w-9 rounded-full backdrop-blur-sm shadow-sm transition-colors",
              inWishlist
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-white/90 dark:bg-gray-800/90 hover:bg-primary hover:text-white",
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            onClick={handleWishlistToggle}
          >
            <Heart className={cn("h-4 w-4", inWishlist ? "fill-current" : "")} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-white transition-colors"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button - Appears on hover */}
        <div
          className={cn(
            "absolute bottom-4 right-4 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
          )}
        >
          <Button
            size="icon"
            className="h-9 w-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md hover:bg-primary hover:text-white text-sm font-medium transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        {product.category && (
          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">
            {product.category}
          </div>
        )}

        <Link href={`/products/${product.slug}`} className="block group-hover:underline-offset-4">
          <h3 className="font-medium text-base sm:text-lg mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < Math.floor(product.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 dark:text-gray-600",
                )}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Desktop Add to Cart Button - Visible only on larger screens */}
        {/* <div className="hidden sm:block mt-4">
          <Button
            className={cn(
              "w-full rounded-full transition-all duration-300 gap-2 text-sm",
              isHovered
                ? "bg-primary hover:bg-primary/90"
                : "bg-gray-100 dark:bg-gray-800 text-foreground hover:bg-gray-200 dark:hover:bg-gray-700",
            )}
            size="sm"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div> */}
      </div>
    </motion.div>
  )
}
