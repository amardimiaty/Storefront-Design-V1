"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart, Loader2, Minus, Plus, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import ProductDetailSkeleton from "@/components/products/product-detail-skeleton"
import { products, reviews, getRelatedProducts, brands } from "@/lib/mock-data"
import type { Product, Review } from "@/lib/mock-data"
import ProductCard from "@/components/products/product-card"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [productReviews, setProductReviews] = useState<Review[]>([])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const cart = useCart()
  const { toast } = useToast()

  // Fetch product data
  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true)
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Find product by slug
        const foundProduct = products.find((p) => p.slug === params.slug)

        if (foundProduct) {
          setProduct(foundProduct)

          // Set default selected options
          if (foundProduct.attributes.find((attr) => attr.name === "Color")) {
            setSelectedColor(foundProduct.attributes.find((attr) => attr.name === "Color")?.values[0] || "")
          }

          if (foundProduct.attributes.find((attr) => attr.name === "Size")) {
            setSelectedSize(foundProduct.attributes.find((attr) => attr.name === "Size")?.values[0] || "")
          }

          // Get product reviews
          const productReviews = reviews.filter((r) => r.productId === foundProduct.id)
          setProductReviews(productReviews)

          // Get related products
          const related = await getRelatedProducts(foundProduct.id, 4)
          setRelatedProducts(related)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setProduct(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProductData()
  }, [params.slug])

  const handleAddToCart = async () => {
    if (!product || !cart?.addToCart) return

    setIsAddingToCart(true)

    // Find the selected variant
    const variant = product.variants.find(
      (v) =>
        v.attributes.some((a) => a.name === "Color" && a.value === selectedColor) &&
        v.attributes.some((a) => a.name === "Size" && a.value === selectedSize),
    )

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    cart.addToCart({
      id: product.id,
      name: product.name,
      price: variant?.price || product.price,
      image: product.images[0],
      quantity,
      variant: variant ? `${selectedColor}, ${selectedSize}` : null,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} ${variant ? `(${selectedColor}, ${selectedSize})` : ""} has been added to your cart.`,
    })

    setIsAddingToCart(false)
  }

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const nextImage = () => {
    if (!product) return
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (!product) return
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="mb-6">
          <Link href="/shop" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to shop
          </Link>
        </div>

        <ProductDetailSkeleton />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="mb-6">
          <Link href="/shop" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to shop
          </Link>
        </div>

        <div className="flex h-60 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">Product not found</h3>
          <p className="mt-2 text-sm text-gray-500">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Find color and size attributes
  const colorAttribute = product.attributes.find((attr) => attr.name === "Color")
  const sizeAttribute = product.attributes.find((attr) => attr.name === "Size")

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-6">
        <Link href="/shop" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to shop
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                <Image
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex space-x-2 overflow-auto pb-2 scrollbar-hide">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "relative aspect-square w-16 sm:w-20 overflow-hidden rounded-md border-2 flex-shrink-0",
                  currentImageIndex === index ? "border-primary" : "border-transparent",
                )}
                onClick={() => goToImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-6">
          <div>
            {product.brand && (
              <Link
                href={`/shop?brand=${product.brand}`}
                className="text-sm font-medium text-gray-500 hover:text-primary"
              >
                {brands.find((b) => b.id === product.brand)?.name}
              </Link>
            )}
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5",
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : i < product.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300",
                    )}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <div className="mt-4 flex items-center flex-wrap gap-2">
              <p className="text-xl sm:text-2xl font-bold">${product.price.toFixed(2)}</p>
              {product.compareAtPrice && (
                <p className="text-base sm:text-lg text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</p>
              )}
              {product.sale && product.salePercentage && (
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                  {product.salePercentage}% OFF
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            {colorAttribute && (
              <div>
                <h3 className="mb-2 font-medium">Color</h3>
                <RadioGroup
                  value={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-2 sm:gap-3"
                >
                  {colorAttribute.values.map((color) => (
                    <div key={color} className="flex items-center">
                      <RadioGroupItem id={`color-${color}`} value={color} className="peer sr-only" />
                      <Label
                        htmlFor={`color-${color}`}
                        className="flex cursor-pointer items-center space-x-2 rounded-md border border-gray-200 px-2 sm:px-3 py-1 sm:py-2 peer-data-[state=checked]:border-primary"
                      >
                        <div
                          className="h-4 w-4 sm:h-5 sm:w-5 rounded-full border border-gray-300"
                          style={{ backgroundColor: getColorHex(color) }}
                        />
                        <span className="text-sm sm:text-base">{color}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {sizeAttribute && (
              <div>
                <h3 className="mb-2 font-medium">Size</h3>
                <RadioGroup
                  value={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-2 sm:gap-3"
                >
                  {sizeAttribute.values.map((size) => (
                    <div key={size}>
                      <RadioGroupItem id={`size-${size}`} value={size} className="peer sr-only" />
                      <Label
                        htmlFor={`size-${size}`}
                        className="flex h-8 w-8 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-md border border-gray-200 text-sm peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div>
              <h3 className="mb-2 font-medium">Quantity</h3>
              <div className="flex h-10 w-32 items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-full rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex h-full flex-1 items-center justify-center border-y border-gray-200">
                  {quantity}
                </div>
                <Button variant="outline" size="icon" onClick={incrementQuantity} className="h-full rounded-l-none">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button onClick={handleAddToCart} className="flex-1 sm:flex-none" disabled={isAddingToCart}>
              {isAddingToCart ? (
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
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>

          <Tabs defaultValue="details" className="mt-6 sm:mt-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-4 text-sm sm:text-base">
              <p className="text-gray-600">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-4 text-sm sm:text-base">
              <ul className="list-inside list-disc space-y-2 text-gray-600">
                {product.tags.map((tag, index) => (
                  <li key={index} className="capitalize">
                    {tag}
                  </li>
                ))}
                {product.attributes.map((attr) => (
                  <li key={attr.name}>
                    <span className="font-medium">{attr.name}:</span> {attr.values.join(", ")}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              {productReviews.length > 0 ? (
                <div className="space-y-4">
                  {productReviews.map((review) => (
                    <div key={review.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{review.title}</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300",
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>By {review.userName}</span>
                        {review.verified && (
                          <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-gray-600">{review.content}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                        {review.helpful !== undefined && (
                          <span className="ml-2">
                            {review.helpful} {review.helpful === 1 ? "person" : "people"} found this helpful
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function to convert color names to hex values
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    White: "#FFFFFF",
    Black: "#000000",
    Gray: "#808080",
    Navy: "#000080",
    Blue: "#0000FF",
    "Dark Blue": "#00008B",
    Brown: "#A52A2A",
    Tan: "#D2B48C",
    Terracotta: "#E2725B",
    Red: "#FF0000",
    Green: "#008000",
    Natural: "#F5F5DC",
    Silver: "#C0C0C0",
    "Rose Gold": "#B76E79",
    Purple: "#800080",
    Pink: "#FFC0CB",
    Gold: "#FFD700",
    Yellow: "#FFFF00",
    Orange: "#FFA500",
    Burgundy: "#800020",
    Beige: "#F5F5DC",
    Teal: "#008080",
    Turquoise: "#40E0D0",
    Multicolor: "#FFFFFF",
    "Earth Tones": "#A67B5B",
    "Blue Shades": "#4682B4",
    Pastel: "#FFB6C1",
    Tortoise: "#8B4513",
  }

  return colorMap[colorName] || "#CCCCCC"
}
