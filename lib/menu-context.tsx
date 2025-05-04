"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define menu item types
export interface MenuItem {
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

// Default menu structure
const defaultMenu: MenuItem[] = [
  {
    id: "1",
    label: "Home",
    href: "/",
    isActive: true,
    isExternal: false,
    description: "Return to the homepage",
  },
  {
    id: "2",
    label: "Shop",
    href: "/shop",
    isActive: true,
    isExternal: false,
    description: "Browse all our products",
    children: [
      {
        id: "2-1",
        label: "New Arrivals",
        href: "/shop/new-arrivals",
        isActive: true,
        isExternal: false,
        description: "Check out our latest products",
      },
      {
        id: "2-2",
        label: "Bestsellers",
        href: "/shop/bestsellers",
        isActive: true,
        isExternal: false,
        description: "Our most popular items",
      },
      {
        id: "2-3",
        label: "Sale Items",
        href: "/shop/sale",
        isActive: true,
        isExternal: false,
        description: "Great deals and discounts",
      },
    ],
  },
  {
    id: "3",
    label: "Collections",
    href: "/collections",
    isActive: true,
    isExternal: false,
    description: "Explore our curated collections",
    children: [
      {
        id: "3-1",
        label: "Summer Essentials",
        href: "/collections/summer",
        isActive: true,
        isExternal: false,
        description: "Perfect for warm weather",
      },
      {
        id: "3-2",
        label: "Autumn Collection",
        href: "/collections/autumn",
        isActive: true,
        isExternal: false,
        description: "Cozy fall favorites",
      },
      {
        id: "3-3",
        label: "Winter Specials",
        href: "/collections/winter",
        isActive: true,
        isExternal: false,
        description: "Stay warm this winter",
      },
      {
        id: "3-4",
        label: "Spring Selection",
        href: "/collections/spring",
        isActive: true,
        isExternal: false,
        description: "Fresh styles for spring",
      },
    ],
  },
  {
    id: "4",
    label: "About",
    href: "/about",
    isActive: true,
    isExternal: false,
    description: "Learn more about our company",
  },
  {
    id: "5",
    label: "Contact",
    href: "/contact",
    isActive: true,
    isExternal: false,
    description: "Get in touch with our team",
  },
  {
    id: "6",
    label: "Admin",
    href: "/admin",
    isActive: true,
    isExternal: false,
    description: "Manage your store",
  },
]

interface MenuContextType {
  menuItems: MenuItem[]
}

const MenuContext = createContext<MenuContextType>({ menuItems: defaultMenu })

export const useMenu = () => useContext(MenuContext)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenu)

  // Load menu from localStorage on component mount
  useEffect(() => {
    const loadMenu = () => {
      const savedMenu = localStorage.getItem("navbar-menu")
      if (savedMenu) {
        try {
          setMenuItems(JSON.parse(savedMenu))
        } catch (e) {
          console.error("Error parsing saved menu:", e)
        }
      }
    }

    loadMenu()

    // Listen for menu changes
    const handleMenuChange = (e: any) => {
      if (e.detail && e.detail.menu) {
        setMenuItems(e.detail.menu)
      }
    }

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "navbar-menu") {
        loadMenu()
      }
    }

    window.addEventListener("navbar-menu-changed", handleMenuChange)
    window.addEventListener("storage", handleStorageChange)

    // Check for changes every second (for same-tab changes)
    const interval = setInterval(loadMenu, 1000)

    return () => {
      window.removeEventListener("navbar-menu-changed", handleMenuChange)
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  return <MenuContext.Provider value={{ menuItems }}>{children}</MenuContext.Provider>
}
