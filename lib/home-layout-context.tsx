"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"

// Define the section types that can be reordered
export type HomeSectionId =
  | "hero"
  | "categories"
  | "ad-banner-1"
  | "new-arrivals"
  | "promo-cards"
  | "featured-products"
  | "ad-banner-2"
  | "testimonials"
  | "newsletter"
  | "benefits"

export interface HomeSection {
  id: HomeSectionId
  title: string
  description: string
  visible: boolean
  editable: boolean
  editPath?: string
  icon?: string
}

interface HomeLayoutContextType {
  sections: HomeSection[]
  updateSections: (newSections: HomeSection[]) => void
  toggleSectionVisibility: (sectionId: HomeSectionId) => void
  resetToDefault: () => void
  isSectionVisible: (sectionId: HomeSectionId) => boolean
  getSectionOrder: () => HomeSectionId[]
  hasUnsavedChanges: boolean
  setHasUnsavedChanges: (value: boolean) => void
  saveChanges: () => void
}

// Default section configuration
const defaultSections: HomeSection[] = [
  {
    id: "hero",
    title: "Hero Banner",
    description: "Main promotional banner at the top of the page",
    visible: true,
    editable: true,
    editPath: "/admin/hero",
    icon: "home",
  },
  {
    id: "categories",
    title: "Featured Categories",
    description: "Grid display of product categories",
    visible: true,
    editable: true,
    editPath: "/admin/categories/featured",
    icon: "grid",
  },
  {
    id: "ad-banner-1",
    title: "Promotional Banner 1",
    description: "First promotional banner for sales and offers",
    visible: true,
    editable: true,
    editPath: "/admin/banners/promo-1",
    icon: "badge-percent",
  },
  {
    id: "new-arrivals",
    title: "New Arrivals",
    description: "Latest products added to the store",
    visible: true,
    editable: false,
    icon: "sparkles",
  },
  {
    id: "promo-cards",
    title: "Promotional Cards",
    description: "Grid of promotional cards for collections",
    visible: true,
    editable: false,
    icon: "layout-grid",
  },
  {
    id: "featured-products",
    title: "Featured Products",
    description: "Showcase of featured products",
    visible: true,
    editable: false,
    icon: "shopping-bag",
  },
  {
    id: "ad-banner-2",
    title: "Promotional Banner 2",
    description: "Second promotional banner for shipping or membership",
    visible: true,
    editable: true,
    editPath: "/admin/banners/promo-2",
    icon: "badge-percent",
  },
  {
    id: "testimonials",
    title: "Testimonials",
    description: "Customer reviews and testimonials",
    visible: true,
    editable: false,
    icon: "message-square-quote",
  },
  {
    id: "newsletter",
    title: "Newsletter",
    description: "Email subscription form",
    visible: true,
    editable: false,
    icon: "mail",
  },
  {
    id: "benefits",
    title: "Benefits Section",
    description: "Showcase store benefits and features",
    visible: true,
    editable: true,
    editPath: "/admin/benefits",
    icon: "award",
  },
]

const LOCAL_STORAGE_KEY = "modernshop_home_layout"

const HomeLayoutContext = createContext<HomeLayoutContextType | undefined>(undefined)

export function HomeLayoutProvider({ children }: { children: ReactNode }) {
  const [sections, setSections] = useState<HomeSection[]>(defaultSections)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load saved layout from localStorage on initial render
  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedLayout) {
        const parsedLayout = JSON.parse(savedLayout) as HomeSection[]

        // Validate the parsed data has the expected structure
        if (Array.isArray(parsedLayout) && parsedLayout.length > 0 && "id" in parsedLayout[0]) {
          setSections(parsedLayout)
        } else {
          throw new Error("Invalid layout data structure")
        }
      }
    } catch (error) {
      console.error("Failed to load home layout from localStorage:", error)
      localStorage.removeItem(LOCAL_STORAGE_KEY)
      setSections(defaultSections)
    }
  }, [])

  const updateSections = (newSections: HomeSection[]) => {
    setSections(newSections)
    setHasUnsavedChanges(true)
  }

  const toggleSectionVisibility = (sectionId: HomeSectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === sectionId ? { ...section, visible: !section.visible } : section)),
    )
    setHasUnsavedChanges(true)
  }

  const resetToDefault = () => {
    setSections(defaultSections)
    setHasUnsavedChanges(true)
  }

  const saveChanges = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sections))
      setHasUnsavedChanges(false)
      toast({
        title: "Layout saved",
        description: "Your home page layout has been updated successfully.",
      })
    } catch (error) {
      console.error("Failed to save home layout to localStorage:", error)
      toast({
        title: "Error saving layout",
        description: "There was a problem saving your layout changes.",
        variant: "destructive",
      })
    }
  }

  const isSectionVisible = (sectionId: HomeSectionId): boolean => {
    const section = sections.find((s) => s.id === sectionId)
    return section ? section.visible : false
  }

  const getSectionOrder = (): HomeSectionId[] => {
    return sections.filter((section) => section.visible).map((section) => section.id)
  }

  return (
    <HomeLayoutContext.Provider
      value={{
        sections,
        updateSections,
        toggleSectionVisibility,
        resetToDefault,
        isSectionVisible,
        getSectionOrder,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        saveChanges,
      }}
    >
      {children}
    </HomeLayoutContext.Provider>
  )
}

export function useHomeLayout() {
  const context = useContext(HomeLayoutContext)
  if (context === undefined) {
    throw new Error("useHomeLayout must be used within a HomeLayoutProvider")
  }
  return context
}
