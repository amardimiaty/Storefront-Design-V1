"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Gift,
  Clock,
  Heart,
  Star,
  Award,
  ThumbsUp,
  Zap,
  Headphones,
  Package,
  RefreshCw,
  Percent,
  Tag,
  Smile,
  Coffee,
  Leaf,
  Globe,
  Map,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Bookmark,
  Scissors,
  Smartphone,
  Wifi,
  Droplet,
  Briefcase,
  Settings,
  PenTool,
  Palette,
  ImageIcon,
  Music,
  Video,
  Monitor,
  Printer,
  Lock,
  Key,
  Search,
  Filter,
  BarChart,
  PieChart,
  Users,
  User,
  UserPlus,
  Home,
  Building,
  Store,
  ShoppingBag,
  ShoppingCart,
  DollarSign,
  CreditCardIcon,
  Layers,
  Box,
  Send,
  Download,
  Upload,
  ExternalLink,
  LinkIcon,
  Flag,
  Navigation,
  MapPin,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Umbrella,
} from "lucide-react"
import { motion } from "framer-motion"

// Available icons for selection - expanded with more options
const availableIcons = [
  { name: "Truck", component: <Truck className="h-6 w-6" /> },
  { name: "ShieldCheck", component: <ShieldCheck className="h-6 w-6" /> },
  { name: "RotateCcw", component: <RotateCcw className="h-6 w-6" /> },
  { name: "CreditCard", component: <CreditCard className="h-6 w-6" /> },
  { name: "Gift", component: <Gift className="h-6 w-6" /> },
  { name: "Clock", component: <Clock className="h-6 w-6" /> },
  { name: "Heart", component: <Heart className="h-6 w-6" /> },
  { name: "Star", component: <Star className="h-6 w-6" /> },
  { name: "Award", component: <Award className="h-6 w-6" /> },
  { name: "ThumbsUp", component: <ThumbsUp className="h-6 w-6" /> },
  { name: "Zap", component: <Zap className="h-6 w-6" /> },
  { name: "Headphones", component: <Headphones className="h-6 w-6" /> },
  { name: "Package", component: <Package className="h-6 w-6" /> },
  { name: "RefreshCw", component: <RefreshCw className="h-6 w-6" /> },
  { name: "Percent", component: <Percent className="h-6 w-6" /> },
  { name: "Tag", component: <Tag className="h-6 w-6" /> },
  { name: "Smile", component: <Smile className="h-6 w-6" /> },
  { name: "Coffee", component: <Coffee className="h-6 w-6" /> },
  { name: "Leaf", component: <Leaf className="h-6 w-6" /> },
  { name: "Globe", component: <Globe className="h-6 w-6" /> },
  { name: "Map", component: <Map className="h-6 w-6" /> },
  { name: "MessageCircle", component: <MessageCircle className="h-6 w-6" /> },
  { name: "Phone", component: <Phone className="h-6 w-6" /> },
  { name: "Mail", component: <Mail className="h-6 w-6" /> },
  { name: "Calendar", component: <Calendar className="h-6 w-6" /> },
  { name: "Bookmark", component: <Bookmark className="h-6 w-6" /> },
  { name: "Scissors", component: <Scissors className="h-6 w-6" /> },
  { name: "Smartphone", component: <Smartphone className="h-6 w-6" /> },
  { name: "Wifi", component: <Wifi className="h-6 w-6" /> },
  { name: "Droplet", component: <Droplet className="h-6 w-6" /> },
  { name: "Briefcase", component: <Briefcase className="h-6 w-6" /> },
  { name: "Settings", component: <Settings className="h-6 w-6" /> },
  { name: "PenTool", component: <PenTool className="h-6 w-6" /> },
  { name: "Palette", component: <Palette className="h-6 w-6" /> },
  { name: "Image", component: <ImageIcon className="h-6 w-6" /> },
  { name: "Music", component: <Music className="h-6 w-6" /> },
  { name: "Video", component: <Video className="h-6 w-6" /> },
  { name: "Monitor", component: <Monitor className="h-6 w-6" /> },
  { name: "Printer", component: <Printer className="h-6 w-6" /> },
  { name: "Lock", component: <Lock className="h-6 w-6" /> },
  { name: "Key", component: <Key className="h-6 w-6" /> },
  { name: "Search", component: <Search className="h-6 w-6" /> },
  { name: "Filter", component: <Filter className="h-6 w-6" /> },
  { name: "BarChart", component: <BarChart className="h-6 w-6" /> },
  { name: "PieChart", component: <PieChart className="h-6 w-6" /> },
  { name: "Users", component: <Users className="h-6 w-6" /> },
  { name: "User", component: <User className="h-6 w-6" /> },
  { name: "UserPlus", component: <UserPlus className="h-6 w-6" /> },
  { name: "Home", component: <Home className="h-6 w-6" /> },
  { name: "Building", component: <Building className="h-6 w-6" /> },
  { name: "Store", component: <Store className="h-6 w-6" /> },
  { name: "ShoppingBag", component: <ShoppingBag className="h-6 w-6" /> },
  { name: "ShoppingCart", component: <ShoppingCart className="h-6 w-6" /> },
  { name: "DollarSign", component: <DollarSign className="h-6 w-6" /> },
  { name: "CreditCardIcon", component: <CreditCardIcon className="h-6 w-6" /> },
  { name: "Layers", component: <Layers className="h-6 w-6" /> },
  { name: "Box", component: <Box className="h-6 w-6" /> },
  { name: "Send", component: <Send className="h-6 w-6" /> },
  { name: "Download", component: <Download className="h-6 w-6" /> },
  { name: "Upload", component: <Upload className="h-6 w-6" /> },
  { name: "ExternalLink", component: <ExternalLink className="h-6 w-6" /> },
  { name: "LinkIcon", component: <LinkIcon className="h-6 w-6" /> },
  { name: "Flag", component: <Flag className="h-6 w-6" /> },
  { name: "Navigation", component: <Navigation className="h-6 w-6" /> },
  { name: "MapPin", component: <MapPin className="h-6 w-6" /> },
  { name: "Sun", component: <Sun className="h-6 w-6" /> },
  { name: "Moon", component: <Moon className="h-6 w-6" /> },
  { name: "Cloud", component: <Cloud className="h-6 w-6" /> },
  { name: "CloudRain", component: <CloudRain className="h-6 w-6" /> },
  { name: "Umbrella", component: <Umbrella className="h-6 w-6" /> },
]

// Available colors for icons
const colorOptions = [
  { name: "Purple", value: "#7c3aed" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#10b981" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Yellow", value: "#eab308" },
  { name: "Pink", value: "#ec4899" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Gold", value: "#c7a94e" },
]

// Available font options
const fontOptions = [
  { name: "Default", value: "font-sans" },
  { name: "Serif", value: "font-serif" },
  { name: "Mono", value: "font-mono" },
  { name: "Light", value: "font-light" },
  { name: "Normal", value: "font-normal" },
  { name: "Medium", value: "font-medium" },
  { name: "SemiBold", value: "font-semibold" },
  { name: "Bold", value: "font-bold" },
  { name: "ExtraBold", value: "font-extrabold" },
]

// Default benefits data - updated with color and font properties
const defaultBenefits = [
  {
    icon: "Truck",
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
    color: "#7c3aed",
    titleFont: "font-semibold",
    descriptionFont: "font-normal",
  },
  {
    icon: "ShieldCheck",
    title: "Secure Payment",
    description: "100% secure payment methods",
    color: "#7c3aed",
    titleFont: "font-semibold",
    descriptionFont: "font-normal",
  },
  {
    icon: "RotateCcw",
    title: "Easy Returns",
    description: "30-day money-back guarantee",
    color: "#7c3aed",
    titleFont: "font-semibold",
    descriptionFont: "font-normal",
  },
  {
    icon: "CreditCard",
    title: "Flexible Payment",
    description: "Multiple payment options available",
    color: "#7c3aed",
    titleFont: "font-semibold",
    descriptionFont: "font-normal",
  },
]

export default function BenefitsAdmin() {
  const [title, setTitle] = useState("Why Shop With Us")
  const [benefits, setBenefits] = useState(defaultBenefits)
  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [currentIconPage, setCurrentIconPage] = useState(0)
  const iconsPerPage = 24
  const totalPages = Math.ceil(availableIcons.length / iconsPerPage)

  // Load saved data on component mount
  useEffect(() => {
    try {
      const savedTitle = localStorage.getItem("benefits-title")
      const savedBenefits = localStorage.getItem("benefits-data")

      if (savedTitle) {
        setTitle(savedTitle)
      }

      if (savedBenefits) {
        const parsedBenefits = JSON.parse(savedBenefits)

        // Add color and font properties if they don't exist in saved data
        const updatedBenefits = parsedBenefits.map((benefit) => ({
          ...benefit,
          color: benefit.color || "#7c3aed",
          titleFont: benefit.titleFont || "font-semibold",
          descriptionFont: benefit.descriptionFont || "font-normal",
        }))

        setBenefits(updatedBenefits)
      }
    } catch (error) {
      console.error("Error loading benefits data:", error)
    }
  }, [])

  // Save changes to localStorage
  const saveChanges = () => {
    try {
      localStorage.setItem("benefits-title", title)
      localStorage.setItem("benefits-data", JSON.stringify(benefits))

      setNotification({
        show: true,
        message: "Benefits section updated successfully!",
        type: "success",
      })

      setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 3000)
    } catch (error) {
      console.error("Error saving benefits data:", error)
      setNotification({
        show: true,
        message: "Error saving changes. Please try again.",
        type: "error",
      })
    }
  }

  // Add a new benefit
  const addBenefit = () => {
    if (benefits.length < 8) {
      setBenefits([
        ...benefits,
        {
          icon: "ShieldCheck",
          title: "New Benefit",
          description: "Description goes here",
          color: "#7c3aed",
          titleFont: "font-semibold",
          descriptionFont: "font-normal",
        },
      ])
    }
  }

  // Remove a benefit
  const removeBenefit = (index: number) => {
    const newBenefits = [...benefits]
    newBenefits.splice(index, 1)
    setBenefits(newBenefits)
  }

  // Update a benefit
  const updateBenefit = (index: number, field: string, value: string) => {
    const newBenefits = [...benefits]
    newBenefits[index] = { ...newBenefits[index], [field]: value }
    setBenefits(newBenefits)
  }

  // Get current page of icons
  const getCurrentPageIcons = () => {
    const startIndex = currentIconPage * iconsPerPage
    return availableIcons.slice(startIndex, startIndex + iconsPerPage)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold">Benefits Section</h1>
        </div>

        <button
          onClick={saveChanges}
          className="flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-4 py-2 rounded-md transition-colors"
        >
          <Save className="h-5 w-5" />
          Save Changes
        </button>
      </div>

      {/* Notification */}
      {notification.show && (
        <motion.div
          className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
            notification.type === "success"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {notification.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          {notification.message}
        </motion.div>
      )}

      {/* Section Title */}
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2">Section Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
        />
      </div>

      {/* Benefits Editor */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Benefits</h2>
          <button
            onClick={addBenefit}
            disabled={benefits.length >= 8}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-3 py-1 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Add Benefit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Benefit {index + 1}</h3>
                <button
                  onClick={() => removeBenefit(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  disabled={benefits.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Icon Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Icon</label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                  {getCurrentPageIcons().map((icon) => (
                    <button
                      key={icon.name}
                      onClick={() => updateBenefit(index, "icon", icon.name)}
                      className={`p-2 rounded-md ${
                        benefit.icon === icon.name
                          ? "bg-[#7c3aed] text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                      style={{ color: benefit.icon === icon.name ? "white" : benefit.color }}
                      title={icon.name}
                    >
                      {icon.component}
                    </button>
                  ))}
                </div>

                {/* Pagination for icons */}
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => setCurrentIconPage((prev) => Math.max(0, prev - 1))}
                    disabled={currentIconPage === 0}
                    className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {currentIconPage + 1} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentIconPage((prev) => Math.min(totalPages - 1, prev + 1))}
                    disabled={currentIconPage === totalPages - 1}
                    className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* Icon Color Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Icon Color</label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateBenefit(index, "color", color.value)}
                      className={`w-8 h-8 rounded-full border-2 ${
                        benefit.color === color.value ? "border-gray-900 dark:border-white" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}

                  {/* Custom color input */}
                  <div className="relative">
                    <input
                      type="color"
                      value={benefit.color}
                      onChange={(e) => updateBenefit(index, "color", e.target.value)}
                      className="sr-only"
                      id={`custom-color-${index}`}
                    />
                    <label
                      htmlFor={`custom-color-${index}`}
                      className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer"
                      title="Custom color"
                    >
                      <Plus className="h-4 w-4" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Title Input and Font */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={benefit.title}
                    onChange={(e) => updateBenefit(index, "title", e.target.value)}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                  />
                  <select
                    value={benefit.titleFont}
                    onChange={(e) => updateBenefit(index, "titleFont", e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description Input and Font */}
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <div className="flex gap-2">
                  <textarea
                    value={benefit.description}
                    onChange={(e) => updateBenefit(index, "description", e.target.value)}
                    rows={2}
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                  />
                  <select
                    value={benefit.descriptionFont}
                    onChange={(e) => updateBenefit(index, "descriptionFont", e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800"
                  >
                    {fontOptions.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
          <h3 className="text-2xl font-bold text-center mb-6">{title}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => {
              const IconComponent = availableIcons.find((icon) => icon.name === benefit.icon)?.component

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm flex flex-col items-center text-center"
                >
                  <div className="mb-3" style={{ color: benefit.color }}>
                    {IconComponent}
                  </div>
                  <h4 className={`mb-2 ${benefit.titleFont}`}>{benefit.title}</h4>
                  <p className={`text-sm text-gray-500 dark:text-gray-400 ${benefit.descriptionFont}`}>
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
