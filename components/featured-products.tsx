"use client"

import Link from "next/link"
import { Heart, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { useWishlist } from "@/components/wishlist/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect } from "react"

// Add keyframes animation for staggered entry
const fadeInUpKeyframes = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.5s ease forwards;
}
`

// Mock data - in a real app, this would come from an API
const featuredProducts = [
  {
    id: "1",
    name: "Minimalist Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 128,
    image: "/minimalist-cotton-t-shirt.png",
    category: "Clothing",
    isNew: true,
    isFeatured: true,
    discount: 25,
    slug: "minimalist-cotton-t-shirt",
    stock: 42,
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 94,
    image: "/classic-denim-jacket.png",
    category: "Clothing",
    isNew: false,
    isFeatured: true,
    discount: 25,
    slug: "classic-denim-jacket",
    stock: 18,
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 56,
    image: "/leather-crossbody-bag.png",
    category: "Accessories",
    isNew: true,
    isFeatured: true,
    discount: 20,
    slug: "leather-crossbody-bag",
    stock: 7,
  },
  {
    id: "4",
    name: "Wool Blend Sweater",
    price: 69.99,
    originalPrice: 89.99,
    rating: 4.3,
    reviewCount: 42,
    image: "/wool-blend-sweater.png",
    category: "Clothing",
    isNew: false,
    isFeatured: true,
    discount: 22,
    slug: "wool-blend-sweater",
    stock: 23,
  },
  {
    id: "5",
    name: "Minimalist Watch",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.9,
    reviewCount: 78,
    image: "/minimalist-watch.png",
    category: "Accessories",
    isNew: true,
    isFeatured: true,
    discount: 19,
    slug: "minimalist-watch",
    stock: 15,
  },
  {
    id: "6",
    name: "Canvas Sneakers",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewCount: 63,
    image: "/canvas-sneakers.png",
    category: "Shoes",
    isNew: false,
    isFeatured: true,
    discount: 25,
    slug: "canvas-sneakers",
    stock: 31,
  },
  {
    id: "7",
    name: "Ceramic Planter",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 35,
    image: "/ceramic-planter.png",
    category: "Home & Decor",
    isNew: true,
    isFeatured: true,
    discount: 20,
    slug: "ceramic-planter",
    stock: 12,
  },
  {
    id: "8",
    name: "Linen Throw Pillow",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.5,
    reviewCount: 29,
    image: "/linen-throw-pillow.png",
    category: "Home & Decor",
    isNew: false,
    isFeatured: true,
    discount: 22,
    slug: "linen-throw-pillow",
    stock: 27,
  },
  {
    id: "9",
    name: "Premium Wireless Earbuds",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviewCount: 86,
    image: "/wireless-earbuds.png",
    category: "Electronics",
    isNew: true,
    isFeatured: true,
    discount: 17,
    slug: "premium-wireless-earbuds",
    stock: 25,
  },
  {
    id: "10",
    name: "Organic Cotton Bedding Set",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewCount: 42,
    image: "/cotton-bedding-set.png",
    category: "Home & Decor",
    isNew: false,
    isFeatured: true,
    discount: 19,
    slug: "organic-cotton-bedding-set",
    stock: 18,
  },
  {
    id: "11",
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.9,
    reviewCount: 112,
    image: "/stainless-steel-bottle.png",
    category: "Accessories",
    isNew: false,
    isFeatured: true,
    discount: 13,
    slug: "stainless-steel-water-bottle",
    stock: 45,
  },
  {
    id: "12",
    name: "Leather Wallet",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviewCount: 78,
    image: "/leather-wallet.png",
    category: "Accessories",
    isNew: false,
    isFeatured: true,
    discount: 17,
    slug: "leather-wallet",
    stock: 32,
  },
  {
    id: "13",
    name: "Smart Fitness Tracker",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.5,
    reviewCount: 94,
    image: "/fitness-tracker-lifestyle.png",
    category: "Electronics",
    isNew: true,
    isFeatured: true,
    discount: 18,
    slug: "smart-fitness-tracker",
    stock: 27,
  },
  {
    id: "14",
    name: "Bamboo Cutting Board",
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.7,
    reviewCount: 56,
    image: "/bamboo-cutting-board.png",
    category: "Home & Decor",
    isNew: false,
    isFeatured: true,
    discount: 14,
    slug: "bamboo-cutting-board",
    stock: 38,
  },
  {
    id: "15",
    name: "Wireless Charging Pad",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.4,
    reviewCount: 67,
    image: "/wireless-charging-pad.png",
    category: "Electronics",
    isNew: true,
    isFeatured: true,
    discount: 20,
    slug: "wireless-charging-pad",
    stock: 42,
  },
  {
    id: "16",
    name: "Handcrafted Ceramic Mug Set",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewCount: 38,
    image: "/ceramic-mug-set.png",
    category: "Home & Decor",
    isNew: false,
    isFeatured: true,
    discount: 17,
    slug: "handcrafted-ceramic-mug-set",
    stock: 24,
  },
  {
    id: "17",
    name: "Premium Yoga Mat",
    price: 69.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviewCount: 72,
    image: "/premium-yoga-mat.png",
    category: "Fitness",
    isNew: true,
    isFeatured: true,
    discount: 13,
    slug: "premium-yoga-mat",
    stock: 31,
  },
  {
    id: "18",
    name: "Designer Sunglasses",
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.6,
    reviewCount: 53,
    image: "/designer-sunglasses.png",
    category: "Accessories",
    isNew: false,
    isFeatured: true,
    discount: 17,
    slug: "designer-sunglasses",
    stock: 19,
  },
  {
    id: "19",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 87,
    image: "/bluetooth-speaker.png",
    category: "Electronics",
    isNew: true,
    isFeatured: true,
    discount: 20,
    slug: "portable-bluetooth-speaker",
    stock: 36,
  },
  {
    id: "20",
    name: "Scented Soy Candle",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.8,
    reviewCount: 64,
    image: "/soy-candle.png",
    category: "Home & Decor",
    isNew: false,
    isFeatured: true,
    discount: 17,
    slug: "scented-soy-candle",
    stock: 48,
  },
  {
    id: "21",
    name: "Leather Laptop Sleeve",
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviewCount: 46,
    image: "/placeholder.svg?key=qix2l",
    category: "Accessories",
    isNew: true,
    isFeatured: true,
    discount: 14,
    slug: "leather-laptop-sleeve",
    stock: 27,
  },
  {
    id: "22",
    name: "Smart LED Light Bulbs",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 73,
    image: "/smart-led-bulbs.png",
    category: "Electronics",
    isNew: false,
    isFeatured: true,
    discount: 20,
    slug: "smart-led-light-bulbs",
    stock: 52,
  },
  {
    id: "23",
    name: "Artisanal Olive Oil Set",
    price: 44.99,
    originalPrice: 54.99,
    rating: 4.9,
    reviewCount: 31,
    image: "/olive-oil-set.png",
    category: "Food & Drink",
    isNew: true,
    isFeatured: true,
    discount: 18,
    slug: "artisanal-olive-oil-set",
    stock: 23,
  },
  {
    id: "24",
    name: "Luxury Bath Towel Set",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 58,
    image: "/placeholder.svg?key=9ieuv",
    category: "Home & Decor",
    isNew: false,
    isFeatured: true,
    discount: 20,
    slug: "luxury-bath-towel-set",
    stock: 34,
  },
  {
    id: "25",
    name: "Mechanical Keyboard",
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewCount: 92,
    image: "/mechanical-keyboard.png",
    category: "Electronics",
    isNew: true,
    isFeatured: true,
    discount: 13,
    slug: "mechanical-keyboard",
    stock: 29,
  },
  {
    id: "26",
    name: "Gourmet Coffee Beans",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.9,
    reviewCount: 107,
    image: "/pile-of-coffee-beans.png",
    category: "Food & Drink",
    isNew: false,
    isFeatured: true,
    discount: 20,
    slug: "gourmet-coffee-beans",
    stock: 65,
  },
  {
    id: "27",
    name: "Minimalist Wall Clock",
    price: 49.99,
    originalPrice: 59.99,
    rating: 4.6,
    reviewCount: 43,
    image: "/minimalist-wall-clock.png",
    category: "Home & Decor",
    isNew: true,
    isFeatured: true,
    discount: 17,
    slug: "minimalist-wall-clock",
    stock: 31,
  },
  {
    id: "28",
    name: "Premium Leather Belt",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 68,
    image: "/leather-belt.png",
    category: "Accessories",
    isNew: false,
    isFeatured: true,
    discount: 20,
    slug: "premium-leather-belt",
    stock: 47,
  },
]

// Mock collections data
const recentCollections = [
  {
    id: "1",
    name: "Summer Essentials",
    slug: "summer-essentials",
    image: "/diverse-clothing-tops.png",
    description: "Light and breathable pieces perfect for warm weather.",
  },
  {
    id: "2",
    name: "Fall Favorites",
    slug: "fall-favorites",
    image: "/outerwear-collection.png",
    description: "Cozy layers and warm tones for the autumn season.",
  },
  {
    id: "3",
    name: "Home Decor",
    slug: "home-decor",
    image: "/premium-living-decor.png",
    description: "Stylish accessories to elevate your living space.",
  },
  {
    id: "4",
    name: "Accessories",
    slug: "accessories",
    image: "/diverse-jewelry-collection.png",
    description: "Finishing touches to complete any outfit.",
  },
  {
    id: "5",
    name: "New Arrivals",
    slug: "new-arrivals",
    image: "/new-arrivals-collection.png",
    description: "The latest additions to our collection.",
  },
]

// New arrivals - subset of products marked as new
const newArrivals = featuredProducts.filter((product) => product.isNew)

export default function FeaturedProducts({ type = "featured" }: { type?: "featured" | "new-arrivals" }) {
  const products = type === "featured" ? featuredProducts : newArrivals
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  // Inside the FeaturedProducts component, add these state variables after the existing const declarations:
  const [currentPage, setCurrentPage] = useState(0)
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [animationDirection, setAnimationDirection] = useState("next")
  const [isAnimating, setIsAnimating] = useState(false)
  const [exitComplete, setExitComplete] = useState(true)
  const [animationVariant, setAnimationVariant] = useState("fade")
  const [currentCollectionIndex, setCurrentCollectionIndex] = useState(0)
  const collectionsToShow = 3 // Number of collections to show at once

  const productsPerPage = 12 // 6 columns x 2 rows
  const totalPages = Math.ceil(products.length / productsPerPage)

  useEffect(() => {
    // Get the products for the current page
    const startIndex = currentPage * productsPerPage
    const endIndex = startIndex + productsPerPage
    setDisplayedProducts(products.slice(startIndex, endIndex))
  }, [currentPage, products])

  const handleWishlistClick = (e, product) => {
    e.preventDefault()

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
        duration: 3000,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        category: product.category,
      })
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
        duration: 3000,
      })
    }
  }

  const handleAddToCart = (e, productId) => {
    e.preventDefault()
    console.log(`Added product ${productId} to cart`)
  }

  const handlePrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimationDirection("prev")

    // Randomly select an animation variant
    const variants = ["slide", "fade", "zoom", "flip"]
    setAnimationVariant(variants[Math.floor(Math.random() * variants.length)])

    setExitComplete(false)
    setTimeout(() => {
      setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
      setTimeout(() => {
        setExitComplete(true)
        setTimeout(() => setIsAnimating(false), 300)
      }, 50)
    }, 500)
  }

  const handleNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setAnimationDirection("next")

    // Randomly select an animation variant
    const variants = ["slide", "fade", "zoom", "flip"]
    setAnimationVariant(variants[Math.floor(Math.random() * variants.length)])

    setExitComplete(false)
    setTimeout(() => {
      setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
      setTimeout(() => {
        setExitComplete(true)
        setTimeout(() => setIsAnimating(false), 300)
      }, 50)
    }, 500)
  }

  const handlePreviousCollection = () => {
    setCurrentCollectionIndex((prev) =>
      prev === 0 ? Math.max(0, recentCollections.length - collectionsToShow) : Math.max(0, prev - 1),
    )
  }

  const handleNextCollection = () => {
    setCurrentCollectionIndex((prev) => (prev >= recentCollections.length - collectionsToShow ? 0 : prev + 1))
  }

  return (
    <div className="bg-background/60 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border/40">
      <style jsx global>{`
        ${fadeInUpKeyframes}
      `}</style>

      {/* Collections section with navigation arrows */}
      <div className="mb-12 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Collections</h3>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousCollection}
              className="bg-background/80 hover:bg-background backdrop-blur-sm rounded-full p-2 shadow-md border border-border
                        transition-all duration-200"
              aria-label="View previous collections"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={handleNextCollection}
              className="bg-background/80 hover:bg-background backdrop-blur-sm rounded-full p-2 shadow-md border border-border
                        transition-all duration-200"
              aria-label="View next collections"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 transition-all duration-500"
            style={{ transform: `translateX(-${currentCollectionIndex * (100 / collectionsToShow)}%)` }}
          >
            {recentCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="flex-shrink-0 group"
                style={{
                  width: `calc(${100 / collectionsToShow}% - ${((collectionsToShow - 1) * 6) / collectionsToShow}rem)`,
                }}
              >
                <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg overflow-hidden transition-all duration-300 group-hover:translate-y-[-4px] shadow-lg">
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-medium text-white">{collection.name}</p>
                    <p className="text-sm text-white/80 mt-1">{collection.description}</p>
                    <div className="h-0.5 w-10 bg-white/40 mt-3 group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid with navigation arrows */}
      <div className="relative">
        {/* Products grid with enhanced animations */}
        <div className="relative overflow-hidden min-h-[500px]">
          {/* Left arrow navigation */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background 
                      backdrop-blur-sm rounded-r-full p-2 shadow-md border border-border border-l-0
                      transition-all duration-200 hover:pl-3"
            aria-label="View previous products"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>

          <div
            className={`grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 grid-rows-2 
                      transition-all duration-500 transform
                      ${!exitComplete ? "opacity-0" : "opacity-100"}
                      ${isAnimating && animationDirection === "next" && animationVariant === "slide" ? "-translate-x-full" : ""}
                      ${isAnimating && animationDirection === "prev" && animationVariant === "slide" ? "translate-x-full" : ""}
                      ${isAnimating && animationVariant === "zoom" ? "scale-50" : ""}
                      ${isAnimating && animationVariant === "flip" ? "rotateY(90deg)" : ""}
                      ${!isAnimating ? "translate-x-0 scale-100 rotateY(0)" : ""}`}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            {displayedProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className={`group block overflow-hidden rounded-md relative
                            transition-all transform
                            ${exitComplete ? "animate-fade-in-up" : ""}
                            `}
                style={{
                  animationDelay: `${exitComplete ? index * 50 : 0}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Review count - top left - appears on hover */}
                  <div
                    className="absolute top-1 left-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full 
                                  flex items-center opacity-0 translate-y-2 transition-all duration-300 
                                  group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    <span className="text-xs font-medium text-foreground">{product.reviewCount}</span>
                  </div>

                  {/* Rating with star icon - top right - appears on hover */}
                  <div
                    className="absolute top-1 right-1 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full 
                                  flex items-center opacity-0 translate-y-2 transition-all duration-300 delay-75
                                  group-hover:opacity-100 group-hover:translate-y-0"
                  >
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-0.5" />
                    <span className="text-xs font-medium text-foreground">{product.rating}</span>
                  </div>

                  {/* Wishlist button - appears on hover */}
                  <button
                    onClick={(e) => handleWishlistClick(e, product)}
                    className="absolute top-8 right-1 h-8 w-8 rounded-full bg-background shadow-md 
                              flex items-center justify-center opacity-0 scale-75 transition-all duration-300 delay-150
                              group-hover:opacity-100 group-hover:scale-100 hover:bg-accent"
                    aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${isInWishlist(product.id) ? "text-red-500 fill-red-500" : "text-foreground"}`}
                    />
                  </button>

                  {/* Add to cart button - now a normal button styled like logo */}
                  <button
                    onClick={(e) => handleAddToCart(e, product.id)}
                    className="absolute bottom-0 left-0 right-0 bg-primary py-2 px-3
                              flex items-center justify-center opacity-0 translate-y-full transition-all duration-300 delay-200
                              group-hover:opacity-100 group-hover:translate-y-0 hover:bg-primary/90"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="h-4 w-4 text-white mr-1.5" />
                    <span className="text-xs font-medium uppercase tracking-wider text-white">Add to Cart</span>
                  </button>
                </div>
              </Link>
            ))}
          </div>

          {/* Right arrow navigation */}
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background 
                      backdrop-blur-sm rounded-l-full p-2 shadow-md border border-border border-r-0
                      transition-all duration-200 hover:pr-3"
            aria-label="View next products"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Pagination indicator with enhanced animations */}
      <div className="flex justify-center items-center mt-6 gap-1">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentPage === index ? "bg-primary w-8 animate-pulse" : "bg-muted w-2 hover:bg-primary/50"
            }`}
            onClick={() => {
              if (isAnimating || currentPage === index) return

              setAnimationDirection(index > currentPage ? "next" : "prev")

              // Select a specific animation for direct pagination
              setAnimationVariant(index > currentPage ? "zoom" : "flip")

              setIsAnimating(true)
              setExitComplete(false)
              setTimeout(() => {
                setCurrentPage(index)
                setTimeout(() => {
                  setExitComplete(true)
                  setTimeout(() => setIsAnimating(false), 300)
                }, 50)
              }, 500)
            }}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
