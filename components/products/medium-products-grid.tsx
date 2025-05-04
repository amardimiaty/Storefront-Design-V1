"use client"
import { useWishlist } from "@/components/wishlist/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

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
}

interface MediumProductsGridProps {
  title?: string
  subtitle?: string
  products: Product[]
  columns?: 2 | 3 | 4
  showRating?: boolean
  showCategory?: boolean
  className?: string
}

export default function MediumProductsGrid({
  title,
  subtitle,
  products,
  columns = 3,
  showRating = true,
  showCategory = true,
  className = "",
}: MediumProductsGridProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = (product: Product) => {
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

  // Determine grid columns class based on the columns prop
  const gridColumnsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[columns]

  return (
    <div className={className}>
      {title && (
        <div className="mb-4">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
      )}
      <div className={`grid gap-4 ${gridColumnsClass}`}>
        {products.map((product) => (
          <div key={product.id} className="relative">
            <Link href={`/products/${product.slug}`}>
              <AspectRatio ratio={4 / 3}>
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="object-cover rounded-md"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </AspectRatio>
            </Link>
            <div className="mt-2">
              <Link href={`/products/${product.slug}`}>
                <h3 className="font-semibold line-clamp-1">{product.name}</h3>
              </Link>
              {showCategory && product.category && <p className="text-sm text-muted-foreground">{product.category}</p>}
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault()
                    handleWishlistToggle(product)
                  }}
                >
                  <Heart className={cn("h-4 w-4", isInWishlist(product.id) ? "fill-red-500 text-red-500" : "")} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
