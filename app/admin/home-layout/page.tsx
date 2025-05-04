"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useHomeLayout, type HomeSectionId, type HomeSection } from "@/lib/home-layout-context"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import {
  GripVertical,
  Eye,
  EyeOff,
  Edit,
  Save,
  RotateCcw,
  AlertTriangle,
  Home,
  Grid,
  BadgePercent,
  Sparkles,
  LayoutGrid,
  ShoppingBag,
  MessageSquareQuote,
  Mail,
  Award,
} from "lucide-react"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/mock-data"

// Map section IDs to their respective icons
const sectionIcons: Record<HomeSectionId, React.ReactNode> = {
  hero: <Home className="h-4 w-4" />,
  categories: <Grid className="h-4 w-4" />,
  "ad-banner-1": <BadgePercent className="h-4 w-4" />,
  "new-arrivals": <Sparkles className="h-4 w-4" />,
  "promo-cards": <LayoutGrid className="h-4 w-4" />,
  "featured-products": <ShoppingBag className="h-4 w-4" />,
  "ad-banner-2": <BadgePercent className="h-4 w-4" />,
  testimonials: <MessageSquareQuote className="h-4 w-4" />,
  newsletter: <Mail className="h-4 w-4" />,
  benefits: <Award className="h-4 w-4" />,
}

// Section preview component
function SectionPreview({ sectionId }: { sectionId: HomeSectionId }) {
  // Get sample data for previews
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 2)
  const newArrivals = products.filter((product) => product.isNew).slice(0, 2)

  switch (sectionId) {
    case "hero":
      return (
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-3 rounded-md h-full w-full flex flex-col justify-center items-start">
          <p className="text-xs text-primary-foreground mb-1">New Collection</p>
          <h3 className="text-sm font-bold mb-1">Summer Essentials</h3>
          <p className="text-xs mb-2 line-clamp-2">Discover our latest summer styles with breathable fabrics.</p>
          <div className="text-xs bg-white/20 px-2 py-1 rounded">Shop Now</div>
        </div>
      )

    case "categories":
      return (
        <div className="h-full w-full flex flex-wrap gap-1 justify-center">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-muted rounded-md w-[45%] h-[45%] flex items-center justify-center">
              <span className="text-[8px]">Category {i}</span>
            </div>
          ))}
        </div>
      )

    case "ad-banner-1":
    case "ad-banner-2":
      return (
        <div
          className={`h-full w-full rounded-md flex items-center justify-center p-2 ${sectionId === "ad-banner-1" ? "bg-gradient-to-r from-rose-500 to-orange-500" : "bg-gradient-to-r from-blue-600 to-indigo-600"} text-white`}
        >
          <div className="text-center">
            <h3 className="text-xs font-bold mb-1">{sectionId === "ad-banner-1" ? "Summer Sale" : "Free Shipping"}</h3>
            <p className="text-[8px] mb-1">{sectionId === "ad-banner-1" ? "Up to 50% Off" : "On orders over $50"}</p>
            <div className="text-[8px] bg-white/20 px-1 py-0.5 rounded inline-block">
              {sectionId === "ad-banner-1" ? "Shop Now" : "Learn More"}
            </div>
          </div>
        </div>
      )

    case "new-arrivals":
    case "featured-products":
      const products = sectionId === "new-arrivals" ? newArrivals : featuredProducts
      return (
        <div className="h-full w-full p-1">
          <h3 className="text-xs font-bold mb-1 text-center">
            {sectionId === "new-arrivals" ? "New Arrivals" : "Featured Products"}
          </h3>
          <div className="flex gap-1 justify-center">
            {products.slice(0, 2).map((product) => (
              <div key={product.id} className="w-[45%] bg-background rounded-md p-1 border">
                <div className="bg-muted h-8 w-full rounded-md mb-1"></div>
                <p className="text-[8px] font-medium line-clamp-1">{product.name}</p>
                <p className="text-[8px] text-muted-foreground">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )

    case "promo-cards":
      return (
        <div className="h-full w-full flex gap-1 p-1">
          <div className="w-1/2 bg-muted rounded-md p-1 flex flex-col justify-end">
            <p className="text-[8px] font-medium">Summer Essentials</p>
            <p className="text-[7px] text-muted-foreground">New Collection</p>
          </div>
          <div className="w-1/2 bg-muted rounded-md p-1 flex flex-col justify-end">
            <p className="text-[8px] font-medium">Home Decor Sale</p>
            <p className="text-[7px] text-muted-foreground">Up to 30% Off</p>
          </div>
        </div>
      )

    case "testimonials":
      return (
        <div className="h-full w-full p-2 flex flex-col items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-muted mb-1"></div>
          <div className="flex mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg key={i} className="w-2 h-2 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
          <p className="text-[8px] text-center line-clamp-2">"Amazing products and service. Highly recommend!"</p>
          <p className="text-[7px] font-medium">Sarah Johnson</p>
        </div>
      )

    case "newsletter":
      return (
        <div className="h-full w-full bg-muted/50 rounded-md p-2 flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold mb-1">Join Our Newsletter</h3>
          <p className="text-[8px] text-center mb-1">Subscribe for updates and exclusive offers</p>
          <div className="flex w-full gap-1">
            <div className="h-3 bg-background rounded flex-grow"></div>
            <div className="h-3 bg-primary rounded px-1 flex items-center">
              <span className="text-[6px] text-white">Subscribe</span>
            </div>
          </div>
        </div>
      )

    case "benefits":
      return (
        <div className="h-full w-full p-1">
          <h3 className="text-xs font-bold mb-1 text-center">Why Shop With Us</h3>
          <div className="grid grid-cols-2 gap-1">
            {[
              { icon: "truck", title: "Free Shipping" },
              { icon: "shield", title: "Secure Payment" },
              { icon: "refresh", title: "Easy Returns" },
              { icon: "credit-card", title: "Flexible Payment" },
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col items-center p-1">
                <div className="w-3 h-3 rounded-full bg-primary/10 mb-0.5 flex items-center justify-center">
                  <div className="w-2 h-2 text-primary">{sectionIcons[sectionId]}</div>
                </div>
                <p className="text-[7px] font-medium">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return (
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-xs text-muted-foreground">Preview not available</p>
        </div>
      )
  }
}

export default function HomeLayoutPage() {
  const { sections, updateSections, resetToDefault, hasUnsavedChanges, setHasUnsavedChanges, saveChanges } =
    useHomeLayout()

  const [localSections, setLocalSections] = useState<HomeSection[]>([])
  const [isClient, setIsClient] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<HomeSectionId | null>(null)

  // Initialize local state after component mounts to avoid hydration issues
  useEffect(() => {
    setIsClient(true)
    setLocalSections(sections)
  }, [sections])

  // Handle drag end event
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(localSections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setLocalSections(items)
    setHasUnsavedChanges(true)
  }

  // Toggle section visibility
  const handleToggleVisibility = (index: number) => {
    const updatedSections = [...localSections]
    updatedSections[index] = {
      ...updatedSections[index],
      visible: !updatedSections[index].visible,
    }
    setLocalSections(updatedSections)
    setHasUnsavedChanges(true)
  }

  // Handle save changes
  const handleSaveChanges = () => {
    updateSections(localSections)
    saveChanges()
  }

  // Handle reset to default
  const handleResetToDefault = () => {
    resetToDefault()
    setLocalSections(sections)
  }

  if (!isClient) {
    return <div className="container mx-auto py-10">Loading...</div>
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Home Page Layout</h1>
          <p className="text-muted-foreground mt-2">Customize the order and visibility of sections on your home page</p>
        </div>
        <div className="flex gap-2 self-end md:self-auto">
          <Button variant="outline" onClick={handleResetToDefault} disabled={!hasUnsavedChanges}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSaveChanges} disabled={!hasUnsavedChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {hasUnsavedChanges && (
        <Alert className="mb-6 bg-amber-50 text-amber-800 border-amber-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Unsaved changes</AlertTitle>
          <AlertDescription>
            You have unsaved changes to your home page layout. Click "Save Changes" to apply them.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Section Order & Visibility</CardTitle>
          <CardDescription>
            Drag sections to reorder them. Toggle visibility to show or hide sections on the home page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                  {localSections.map((section, index) => (
                    <Draggable key={section.id} draggableId={section.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-colors
                            ${section.visible ? "bg-card" : "bg-muted/30 border-dashed"}`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              {...provided.dragHandleProps}
                              className="cursor-grab p-1 rounded hover:bg-muted"
                              aria-label="Drag to reorder"
                            >
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>

                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-md ${section.visible ? "bg-primary/10" : "bg-muted"}`}>
                                {sectionIcons[section.id]}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className={`font-medium ${!section.visible && "text-muted-foreground"}`}>
                                    {section.title}
                                  </h3>
                                  <Badge variant={section.visible ? "outline" : "secondary"} className="ml-2">
                                    {index + 1}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {section.editable && (
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={section.editPath || "#"}>
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Link>
                              </Button>
                            )}

                            <div className="flex items-center gap-2">
                              {section.visible ? (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <Switch
                                checked={section.visible}
                                onCheckedChange={() => handleToggleVisibility(index)}
                                aria-label={`Toggle visibility for ${section.title}`}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                This is how your sections will appear on the home page:
              </p>
              <div className="space-y-2 border rounded-md p-4 bg-muted/20 relative">
                {localSections
                  .filter((section) => section.visible)
                  .map((section, index) => (
                    <div
                      key={section.id}
                      className="flex items-center gap-2 p-2 bg-background rounded border relative"
                      onMouseEnter={() => setHoveredSection(section.id)}
                      onMouseLeave={() => setHoveredSection(null)}
                    >
                      <Badge variant="outline">{index + 1}</Badge>
                      <div className="p-1 rounded bg-primary/10">{sectionIcons[section.id]}</div>
                      <span>{section.title}</span>

                      {hoveredSection === section.id && (
                        <div className="absolute left-full ml-4 w-64 z-50 bg-background border rounded-md shadow-lg overflow-hidden transform -translate-y-1/2 top-1/2">
                          <div className="text-sm font-medium p-2 border-b bg-muted/20">{section.title}</div>
                          <div className="h-40 overflow-hidden">
                            <SectionPreview sectionId={section.id} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                {localSections.filter((section) => section.visible).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                    <p>No visible sections. Your home page will be empty.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
