"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Check, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import * as LucideIcons from "lucide-react"

export default function LogoSettings() {
  const { toast } = useToast()
  const [logoText, setLogoText] = useState("NOVA")
  const [logoSubtext, setLogoSubtext] = useState("shop")
  const [logoGradientFrom, setLogoGradientFrom] = useState("from-violet-600")
  const [logoGradientTo, setLogoGradientTo] = useState("to-indigo-600")
  const [logoIcon, setLogoIcon] = useState("ShoppingBag")
  const [isSaving, setIsSaving] = useState(false)

  // Load saved settings from localStorage on component mount
  useEffect(() => {
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
  }, [])

  // Available gradient combinations
  const gradientOptions = [
    { id: "violet-indigo", from: "from-violet-600", to: "to-indigo-600", label: "Violet to Indigo" },
    { id: "blue-cyan", from: "from-blue-600", to: "to-cyan-600", label: "Blue to Cyan" },
    { id: "emerald-green", from: "from-emerald-600", to: "to-green-600", label: "Emerald to Green" },
    { id: "amber-orange", from: "from-amber-600", to: "to-orange-600", label: "Amber to Orange" },
    { id: "red-pink", from: "from-red-600", to: "to-pink-600", label: "Red to Pink" },
    { id: "fuchsia-purple", from: "from-fuchsia-600", to: "to-purple-600", label: "Fuchsia to Purple" },
    { id: "rose-red", from: "from-rose-600", to: "to-red-600", label: "Rose to Red" },
    { id: "teal-cyan", from: "from-teal-600", to: "to-cyan-600", label: "Teal to Cyan" },
  ]

  // Available icon options
  const iconOptions = [
    { id: "ShoppingBag", label: "Shopping Bag" },
    { id: "Store", label: "Store" },
    { id: "Gift", label: "Gift" },
    { id: "Tag", label: "Tag" },
    { id: "Package", label: "Package" },
    { id: "Sparkles", label: "Sparkles" },
    { id: "Star", label: "Star" },
    { id: "Heart", label: "Heart" },
    { id: "Award", label: "Award" },
  ]

  // Helper function to render the selected icon
  const renderLogoIcon = (iconName) => {
    const IconComponent = LucideIcons[iconName] || ShoppingBag
    return <IconComponent className="h-5 w-5 relative z-10" />
  }

  // Save settings to localStorage
  const saveSettings = () => {
    setIsSaving(true)

    // Save to localStorage
    localStorage.setItem("navbar-logo-text", logoText)
    localStorage.setItem("navbar-logo-subtext", logoSubtext)
    localStorage.setItem("navbar-logo-gradient-from", logoGradientFrom)
    localStorage.setItem("navbar-logo-gradient-to", logoGradientTo)
    localStorage.setItem("navbar-logo-icon", logoIcon)

    // Dispatch custom event to notify other components of the change
    window.dispatchEvent(new CustomEvent("navbar-logo-changed"))

    // Show success toast
    toast({
      title: "Logo settings saved",
      description: "Your logo changes have been applied successfully.",
      variant: "default",
    })

    setTimeout(() => {
      setIsSaving(false)
    }, 500)
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/catalog">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Catalog</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Logo Settings
          </h1>
        </div>
        <Button
          onClick={saveSettings}
          disabled={isSaving}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white"
        >
          {isSaving ? (
            <>Saving...</>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logo Text</CardTitle>
              <CardDescription>Customize the text displayed in your logo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo-text">Main Text</Label>
                <Input
                  id="logo-text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  placeholder="Enter main logo text"
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">
                  This is the bold text part of your logo. Keep it short and memorable.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-subtext">Subtext</Label>
                <Input
                  id="logo-subtext"
                  value={logoSubtext}
                  onChange={(e) => setLogoSubtext(e.target.value)}
                  placeholder="Enter logo subtext"
                  maxLength={10}
                />
                <p className="text-xs text-muted-foreground">This appears after the main text in a lighter weight.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo Colors</CardTitle>
              <CardDescription>Choose a gradient color scheme for your logo</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={`${logoGradientFrom}-${logoGradientTo}`}
                onValueChange={(value) => {
                  const selected = gradientOptions.find((option) => `${option.from}-${option.to}` === value)
                  if (selected) {
                    setLogoGradientFrom(selected.from)
                    setLogoGradientTo(selected.to)
                  }
                }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {gradientOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={`${option.from}-${option.to}`} id={option.id} className="sr-only" />
                    <Label
                      htmlFor={option.id}
                      className="flex flex-col items-center space-y-2 cursor-pointer rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <div className={`w-full h-8 rounded-md bg-gradient-to-r ${option.from} ${option.to}`}></div>
                      <span className="text-sm font-medium">{option.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo Icon</CardTitle>
              <CardDescription>Select an icon to represent your brand</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={logoIcon}
                onValueChange={setLogoIcon}
                className="grid grid-cols-3 md:grid-cols-5 gap-4"
              >
                {iconOptions.map((option) => {
                  const IconComponent = LucideIcons[option.id] || ShoppingBag
                  return (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={`icon-${option.id}`} className="sr-only" />
                      <Label
                        htmlFor={`icon-${option.id}`}
                        className="flex flex-col items-center space-y-2 cursor-pointer rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <div
                          className={`w-10 h-10 rounded-md bg-gradient-to-r ${logoGradientFrom} ${logoGradientTo} flex items-center justify-center text-white`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium">{option.label}</span>
                      </Label>
                    </div>
                  )
                })}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Logo Preview</CardTitle>
              <CardDescription>See how your logo will appear</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="flex items-center space-x-2 group">
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
                      {logoText || "NOVA"}
                    </span>
                    <span className="group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                      {logoSubtext || "shop"}
                    </span>
                  </span>
                </div>
              </div>

              <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium mb-2">Header Preview</h3>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-md shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-2 group">
                    <div
                      className={`bg-gradient-to-br ${logoGradientFrom} ${logoGradientTo} text-white p-1.5 rounded-md shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105 relative overflow-hidden`}
                    >
                      {renderLogoIcon(logoIcon)}
                    </div>
                    <span className="text-base font-light tracking-wide text-gray-800 dark:text-gray-100">
                      <span
                        className={`font-bold bg-clip-text text-transparent bg-gradient-to-r ${logoGradientFrom} ${logoGradientTo}`}
                      >
                        {logoText || "NOVA"}
                      </span>
                      <span>{logoSubtext || "shop"}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Tips</h3>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  <li>• Keep your logo text short and memorable</li>
                  <li>• Choose colors that match your brand identity</li>
                  <li>• Select an icon that represents your products or services</li>
                  <li>• Preview your logo in both light and dark modes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
