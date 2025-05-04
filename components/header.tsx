"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, ShoppingCart, Heart, User, Menu, X, Bell, Package, LogOut, Settings, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import MegaMenu from "@/components/mega-menu"
import MobileCategoryMenu from "@/components/mobile-category-menu"
import { megaMenuCategories } from "@/lib/category-data"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileCategoryMenuOpen, setIsMobileCategoryMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white dark:bg-gray-950 shadow-md" : "bg-white dark:bg-gray-950"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              LUXESTORE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Mega Menu */}
            <MegaMenu categories={megaMenuCategories} />

            <Link href="/collections" passHref>
              <Button variant="ghost" className={pathname === "/collections" ? "bg-primary/10 text-primary" : ""}>
                Collections
              </Button>
            </Link>

            <Link href="/products" passHref>
              <Button variant="ghost" className={pathname === "/products" ? "bg-primary/10 text-primary" : ""}>
                All Products
              </Button>
            </Link>

            <Link href="/deals" passHref>
              <Button variant="ghost" className={pathname === "/deals" ? "bg-primary/10 text-primary" : ""}>
                Deals
              </Button>
            </Link>

            <Link href="/new-arrivals" passHref>
              <Button variant="ghost" className={pathname === "/new-arrivals" ? "bg-primary/10 text-primary" : ""}>
                New Arrivals
              </Button>
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full"
              >
                Search
              </Button>
            </form>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-1">
            {/* Mobile Category Menu Button */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsMobileCategoryMenuOpen(true)}>
              <Grid className="h-5 w-5" />
            </Button>

            <Link href="/wishlist" passHref>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              </Button>
            </Link>

            <Link href="/cart" passHref>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">2</Badge>
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center gap-2 w-full cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders" className="flex items-center gap-2 w-full cursor-pointer">
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist" className="flex items-center gap-2 w-full cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span>Wishlist</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/notifications" className="flex items-center gap-2 w-full cursor-pointer">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/settings" className="flex items-center gap-2 w-full cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Search - Visible on smaller screens */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </form>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-950 shadow-lg">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            <div className="py-2 px-4">
              <div className="font-medium mb-2">Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {megaMenuCategories.slice(0, 8).map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="py-1 hover:text-primary flex items-center gap-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
              <button
                className="mt-2 text-sm text-primary inline-block"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsMobileCategoryMenuOpen(true)
                }}
              >
                View all categories →
              </button>
            </div>

            <Link
              href="/collections"
              className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>

            <Link
              href="/products"
              className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Products
            </Link>

            <Link
              href="/deals"
              className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Deals
            </Link>

            <Link
              href="/new-arrivals"
              className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              New Arrivals
            </Link>

            <Link
              href="/about"
              className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}

      {/* Mobile Category Menu */}
      {isMobileCategoryMenuOpen && (
        <MobileCategoryMenu categories={megaMenuCategories} onClose={() => setIsMobileCategoryMenuOpen(false)} />
      )}
    </header>
  )
}
