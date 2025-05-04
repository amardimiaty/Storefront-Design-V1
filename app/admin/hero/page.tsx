"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { EcommerceHero } from "@/components/hero/ecommerce-hero"
import { ImageIcon, Trash2, Plus, Save, RotateCcw, Eye, ArrowRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Define the slide interface with font options and position settings
interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  imageUrl?: string
  titleFont?: string
  subtitleFont?: string
  descriptionFont?: string
  // Position properties
  horizontalPosition?: "left" | "center" | "right"
  verticalPosition?: "top" | "middle" | "bottom"
  contentWidth?: number
  textAlign?: "left" | "center" | "right"
  // Button styling properties
  buttonBgColor?: string
  buttonTextColor?: string
  buttonFont?: string
  buttonSize?: "default" | "sm" | "lg"
  buttonVariant?: "default" | "outline" | "ghost" | "link"
  // Button effect properties
  buttonEffect?: "none" | "scale" | "slide" | "glow" | "shadow" | "underline"
  buttonTransition?: "fast" | "normal" | "slow"
}

// Default slides with modern fonts
const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Summer Collection",
    subtitle: "New Arrivals",
    description: "Discover our latest summer styles with breathable fabrics perfect for warm weather.",
    buttonText: "Shop Now",
    buttonLink: "/collections/summer",
    imageUrl: "/modern-summer-fashion.png",
    titleFont: "font-display",
    subtitleFont: "font-modern",
    descriptionFont: "font-sans",
    horizontalPosition: "left",
    verticalPosition: "middle",
    contentWidth: 50,
    textAlign: "left",
    buttonBgColor: "#0f172a", // Default dark blue
    buttonTextColor: "#ffffff", // White
    buttonFont: "font-sans",
    buttonSize: "default",
    buttonVariant: "default",
    buttonEffect: "slide",
    buttonTransition: "normal",
  },
  {
    id: "2",
    title: "Premium Essentials",
    subtitle: "Timeless Classics",
    description: "Elevate your wardrobe with our premium essentials designed to last season after season.",
    buttonText: "Explore",
    buttonLink: "/collections/essentials",
    imageUrl: "/modern-fashion-collection.png",
    titleFont: "font-serif",
    subtitleFont: "font-minimal",
    descriptionFont: "font-sans",
    horizontalPosition: "left",
    verticalPosition: "middle",
    contentWidth: 50,
    textAlign: "left",
    buttonBgColor: "#0f172a", // Default dark blue
    buttonTextColor: "#ffffff", // White
    buttonFont: "font-sans",
    buttonSize: "default",
    buttonVariant: "default",
    buttonEffect: "scale",
    buttonTransition: "normal",
  },
]

// Font options
const fontOptions = [
  { value: "font-sans", label: "Sans-Serif (Inter)" },
  { value: "font-serif", label: "Serif (Playfair Display)" },
  { value: "font-display", label: "Display (Montserrat)" },
  { value: "font-modern", label: "Modern (Raleway)" },
  { value: "font-minimal", label: "Minimal (Merriweather)" },
]

// Color palette options
const colorOptions = [
  { value: "#0f172a", label: "Navy Blue", className: "bg-[#0f172a]" },
  { value: "#1e40af", label: "Royal Blue", className: "bg-[#1e40af]" },
  { value: "#0891b2", label: "Teal", className: "bg-[#0891b2]" },
  { value: "#059669", label: "Emerald", className: "bg-[#059669]" },
  { value: "#65a30d", label: "Lime", className: "bg-[#65a30d]" },
  { value: "#ca8a04", label: "Amber", className: "bg-[#ca8a04]" },
  { value: "#ea580c", label: "Orange", className: "bg-[#ea580c]" },
  { value: "#dc2626", label: "Red", className: "bg-[#dc2626]" },
  { value: "#db2777", label: "Pink", className: "bg-[#db2777]" },
  { value: "#7c3aed", label: "Purple", className: "bg-[#7c3aed]" },
  { value: "#2563eb", label: "Blue", className: "bg-[#2563eb]" },
  { value: "#000000", label: "Black", className: "bg-[#000000]" },
  { value: "#334155", label: "Slate", className: "bg-[#334155]" },
  { value: "#6b7280", label: "Gray", className: "bg-[#6b7280]" },
  { value: "#ffffff", label: "White", className: "bg-[#ffffff] border border-gray-200" },
]

export default function HeroAdminPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [activeSlide, setActiveSlide] = useState<string>("1")
  const [isPreviewVisible, setIsPreviewVisible] = useState(false)

  // Load slides from localStorage on initial render
  useEffect(() => {
    const storedSlides = localStorage.getItem("heroSlides")
    if (storedSlides) {
      try {
        const parsedSlides = JSON.parse(storedSlides)
        if (Array.isArray(parsedSlides) && parsedSlides.length > 0) {
          // Ensure all slides have position properties
          const updatedSlides = parsedSlides.map((slide) => ({
            ...slide,
            horizontalPosition: slide.horizontalPosition || "left",
            verticalPosition: slide.verticalPosition || "middle",
            contentWidth: slide.contentWidth || 50,
            textAlign: slide.textAlign || "left",
          }))
          setSlides(updatedSlides)
          setActiveSlide(updatedSlides[0].id)
        } else {
          setSlides(defaultSlides)
        }
      } catch (error) {
        console.error("Failed to parse hero slides from localStorage:", error)
        setSlides(defaultSlides)
      }
    } else {
      setSlides(defaultSlides)
    }
  }, [])

  // Save slides to localStorage whenever they change
  useEffect(() => {
    if (slides.length > 0) {
      localStorage.setItem("heroSlides", JSON.stringify(slides))
    }
  }, [slides])

  const handleInputChange = (id: string, field: keyof HeroSlide, value: any) => {
    setSlides((prevSlides) => prevSlides.map((slide) => (slide.id === id ? { ...slide, [field]: value } : slide)))

    // Trigger a custom event to notify of changes for real-time preview
    const event = new CustomEvent("hero-slide-updated", {
      detail: { slideId: id, field, value },
    })
    window.dispatchEvent(event)
  }

  const handleAddSlide = () => {
    const newId = String(slides.length + 1)
    const newSlide: HeroSlide = {
      id: newId,
      title: "New Collection",
      subtitle: "Just Added",
      description: "Explore our newest collection featuring the latest trends and styles.",
      buttonText: "Discover",
      buttonLink: "/collections/new",
      titleFont: "font-display",
      subtitleFont: "font-modern",
      descriptionFont: "font-sans",
      horizontalPosition: "left",
      verticalPosition: "middle",
      contentWidth: 50,
      textAlign: "left",
      buttonBgColor: "#0f172a",
      buttonTextColor: "#ffffff",
      buttonFont: "font-sans",
      buttonSize: "default",
      buttonVariant: "default",
      buttonEffect: "none",
      buttonTransition: "normal",
    }
    setSlides([...slides, newSlide])
    setActiveSlide(newId)
    toast({
      title: "Slide Added",
      description: "A new hero slide has been added.",
    })
  }

  const handleRemoveSlide = (id: string) => {
    if (slides.length <= 1) {
      toast({
        title: "Cannot Remove",
        description: "You must have at least one slide.",
        variant: "destructive",
      })
      return
    }

    const newSlides = slides.filter((slide) => slide.id !== id)
    setSlides(newSlides)

    // If the active slide was removed, set the first slide as active
    if (id === activeSlide && newSlides.length > 0) {
      setActiveSlide(newSlides[0].id)
    }

    toast({
      title: "Slide Removed",
      description: "The hero slide has been removed.",
    })
  }

  const handleResetSlides = () => {
    setSlides(defaultSlides)
    setActiveSlide("1")
    toast({
      title: "Slides Reset",
      description: "Hero slides have been reset to default.",
    })
  }

  const handleSaveChanges = () => {
    localStorage.setItem("heroSlides", JSON.stringify(slides))
    toast({
      title: "Changes Saved",
      description: "Your hero slide changes have been saved.",
    })
  }

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        handleInputChange(id, "imageUrl", imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const getButtonEffectClass = (slide: HeroSlide) => {
    const transitionSpeed =
      slide.buttonTransition === "fast"
        ? "duration-200"
        : slide.buttonTransition === "slow"
          ? "duration-500"
          : "duration-300"

    switch (slide.buttonEffect) {
      case "scale":
        return `transition-transform ${transitionSpeed} hover:scale-105`
      case "glow":
        return `transition-all ${transitionSpeed} hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]`
      case "shadow":
        return `transition-shadow ${transitionSpeed} hover:shadow-lg`
      case "underline":
        return `transition-all ${transitionSpeed} hover:underline`
      case "slide":
        return `transition-all ${transitionSpeed}`
      default:
        return ""
    }
  }

  const currentSlide = slides.find((slide) => slide.id === activeSlide)

  useEffect(() => {
    const handleSlideUpdate = () => {
      // Force a re-render of the preview
      setIsPreviewVisible((prev) => {
        if (prev) {
          // Toggle off and on to force refresh
          setTimeout(() => setIsPreviewVisible(true), 10)
          return false
        }
        return prev
      })
    }

    // Save changes automatically when button properties change
    const debouncedSave = debounce(() => {
      localStorage.setItem("heroSlides", JSON.stringify(slides))
    }, 500)

    debouncedSave()

    return () => {
      debouncedSave.cancel()
    }
  }, [slides])

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Hero Section Management</h1>
          <p className="text-muted-foreground">Customize your homepage hero slides</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsPreviewVisible(!isPreviewVisible)}>
            <Eye className="mr-2 h-4 w-4" />
            {isPreviewVisible ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button variant="outline" onClick={handleResetSlides}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSaveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {isPreviewVisible && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Hero Preview</CardTitle>
            <CardDescription>This is how your hero section will appear on the homepage</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-hidden rounded-b-lg">
            <EcommerceHero />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Slides</CardTitle>
            <CardDescription>Manage your hero slides</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
                    activeSlide === slide.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted"
                  }`}
                  onClick={() => setActiveSlide(slide.id)}
                >
                  <div className="flex items-center">
                    <div
                      className="w-10 h-10 rounded bg-cover bg-center mr-3"
                      style={{
                        backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})` : "none",
                        backgroundColor: !slide.imageUrl ? "#e2e8f0" : undefined,
                      }}
                    >
                      {!slide.imageUrl && <ImageIcon className="w-full h-full p-2 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="font-medium">{slide.title}</p>
                      <p className="text-xs text-muted-foreground">{slide.subtitle}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveSlide(slide.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddSlide} className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Slide
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Edit Slide</CardTitle>
            <CardDescription>Customize the selected hero slide</CardDescription>
          </CardHeader>
          <CardContent>
            {currentSlide ? (
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="layout">Layout & Position</TabsTrigger>
                  <TabsTrigger value="navigation">Navigation</TabsTrigger>
                  <TabsTrigger value="styling">Styling & Fonts</TabsTrigger>
                  <TabsTrigger value="button">Button</TabsTrigger>
                  <TabsTrigger value="image">Image</TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={currentSlide.title}
                        onChange={(e) => handleInputChange(currentSlide.id, "title", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        value={currentSlide.subtitle}
                        onChange={(e) => handleInputChange(currentSlide.id, "subtitle", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={currentSlide.description}
                        onChange={(e) => handleInputChange(currentSlide.id, "description", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="layout" className="space-y-4">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label>Horizontal Position</Label>
                      <RadioGroup
                        value={currentSlide.horizontalPosition || "left"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "horizontalPosition", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="left" id="position-left" />
                          <Label htmlFor="position-left">Left</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="center" id="position-center" />
                          <Label htmlFor="position-center">Center</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="right" id="position-right" />
                          <Label htmlFor="position-right">Right</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label>Vertical Position</Label>
                      <RadioGroup
                        value={currentSlide.verticalPosition || "middle"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "verticalPosition", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="top" id="position-top" />
                          <Label htmlFor="position-top">Top</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="middle" id="position-middle" />
                          <Label htmlFor="position-middle">Middle</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bottom" id="position-bottom" />
                          <Label htmlFor="position-bottom">Bottom</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <div className="flex justify-between">
                        <Label>Content Width</Label>
                        <span className="text-sm text-muted-foreground">{currentSlide.contentWidth || 50}%</span>
                      </div>
                      <Slider
                        value={[currentSlide.contentWidth || 50]}
                        min={25}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "contentWidth", value[0])}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Adjust the maximum width of the content area</p>
                    </div>

                    <div className="grid gap-2">
                      <Label>Text Alignment</Label>
                      <RadioGroup
                        value={currentSlide.textAlign || "left"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "textAlign", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="left" id="text-left" />
                          <Label htmlFor="text-left">Left</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="center" id="text-center" />
                          <Label htmlFor="text-center">Center</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="right" id="text-right" />
                          <Label htmlFor="text-right">Right</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mt-4 border rounded-md p-4 bg-muted/30">
                      <h4 className="font-medium mb-3">Position Preview</h4>
                      <div className="aspect-video bg-muted/50 border relative rounded-md overflow-hidden">
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                          {["top", "middle", "bottom"].map((vPos) =>
                            ["left", "center", "right"].map((hPos) => {
                              const isActive =
                                (currentSlide.horizontalPosition || "left") === hPos &&
                                (currentSlide.verticalPosition || "middle") === vPos

                              return (
                                <div
                                  key={`${vPos}-${hPos}`}
                                  className={`border border-dashed border-gray-300 flex items-center justify-center ${
                                    isActive ? "bg-primary/20 border-primary" : ""
                                  }`}
                                >
                                  {isActive && (
                                    <div className="w-16 h-8 bg-primary/40 rounded-md flex items-center justify-center">
                                      <span className="text-xs font-medium">Content</span>
                                    </div>
                                  )}
                                </div>
                              )
                            }),
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        The highlighted area shows where your content will be positioned on the slide
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="navigation" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="linkType">Link Type</Label>
                      <Select
                        defaultValue="page"
                        onValueChange={(value) => {
                          // Update link type logic would go here
                          if (value === "section") {
                            // Set a default section if switching to section type
                            handleInputChange(currentSlide.id, "buttonLink", "#featured-products")
                          } else {
                            // Set a default page link if switching to page type
                            handleInputChange(currentSlide.id, "buttonLink", "/collections/new")
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select link type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="page">Page Link</SelectItem>
                          <SelectItem value="section">Section Link</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="buttonText">Button Text</Label>
                      <Input
                        id="buttonText"
                        value={currentSlide.buttonText}
                        onChange={(e) => handleInputChange(currentSlide.id, "buttonText", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="buttonLink">Button Link</Label>
                      <Input
                        id="buttonLink"
                        value={currentSlide.buttonLink}
                        onChange={(e) => handleInputChange(currentSlide.id, "buttonLink", e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="sectionLink">Home Page Section</Label>
                      <Select
                        value={currentSlide.buttonLink.startsWith("#") ? currentSlide.buttonLink : "#featured-products"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "buttonLink", value)}
                        disabled={!currentSlide.buttonLink.startsWith("#")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="#hero">Hero Section</SelectItem>
                          <SelectItem value="#categories">Featured Categories</SelectItem>
                          <SelectItem value="#ad-banner-1">Promotional Banner 1</SelectItem>
                          <SelectItem value="#new-arrivals">New Arrivals</SelectItem>
                          <SelectItem value="#promo-cards">Promotional Cards</SelectItem>
                          <SelectItem value="#featured-products">Featured Products</SelectItem>
                          <SelectItem value="#ad-banner-2">Promotional Banner 2</SelectItem>
                          <SelectItem value="#testimonials">Testimonials</SelectItem>
                          <SelectItem value="#newsletter">Newsletter</SelectItem>
                          <SelectItem value="#benefits">Benefits Section</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground mt-1">
                        Select a section to scroll to when the button is clicked
                      </p>
                    </div>

                    <div className="p-4 border rounded-md bg-muted/30 mt-2">
                      <h4 className="font-medium mb-2">Navigation Preview</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Button "{currentSlide.buttonText}" will navigate to:
                      </p>
                      <code className="bg-muted p-2 rounded text-sm block">{currentSlide.buttonLink}</code>
                      <p className="text-xs text-muted-foreground mt-2">
                        {currentSlide.buttonLink.startsWith("#")
                          ? "This will scroll to the section with this ID on the home page"
                          : "This will navigate to a new page"}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="styling" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="titleFont">Title Font</Label>
                      <Select
                        value={currentSlide.titleFont || "font-display"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "titleFont", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value} className={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className={`p-3 border rounded-md mt-2 text-xl ${currentSlide.titleFont || "font-display"}`}>
                        Font Preview: {currentSlide.title}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="subtitleFont">Subtitle Font</Label>
                      <Select
                        value={currentSlide.subtitleFont || "font-modern"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "subtitleFont", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value} className={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className={`p-3 border rounded-md mt-2 ${currentSlide.subtitleFont || "font-modern"}`}>
                        Font Preview: {currentSlide.subtitle}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="descriptionFont">Description Font</Label>
                      <Select
                        value={currentSlide.descriptionFont || "font-sans"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "descriptionFont", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value} className={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className={`p-3 border rounded-md mt-2 ${currentSlide.descriptionFont || "font-sans"}`}>
                        Font Preview: {currentSlide.description.substring(0, 50)}...
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="button" className="space-y-4">
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label>Button Background Color</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {colorOptions.map((color) => (
                          <div
                            key={color.value}
                            className={`
          h-10 rounded-md cursor-pointer flex items-center justify-center
          ${color.className} 
          ${currentSlide.buttonBgColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""}
          hover:scale-105 transition-transform
        `}
                            title={color.label}
                            onClick={() => handleInputChange(currentSlide.id, "buttonBgColor", color.value)}
                          >
                            {currentSlide.buttonBgColor === color.value && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={color.value === "#ffffff" ? "#000000" : "#ffffff"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Click a color to select it for the button background
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label>Button Text Color</Label>
                      <div className="grid grid-cols-5 gap-2">
                        {colorOptions.map((color) => (
                          <div
                            key={color.value}
                            className={`
          h-10 rounded-md cursor-pointer flex items-center justify-center
          ${color.className} 
          ${currentSlide.buttonTextColor === color.value ? "ring-2 ring-offset-2 ring-primary" : ""}
          hover:scale-105 transition-transform
        `}
                            title={color.label}
                            onClick={() => handleInputChange(currentSlide.id, "buttonTextColor", color.value)}
                          >
                            {currentSlide.buttonTextColor === color.value && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke={color.value === "#ffffff" ? "#000000" : "#ffffff"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Click a color to select it for the button text
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="buttonFont">Button Font</Label>
                      <Select
                        value={currentSlide.buttonFont || "font-sans"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "buttonFont", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value} className={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label>Button Size</Label>
                      <RadioGroup
                        value={currentSlide.buttonSize || "default"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "buttonSize", value)}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sm" id="button-sm" />
                          <Label htmlFor="button-sm">Small</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="default" id="button-default" />
                          <Label htmlFor="button-default">Default</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="lg" id="button-lg" />
                          <Label htmlFor="button-lg">Large</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label>Button Style</Label>
                      <RadioGroup
                        value={currentSlide.buttonVariant || "default"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "buttonVariant", value)}
                        className="flex flex-wrap gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="default" id="button-variant-default" />
                          <Label htmlFor="button-variant-default">Solid</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="outline" id="button-variant-outline" />
                          <Label htmlFor="button-variant-outline">Outline</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ghost" id="button-variant-ghost" />
                          <Label htmlFor="button-variant-ghost">Ghost</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="link" id="button-variant-link" />
                          <Label htmlFor="button-variant-link">Link</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="grid gap-2">
                      <Label>Button Effect</Label>
                      <RadioGroup
                        value={currentSlide.buttonEffect || "none"}
                        onValueChange={(value) => handleInputChange(currentSlide.id, "buttonEffect", value)}
                        className="flex flex-wrap gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="button-effect-none" />
                          <Label htmlFor="button-effect-none">None</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="scale" id="button-effect-scale" />
                          <Label htmlFor="button-effect-scale">Scale</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="slide" id="button-effect-slide" />
                          <Label htmlFor="button-effect-slide">Slide Arrow</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="glow" id="button-effect-glow" />
                          <Label htmlFor="button-effect-glow">Glow</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="shadow" id="button-effect-shadow" />
                          <Label htmlFor="button-effect-shadow">Shadow</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="underline" id="button-effect-underline" />
                          <Label htmlFor="button-effect-underline">Underline</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="mt-4 border rounded-md p-4 bg-muted/30">
                      <h4 className="font-medium mb-3">Button Preview</h4>
                      <div className="flex justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-md">
                        <Button
                          key={`button-preview-${JSON.stringify(currentSlide)}`} // Force re-render on any change
                          size={(currentSlide.buttonSize as "default" | "sm" | "lg") || "default"}
                          variant={
                            (currentSlide.buttonVariant as "default" | "outline" | "ghost" | "link") || "default"
                          }
                          className={`${currentSlide.buttonFont || "font-sans"} group ${getButtonEffectClass(currentSlide)}`}
                          style={{
                            backgroundColor:
                              currentSlide.buttonVariant === "default" ? currentSlide.buttonBgColor : "transparent",
                            color: currentSlide.buttonTextColor,
                            borderColor:
                              currentSlide.buttonVariant === "outline" ? currentSlide.buttonBgColor : "transparent",
                          }}
                        >
                          {currentSlide.buttonText || "Button Text"}
                          <ArrowRight
                            className={`ml-2 h-4 w-4 ${
                              currentSlide.buttonEffect === "slide"
                                ? "transition-transform group-hover:translate-x-1"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3 text-center">
                        Hover over the button to see the selected effect in action
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="imageUrl">Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={currentSlide.imageUrl || ""}
                        onChange={(e) => handleInputChange(currentSlide.id, "imageUrl", e.target.value)}
                        placeholder="Enter image URL or upload below"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="imageUpload">Upload Image</Label>
                      <Input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(currentSlide.id, e)}
                      />
                    </div>

                    {currentSlide.imageUrl && (
                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Current Image Preview:</p>
                        <div className="aspect-video w-full rounded-md overflow-hidden bg-muted">
                          <img
                            src={currentSlide.imageUrl || "/placeholder.svg"}
                            alt="Slide preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No slide selected. Please select or add a slide.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleSaveChanges}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

// Debounce function
function debounce<F extends (...args: any[]) => any>(func: F, delay: number) {
  let timeoutId: NodeJS.Timeout
  let lastArgs: Parameters<F>
  let lastThis: any

  const debounced = function (this: any, ...args: Parameters<F>): Promise<ReturnType<F>> {
    return new Promise((resolve) => {
      lastArgs = args
      lastThis = this

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        timeoutId = undefined as any
        const result = func.apply(lastThis, lastArgs)
        resolve(result)
      }, delay)
    })
  }

  debounced.cancel = () => {
    clearTimeout(timeoutId)
  }

  return debounced as any
}
