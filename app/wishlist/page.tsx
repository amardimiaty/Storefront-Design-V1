"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Heart, Loader2, ShoppingCart, Trash2 } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { useWishlist } from "@/components/wishlist/wishlist-context"

export default function WishlistPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isRemoving, setIsRemoving] = useState<string | null>(null)
  const [isAddingToCart, setIsAddingToCart] = useState<string | null>(null)
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const cart = useCart()
  const { toast } = useToast()

  const handleRemoveFromWishlist = async (productId: string) => {
    setIsRemoving(productId)
    // Add a small delay to show the loading state
    await new Promise((resolve) => setTimeout(resolve, 300))
    removeFromWishlist(productId)

    toast({
      title: "Removed from wishlist",
      description: "The item has been removed from your wishlist.",
    })

    setIsRemoving(null)
  }

  const handleAddToCart = async (product: any) => {
    if (!cart?.addToCart) return

    setIsAddingToCart(product.id)
    // Add a small delay to show the loading state
    await new Promise((resolve) => setTimeout(resolve, 300))

    cart.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      variant: null,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    setIsAddingToCart(null)
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Items you've saved for later.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="rounded-lg border p-4">
              <Skeleton className="aspect-square w-full rounded-md" />
              <div className="mt-4 space-y-2">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-9 w-full" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : wishlistItems.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-lg border p-4"
            >
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={product.image || "/placeholder.svg?height=400&width=400&query=product"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-medium">{product.name}</h3>
                <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
              </Link>
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1"
                  disabled={isAddingToCart === product.id || isRemoving === product.id}
                >
                  {isAddingToCart === product.id ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  disabled={isRemoving === product.id || isAddingToCart === product.id}
                >
                  {isRemoving === product.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Heart className="mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">Your wishlist is empty</h2>
          <p className="mb-6 text-gray-500">
            Items added to your wishlist will be saved here for you to revisit later.
          </p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
