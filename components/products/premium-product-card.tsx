import Image from "next/image"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  category: string
  isNew?: boolean
  isFeatured?: boolean
  discount?: number
  slug: string
}

export function PremiumProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-blue-600 hover:bg-blue-700 text-white">New</Badge>}
          {product.discount && product.discount > 0 && (
            <Badge className="bg-red-600 hover:bg-red-700 text-white">{product.discount}% OFF</Badge>
          )}
          {product.isFeatured && <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Featured</Badge>}
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex gap-2">
            <Button size="sm" className="flex-1 bg-white text-black hover:bg-gray-100">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
            <Button size="icon" variant="outline" className="bg-white/20 border-white/40 text-white hover:bg-white/30">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
        <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center">
          <span className="font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
