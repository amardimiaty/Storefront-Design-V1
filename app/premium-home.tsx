"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight, Star, TrendingUp, Clock, Award, ShoppingBag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for the premium homepage
const heroSlides = [
  {
    id: 1,
    title: "Summer Collection 2023",
    subtitle: "Discover the latest trends in fashion",
    cta: "Shop Now",
    image: "/placeholder.svg?key=0vpsh",
    link: "/collections/summer",
  },
  {
    id: 2,
    title: "Exclusive Deals",
    subtitle: "Up to 50% off on selected items",
    cta: "View Deals",
    image: "/placeholder.svg?key=fnv03",
    link: "/collections/deals",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "Be the first to shop our latest products",
    cta: "Explore Now",
    image: "/placeholder.svg?key=xgpi6",
    link: "/collections/new-arrivals",
  },
]

const featuredCategories = [
  {
    id: 1,
    name: "Women's Fashion",
    image: "/placeholder.svg?key=9slv5",
    link: "/categories/womens-fashion",
    itemCount: 1240,
  },
  {
    id: 2,
    name: "Men's Fashion",
    image: "/placeholder.svg?key=bqjt3",
    link: "/categories/mens-fashion",
    itemCount: 890,
  },
  {
    id: 3,
    name: "Jewelry & Watches",
    image: "/placeholder.svg?key=o6r25",
    link: "/categories/jewelry-watches",
    itemCount: 578,
  },
  {
    id: 4,
    name: "Home & Living",
    image: "/placeholder.svg?key=imbp1",
    link: "/categories/home-living",
    itemCount: 932,
  },
  {
    id: 5,
    name: "Beauty & Health",
    image: "/placeholder.svg?key=7b2ia",
    link: "/categories/beauty-health",
    itemCount: 745,
  },
  {
    id: 6,
    name: "Electronics",
    image: "/placeholder.svg?key=f79z3",
    link: "/categories/electronics",
    itemCount: 651,
  },
]

const featuredProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviewCount: 245,
    image: "/placeholder.svg?key=f8nvd",
    badge: "Best Seller",
    link: "/products/premium-cotton-tshirt",
  },
  {
    id: 2,
    name: "Designer Leather Handbag",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.9,
    reviewCount: 189,
    image: "/luxury-leather-handbag.png",
    badge: "New Arrival",
    link: "/products/designer-leather-handbag",
  },
  {
    id: 3,
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviewCount: 312,
    image: "/premium-noise-cancelling-headphones.png",
    badge: "Top Rated",
    link: "/products/wireless-headphones",
  },
  {
    id: 4,
    name: "Luxury Watch Collection",
    price: 599.99,
    originalPrice: 799.99,
    rating: 4.9,
    reviewCount: 156,
    image: "/luxury-timepiece.png",
    badge: "Limited Edition",
    link: "/products/luxury-watch",
  },
  {
    id: 5,
    name: "Premium Skincare Set",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.8,
    reviewCount: 278,
    image: "/premium-skincare-luxury.png",
    badge: "Trending",
    link: "/products/premium-skincare-set",
  },
]

const dealOfTheDay = {
  id: 1,
  name: "Smart 4K Ultra HD TV",
  price: 799.99,
  originalPrice: 1299.99,
  discount: 38,
  rating: 4.9,
  reviewCount: 423,
  image: "/premium-4k-smart-tv.png",
  features: [
    "4K Ultra HD Resolution",
    "Smart TV with Voice Control",
    "Dolby Vision & Atmos",
    "120Hz Refresh Rate",
    "Multiple HDMI Ports",
  ],
  timeLeft: "23:59:59",
  link: "/products/smart-4k-tv",
}

const brands = [
  { id: 1, name: "Nike", logo: "/placeholder.svg?height=100&width=200&query=nike+logo" },
  { id: 2, name: "Apple", logo: "/placeholder.svg?height=100&width=200&query=apple+logo" },
  { id: 3, name: "Samsung", logo: "/placeholder.svg?height=100&width=200&query=samsung+logo" },
  { id: 4, name: "Adidas", logo: "/placeholder.svg?height=100&width=200&query=adidas+logo" },
  { id: 5, name: "Sony", logo: "/placeholder.svg?height=100&width=200&query=sony+logo" },
  { id: 6, name: "Zara", logo: "/placeholder.svg?height=100&width=200&query=zara+logo" },
]

const promotionalBanners = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 50% off",
    image: "/placeholder.svg?height=300&width=600&query=summer+sale+fashion+premium",
    link: "/sales/summer",
  },
  {
    id: 2,
    title: "New Collection",
    subtitle: "Discover the latest trends",
    image: "/placeholder.svg?height=300&width=600&query=new+collection+premium+fashion",
    link: "/collections/new",
  },
]

export default function PremiumHome() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [countdown, setCountdown] = useState("23:59:59")

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Countdown timer for deal of the day
  useEffect(() => {
    const interval = setInterval(() => {
      // Simple countdown logic - in a real app, you'd calculate based on actual end time
      const [hours, minutes, seconds] = countdown.split(":").map(Number)
      let newSeconds = seconds - 1
      let newMinutes = minutes
      let newHours = hours

      if (newSeconds < 0) {
        newSeconds = 59
        newMinutes -= 1
      }

      if (newMinutes < 0) {
        newMinutes = 59
        newHours -= 1
      }

      if (newHours < 0) {
        // Reset the countdown when it reaches zero
        newHours = 23
        newMinutes = 59
        newSeconds = 59
      }

      setCountdown(
        `${newHours.toString().padStart(2, "0")}:${newMinutes.toString().padStart(2, "0")}:${newSeconds.toString().padStart(2, "0")}`,
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])

  return (
    <div className="w-full bg-white dark:bg-gray-950">
      {/* Hero Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 flex items-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 10 : 0,
            }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 z-0">
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="container mx-auto px-4 z-10">
              <div className="max-w-xl">
                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-white mb-4"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: currentSlide === index ? 0 : 50, opacity: currentSlide === index ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="text-xl md:text-2xl text-white/90 mb-8"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: currentSlide === index ? 0 : 50, opacity: currentSlide === index ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {slide.subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: currentSlide === index ? 0 : 50, opacity: currentSlide === index ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link href={slide.link}>
                    <button className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg transition-all duration-200 flex items-center">
                      {slide.cta}
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white scale-125" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
            <Link
              href="/categories"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center"
            >
              View All Categories
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredCategories.map((category) => (
              <Link href={category.link} key={category.id} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{category.itemCount} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Deal of the Day</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Hurry up! Offer ends in:</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
              <div className="text-xl font-mono font-bold text-gray-900 dark:text-white">{countdown}</div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 flex items-center justify-center">
                <img
                  src={dealOfTheDay.image || "/placeholder.svg"}
                  alt={dealOfTheDay.name}
                  className="max-w-full max-h-[400px] object-contain"
                />
              </div>

              <div className="p-8 flex flex-col">
                <div className="mb-4">
                  <Badge className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm font-medium">
                    {dealOfTheDay.discount}% OFF
                  </Badge>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {dealOfTheDay.name}
                </h3>

                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(dealOfTheDay.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">({dealOfTheDay.reviewCount} reviews)</span>
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${dealOfTheDay.price.toFixed(2)}
                  </span>
                  <span className="ml-3 text-xl text-gray-500 dark:text-gray-400 line-through">
                    ${dealOfTheDay.originalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="mb-8">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {dealOfTheDay.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                        <div className="mr-2 h-5 w-5 text-green-500 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </button>
                  <Link href={dealOfTheDay.link} className="flex-1">
                    <button className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-3 px-6 rounded-lg font-medium">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Products</h2>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center"
            >
              View All Products
              <ChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {featuredProducts.map((product) => (
              <Link href={product.link} key={product.id} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                  <div className="relative">
                    {product.badge && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1">{product.badge}</Badge>
                      </div>
                    )}
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">{product.name}</h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-xs text-gray-600 dark:text-gray-400">({product.reviewCount})</span>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {promotionalBanners.map((banner) => (
              <Link href={banner.link} key={banner.id} className="group relative overflow-hidden rounded-xl">
                <div className="aspect-[2/1] overflow-hidden">
                  <img
                    src={banner.image || "/placeholder.svg"}
                    alt={banner.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                    <div className="p-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{banner.title}</h3>
                      <p className="text-white/80 mb-4">{banner.subtitle}</p>
                      <button className="bg-white text-black hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition-all duration-200">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Why Shop With Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer only the highest quality products from trusted brands.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get your products delivered to your doorstep in record time.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-400">We offer competitive prices on our 100,000+ products.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Secure Shopping</h3>
              <p className="text-gray-600 dark:text-gray-400">Your data is always protected when you shop with us.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Carousel */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">Featured Brands</h2>

          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {brands.map((brand) => (
              <div key={brand.id} className="w-24 md:w-32 opacity-70 hover:opacity-100 transition-opacity duration-200">
                <img src={brand.logo || "/placeholder.svg"} alt={brand.name} className="w-full h-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-600 dark:bg-blue-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-blue-100 mb-8">
              Stay updated with our latest offers, product launches, and exclusive deals.
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>

            <p className="text-blue-100 text-sm mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
