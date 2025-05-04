"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingBag, User, X, Heart, Plus, Trash2, ChevronRight, ChevronDown } from "lucide-react"
import {
  Scan,
  TelescopeIcon as Binoculars,
  Microscope,
  Star,
  Bookmark,
  ThumbsUp,
  UserCircle,
  CircleUser,
  UserCog,
  ShoppingCart,
  Package,
  ShoppingBasketIcon as Basket,
  Filter,
  MapPin,
  ZoomIn,
  ZoomOut,
  Compass,
  Radar,
  Crosshair,
  ScanSearch,
  HeartHandshake,
  Award,
  Gift,
  BadgeCheck,
  Sparkles,
  Trophy,
  Flame,
  HeartOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useCart } from "@/components/cart/cart-context"
import { useWishlist } from "@/components/wishlist/wishlist-context"
import { useNotifications } from "@/lib/notification-context"
import { useMenu } from "@/lib/menu-context"
import * as LucideIcons from "lucide-react"

// Add Montserrat font
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

// Define icon mapping
const iconComponents = {
  // Search icons
  search: Search,
  scan: Scan,
  binoculars: Binoculars,
  microscope: Microscope,
  filter: Filter,
  mapPin: MapPin,
  zoomIn: ZoomIn,
  zoomOut: ZoomOut,
  compass: Compass,
  radar: Radar,
  crosshair: Crosshair,
  scanSearch: ScanSearch,

  // Wishlist icons
  heart: Heart,
  star: Star,
  bookmark: Bookmark,
  thumbsUp: ThumbsUp,
  heartHandshake: HeartHandshake,
  award: Award,
  gift: Gift,
  badgeCheck: BadgeCheck,
  sparkles: Sparkles,
  trophy: Trophy,
  flame: Flame,
  heartOff: HeartOff,

  // User icons
  user: User,
  userCircle: UserCircle,
  circleUser: CircleUser,
  userCog: UserCog,

  // Cart icons
  shoppingBag: ShoppingBag,
  shoppingCart: ShoppingCart,
  package: Package,
  basket: Basket,
}

// Helper function to render the selected icon
const renderIcon = (position, selectedIcons, iconColor) => {
  const iconName = selectedIcons[position]
  const IconComponent = iconComponents[iconName]

  if (!IconComponent) {
    // Fallback to default icons if the selected one is not found
    const defaultIcons = {
      search: Search,
      wishlist: Heart,
      user: User,
      cart: ShoppingBag,
    }
    return React.createElement(defaultIcons[position], {
      className: `h-5 w-5 ${iconColor} transition-all duration-300 hover:scale-110`,
    })
  }

  return React.createElement(IconComponent, {
    className: `h-5 w-5 ${iconColor} transition-all duration-300 hover:scale-110`,
  })
}

// Helper function to render the logo icon
const renderLogoIcon = (iconName) => {
  const IconComponent = LucideIcons[iconName] || ShoppingBag
  return <IconComponent className="h-5 w-5 relative z-10" />
}

// Function to render menu icons from Lucide
const renderMenuIcon = (iconName, iconColor) => {
  if (!iconName) return null

  // Try to get the icon component directly from Lucide
  const IconComponent = LucideIcons[iconName]
  if (IconComponent) {
    // Use inline style for color
    return (
      <IconComponent className="h-4 w-4 mr-1" style={{ color: iconColor ? getColorValue(iconColor) : undefined }} />
    )
  }

  return null
}

// Helper function to get color value
const getColorValue = (colorName) => {
  const colorMap = {
    primary: "hsl(var(--primary))",
    secondary: "hsl(var(--secondary))",
    info: "#0ea5e9",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#ef4444",
    slate: "#64748b",
    gray: "#6b7280",
    zinc: "#71717a",
    neutral: "#737373",
    stone: "#78716c",
    red: "#ef4444",
    rose: "#f43f5e",
    pink: "#ec4899",
    fuchsia: "#d946ef",
    purple: "#a855f7",
    violet: "#8b5cf6",
    indigo: "#6366f1",
    blue: "#3b82f6",
    sky: "#0ea5e9",
    cyan: "#06b6d4",
    teal: "#14b8a6",
    emerald: "#10b981",
    green: "#22c55e",
    lime: "#84cc16",
    yellow: "#eab308",
    amber: "#f59e0b",
    orange: "#f97316",
  }
  return colorMap[colorName] || "#6366f1"
}

export default function Header() {
  const [isScrolled, setIsIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const cart = useCart()
  const wishlist = useWishlist()
  const { wishlistItems, removeFromWishlist } = wishlist
  const wishlistCount = wishlistItems.length
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isDesktopSearchExpanded, setIsDesktopSearchExpanded] = useState(false)
  const [showNotification, setShowNotification] = useState(true)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [bannerBgColor, setBannerBgColor] = useState("bg-violet-600")
  const [iconColor, setIconColor] = useState("text-[#7c3aed]")
  const [navBgColor, setNavBgColor] = useState("bg-gray-50/50 dark:bg-gray-800/50")
  const [menuTextColor, setMenuTextColor] = useState("text-gray-700 dark:text-gray-300")
  const [menuFontStyle, setMenuFontStyle] = useState("font-medium")
  const [luxuryFont, setLuxuryFont] = useState("")
  const [logoText, setLogoText] = useState("NOVA")
  const [logoSubtext, setLogoSubtext] = useState("shop")
  const [logoGradientFrom, setLogoGradientFrom] = useState("from-violet-600")
  const [logoGradientTo, setLogoGradientTo] = useState("to-indigo-600")
  const [logoIcon, setLogoIcon] = useState("ShoppingBag")

  // Add state for selected icons
  const [selectedIcons, setSelectedIcons] = useState({
    search: "search",
    wishlist: "heart",
    user: "user",
    cart: "basket",
  })

  // Get notifications from context
  const { activeNotifications } = useNotifications()

  // Load notification background color from localStorage and listen for changes
  useEffect(() => {
    // Initial load
    const loadBannerColor = () => {
      const savedColor = localStorage.getItem("notification-banner-color")
      if (savedColor) {
        setBannerBgColor(savedColor)
      }
    }

    loadBannerColor()

    // Create a storage event listener to detect changes
    const handleStorageChange = (e) => {
      if (e.key === "notification-banner-color") {
        loadBannerColor()
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also check for changes every second (for same-tab changes)
    const interval = setInterval(loadBannerColor, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Load logo settings from localStorage
  useEffect(() => {
    const loadLogoSettings = () => {
      const savedLogoText = localStorage.getItem("navbar-logo-text")
      if (savedLogoText) {
        setLogoText(savedLogoText)
      }

      const savedLogoSubtext = localStorage.getItem("navbar-logo-subtext")
      if (savedLogoSubtext) {
        setLogoSubtext(savedLogoSubtext)
      }

      const savedLogoGradientFrom = localStorage.getItem("navbar-logo-gradient-from")
      if (savedLogoGradientFrom) {
        setLogoGradientFrom(savedLogoGradientFrom)
      }

      const savedLogoGradientTo = localStorage.getItem("navbar-logo-gradient-to")
      if (savedLogoGradientTo) {
        setLogoGradientTo(savedLogoGradientTo)
      }

      const savedLogoIcon = localStorage.getItem("navbar-logo-icon")
      if (savedLogoIcon) {
        setLogoIcon(savedLogoIcon)
      }
    }

    loadLogoSettings()

    // Listen for logo setting changes
    window.addEventListener("navbar-logo-changed", loadLogoSettings)

    return () => {
      window.removeEventListener("navbar-logo-changed", loadLogoSettings)
    }
  }, [])

  // Add a new useEffect to load the icon color and selected icons from localStorage
  useEffect(() => {
    // Initial load
    const loadIconSettings = () => {
      const savedIconColor = localStorage.getItem("navbar-icon-color")
      if (savedIconColor) {
        setIconColor(savedIconColor)
      }

      // Load saved icons
      const savedIcons = localStorage.getItem("navbar-icons")
      if (savedIcons) {
        try {
          const parsedIcons = JSON.parse(savedIcons)
          setSelectedIcons(parsedIcons)
        } catch (e) {
          console.error("Error parsing saved icons:", e)
        }
      }

      const savedMenuTextColor = localStorage.getItem("navbar-menu-text-color")
      if (savedMenuTextColor) {
        setMenuTextColor(savedMenuTextColor)
      }

      const savedMenuFontStyle = localStorage.getItem("navbar-menu-font-style")
      if (savedMenuFontStyle) {
        setMenuFontStyle(savedMenuFontStyle)
      }

      const savedLuxuryFont = localStorage.getItem("navbar-luxury-font")
      if (savedLuxuryFont) {
        setLuxuryFont(savedLuxuryFont)
      }
    }

    // Load menu to get icon colors
    const savedMenu = localStorage.getItem("navbar-menu")
    if (savedMenu) {
      try {
        const parsedMenu = JSON.parse(savedMenu)
        // Process menu items to update icon colors in the UI
        updateMenuIconColors(parsedMenu)
      } catch (e) {
        console.error("Error parsing saved menu:", e)
      }
    }

    loadIconSettings()

    // Function to update icon colors from menu data
    function updateMenuIconColors(menuItems) {
      // This will be handled by the existing menu context
      // Just ensure the event triggers a reload
    }
  }, [])

  // Add a new useEffect to load the navigation background color
  useEffect(() => {
    // Initial load
    const loadNavSettings = () => {
      const savedNavBgColor = localStorage.getItem("navbar-bg-color")
      if (savedNavBgColor) {
        setNavBgColor(savedNavBgColor)
      }
    }

    loadNavSettings()

    // Create a storage event listener to detect changes
    const handleNavBgChange = (e) => {
      if (e.key === "navbar-bg-color") {
        const savedNavBgColor = localStorage.getItem("navbar-bg-color")
        if (savedNavBgColor) {
          setNavBgColor(savedNavBgColor)
        }
      }
    }

    window.addEventListener("storage", handleNavBgChange)
    window.addEventListener("navbar-bg-changed", () => {
      const savedNavBgColor = localStorage.getItem("navbar-bg-color")
      if (savedNavBgColor) {
        setNavBgColor(savedNavBgColor)
      }
    })

    // Also check for changes every second (for same-tab changes)
    const navBgInterval = setInterval(loadNavSettings, 1000)

    return () => {
      window.removeEventListener("storage", handleNavBgChange)
      window.removeEventListener("navbar-bg-changed", () => loadNavSettings())
      clearInterval(navBgInterval)
    }
  }, [])

  // Function to update icon colors from menu data
  const updateMenuIconColors = (menuItems) => {
    // This will be handled by the existing menu context
    // Just ensure the event triggers a reload
  }

  // Create a storage event listener to detect changes
  const handleStorageChange = (e) => {
    const loadIconSettings = () => {
      const savedIconColor = localStorage.getItem("navbar-icon-color")
      if (savedIconColor) {
        setIconColor(savedIconColor)
      }

      // Load saved icons
      const savedIcons = localStorage.getItem("navbar-icons")
      if (savedIcons) {
        try {
          const parsedIcons = JSON.parse(savedIcons)
          setSelectedIcons(parsedIcons)
        } catch (e) {
          console.error("Error parsing saved icons:", e)
        }
      }
    }
    if (e.key === "navbar-icon-color" || e.key === "navbar-icons" || e.key === "navbar-menu") {
      loadIconSettings()
    }
  }

  // Listen for custom event for icon changes
  const handleIconChange = (e) => {
    if (e.detail && e.detail.icons) {
      setSelectedIcons(e.detail.icons)
    }
  }

  // Listen for menu icon updates
  const handleMenuIconsUpdate = (e) => {
    if (e.detail && e.detail.icons) {
      // Force reload menu data
      const savedMenu = localStorage.getItem("navbar-menu")
      if (savedMenu) {
        try {
          const parsedMenu = JSON.parse(savedMenu)
          updateMenuIconColors(parsedMenu)
        } catch (e) {
          console.error("Error parsing saved menu:", e)
        }
      }
    }
  }

  useEffect(() => {
    const loadIconSettings = () => {
      const savedIconColor = localStorage.getItem("navbar-icon-color")
      if (savedIconColor) {
        setIconColor(savedIconColor)
      }

      // Load saved icons
      const savedIcons = localStorage.getItem("navbar-icons")
      if (savedIcons) {
        try {
          const parsedIcons = JSON.parse(savedIcons)
          setSelectedIcons(parsedIcons)
        } catch (e) {
          console.error("Error parsing saved icons:", e)
        }
      }
    }
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("navbar-icons-changed", handleIconChange)
    window.addEventListener("navbar-icons-updated", handleMenuIconsUpdate)
    window.addEventListener("navbar-menu-changed", () => loadIconSettings())
    window.addEventListener("navbar-menu-text-color-changed", () => {
      const savedMenuTextColor = localStorage.getItem("navbar-menu-text-color")
      if (savedMenuTextColor) {
        setMenuTextColor(savedMenuTextColor)
      }
    })

    window.addEventListener("navbar-menu-font-style-changed", () => {
      const savedMenuFontStyle = localStorage.getItem("navbar-menu-font-style")
      if (savedMenuFontStyle) {
        setMenuFontStyle(savedMenuFontStyle)
      }
    })

    window.addEventListener("navbar-luxury-font-changed", () => {
      const savedLuxuryFont = localStorage.getItem("navbar-luxury-font")
      if (savedLuxuryFont) {
        setLuxuryFont(savedLuxuryFont)
      }
    })

    // Also check for changes every second (for same-tab changes)
    const interval = setInterval(() => loadIconSettings(), 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("navbar-icons-changed", handleIconChange)
      window.removeEventListener("navbar-icons-updated", handleMenuIconsUpdate)
      window.removeEventListener("navbar-menu-changed", () => loadIconSettings())
      window.removeEventListener("navbar-menu-text-color-changed", () => {
        const savedMenuTextColor = localStorage.getItem("navbar-menu-text-color")
        if (savedMenuTextColor) {
          setMenuTextColor(savedMenuTextColor)
        }
      })
      window.removeEventListener("navbar-menu-font-style-changed", () => {
        const savedMenuFontStyle = localStorage.getItem("navbar-menu-font-style")
        if (savedMenuFontStyle) {
          setMenuFontStyle(savedMenuFontStyle)
        }
      })
      window.removeEventListener("navbar-luxury-font-changed", () => {
        const savedLuxuryFont = localStorage.getItem("navbar-luxury-font")
        if (savedLuxuryFont) {
          setLuxuryFont(savedLuxuryFont)
        }
      })
      clearInterval(interval)
    }
  }, [])

  // Rotate through notification messages if there are any active ones
  useEffect(() => {
    if (!showNotification || !activeNotifications || activeNotifications.length === 0) return

    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex >= activeNotifications.length - 1 ? 0 : prevIndex + 1))
    }, 5000) // Change message every 5 seconds

    return () => clearInterval(interval)
  }, [showNotification, activeNotifications])

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAddToCart = (item) => {
    // This would call the actual addToCart function from cart context
    console.log("Adding to cart:", item)
    // Show a toast notification
    alert(`Added ${item.name} to cart!`)
  }

  const menu = useMenu()
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "bg-white dark:bg-gray-900 shadow-lg" : "bg-white dark:bg-gray-900",
      )}
    >
      {/* Notification Banner */}
      {/* Note: Notification messages should be inactive by default in the dashboard. 
          This is controlled in the NotificationProvider where new notifications should have active: false */}
      {!pathname.startsWith("/admin") && showNotification && activeNotifications && activeNotifications.length > 0 && (
        <div className={`w-full ${bannerBgColor} text-white py-2 px-4 text-center relative`}>
          <div className="animate-fade-in-out">
            <p className="text-sm font-medium">
              <span className="font-bold">{activeNotifications[currentMessageIndex]?.highlight || ""}</span>{" "}
              {activeNotifications[currentMessageIndex]?.text || ""}
            </p>
          </div>
          <button
            onClick={() => setShowNotification(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      {/* Main header content */}
      {!pathname.startsWith("/admin") ? (
        <div
          className={cn(
            "flex items-center justify-between px-4 md:px-8 w-full transition-all duration-500",
            isScrolled
              ? "py-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm"
              : "py-4 bg-white dark:bg-gray-900",
          )}
        >
          {/* Left section: Logo and mobile menu button */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button with improved animation */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 hover:rotate-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>

            {/* Enhanced Logo with subtle animation */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div
                className={`bg-gradient-to-br ${logoGradientFrom} ${logoGradientTo} text-white p-2 rounded-lg shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                {renderLogoIcon(logoIcon)}
              </div>
              <span className="text-xl font-light tracking-wide text-gray-800 dark:text-gray-100 transition-all duration-300 group-hover:tracking-wider">
                <span
                  className={`font-bold bg-clip-text text-transparent bg-gradient-to-r ${logoGradientFrom} ${logoGradientTo} dark:from-violet-400 dark:to-indigo-400`}
                >
                  {logoText}
                </span>
                <span className="group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                  {logoSubtext}
                </span>
              </span>
            </Link>
          </div>

          {/* Center section: Desktop navigation with enhanced styling */}
          <nav
            className={`hidden md:flex items-center justify-center space-x-1 ${navBgColor} backdrop-blur-sm px-2 py-1 rounded-full shadow-sm`}
          >
            {menu.menuItems
              .filter((item) => item.isActive)
              .map((item) =>
                item.children && item.children.length > 0 ? (
                  <NavLinkWithDropdown
                    key={item.id}
                    href={item.href}
                    active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                    items={item.children
                      .filter((child) => child.isActive)
                      .map((child) => ({
                        href: child.href,
                        label: child.label,
                        icon: child.icon,
                        iconColor: child.iconColor,
                        isViewAll: child.id.endsWith("-view-all"),
                        description: child.description || `Explore our ${child.label.toLowerCase()} collection`,
                      }))}
                    promo={{
                      title: item.label || "Collection",
                      description: item.description || `Browse our ${item.label.toLowerCase()} selection`,
                    }}
                    menuTextColor={menuTextColor}
                    menuFontStyle={menuFontStyle}
                    fontFamily={luxuryFont || ""}
                  >
                    {item.icon && renderMenuIcon(item.icon, item.iconColor)}
                    {item.label}
                  </NavLinkWithDropdown>
                ) : (
                  <NavLink
                    key={item.id}
                    href={item.href}
                    active={pathname === item.href}
                    menuTextColor={menuTextColor}
                    menuFontStyle={menuFontStyle}
                    fontFamily={luxuryFont || ""}
                  >
                    {item.icon && renderMenuIcon(item.icon, item.iconColor)}
                    {item.label}
                  </NavLink>
                ),
              )}
          </nav>

          {/* Right section: Search, wishlist, account, cart with enhanced styling */}
          <div className="flex items-center gap-1 md:gap-3">
            {/* Inline Search with improved animation */}
            <div className="hidden md:block relative">
              {isDesktopSearchExpanded ? (
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-4 pr-10 py-1 h-9 bg-white/90 dark:bg-gray-800/90 border-gray-200 dark:border-gray-700 focus-visible:ring-violet-500 w-64 animate-in slide-in-from-right-5 duration-300 rounded-full shadow-sm"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 h-7 w-7 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsDesktopSearchExpanded(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    {renderIcon("search", selectedIcons, iconColor)}
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                  onClick={() => setIsDesktopSearchExpanded(true)}
                >
                  {renderIcon("search", selectedIcons, iconColor)}
                  <span className="sr-only">Search</span>
                </Button>
              )}
            </div>

            {/* Mobile Search Button with improved styling */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              {renderIcon("search", selectedIcons, iconColor)}
              <span className="sr-only">Search</span>
            </Button>

            {/* Wishlist with enhanced hover dropdown */}
            <div className="relative group">
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                >
                  <div className="relative">
                    {renderIcon("wishlist", selectedIcons, iconColor)}
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-300">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                  <span className="sr-only">Wishlist</span>
                </Button>
              </Link>

              {/* Enhanced dropdown preview */}
              {wishlistCount > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 border border-gray-100 dark:border-gray-800">
                  <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="font-medium text-sm flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-violet-500" /> Your Wishlist ({wishlistCount})
                    </h3>
                    <Link href="/wishlist" className="text-xs text-violet-600 hover:underline flex items-center">
                      View All <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {wishlistItems.slice(0, 5).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                      >
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden relative flex-shrink-0 border border-gray-200 dark:border-gray-700 group">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <ShoppingBag className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="text-xs px-2 py-1 bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 text-white dark:text-white rounded-full flex items-center gap-1 transition-all duration-300 hover:shadow-md"
                            >
                              <Plus className="h-3 w-3" /> Add to Cart
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full flex items-center gap-1 transition-all duration-300"
                            >
                              <Trash2 className="h-3 w-3" /> Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {wishlistCount > 5 && (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800/50 text-center">
                        <Link
                          href="/wishlist"
                          className="text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 hover:underline flex items-center justify-center gap-1 transition-colors duration-300"
                        >
                          Show {wishlistCount - 5} more items
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                    <Link
                      href="/wishlist"
                      className="block w-full py-2 px-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm text-center rounded-md transition-all duration-300 hover:shadow-md"
                    >
                      View Wishlist
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Account with tooltip */}
            <div className="relative group">
              <Link href="/account">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                >
                  {renderIcon("user", selectedIcons, iconColor)}
                  <span className="sr-only">Account</span>
                </Button>
              </Link>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                My Account
              </div>
            </div>

            {/* Cart with enhanced animation */}
            <div className="relative group">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative rounded-full hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
                >
                  <div className="relative">
                    {renderIcon("cart", selectedIcons, iconColor)}
                    {cart?.totalItems > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm animate-in zoom-in-50 duration-300">
                        {cart.totalItems}
                      </span>
                    )}
                  </div>
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Shopping Cart
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Admin dashboard header
        <div className="flex items-center justify-between px-4 md:px-8 w-full py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>

            {/* Admin Logo */}
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-2 rounded-lg shadow-md">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wide text-gray-800 dark:text-gray-100">
                  Admin Dashboard
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">NOVAshop Management</span>
              </div>
            </Link>
          </div>

          {/* Admin Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400"
            >
              View Store
            </Link>
            <Link href="/account">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={cn(
            "fixed top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white dark:bg-gray-900 p-6 shadow-xl transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-1.5 rounded-md">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">NOVAshop</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <nav className="flex flex-col space-y-6">
            <Link
              href="/"
              className={cn(
                "text-base font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400",
                pathname === "/" ? "text-violet-600 dark:text-violet-400" : "text-gray-800 dark:text-gray-200",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            <div>
              <Link
                href="/shop"
                className={cn(
                  "text-base font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 flex items-center justify-between",
                  pathname === "/shop" || pathname.startsWith("/shop/")
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-gray-800 dark:text-gray-200",
                )}
              >
                Shop
                <ChevronRight className="h-5 w-5" />
              </Link>
              <div className="pl-4 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-800">
                <Link
                  href="/shop/new-arrivals"
                  className="block text-sm py-1 hover:text-violet-600 dark:hover:text-violet-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link
                  href="/shop/bestsellers"
                  className="block text-sm py-1 hover:text-violet-600 dark:hover:text-violet-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bestsellers
                </Link>
                <Link
                  href="/shop/sale"
                  className="block text-sm py-1 hover:text-violet-600 dark:hover:text-violet-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sale Items
                </Link>
              </div>
            </div>

            <div>
              <Link
                href="/collections"
                className={cn(
                  "text-base font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 flex items-center justify-between",
                  pathname === "/collections" || pathname.startsWith("/collections/")
                    ? "text-violet-600 dark:text-violet-400"
                    : "text-gray-800 dark:text-gray-200",
                )}
              >
                Collections
                <ChevronRight className="h-5 w-5" />
              </Link>
              <div className="pl-4 mt-2 space-y-2 border-l border-gray-200 dark:border-gray-800">
                <Link
                  href="/collections/summer"
                  className="block text-sm py-1 hover:text-violet-600 dark:hover:text-violet-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Summer Essentials
                </Link>
                <Link
                  href="/collections/autumn"
                  className="block text-sm py-1 hover:text-violet-600 dark:hover:text-violet-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Autumn Collection
                </Link>
                <Link
                  href="/collections/winter"
                  className="block text-sm py-1 hover:text-violet-600 dark:hover:text-violet-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Winter Specials
                </Link>
                <Link
                  href="/collections/spring"
                  className="block text-sm py-1 hover:text-violet-600 dark:hover:text-violet-400"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Spring Selection
                </Link>
              </div>
            </div>

            <Link
              href="/about"
              className={cn(
                "text-base font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400",
                pathname === "/about" ? "text-violet-600 dark:text-violet-400" : "text-gray-800 dark:text-gray-200",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={cn(
                "text-base font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400",
                pathname === "/contact" ? "text-violet-600 dark:text-violet-400" : "text-gray-800 dark:text-gray-200",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/admin"
              className={cn(
                "text-base font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400",
                pathname === "/admin" || pathname.startsWith("/admin/")
                  ? "text-violet-600 dark:text-violet-400"
                  : "text-gray-800 dark:text-gray-200",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin
            </Link>

            <Link
              href="/wishlist"
              className={cn(
                "text-base font-medium transition-colors hover:text-violet-600 dark:hover:text-violet-400 flex items-center",
                pathname === "/wishlist" ? "text-violet-600 dark:text-violet-400" : "text-gray-800 dark:text-gray-200",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart className="h-5 w-5 mr-2" />
              Wishlist
              {wishlistCount > 0 && (
                <span className="ml-2 bg-violet-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Search Popup */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 flex items-center justify-center",
          isMobileSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setIsMobileSearchOpen(false)}
      >
        <div
          className="bg-white dark:bg-gray-900 w-11/12 max-w-sm rounded-xl shadow-xl p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Search</h3>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-9 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-full"
              autoFocus
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-full px-6"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

// Helper component for navigation links
function NavLink({ href, active, children, menuTextColor, menuFontStyle, fontFamily = "" }) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-full text-sm transition-all duration-300 relative group",
        `${menuTextColor} ${menuFontStyle} ${fontFamily} hover:opacity-80`,
      )}
    >
      <div className="flex items-center gap-1">{children}</div>
      <span
        className={cn(
          "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-violet-500 rounded-full transition-all duration-300",
          active ? "w-1/2" : "w-0 group-hover:w-1/3",
        )}
      ></span>
    </Link>
  )
}

// Helper component for dropdown navigation links
function NavLinkWithDropdown({ href, active, items, children, promo, menuTextColor, menuFontStyle, fontFamily = "" }) {
  return (
    <div className="relative group">
      <Link
        href={href}
        className={cn(
          "px-3 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-1 relative",
          `${menuTextColor} ${menuFontStyle} ${fontFamily} hover:opacity-80`,
        )}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-300 group-hover:rotate-180" />
        <span
          className={cn(
            "absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-violet-500 rounded-full transition-all duration-300",
            active ? "w-1/2" : "w-0 group-hover:w-1/3",
          )}
        ></span>
      </Link>

      {/* Enhanced dropdown menu */}
      <div className="absolute left-0 mt-1 w-64 bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left scale-95 group-hover:scale-100 border border-gray-100 dark:border-gray-800">
        <div className="p-4 grid gap-2">
          {promo && (
            <div className="bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/20 dark:to-indigo-900/20 p-3 rounded-lg mb-2">
              <p className="text-sm font-medium">{promo.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{promo.description}</p>
            </div>
          )}
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative group/item",
                item.isViewAll ? "text-violet-600 dark:text-violet-400" : "text-gray-700 dark:text-gray-300",
                fontFamily,
              )}
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {item.icon && renderMenuIcon(item.icon, item.iconColor)}
                  <span>{item.label}</span>
                </div>
                {item.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 ml-6">{item.description}</p>
                )}
              </div>
              <span className="absolute left-0 top-1/2 w-0 h-0.5 bg-violet-500 rounded-full transform -translate-y-1/2 transition-all duration-300 opacity-0 group-hover/item:opacity-100 group-hover/item:w-1"></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
