"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Check,
  Palette,
  Save,
  Search,
  Heart,
  User,
  ShoppingBag,
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
  type LucideIcon,
  TypeIcon,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define icon types and mapping
type IconPosition = "search" | "wishlist" | "user" | "cart"
type IconName = string

interface IconMapping {
  [key: string]: LucideIcon
}

const iconComponents: IconMapping = {
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

// Add the IconOption component
function IconOption({ icon, name, position, isActive = false, onClick }) {
  return (
    <div
      className={`border rounded-md p-2 flex items-center justify-center cursor-pointer transition-all ${
        isActive
          ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
          : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
      }`}
      title={name}
      onClick={() => onClick(name, position)}
    >
      <div className="text-gray-700 dark:text-gray-300">{icon}</div>
      {isActive && (
        <div className="absolute top-1 right-1">
          <Check className="h-3 w-3 text-violet-600" />
        </div>
      )}
    </div>
  )
}

export default function NavbarSettings() {
  const [iconColor, setIconColor] = useState("text-[#7c3aed]")
  const [previewColor, setPreviewColor] = useState("text-[#7c3aed]")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [navBgColor, setNavBgColor] = useState("bg-gray-50/50 dark:bg-gray-800/50")
  const [menuTextColor, setMenuTextColor] = useState("text-gray-700 dark:text-gray-300")
  const [menuFontStyle, setMenuFontStyle] = useState("font-medium")
  const [luxuryFont, setLuxuryFont] = useState("font-sans")
  const [selectedIcons, setSelectedIcons] = useState({
    search: "search",
    wishlist: "heart",
    user: "user",
    cart: "shoppingBag",
  })

  // Load saved settings on initial render
  useEffect(() => {
    const savedColor = localStorage.getItem("navbar-icon-color")
    if (savedColor) {
      setIconColor(savedColor)
      setPreviewColor(savedColor)
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

    // Load saved navigation background color
    const savedNavBgColor = localStorage.getItem("navbar-bg-color")
    if (savedNavBgColor) {
      setNavBgColor(savedNavBgColor)
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
  }, [])

  const colorOptions = [
    { value: "text-[#7c3aed]", label: "Violet (Default)", previewClass: "bg-[#7c3aed]" },
    { value: "text-blue-500", label: "Blue", previewClass: "bg-blue-500" },
    { value: "text-emerald-500", label: "Emerald", previewClass: "bg-emerald-500" },
    { value: "text-rose-500", label: "Rose", previewClass: "bg-rose-500" },
    { value: "text-amber-500", label: "Amber", previewClass: "bg-amber-500" },
    { value: "text-gray-700", label: "Gray", previewClass: "bg-gray-700" },
    { value: "text-red-500", label: "Red", previewClass: "bg-red-500" },
    { value: "text-indigo-500", label: "Indigo", previewClass: "bg-indigo-500" },
  ]

  const fontFamilyOptions = [
    { value: "font-sans", label: "Default (System UI)" },
    { value: "font-serif", label: "Serif" },
    { value: "font-mono", label: "Monospace" },
    { value: "font-['Playfair_Display']", label: "Playfair Display" },
    { value: "font-['Cormorant_Garamond']", label: "Cormorant Garamond" },
    { value: "font-['Montserrat']", label: "Montserrat" },
    { value: "font-['Baskerville']", label: "Baskerville" },
    { value: "font-['Didot']", label: "Didot" },
    { value: "font-['Lora']", label: "Lora" },
    { value: "font-['Merriweather']", label: "Merriweather" },
  ]

  // Handle icon selection
  const handleIconSelect = (iconName: IconName, position: IconPosition) => {
    setSelectedIcons((prev) => ({
      ...prev,
      [position]: iconName,
    }))
  }

  const handleSaveChanges = () => {
    // Save color
    localStorage.setItem("navbar-icon-color", iconColor)

    // Save selected icons
    localStorage.setItem("navbar-icons", JSON.stringify(selectedIcons))

    // Save navigation background color
    localStorage.setItem("navbar-bg-color", navBgColor)

    localStorage.setItem("navbar-menu-text-color", menuTextColor)

    // Save menu font style
    localStorage.setItem("navbar-menu-font-style", menuFontStyle)

    // Save luxury font
    localStorage.setItem("navbar-luxury-font", luxuryFont)

    // Dispatch storage events to notify other components
    window.dispatchEvent(new Event("storage"))

    // Custom event for icon changes
    const iconChangeEvent = new CustomEvent("navbar-icons-changed", {
      detail: { icons: selectedIcons },
    })
    window.dispatchEvent(iconChangeEvent)

    // Custom event for navigation background color changes
    const navBgChangeEvent = new CustomEvent("navbar-bg-changed", {
      detail: { bgColor: navBgColor },
    })
    window.dispatchEvent(navBgChangeEvent)

    // Custom event for menu text color changes
    const menuTextColorEvent = new CustomEvent("navbar-menu-text-color-changed", {
      detail: { textColor: menuTextColor },
    })
    window.dispatchEvent(menuTextColorEvent)

    // Custom event for menu font style changes
    const menuFontStyleEvent = new CustomEvent("navbar-menu-font-style-changed", {
      detail: { fontStyle: menuFontStyle },
    })
    window.dispatchEvent(menuFontStyleEvent)

    // Custom event for luxury font changes
    const luxuryFontEvent = new CustomEvent("navbar-luxury-font-changed", {
      detail: { luxuryFont: luxuryFont },
    })
    window.dispatchEvent(luxuryFontEvent)

    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)

    toast({
      title: "Changes saved",
      description: "Your navbar settings have been updated.",
    })
  }

  // Helper function to render the selected icon in the preview
  const renderSelectedIcon = (position: IconPosition) => {
    const iconName = selectedIcons[position]
    const IconComponent = iconComponents[iconName]

    if (!IconComponent) return null

    return <IconComponent className={`h-5 w-5 ${previewColor}`} />
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Dashboard</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Navbar Settings</h1>
        </div>
        <Button
          onClick={handleSaveChanges}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-200 text-green-800 rounded-lg p-4 mb-6 flex items-center">
          <Check className="h-5 w-5 mr-2 text-green-600" />
          <p>Your changes have been saved successfully! Refresh the home page to see your changes.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Icon Colors
              </CardTitle>
              <CardDescription>Customize the colors of the icons in your navigation bar</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="colors">
                <TabsList className="mb-4">
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="advanced">Icons</TabsTrigger>
                  <TabsTrigger value="background">Background</TabsTrigger>
                  <TabsTrigger value="text">Text</TabsTrigger>
                </TabsList>

                <TabsContent value="colors">
                  <RadioGroup
                    value={iconColor}
                    onValueChange={(value) => {
                      setIconColor(value)
                      setPreviewColor(value)
                    }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {colorOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={option.value} className="sr-only" />
                        <Label
                          htmlFor={option.value}
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            iconColor === option.value
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full ${option.previewClass}`}></div>
                          <span>{option.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </TabsContent>
                <TabsContent value="advanced">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Icon Selection</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Choose different icons for your navigation bar
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Search Icon Options */}
                        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                          <Label className="text-sm font-medium mb-3 block">Search Icon</Label>
                          <div className="grid grid-cols-4 gap-3">
                            <IconOption
                              icon={<Search className="h-5 w-5" />}
                              name="search"
                              position="search"
                              isActive={selectedIcons.search === "search"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Scan className="h-5 w-5" />}
                              name="scan"
                              position="search"
                              isActive={selectedIcons.search === "scan"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Binoculars className="h-5 w-5" />}
                              name="binoculars"
                              position="search"
                              isActive={selectedIcons.search === "binoculars"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Microscope className="h-5 w-5" />}
                              name="microscope"
                              position="search"
                              isActive={selectedIcons.search === "microscope"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Filter className="h-5 w-5" />}
                              name="filter"
                              position="search"
                              isActive={selectedIcons.search === "filter"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<MapPin className="h-5 w-5" />}
                              name="mapPin"
                              position="search"
                              isActive={selectedIcons.search === "mapPin"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<ZoomIn className="h-5 w-5" />}
                              name="zoomIn"
                              position="search"
                              isActive={selectedIcons.search === "zoomIn"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<ZoomOut className="h-5 w-5" />}
                              name="zoomOut"
                              position="search"
                              isActive={selectedIcons.search === "zoomOut"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Compass className="h-5 w-5" />}
                              name="compass"
                              position="search"
                              isActive={selectedIcons.search === "compass"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Radar className="h-5 w-5" />}
                              name="radar"
                              position="search"
                              isActive={selectedIcons.search === "radar"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Crosshair className="h-5 w-5" />}
                              name="crosshair"
                              position="search"
                              isActive={selectedIcons.search === "crosshair"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<ScanSearch className="h-5 w-5" />}
                              name="scanSearch"
                              position="search"
                              isActive={selectedIcons.search === "scanSearch"}
                              onClick={handleIconSelect}
                            />
                          </div>
                          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Select an icon for the search functionality in your navigation bar
                          </div>
                        </div>

                        {/* Wishlist Icon Options */}
                        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                          <Label className="text-sm font-medium mb-3 block">Wishlist Icon</Label>
                          <div className="grid grid-cols-4 gap-3">
                            <IconOption
                              icon={<Heart className="h-5 w-5" />}
                              name="heart"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "heart"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Star className="h-5 w-5" />}
                              name="star"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "star"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Bookmark className="h-5 w-5" />}
                              name="bookmark"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "bookmark"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<ThumbsUp className="h-5 w-5" />}
                              name="thumbsUp"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "thumbsUp"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<HeartHandshake className="h-5 w-5" />}
                              name="heartHandshake"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "heartHandshake"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Award className="h-5 w-5" />}
                              name="award"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "award"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Gift className="h-5 w-5" />}
                              name="gift"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "gift"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<BadgeCheck className="h-5 w-5" />}
                              name="badgeCheck"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "badgeCheck"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Sparkles className="h-5 w-5" />}
                              name="sparkles"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "sparkles"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Trophy className="h-5 w-5" />}
                              name="trophy"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "trophy"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Flame className="h-5 w-5" />}
                              name="flame"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "flame"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<HeartOff className="h-5 w-5" />}
                              name="heartOff"
                              position="wishlist"
                              isActive={selectedIcons.wishlist === "heartOff"}
                              onClick={handleIconSelect}
                            />
                          </div>
                          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Select an icon for the wishlist functionality in your navigation bar
                          </div>
                        </div>

                        {/* User Icon Options */}
                        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                          <Label className="text-sm font-medium mb-3 block">User Icon</Label>
                          <div className="grid grid-cols-4 gap-3">
                            <IconOption
                              icon={<User className="h-5 w-5" />}
                              name="user"
                              position="user"
                              isActive={selectedIcons.user === "user"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<UserCircle className="h-5 w-5" />}
                              name="userCircle"
                              position="user"
                              isActive={selectedIcons.user === "userCircle"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<CircleUser className="h-5 w-5" />}
                              name="circleUser"
                              position="user"
                              isActive={selectedIcons.user === "circleUser"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<UserCog className="h-5 w-5" />}
                              name="userCog"
                              position="user"
                              isActive={selectedIcons.user === "userCog"}
                              onClick={handleIconSelect}
                            />
                          </div>
                          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Select an icon for the user account functionality in your navigation bar
                          </div>
                        </div>

                        {/* Cart Icon Options */}
                        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                          <Label className="text-sm font-medium mb-3 block">Cart Icon</Label>
                          <div className="grid grid-cols-4 gap-3">
                            <IconOption
                              icon={<ShoppingBag className="h-5 w-5" />}
                              name="shoppingBag"
                              position="cart"
                              isActive={selectedIcons.cart === "shoppingBag"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<ShoppingCart className="h-5 w-5" />}
                              name="shoppingCart"
                              position="cart"
                              isActive={selectedIcons.cart === "shoppingCart"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Package className="h-5 w-5" />}
                              name="package"
                              position="cart"
                              isActive={selectedIcons.cart === "package"}
                              onClick={handleIconSelect}
                            />
                            <IconOption
                              icon={<Basket className="h-5 w-5" />}
                              name="basket"
                              position="cart"
                              isActive={selectedIcons.cart === "basket"}
                              onClick={handleIconSelect}
                            />
                          </div>
                          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Select an icon for the shopping cart functionality in your navigation bar
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Additional Options</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="show-labels" />
                          <Label htmlFor="show-labels">Show text labels (Coming soon)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="animate-icons" />
                          <Label htmlFor="animate-icons">Enable icon animations (Coming soon)</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="background">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Navigation Background</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Choose a background color for your navigation menu
                    </p>

                    <RadioGroup
                      value={navBgColor}
                      onValueChange={setNavBgColor}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      {/* Default options */}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-gray-50/50 dark:bg-gray-800/50"
                          id="nav-bg-default"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-default"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-gray-50/50 dark:bg-gray-800/50"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-gray-50"></div>
                          <span>Light Gray (Default)</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-white/70 dark:bg-gray-900/70"
                          id="nav-bg-transparent"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-transparent"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-white/70 dark:bg-gray-900/70"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-white border border-gray-200"></div>
                          <span>Transparent White</span>
                        </Label>
                      </div>

                      {/* Flat color options */}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-violet-500 dark:bg-violet-600"
                          id="nav-bg-flat-violet"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-flat-violet"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-violet-500 dark:bg-violet-600"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-violet-500"></div>
                          <span>Flat Violet</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-blue-500 dark:bg-blue-600"
                          id="nav-bg-flat-blue"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-flat-blue"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-blue-500 dark:bg-blue-600"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                          <span>Flat Blue</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-emerald-500 dark:bg-emerald-600"
                          id="nav-bg-flat-emerald"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-flat-emerald"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-emerald-500 dark:bg-emerald-600"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-emerald-500"></div>
                          <span>Flat Emerald</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-amber-500 dark:bg-amber-600"
                          id="nav-bg-flat-amber"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-flat-amber"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-amber-500 dark:bg-amber-600"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-amber-500"></div>
                          <span>Flat Amber</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-rose-500 dark:bg-rose-600"
                          id="nav-bg-flat-rose"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-flat-rose"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-rose-500 dark:bg-rose-600"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-rose-500"></div>
                          <span>Flat Rose</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-slate-700 dark:bg-slate-800"
                          id="nav-bg-flat-slate"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-flat-slate"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-slate-700 dark:bg-slate-800"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-slate-700"></div>
                          <span>Flat Slate</span>
                        </Label>
                      </div>

                      {/* Gradient options */}
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-violet-50/70 dark:bg-violet-900/20"
                          id="nav-bg-violet"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-violet"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor === "bg-violet-50/70 dark:bg-violet-900/20"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-violet-50"></div>
                          <span>Light Violet</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-gradient-to-r from-violet-50/50 to-indigo-50/50 dark:from-violet-900/20 dark:to-indigo-900/20"
                          id="nav-bg-gradient"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-gradient"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor ===
                            "bg-gradient-to-r from-violet-50/50 to-indigo-50/50 dark:from-violet-900/20 dark:to-indigo-900/20"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-violet-50 to-indigo-50"></div>
                          <span>Violet Gradient</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600"
                          id="nav-bg-gradient-blue"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-gradient-blue"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor ===
                            "bg-gradient-to-r from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                          <span>Blue Gradient</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="bg-gradient-to-r from-rose-500 to-orange-500 dark:from-rose-600 dark:to-orange-600"
                          id="nav-bg-gradient-sunset"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="nav-bg-gradient-sunset"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            navBgColor ===
                            "bg-gradient-to-r from-rose-500 to-orange-500 dark:from-rose-600 dark:to-orange-600"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-rose-500 to-orange-500"></div>
                          <span>Sunset Gradient</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
                <TabsContent value="text">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Menu Text Color</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Choose a text color for your navigation menu items
                    </p>

                    <RadioGroup
                      value={menuTextColor}
                      onValueChange={setMenuTextColor}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="text-gray-700 dark:text-gray-300"
                          id="menu-text-default"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="menu-text-default"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            menuTextColor === "text-gray-700 dark:text-gray-300"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-gray-700 dark:bg-gray-300"></div>
                          <span>Default Gray</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="text-violet-600 dark:text-violet-400"
                          id="menu-text-violet"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="menu-text-violet"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            menuTextColor === "text-violet-600 dark:text-violet-400"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-violet-600 dark:bg-violet-400"></div>
                          <span>Violet</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="text-blue-600 dark:text-blue-400"
                          id="menu-text-blue"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="menu-text-blue"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            menuTextColor === "text-blue-600 dark:text-blue-400"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                          <span>Blue</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="text-emerald-600 dark:text-emerald-400"
                          id="menu-text-emerald"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="menu-text-emerald"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            menuTextColor === "text-emerald-600 dark:text-emerald-400"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-400"></div>
                          <span>Emerald</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="text-amber-600 dark:text-amber-400"
                          id="menu-text-amber"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="menu-text-amber"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            menuTextColor === "text-amber-600 dark:text-amber-400"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-amber-600 dark:bg-amber-400"></div>
                          <span>Amber</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="text-rose-600 dark:text-rose-400"
                          id="menu-text-rose"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="menu-text-rose"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            menuTextColor === "text-rose-600 dark:text-rose-400"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-rose-600 dark:bg-rose-400"></div>
                          <span>Rose</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="text-slate-900 dark:text-white"
                          id="menu-text-black"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="menu-text-black"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            menuTextColor === "text-slate-900 dark:text-white"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white"></div>
                          <span>Black/White</span>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="text-white dark:text-gray-900"
                          id="menu-text-white"
                          className="sr-only"
                        />
                        <Label
                          htmlFor="menu-text-white"
                          className={`flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            menuTextColor === "text-white dark:text-gray-900"
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-gray-200 hover:border-violet-200 dark:border-gray-800 dark:hover:border-violet-800"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-white border border-gray-200 dark:bg-gray-900"></div>
                          <span>White/Black</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <TypeIcon className="h-5 w-5 text-violet-500" />
                      Menu Font Family
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      Choose a font family for your navigation menu items
                    </p>

                    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                      <Select value={luxuryFont} onValueChange={setLuxuryFont}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select font family" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontFamilyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value} className={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Preview:</h4>
                        <div className={`p-3 border rounded-md bg-white dark:bg-gray-800 ${luxuryFont}`}>
                          <p className="text-base">The quick brown fox jumps over the lazy dog</p>
                          <p className="text-sm mt-1">ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789</p>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                        <p>Note: Some fonts may require additional setup in your CSS.</p>
                        <p className="mt-1">
                          For custom fonts, make sure they are properly imported in your project's global CSS.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Live Preview - Updates in real-time */}
      <div className="mt-8 sticky bottom-0 z-10">
        <Card className="border-t-4 border-violet-500 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how your navbar will look with the selected settings</CardDescription>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full animate-pulse">
                Updates automatically
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-4 bg-white dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-2 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                      <path d="M3 6h18"></path>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </div>
                  <span className={`font-bold ${luxuryFont}`}>
                    NOVA<span className="font-light">shop</span>
                  </span>
                </div>

                <div className={`${navBgColor} px-3 py-1 rounded-full flex items-center gap-2`}>
                  <span className={`text-xs ${menuFontStyle} ${menuTextColor} ${luxuryFont}`}>Home</span>
                  <span className={`text-xs ${menuFontStyle} ${menuTextColor} ${luxuryFont}`}>Shop</span>
                  <span className={`text-xs ${menuFontStyle} ${menuTextColor} ${luxuryFont}`}>About</span>
                </div>

                <div className="flex items-center gap-3">
                  {renderSelectedIcon("search")}
                  {renderSelectedIcon("wishlist")}
                  {renderSelectedIcon("user")}
                  {renderSelectedIcon("cart")}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>This preview updates automatically as you make changes.</p>
              </div>
              <Button
                onClick={handleSaveChanges}
                size="sm"
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
