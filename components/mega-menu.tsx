"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Define the category structure with subcategories
export interface SubCategory {
  name: string
  href: string
  featured?: boolean
  new?: boolean
}

export interface Category {
  name: string
  href: string
  description?: string
  icon?: React.ReactNode
  image?: string
  subcategories: SubCategory[]
  featured?: boolean
  new?: boolean
  promotion?: {
    title: string
    description: string
    image: string
    href: string
  }
}

// Sample featured products for the mega menu
const featuredProducts = [
  {
    name: "Premium Noise-Cancelling Headphones",
    price: "$299.99",
    image: "/premium-noise-cancelling-headphones.png",
    href: "/products/premium-noise-cancelling-headphones",
    discount: "20% OFF",
  },
  {
    name: "Luxury Leather Handbag",
    price: "$199.99",
    image: "/luxury-leather-handbag.png",
    href: "/products/luxury-leather-handbag",
    discount: "15% OFF",
  },
]

interface MegaMenuProps {
  categories: Category[]
}

export default function MegaMenu({ categories }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  const handleCategoryHover = (categoryName: string) => {
    setActiveCategory(categoryName)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (!isMenuOpen && !activeCategory && categories.length > 0) {
      setActiveCategory(categories[0].name)
    }
  }

  // Find the active category object
  const activeCategoryObj = categories.find((cat) => cat.name === activeCategory)

  return (
    <div ref={menuRef} className="relative">
      {/* Mega Menu Trigger Button */}
      <Button
        variant="ghost"
        onClick={toggleMenu}
        className={cn("flex items-center gap-1 px-4 py-2 h-10", isMenuOpen && "bg-primary/10 text-primary")}
        aria-expanded={isMenuOpen}
        aria-controls="mega-menu"
      >
        Categories
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isMenuOpen && "rotate-180")} />
      </Button>

      {/* Mega Menu Content */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mega-menu"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-50 w-screen max-w-7xl bg-white dark:bg-gray-900 shadow-xl rounded-b-xl border border-gray-200 dark:border-gray-800"
            style={{ top: "calc(100% + 8px)" }}
          >
            <div className="grid grid-cols-12 gap-0">
              {/* Categories Column */}
              <div className="col-span-3 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 rounded-bl-xl">
                <div className="py-4">
                  <h3 className="px-6 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Browse Categories</h3>
                  <ul>
                    {categories.map((category) => (
                      <li key={category.name}>
                        <button
                          className={cn(
                            "w-full text-left px-6 py-3 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                            activeCategory === category.name && "bg-primary/10 text-primary border-r-2 border-primary",
                          )}
                          onMouseEnter={() => handleCategoryHover(category.name)}
                          onClick={() => handleCategoryHover(category.name)}
                        >
                          <div className="flex items-center gap-2">
                            {category.icon}
                            <span>{category.name}</span>
                            {category.new && (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-green-500/10 text-green-500 border-green-500/20"
                              >
                                New
                              </Badge>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Subcategories and Featured Content */}
              <div className="col-span-9 p-6">
                {activeCategoryObj && (
                  <div className="grid grid-cols-12 gap-6">
                    {/* Subcategories */}
                    <div className="col-span-7">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        {activeCategoryObj.subcategories.map((subcategory, index) => (
                          <div key={index} className="space-y-4">
                            <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                              <Link
                                href={subcategory.href}
                                className="font-medium hover:text-primary transition-colors flex items-center gap-2"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subcategory.name}
                                {subcategory.featured && (
                                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                    Popular
                                  </Badge>
                                )}
                                {subcategory.new && (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-500/10 text-green-500 border-green-500/20"
                                  >
                                    New
                                  </Badge>
                                )}
                              </Link>
                            </div>
                            <ul className="space-y-2">
                              {/* Generate some sample links based on subcategory */}
                              {[1, 2, 3].map((item) => (
                                <li key={item}>
                                  <Link
                                    href={`${subcategory.href}?type=${item}`}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {subcategory.name} Type {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Featured Content */}
                    <div className="col-span-5">
                      {activeCategoryObj.promotion ? (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                          <div className="relative h-40 mb-4 overflow-hidden rounded-md">
                            <Image
                              src={activeCategoryObj.promotion.image || "/placeholder.svg"}
                              alt={activeCategoryObj.promotion.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-bold text-lg mb-2">{activeCategoryObj.promotion.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {activeCategoryObj.promotion.description}
                          </p>
                          <Link href={activeCategoryObj.promotion.href} onClick={() => setIsMenuOpen(false)}>
                            <Button size="sm">Shop Now</Button>
                          </Link>
                        </div>
                      ) : (
                        <div>
                          <h3 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-4">
                            Featured Products
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {featuredProducts.map((product, index) => (
                              <Link
                                key={index}
                                href={product.href}
                                className="group"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                <div className="relative h-32 mb-2 overflow-hidden rounded-md">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  {product.discount && (
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                      {product.discount}
                                    </div>
                                  )}
                                </div>
                                <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                                  {product.name}
                                </h4>
                                <p className="text-sm font-bold">{product.price}</p>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-950 rounded-b-xl">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-medium">Free shipping</span> on orders over $50
                </div>
                <Link href="/sale" onClick={() => setIsMenuOpen(false)}>
                  <Badge variant="destructive" className="px-3">
                    SALE: Up to 70% OFF
                  </Badge>
                </Link>
                <Link href="/new-arrivals" onClick={() => setIsMenuOpen(false)}>
                  <span className="text-sm font-medium hover:text-primary transition-colors">
                    New arrivals this week →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
