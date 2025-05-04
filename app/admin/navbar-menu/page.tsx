"use client"

import type React from "react"

import { useState, useEffect, useCallback, useMemo } from "react"
import { ChevronDown, ChevronRight, Grip, Plus, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import * as LucideIcons from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define menu item types
interface MenuItem {
  id: string
  label: string
  href: string
  isActive: boolean
  isExternal: boolean
  icon?: string
  iconColor?: string
  description?: string
  children?: MenuItem[]
}

// Color options for icon colors - standard Tailwind palette
const colorOptions = [
  // Primary colors
  "primary",
  "secondary",

  // UI colors
  "info",
  "success",
  "warning",
  "error",

  // Neutrals
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",

  // Vibrant colors
  "red",
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
  "indigo",
  "blue",
  "sky",
  "cyan",
  "teal",
  "emerald",
  "green",
  "lime",
  "yellow",
  "amber",
  "orange",
]

// Icon categories for better organization
const iconCategories = {
  navigation: [
    "Home",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "ChevronLeft",
    "ChevronRight",
    "ChevronUp",
    "ChevronDown",
    "ChevronsLeft",
    "ChevronsRight",
    "ChevronsUp",
    "ChevronsDown",
    "Navigation",
    "Map",
    "MapPin",
    "Compass",
    "Globe",
  ],
  ecommerce: [
    "ShoppingCart",
    "ShoppingBag",
    "Store",
    "Tag",
    "Tags",
    "Truck",
    "Package",
    "Gift",
    "CreditCard",
    "Wallet",
    "DollarSign",
    "Percent",
    "PercentCircle",
    "BadgePercent",
    "Receipt",
    "QrCode",
    "Barcode",
    "Scan",
    "ScanLine",
    "ScanFace",
    "ShieldCheck",
    "ShoppingBasket",
    "Banknote",
    "Coins",
    "Landmark",
    "Scale",
    "TruckLoading",
    "PackageCheck",
    "PackageOpen",
    "PackagePlus",
    "PackageX",
    "PackageMinus",
    "PackageSearch",
    "Boxes",
    "Box",
    "BoxSelect",
    "Warehouse",
    "StoreFront",
    "Factory",
    "Building",
    "BuildingStore",
    "CircleDollarSign",
    "WalletCards",
    "BadgeDollarSign",
    "BadgeCent",
    "BadgeEuro",
    "BadgePound",
    "BadgeYen",
    "Bitcoin",
    "ReceiptText",
  ],
  ui: [
    "Menu",
    "MoreHorizontal",
    "MoreVertical",
    "Settings",
    "Sliders",
    "Maximize",
    "Minimize",
    "X",
    "Check",
    "Plus",
    "Minus",
    "Search",
    "Filter",
    "SlidersHorizontal",
    "List",
    "LayoutGrid",
  ],
  user: [
    "User",
    "UserCircle",
    "Users",
    "UserPlus",
    "UserMinus",
    "UserCheck",
    "CircleUser",
    "UserCog",
    "LogIn",
    "LogOut",
    "Key",
    "Lock",
    "Unlock",
  ],
  media: [
    "Image",
    "Video",
    "Camera",
    "Music",
    "Play",
    "Pause",
    "Stop",
    "SkipBack",
    "SkipForward",
    "Volume",
    "Volume1",
    "Volume2",
    "VolumeX",
    "Mic",
    "MicOff",
    "Headphones",
    "Youtube",
    "Instagram",
    "Facebook",
  ],
}

// Available pages in the application
const availablePages = [
  { label: "Home", value: "/" },
  { label: "Shop", value: "/shop" },
  { label: "Collections", value: "/collections" },
  { label: "About", value: "/about" },
  { label: "Contact", value: "/contact" },
  { label: "Products", value: "/products" },
  { label: "Cart", value: "/cart" },
  { label: "Checkout", value: "/checkout" },
  { label: "Account", value: "/account" },
  { label: "Wishlist", value: "/wishlist" },
  { label: "Search", value: "/search" },
  { label: "FAQ", value: "/faq" },
  { label: "Shipping", value: "/shipping" },
  { label: "Admin", value: "/admin" },
  { label: "New Arrivals", value: "/shop/new-arrivals" },
  { label: "Bestsellers", value: "/shop/bestsellers" },
  { label: "Sale Items", value: "/shop/sale" },
  { label: "Summer Collection", value: "/collections/summer" },
  { label: "Autumn Collection", value: "/collections/autumn" },
  { label: "Winter Collection", value: "/collections/winter" },
  { label: "Spring Collection", value: "/collections/spring" },
]

// Helper function to get color value
const getColorValue = (colorName: string): string => {
  const colorMap: Record<string, string> = {
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

// Render icon by name with proper color
const renderIcon = (iconName: string | undefined, color: string | undefined, size = 16) => {
  if (!iconName) return null

  // Get the correct icon component from LucideIcons
  const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons]
  if (!IconComponent) return null

  // Use inline style for color instead of class
  return <IconComponent size={size} style={{ color: color ? getColorValue(color) : undefined }} />
}

export default function NavbarMenuPage() {
  // Initial menu structure
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      label: "Home",
      href: "/",
      isActive: true,
      isExternal: false,
    },
    {
      id: "2",
      label: "Shop",
      href: "/shop",
      isActive: true,
      isExternal: false,
      children: [
        {
          id: "2-1",
          label: "New Arrivals",
          href: "/shop/new-arrivals",
          isActive: true,
          isExternal: false,
        },
        {
          id: "2-2",
          label: "Bestsellers",
          href: "/shop/bestsellers",
          isActive: true,
          isExternal: false,
        },
        {
          id: "2-3",
          label: "Sale Items",
          href: "/shop/sale",
          isActive: true,
          isExternal: false,
        },
      ],
    },
    {
      id: "3",
      label: "Collections",
      href: "/collections",
      isActive: true,
      isExternal: false,
      children: [
        {
          id: "3-1",
          label: "Summer Essentials",
          href: "/collections/summer",
          isActive: true,
          isExternal: false,
        },
        {
          id: "3-2",
          label: "Autumn Collection",
          href: "/collections/autumn",
          isActive: true,
          isExternal: false,
        },
        {
          id: "3-3",
          label: "Winter Specials",
          href: "/collections/winter",
          isActive: true,
          isExternal: false,
        },
        {
          id: "3-4",
          label: "Spring Selection",
          href: "/collections/spring",
          isActive: true,
          isExternal: false,
        },
      ],
    },
    {
      id: "4",
      label: "About",
      href: "/about",
      isActive: true,
      isExternal: false,
    },
    {
      id: "5",
      label: "Contact",
      href: "/contact",
      isActive: true,
      isExternal: false,
    },
    {
      id: "6",
      label: "Admin",
      href: "/admin",
      isActive: true,
      isExternal: false,
    },
  ])

  // State management
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [selectedSubItemId, setSelectedSubItemId] = useState<string | null>(null)
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [iconSearchQuery, setIconSearchQuery] = useState<string>("")
  const [iconTab, setIconTab] = useState("all")

  // Add these state variables after the other state declarations
  const [editingItemId, setEditingItemId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState<string>("")

  const [iconPopoverOpen, setIconPopoverOpen] = useState(false)
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false)

  // Memoized selected items to prevent unnecessary re-renders
  const selectedItem = useMemo(() => {
    if (!selectedItemId) return null
    return menuItems.find((item) => item.id === selectedItemId) || null
  }, [menuItems, selectedItemId])

  const selectedSubItem = useMemo(() => {
    if (!selectedItemId || !selectedSubItemId) return null
    const parent = menuItems.find((item) => item.id === selectedItemId)
    if (!parent || !parent.children) return null
    return parent.children.find((item) => item.id === selectedSubItemId) || null
  }, [menuItems, selectedItemId, selectedSubItemId])

  // Load menu from localStorage on component mount
  useEffect(() => {
    const savedMenu = localStorage.getItem("navbar-menu")
    if (savedMenu) {
      try {
        setMenuItems(JSON.parse(savedMenu))
      } catch (e) {
        console.error("Error parsing saved menu:", e)
      }
    }
  }, [])

  // Save changes to localStorage
  const saveChanges = useCallback(() => {
    localStorage.setItem("navbar-menu", JSON.stringify(menuItems))

    // Dispatch a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("navbar-menu-changed", {
        detail: { menu: menuItems },
      }),
    )

    // Also dispatch an event specifically for icon changes to ensure header updates
    const iconInfo = menuItems.reduce((acc, item) => {
      if (item.icon) {
        acc[item.id] = { icon: item.icon, color: item.iconColor || "primary" }
      }
      if (item.children) {
        item.children.forEach((child) => {
          if (child.icon) {
            acc[child.id] = { icon: child.icon, color: child.iconColor || "primary" }
          }
        })
      }
      return acc
    }, {})

    window.dispatchEvent(
      new CustomEvent("navbar-icons-updated", {
        detail: { icons: iconInfo },
      }),
    )

    setHasChanges(false)
    toast({
      title: "Menu saved",
      description: "Your navigation menu changes have been saved.",
    })
  }, [menuItems])

  // Add a new main menu item
  const addMenuItem = useCallback(() => {
    const newId = `${menuItems.length + 1}`
    const newItem: MenuItem = {
      id: newId,
      label: "New Item",
      href: "/",
      isActive: true,
      isExternal: false,
    }

    setMenuItems((prev) => [...prev, newItem])
    setSelectedItemId(newId)
    setSelectedSubItemId(null)
    setHasChanges(true)
  }, [menuItems])

  // Add a submenu item to a parent
  const addSubMenuItem = useCallback((parentId: string) => {
    setMenuItems((prev) => {
      const updated = [...prev]
      const parentIndex = updated.findIndex((item) => item.id === parentId)

      if (parentIndex === -1) return prev

      const parent = updated[parentIndex]
      const children = parent.children || []
      const newSubItem: MenuItem = {
        id: `${parentId}-${children.length + 1}`,
        label: "New Sub Item",
        href: "/",
        isActive: true,
        isExternal: false,
      }

      updated[parentIndex] = {
        ...parent,
        children: [...children, newSubItem],
      }

      // Select the new sub-item
      setSelectedItemId(parentId)
      setSelectedSubItemId(newSubItem.id)

      return updated
    })

    setHasChanges(true)
  }, [])

  // Update a menu item
  const updateMenuItem = useCallback((id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) => {
      const isMainItem = !id.includes("-")
      const updated = [...prev]

      if (isMainItem) {
        const index = updated.findIndex((item) => item.id === id)
        if (index !== -1) {
          updated[index] = { ...updated[index], ...updates }
        }
      } else {
        const [parentId] = id.split("-")
        const parentIndex = updated.findIndex((item) => item.id === parentId)

        if (parentIndex !== -1 && updated[parentIndex].children) {
          const children = [...updated[parentIndex].children!]
          const childIndex = children.findIndex((child) => child.id === id)

          if (childIndex !== -1) {
            children[childIndex] = { ...children[childIndex], ...updates }
            updated[parentIndex] = { ...updated[parentIndex], children }
          }
        }
      }

      return updated
    })

    setHasChanges(true)
  }, [])

  // Delete a menu item
  const deleteMenuItem = useCallback(
    (id: string) => {
      setMenuItems((prev) => {
        const isMainItem = !id.includes("-")

        if (isMainItem) {
          // If deleting the selected item, clear selection
          if (selectedItemId === id) {
            setSelectedItemId(null)
            setSelectedSubItemId(null)
          }
          return prev.filter((item) => item.id !== id)
        } else {
          // Handle sub-item deletion
          const [parentId] = id.split("-")
          const updated = [...prev]
          const parentIndex = updated.findIndex((item) => item.id === parentId)

          if (parentIndex !== -1 && updated[parentIndex].children) {
            // If deleting the selected sub-item, clear sub-item selection
            if (selectedSubItemId === id) {
              setSelectedSubItemId(null)
            }

            updated[parentIndex] = {
              ...updated[parentIndex],
              children: updated[parentIndex].children!.filter((child) => child.id !== id),
            }
          }

          return updated
        }
      })

      setHasChanges(true)
    },
    [selectedItemId, selectedSubItemId],
  )

  // Handle drag start
  const handleDragStart = useCallback((id: string) => {
    setDraggedItemId(id)
  }, [])

  // Handle drag over
  const handleDragOver = useCallback(
    (e: React.DragEvent, id: string) => {
      e.preventDefault()

      if (!draggedItemId || draggedItemId === id) return

      // Only allow reordering at the same level
      const isDraggedMainItem = !draggedItemId.includes("-")
      const isTargetMainItem = !id.includes("-")

      if (isDraggedMainItem !== isTargetMainItem) return

      setMenuItems((prev) => {
        const updated = [...prev]

        if (isDraggedMainItem) {
          // Handle main menu items reordering
          const draggedIndex = updated.findIndex((item) => item.id === draggedItemId)
          const targetIndex = updated.findIndex((item) => item.id === id)

          if (draggedIndex !== -1 && targetIndex !== -1) {
            const [draggedItem] = updated.splice(draggedIndex, 1)
            updated.splice(targetIndex, 0, draggedItem)
          }
        } else {
          // Handle sub-items reordering
          const [parentId] = id.split("-")
          const parentIndex = updated.findIndex((item) => item.id === parentId)

          if (parentIndex !== -1 && updated[parentIndex].children) {
            const children = [...updated[parentIndex].children!]
            const draggedIndex = children.findIndex((item) => item.id === draggedItemId)
            const targetIndex = children.findIndex((item) => item.id === id)

            if (draggedIndex !== -1 && targetIndex !== -1) {
              const [draggedItem] = children.splice(draggedIndex, 1)
              children.splice(targetIndex, 0, draggedItem)
              updated[parentIndex] = { ...updated[parentIndex], children }
            }
          }
        }

        return updated
      })

      setHasChanges(true)
    },
    [draggedItemId],
  )

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedItemId(null)
  }, [])

  // Filter icons based on search query and selected tab
  const filteredIcons = useMemo(() => {
    const query = iconSearchQuery.toLowerCase()

    if (iconTab === "all") {
      return Object.values(iconCategories)
        .flat()
        .filter((iconName) => query === "" || iconName.toLowerCase().includes(query))
    }

    const categoryIcons = iconCategories[iconTab as keyof typeof iconCategories] || []
    return categoryIcons.filter((iconName) => query === "" || iconName.toLowerCase().includes(query))
  }, [iconSearchQuery, iconTab])

  // Handle icon selection
  const handleIconSelect = useCallback(
    (iconName: string) => {
      const currentColor = selectedSubItem?.iconColor || selectedItem?.iconColor || "primary"

      if (selectedSubItemId && selectedItemId) {
        updateMenuItem(selectedSubItemId, {
          icon: iconName,
          iconColor: currentColor,
        })
      } else if (selectedItemId) {
        updateMenuItem(selectedItemId, {
          icon: iconName,
          iconColor: currentColor,
        })
      }

      // Close the popover after selection
      setIconPopoverOpen(false)
    },
    [selectedItem, selectedSubItem, selectedItemId, selectedSubItemId, updateMenuItem],
  )

  // Handle icon color selection
  const handleColorSelect = useCallback(
    (color: string) => {
      if (selectedSubItemId && selectedItemId) {
        updateMenuItem(selectedSubItemId, { iconColor: color })
      } else if (selectedItemId) {
        updateMenuItem(selectedItemId, { iconColor: color })
      }

      // Close the popover after selection
      setColorPopoverOpen(false)
    },
    [selectedItemId, selectedSubItemId, updateMenuItem],
  )

  // Handle item selection
  const handleItemSelect = useCallback((item: MenuItem) => {
    setSelectedItemId(item.id)
    setSelectedSubItemId(null)
    setIconSearchQuery("")
  }, [])

  // Handle sub-item selection
  const handleSubItemSelect = useCallback((parentItem: MenuItem, subItem: MenuItem) => {
    setSelectedItemId(parentItem.id)
    setSelectedSubItemId(subItem.id)
    setIconSearchQuery("")
  }, [])

  // Add this function with the other handler functions
  const handleInlineEdit = useCallback((id: string, currentLabel: string) => {
    setEditingItemId(id)
    setEditingText(currentLabel)
  }, [])

  const handleInlineEditChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingText(e.target.value)
  }, [])

  const handleInlineEditComplete = useCallback(
    (id: string) => {
      if (editingText.trim() !== "") {
        updateMenuItem(id, { label: editingText.trim() })
      }
      setEditingItemId(null)
      setEditingText("")
    },
    [updateMenuItem, editingText],
  )

  const handleInlineEditKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, id: string) => {
      if (e.key === "Enter") {
        handleInlineEditComplete(id)
      } else if (e.key === "Escape") {
        setEditingItemId(null)
        setEditingText("")
      }
    },
    [handleInlineEditComplete],
  )

  // Replace the renderMenuStructure implementation with this updated version
  const renderMenuStructure = useMemo(() => {
    return menuItems.map((item) => (
      <div key={item.id} className="space-y-1">
        <div
          className={cn(
            "flex items-center gap-2 p-2 rounded-md cursor-pointer",
            selectedItemId === item.id && !selectedSubItemId ? "bg-primary/10" : "hover:bg-muted",
            draggedItemId === item.id ? "opacity-50" : "opacity-100",
          )}
          onClick={() => handleItemSelect(item)}
          draggable
          onDragStart={() => handleDragStart(item.id)}
          onDragOver={(e) => handleDragOver(e, item.id)}
          onDragEnd={handleDragEnd}
        >
          <Grip className="h-4 w-4 text-muted-foreground cursor-grab" />
          {item.icon && (
            <span className={item.iconColor ? `text-${item.iconColor}-500` : ""}>
              {renderIcon(item.icon, item.iconColor)}
            </span>
          )}

          {editingItemId === item.id ? (
            <Input
              value={editingText}
              onChange={handleInlineEditChange}
              onBlur={() => handleInlineEditComplete(item.id)}
              onKeyDown={(e) => handleInlineEditKeyDown(e, item.id)}
              className="h-6 py-0 px-1 text-sm flex-1"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span
              className={cn(
                "flex-1 text-sm",
                !item.isActive && "text-muted-foreground line-through",
                "hover:bg-muted/50 px-1 py-0.5 rounded cursor-text",
              )}
              onClick={(e) => {
                e.stopPropagation()
                handleInlineEdit(item.id, item.label)
              }}
            >
              {item.label}
            </span>
          )}

          {item.children && item.children.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{item.children.length}</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation()
              deleteMenuItem(item.id)
            }}
          >
            <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
          </Button>
        </div>

        {/* Sub-items */}
        {item.children && item.children.length > 0 && (
          <div className="ml-6 pl-2 border-l border-muted space-y-1">
            {item.children.map((subItem) => (
              <div
                key={subItem.id}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md cursor-pointer",
                  selectedItemId === item.id && selectedSubItemId === subItem.id ? "bg-primary/10" : "hover:bg-muted",
                  draggedItemId === subItem.id ? "opacity-50" : "opacity-100",
                )}
                onClick={() => handleSubItemSelect(item, subItem)}
                draggable
                onDragStart={() => handleDragStart(subItem.id)}
                onDragOver={(e) => handleDragOver(e, subItem.id)}
                onDragEnd={handleDragEnd}
              >
                <Grip className="h-4 w-4 text-muted-foreground cursor-grab" />
                {subItem.icon && (
                  <span className={subItem.iconColor ? `text-${subItem.iconColor}-500` : ""}>
                    {renderIcon(subItem.icon, subItem.iconColor)}
                  </span>
                )}

                {editingItemId === subItem.id ? (
                  <Input
                    value={editingText}
                    onChange={handleInlineEditChange}
                    onBlur={() => handleInlineEditComplete(subItem.id)}
                    onKeyDown={(e) => handleInlineEditKeyDown(e, subItem.id)}
                    className="h-6 py-0 px-1 text-sm flex-1"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      !subItem.isActive && "text-muted-foreground line-through",
                      "hover:bg-muted/50 px-1 py-0.5 rounded cursor-text",
                    )}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleInlineEdit(subItem.id, subItem.label)
                    }}
                  >
                    {subItem.label}
                  </span>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteMenuItem(subItem.id)
                  }}
                >
                  <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add sub-item button */}
        <div className="ml-6 pl-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-primary"
            onClick={() => addSubMenuItem(item.id)}
          >
            <Plus className="h-3 w-3 mr-1" /> Add Sub-item
          </Button>
        </div>
      </div>
    ))
  }, [
    menuItems,
    selectedItemId,
    selectedSubItemId,
    draggedItemId,
    editingItemId,
    editingText,
    handleItemSelect,
    handleSubItemSelect,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    deleteMenuItem,
    handleInlineEdit,
    handleInlineEditChange,
    handleInlineEditComplete,
    handleInlineEditKeyDown,
    addSubMenuItem,
  ])

  // Render the menu preview
  const renderMenuPreview = useMemo(() => {
    return (
      <div className="flex items-center justify-center space-x-4">
        {menuItems
          .filter((item) => item.isActive)
          .map((item) => (
            <div key={item.id} className="relative group">
              <div
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1",
                  selectedItemId === item.id ? "text-primary bg-primary/10" : "text-foreground hover:bg-muted",
                )}
              >
                {item.icon && (
                  <span style={{ color: item.iconColor ? getColorValue(item.iconColor) : undefined }}>
                    {renderIcon(item.icon, item.iconColor)}
                  </span>
                )}
                {item.label}
                {item.children && item.children.length > 0 && <ChevronDown className="h-4 w-4 opacity-70" />}
              </div>

              {/* Dropdown preview */}
              {item.children && item.children.length > 0 && (
                <div className="absolute left-0 mt-1 w-64 bg-background shadow-xl rounded-xl overflow-hidden z-10 border border-border hidden group-hover:block">
                  <div className="p-2">
                    {item.children
                      .filter((child) => child.isActive)
                      .map((child) => (
                        <div
                          key={child.id}
                          className={cn(
                            "block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted flex items-center gap-2",
                            selectedItemId === item.id && selectedSubItemId === child.id
                              ? "text-primary"
                              : "text-foreground",
                          )}
                        >
                          {child.icon && (
                            <span style={{ color: child.iconColor ? getColorValue(child.iconColor) : undefined }}>
                              {renderIcon(child.icon, child.iconColor)}
                            </span>
                          )}
                          {child.label}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    )
  }, [menuItems, selectedItemId, selectedSubItemId])

  const getDarkerColorValue = (colorName: string): string => {
    return colorName === "primary" || colorName === "secondary"
      ? `hsl(var(--${colorName}-foreground))`
      : getColorValue(colorName)
  }

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 pt-4 md:pt-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 min-h-screen overflow-x-hidden">
      {/* Header section with save button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Navbar Menu Editor
          </h1>
          <p className="text-muted-foreground">Customize your store's navigation menu structure</p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <p className="text-sm text-amber-600 dark:text-amber-400 animate-pulse">You have unsaved changes</p>
          )}
          <Button
            onClick={saveChanges}
            disabled={!hasChanges}
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Structure Panel */}
        <Card className="col-span-1 border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle>Menu Structure</CardTitle>
            <CardDescription>Drag and drop to reorder menu items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Main Menu Items</h3>
                <Button variant="outline" size="sm" onClick={addMenuItem}>
                  <Plus className="h-4 w-4 mr-1" /> Add Item
                </Button>
              </div>

              <div className="space-y-1">{renderMenuStructure}</div>
            </div>
          </CardContent>
        </Card>

        {/* Item Editor Panel */}
        <Card className="col-span-1 lg:col-span-2 border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle>
              {selectedSubItem
                ? `Edit Sub-item: ${selectedSubItem.label}`
                : selectedItem
                  ? `Edit Item: ${selectedItem.label}`
                  : "Item Editor"}
            </CardTitle>
            <CardDescription>
              {selectedItem || selectedSubItem
                ? "Configure the selected menu item"
                : "Select an item from the menu structure to edit"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedItem || selectedSubItem ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Basic item properties */}
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="item-url">URL / Path</Label>
                      {(selectedSubItem?.isExternal ?? selectedItem?.isExternal) ? (
                        <Input
                          id="item-url"
                          value={selectedSubItem?.href ?? selectedItem?.href ?? ""}
                          placeholder="Enter external URL"
                          onChange={(e) => {
                            const newValue = e.target.value
                            if (selectedSubItemId && selectedItemId) {
                              updateMenuItem(selectedSubItemId, { href: newValue })
                            } else if (selectedItemId) {
                              updateMenuItem(selectedItemId, { href: newValue })
                            }
                          }}
                        />
                      ) : (
                        <Select
                          value={selectedSubItem?.href ?? selectedItem?.href ?? "/"}
                          onValueChange={(value) => {
                            if (selectedSubItemId && selectedItemId) {
                              updateMenuItem(selectedSubItemId, { href: value })
                            } else if (selectedItemId) {
                              updateMenuItem(selectedItemId, { href: value })
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a page" />
                          </SelectTrigger>
                          <SelectContent>
                            {availablePages.map((page) => (
                              <SelectItem key={page.value} value={page.value}>
                                {page.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>

                    {/* Description field */}
                    <div className="space-y-2">
                      <Label htmlFor="item-description">Description</Label>
                      <Input
                        id="item-description"
                        value={selectedSubItem?.description ?? selectedItem?.description ?? ""}
                        placeholder={`Describe this ${selectedSubItem ? "sub-item" : "menu item"}`}
                        onChange={(e) => {
                          const newValue = e.target.value
                          if (selectedSubItemId && selectedItemId) {
                            updateMenuItem(selectedSubItemId, { description: newValue })
                          } else if (selectedItemId) {
                            updateMenuItem(selectedItemId, { description: newValue })
                          }
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        {selectedSubItem
                          ? "This description will appear below the sub-menu item"
                          : "This description will appear in the dropdown header"}
                      </p>
                    </div>
                  </div>

                  {/* Icon and Color Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <Popover open={iconPopoverOpen} onOpenChange={setIconPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span className="flex items-center gap-2">
                              {selectedSubItem?.icon || selectedItem?.icon ? (
                                <>
                                  {renderIcon(
                                    selectedSubItem?.icon || selectedItem?.icon,
                                    selectedSubItem?.iconColor || selectedItem?.iconColor,
                                    20,
                                  )}
                                  <span>{selectedSubItem?.icon || selectedItem?.icon}</span>
                                </>
                              ) : (
                                "Select an icon"
                              )}
                            </span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[320px] p-0">
                          <Tabs defaultValue="all" onValueChange={setIconTab}>
                            <div className="border-b px-3">
                              <TabsList className="h-10">
                                <TabsTrigger value="all" className="text-xs">
                                  All Icons
                                </TabsTrigger>
                                <TabsTrigger value="ecommerce" className="text-xs">
                                  E-commerce
                                </TabsTrigger>
                                <TabsTrigger value="navigation" className="text-xs">
                                  Navigation
                                </TabsTrigger>
                                <TabsTrigger value="ui" className="text-xs">
                                  UI
                                </TabsTrigger>
                                <TabsTrigger value="media" className="text-xs">
                                  Media
                                </TabsTrigger>
                              </TabsList>
                            </div>
                            <TabsContent value="all" className="p-0 m-0">
                              <div className="p-1">
                                <Input
                                  placeholder="Search icons..."
                                  className="mb-2"
                                  value={iconSearchQuery}
                                  onChange={(e) => setIconSearchQuery(e.target.value.toLowerCase())}
                                />
                                <ScrollArea className="h-[300px]">
                                  <div className="grid grid-cols-5 gap-2 p-2">
                                    {filteredIcons.map((iconName, index) => {
                                      const isSelected =
                                        (selectedSubItem && selectedSubItem.icon === iconName) ||
                                        (selectedItem && !selectedSubItem && selectedItem.icon === iconName)

                                      return (
                                        <Button
                                          key={`icon-${iconName}-${index}`}
                                          variant={isSelected ? "default" : "outline"}
                                          size="icon"
                                          className={cn(
                                            "h-10 w-10 border",
                                            isSelected ? "border-primary bg-primary/10" : "border-input",
                                          )}
                                          onClick={() => handleIconSelect(iconName)}
                                        >
                                          {renderIcon(
                                            iconName,
                                            selectedSubItem?.iconColor || selectedItem?.iconColor || "primary",
                                          )}
                                        </Button>
                                      )
                                    })}

                                    {filteredIcons.length === 0 && (
                                      <div className="col-span-5 py-8 text-center text-muted-foreground">
                                        No icons match your search query
                                      </div>
                                    )}
                                  </div>
                                </ScrollArea>
                              </div>
                            </TabsContent>

                            {/* Other tab contents with similar structure */}
                            {["ecommerce", "navigation", "ui", "media", "user"].map((category) => (
                              <TabsContent key={category} value={category} className="p-0 m-0">
                                <div className="p-1">
                                  <Input
                                    placeholder={`Search ${category} icons...`}
                                    className="mb-2"
                                    value={iconSearchQuery}
                                    onChange={(e) => setIconSearchQuery(e.target.value.toLowerCase())}
                                  />
                                  <ScrollArea className="h-[300px]">
                                    <div className="grid grid-cols-5 gap-2 p-2">
                                      {filteredIcons.map((iconName, index) => {
                                        const isSelected =
                                          (selectedSubItem && selectedSubItem.icon === iconName) ||
                                          (selectedItem && !selectedSubItem && selectedItem.icon === iconName)

                                        return (
                                          <Button
                                            key={`icon-${category}-${iconName}-${index}`}
                                            variant={isSelected ? "default" : "outline"}
                                            size="icon"
                                            className={cn(
                                              "h-10 w-10 border",
                                              isSelected ? "border-primary bg-primary/10" : "border-input",
                                            )}
                                            onClick={() => handleIconSelect(iconName)}
                                          >
                                            {renderIcon(
                                              iconName,
                                              selectedSubItem?.iconColor || selectedItem?.iconColor || "primary",
                                            )}
                                          </Button>
                                        )
                                      })}

                                      {filteredIcons.length === 0 && (
                                        <div className="col-span-5 py-8 text-center text-muted-foreground">
                                          No icons match your search query
                                        </div>
                                      )}
                                    </div>
                                  </ScrollArea>
                                </div>
                              </TabsContent>
                            ))}
                          </Tabs>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Icon Color</Label>
                      <Popover open={colorPopoverOpen} onOpenChange={setColorPopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-between">
                            <span className="flex items-center gap-2">
                              {selectedSubItem?.iconColor || selectedItem?.iconColor ? (
                                <>
                                  <div
                                    className="h-4 w-4 rounded-full border"
                                    style={{
                                      backgroundColor: getColorValue(
                                        selectedSubItem?.iconColor || selectedItem?.iconColor || "primary",
                                      ),
                                      borderColor: getDarkerColorValue(
                                        selectedSubItem?.iconColor || selectedItem?.iconColor || "primary",
                                      ),
                                    }}
                                  />
                                  <span className="text-sm">
                                    {selectedSubItem?.iconColor || selectedItem?.iconColor}
                                  </span>
                                </>
                              ) : (
                                "Select a color"
                              )}
                            </span>
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[320px] p-4">
                          <ScrollArea className="h-[300px]">
                            <div className="grid grid-cols-8 gap-2">
                              {colorOptions.map((color) => {
                                // Define color mapping for standard colors
                                const colorMap: Record<string, string> = {
                                  primary: "hsl(var(--primary))",
                                  secondary: "hsl(var(--secondary))",
                                  info: "#0ea5e9", // sky-500
                                  success: "#22c55e", // green-500
                                  warning: "#f59e0b", // amber-500
                                  error: "#ef4444", // red-500
                                  slate: "#64748b", // slate-500
                                  gray: "#6b7280", // gray-500
                                  zinc: "#71717a", // zinc-500
                                  neutral: "#737373", // neutral-500
                                  stone: "#78716c", // stone-500
                                  red: "#ef4444", // red-500
                                  rose: "#f43f5e", // rose-500
                                  pink: "#ec4899", // pink-500
                                  fuchsia: "#d946ef", // fuchsia-500
                                  purple: "#a855f7", // purple-500
                                  violet: "#8b5cf6", // violet-500
                                  indigo: "#6366f1", // indigo-500
                                  blue: "#3b82f6", // blue-500
                                  sky: "#0ea5e9", // sky-500
                                  cyan: "#06b6d4", // cyan-500
                                  teal: "#14b8a6", // teal-500
                                  emerald: "#10b981", // emerald-500
                                  green: "#22c55e", // green-500
                                  lime: "#84cc16", // lime-500
                                  yellow: "#eab308", // yellow-500
                                  amber: "#f59e0b", // amber-500
                                  orange: "#f97316", // orange-500
                                }

                                // Get the color value from the map or use a default
                                const colorValue = colorMap[color] || "#6366f1"
                                const darkerColor =
                                  color === "primary" || color === "secondary"
                                    ? `hsl(var(--${color}-foreground))`
                                    : colorValue

                                const isSelected =
                                  selectedSubItem?.iconColor === color ||
                                  (selectedItem?.iconColor === color && !selectedSubItem)

                                return (
                                  <Button
                                    key={`color-${color}`}
                                    variant="ghost"
                                    className={cn(
                                      "h-8 w-8 p-0 rounded-full relative",
                                      isSelected && "ring-2 ring-offset-2 ring-offset-background ring-primary",
                                    )}
                                    style={{
                                      backgroundColor: colorValue,
                                      borderColor: darkerColor,
                                    }}
                                    onClick={() => handleColorSelect(color)}
                                    title={color}
                                  >
                                    {isSelected && (
                                      <span className="absolute inset-0 flex items-center justify-center">
                                        <svg
                                          width="12"
                                          height="12"
                                          viewBox="0 0 12 12"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M10 3L4.5 8.5L2 6"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </Button>
                                )
                              })}
                            </div>
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Toggle switches */}
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="item-active"
                        checked={selectedSubItem?.isActive ?? selectedItem?.isActive ?? false}
                        onCheckedChange={(checked) => {
                          if (selectedSubItemId && selectedItemId) {
                            updateMenuItem(selectedSubItemId, { isActive: checked })
                          } else if (selectedItemId) {
                            updateMenuItem(selectedItemId, { isActive: checked })
                          }
                        }}
                      />
                      <Label htmlFor="item-active" className="cursor-pointer">
                        Active
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="item-external"
                        checked={selectedSubItem?.isExternal ?? selectedItem?.isExternal ?? false}
                        onCheckedChange={(checked) => {
                          if (selectedSubItemId && selectedItemId) {
                            updateMenuItem(selectedSubItemId, { isExternal: checked })
                          } else if (selectedItemId) {
                            updateMenuItem(selectedItemId, { isExternal: checked })
                          }
                        }}
                      />
                      <Label htmlFor="item-external" className="cursor-pointer">
                        External Link
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Preview section */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Preview</h3>
                  <div className="p-4 border rounded-md bg-background">{renderMenuPreview}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="text-muted-foreground mb-4">
                  <ChevronRight className="h-12 w-12 mx-auto mb-2" />
                  <p>Select a menu item from the structure panel to edit its properties</p>
                </div>
                <Button variant="outline" onClick={addMenuItem}>
                  <Plus className="h-4 w-4 mr-1" /> Add New Menu Item
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
