"use client"

import Link from "next/link"
import { ArrowLeft, Package, Tag, Layers, Settings, Store, Palette, Type, Grid3X3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CatalogSettings() {
  const catalogModules = [
    {
      title: "Products",
      description: "Manage product catalog",
      icon: <Package className="h-6 w-6" />,
      href: "/admin/catalog/products",
      color:
        "bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-400",
    },
    {
      title: "Categories",
      description: "Organize product categories",
      icon: <Layers className="h-6 w-6" />,
      href: "/admin/catalog/categories",
      color:
        "bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-600 dark:from-emerald-900/30 dark:to-green-900/30 dark:text-emerald-400",
    },
    {
      title: "Collections",
      description: "Manage product collections",
      icon: <Grid3X3 className="h-6 w-6" />,
      href: "/admin/catalog/collections",
      color:
        "bg-gradient-to-br from-purple-100 to-violet-100 text-purple-600 dark:from-purple-900/30 dark:to-violet-900/30 dark:text-purple-400",
    },
    {
      title: "Promotions",
      description: "Manage sales and discounts",
      icon: <Tag className="h-6 w-6" />,
      href: "/admin/catalog/promotions",
      color:
        "bg-gradient-to-br from-red-100 to-orange-100 text-red-600 dark:from-red-900/30 dark:to-orange-900/30 dark:text-red-400",
    },
    {
      title: "Logo Settings",
      description: "Customize store logo",
      icon: <Store className="h-6 w-6" />,
      href: "/admin/catalog/logo",
      color:
        "bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-400",
    },
    {
      title: "Brand Colors",
      description: "Manage brand color scheme",
      icon: <Palette className="h-6 w-6" />,
      href: "/admin/catalog/brand-colors",
      color:
        "bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 dark:from-pink-900/30 dark:to-rose-900/30 dark:text-pink-400",
    },
    {
      title: "Typography",
      description: "Customize fonts and text styles",
      icon: <Type className="h-6 w-6" />,
      href: "/admin/catalog/typography",
      color:
        "bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 dark:from-indigo-900/30 dark:to-blue-900/30 dark:text-indigo-400",
    },
    {
      title: "Advanced Settings",
      description: "Configure catalog settings",
      icon: <Settings className="h-6 w-6" />,
      href: "/admin/catalog/settings",
      color:
        "bg-gradient-to-br from-gray-100 to-slate-100 text-gray-600 dark:from-gray-800/50 dark:to-slate-800/50 dark:text-gray-400",
    },
  ]

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Link href="/admin">
            <Button variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Dashboard</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
            Catalog Management
          </h1>
        </div>
        <Link href="/admin/navbar">
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
            <Settings className="mr-2 h-4 w-4" />
            Header Design Settings
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catalogModules.map((module, index) => (
          <Link key={index} href={module.href} className="block group">
            <Card className="h-full border-0 overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-3 relative z-10">
                <div
                  className={`rounded-xl w-14 h-14 flex items-center justify-center mb-3 ${module.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  {module.icon}
                </div>
                <CardTitle className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-300">
                  {module.title}
                </CardTitle>
                <CardDescription className="font-medium opacity-90 group-hover:opacity-100">
                  {module.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
          <CardDescription>Optimize your catalog management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex gap-2 items-start">
            <div className="bg-blue-100 text-blue-600 p-1 rounded">1</div>
            <p>
              Use <strong>Categories</strong> to organize your products in a hierarchical structure for better
              navigation.
            </p>
          </div>
          <div className="flex gap-2 items-start">
            <div className="bg-blue-100 text-blue-600 p-1 rounded">2</div>
            <p>
              Create <strong>Collections</strong> to group products that share common attributes or themes, like "Summer
              Collection" or "Best Sellers".
            </p>
          </div>
          <div className="flex gap-2 items-start">
            <div className="bg-blue-100 text-blue-600 p-1 rounded">3</div>
            <p>
              Customize your <strong>Logo Settings</strong> to ensure your brand identity is consistently represented
              across your store.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
