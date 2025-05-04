"use client"

import { useState, useEffect } from "react"
import { FeaturedCategories } from "@/components/categories/featured-categories"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Eye, Save } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

// Sample data for demonstration
const sampleCategories = [
  {
    id: "1",
    name: "Clothing",
    description: "Modern apparel for every occasion",
    image: "/modern-clothing-rack.png",
    slug: "clothing",
    itemCount: 42,
  },
  {
    id: "2",
    name: "Accessories",
    description: "Complete your look",
    image: "/modern-accessories.png",
    slug: "accessories",
    itemCount: 24,
  },
  {
    id: "3",
    name: "Shoes",
    description: "Footwear for every step",
    image: "/modern-shoes-collection.png",
    slug: "shoes",
    itemCount: 18,
  },
  {
    id: "4",
    name: "Home Decor",
    description: "Elevate your space",
    image: "/modern-home-decor.png",
    slug: "home-decor",
    itemCount: 36,
  },
  {
    id: "5",
    name: "Beauty",
    description: "Self-care essentials",
    image: "/premium-skincare-luxury.png",
    slug: "beauty",
    itemCount: 29,
  },
  {
    id: "6",
    name: "Electronics",
    description: "Cutting-edge technology",
    image: "/premium-electronics-gadgets.png",
    slug: "electronics",
    itemCount: 31,
  },
  {
    id: "7",
    name: "Jewelry",
    description: "Timeless elegance",
    image: "/diverse-jewelry-collection.png",
    slug: "jewelry",
    itemCount: 22,
  },
  {
    id: "8",
    name: "Watches",
    description: "Precision craftsmanship",
    image: "/luxury-timepiece.png",
    slug: "watches",
    itemCount: 15,
  },
  {
    id: "9",
    name: "Bags",
    description: "Carry in style",
    image: "/diverse-bag-collection.png",
    slug: "bags",
    itemCount: 28,
  },
]

export default function FeaturedCategoriesAdmin() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const [title, setTitle] = useState("Shop by Category")
  const [subtitle, setSubtitle] = useState("Browse our curated collections")
  const [categories, setCategories] = useState(sampleCategories)
  const [activeTab, setActiveTab] = useState("edit")

  // Grid layout settings
  const [gridColumns, setGridColumns] = useState("3")
  const [maxCategories, setMaxCategories] = useState("6")
  const [buttonSize, setButtonSize] = useState("default")
  const [gridGap, setGridGap] = useState(6)
  const [gridWidth, setGridWidth] = useState(80)

  // Load saved settings on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSettings = localStorage.getItem("featured-categories-settings")
        if (savedSettings) {
          const settings = JSON.parse(savedSettings)
          setTitle(settings.title || "Shop by Category")
          setSubtitle(settings.subtitle || "Browse our curated collections")
          setGridColumns(settings.gridColumns || "3")
          setMaxCategories(settings.maxCategories || "6")
          setButtonSize(settings.buttonSize || "default")
          setGridGap(settings.gridGap || 6)
          setGridWidth(settings.gridWidth || 80)
        }
      } catch (error) {
        console.error("Error loading saved settings:", error)
      }
    }
  }, [])

  // Function to handle preview button click
  const handlePreviewClick = () => {
    setActiveTab("preview")
  }

  // Function to handle save button click
  const handleSaveClick = async () => {
    setIsSaving(true)

    try {
      // Create settings object
      const settings = {
        title,
        subtitle,
        gridColumns,
        maxCategories,
        buttonSize,
        gridGap,
        gridWidth,
      }

      // Save to localStorage
      localStorage.setItem("featured-categories-settings", JSON.stringify(settings))

      // Force a storage event for the current window
      window.dispatchEvent(new Event("storage"))

      // Show success toast
      toast({
        title: "Settings saved",
        description: "Your featured categories settings have been updated.",
      })

      // Open a new tab with the home page to see changes
      // window.open("/", "_blank")
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to dashboard</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Featured Categories</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1" onClick={handlePreviewClick}>
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" className="gap-1" onClick={handleSaveClick} disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Settings</CardTitle>
              <CardDescription>Configure the section heading and description</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title" className="text-sm font-medium">
                  Section Title
                </Label>
                <input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subtitle" className="text-sm font-medium">
                  Section Subtitle
                </Label>
                <input
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grid Layout</CardTitle>
              <CardDescription>Customize the grid layout for featured categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="gridColumns" className="text-sm font-medium">
                    Grid Columns
                  </Label>
                  <Select value={gridColumns} onValueChange={setGridColumns}>
                    <SelectTrigger id="gridColumns">
                      <SelectValue placeholder="Select columns" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Column</SelectItem>
                      <SelectItem value="2">2 Columns</SelectItem>
                      <SelectItem value="3">3 Columns</SelectItem>
                      <SelectItem value="4">4 Columns</SelectItem>
                      <SelectItem value="5">5 Columns</SelectItem>
                      <SelectItem value="6">6 Columns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="maxCategories" className="text-sm font-medium">
                    Categories to Display
                  </Label>
                  <Select value={maxCategories} onValueChange={setMaxCategories}>
                    <SelectTrigger id="maxCategories">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Categories</SelectItem>
                      <SelectItem value="4">4 Categories</SelectItem>
                      <SelectItem value="6">6 Categories</SelectItem>
                      <SelectItem value="8">8 Categories</SelectItem>
                      <SelectItem value="9">9 Categories</SelectItem>
                      <SelectItem value="12">12 Categories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="buttonSize" className="text-sm font-medium">
                    Button Size
                  </Label>
                  <Select value={buttonSize} onValueChange={setButtonSize}>
                    <SelectTrigger id="buttonSize">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gridGap" className="text-sm font-medium">
                      Grid Gap
                    </Label>
                    <span className="text-xs text-muted-foreground">{gridGap}</span>
                  </div>
                  <Slider
                    id="gridGap"
                    min={2}
                    max={12}
                    step={1}
                    value={[gridGap]}
                    onValueChange={(values) => setGridGap(values[0])}
                    className="py-2"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="gridWidth" className="text-sm font-medium">
                    Grid Width (%)
                  </Label>
                  <span className="text-xs text-muted-foreground">{gridWidth}%</span>
                </div>
                <Slider
                  id="gridWidth"
                  min={50}
                  max={100}
                  step={5}
                  value={[gridWidth]}
                  onValueChange={(values) => setGridWidth(values[0])}
                  className="py-2"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <div className="border-b p-4 bg-muted/50">
                <h3 className="font-medium">Live Preview</h3>
              </div>
              <div className="p-0">
                <FeaturedCategories
                  title={title}
                  subtitle={subtitle}
                  categories={categories.slice(0, Number.parseInt(maxCategories))}
                  gridColumns={Number.parseInt(gridColumns)}
                  maxCategories={Number.parseInt(maxCategories)}
                  buttonSize={buttonSize}
                  gridGap={gridGap}
                  gridWidth={gridWidth}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
