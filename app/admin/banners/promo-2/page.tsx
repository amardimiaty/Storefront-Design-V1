"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { AdBanner } from "@/components/advertisements/ad-banner"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  ctaText: z.string().min(1, {
    message: "Button text is required.",
  }),
  ctaLink: z.string().min(1, {
    message: "Button link is required.",
  }),
  backgroundColor: z.string(),
  textColor: z.string(),
  size: z.enum(["small", "medium", "large", "full"]),
  dismissible: z.boolean().default(true),
  imageSrc: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: FormValues = {
  title: "Free Shipping on Orders Over $50",
  description: "Limited time offer. Domestic orders only.",
  ctaText: "Learn More",
  ctaLink: "/shipping",
  backgroundColor: "bg-gradient-to-r from-blue-600/90 to-blue-400/70",
  textColor: "text-white",
  size: "small",
  dismissible: true,
  imageSrc: "",
}

const backgroundOptions = [
  { value: "bg-gradient-to-r from-primary/90 to-primary/70", label: "Primary Gradient" },
  { value: "bg-gradient-to-r from-blue-600/90 to-blue-400/70", label: "Blue Gradient" },
  { value: "bg-gradient-to-r from-purple-600/90 to-purple-400/70", label: "Purple Gradient" },
  { value: "bg-gradient-to-r from-amber-600/90 to-amber-400/70", label: "Amber Gradient" },
  { value: "bg-gradient-to-r from-emerald-600/90 to-emerald-400/70", label: "Emerald Gradient" },
  { value: "bg-gradient-to-r from-rose-600/90 to-rose-400/70", label: "Rose Gradient" },
  { value: "bg-black", label: "Black" },
  { value: "bg-white", label: "White" },
]

const textColorOptions = [
  { value: "text-white", label: "White" },
  { value: "text-black", label: "Black" },
  { value: "text-gray-800", label: "Dark Gray" },
  { value: "text-gray-200", label: "Light Gray" },
]

const sizeOptions = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "full", label: "Full Width" },
]

export default function PromoBanner2Page() {
  const [formValues, setFormValues] = useState<FormValues>(defaultValues)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  function onSubmit(data: FormValues) {
    try {
      // Save to localStorage with a specific key for this banner
      localStorage.setItem("promo-banner-2-settings", JSON.stringify(data))

      setFormValues(data)

      toast({
        title: "Banner updated successfully",
        description: "Your changes will be visible on the home page immediately.",
        variant: "success",
      })

      // Force a reload of the home page to show changes
      if (typeof window !== "undefined") {
        // This will refresh any open home page tabs
        window.dispatchEvent(new Event("storage"))
      }
    } catch (error) {
      console.error("Error saving banner settings:", error)
      toast({
        title: "Error saving settings",
        description: "There was a problem saving your changes. Please try again.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    // Load saved settings from localStorage on component mount
    try {
      const savedSettings = localStorage.getItem("promo-banner-2-settings")
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings)
        setFormValues(parsedSettings)
        form.reset(parsedSettings)
      }
    } catch (error) {
      console.error("Error loading saved banner settings:", error)
    }
  }, [form])

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Promotional Banner 2</h1>
          <p className="text-muted-foreground mt-2">
            Customize the second promotional banner that appears on your home page
          </p>
        </div>
      </div>

      <Tabs defaultValue="edit" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit Banner</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <Card>
            <CardHeader>
              <CardTitle>Banner Settings</CardTitle>
              <CardDescription>Configure how your promotional banner appears on the home page</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter banner title" {...field} />
                          </FormControl>
                          <FormDescription>The main text displayed on the banner.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter banner description" {...field} />
                          </FormControl>
                          <FormDescription>Optional secondary text for the banner.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ctaText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Text</FormLabel>
                          <FormControl>
                            <Input placeholder="Learn More" {...field} />
                          </FormControl>
                          <FormDescription>Text displayed on the call-to-action button.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ctaLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Link</FormLabel>
                          <FormControl>
                            <Input placeholder="/shipping" {...field} />
                          </FormControl>
                          <FormDescription>Where the button should link to.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="backgroundColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Color</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a background color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {backgroundOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>The background color or gradient of the banner.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="textColor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Text Color</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a text color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {textColorOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>The color of the text on the banner.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banner Size</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sizeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>The size and padding of the banner.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageSrc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Background Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="/banner-image.jpg" {...field} />
                          </FormControl>
                          <FormDescription>Optional background image for the banner.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dismissible"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Dismissible</FormLabel>
                            <FormDescription>Allow users to dismiss the banner.</FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Banner Preview</CardTitle>
              <CardDescription>This is how your banner will appear on the home page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <AdBanner
                  title={formValues.title}
                  description={formValues.description}
                  ctaText={formValues.ctaText}
                  ctaLink={formValues.ctaLink}
                  backgroundColor={formValues.backgroundColor}
                  textColor={formValues.textColor}
                  size={formValues.size as "small" | "medium" | "large" | "full"}
                  dismissible={formValues.dismissible}
                  imageSrc={formValues.imageSrc}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                This is a preview of how your promotional banner will appear. You can go back to the Edit tab to make
                changes.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
