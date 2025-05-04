"use client"

import Link from "next/link"
import {
  Bell,
  Users,
  Settings,
  BarChart3,
  FileText,
  ImageIcon,
  Award,
  LayoutGrid,
  Home,
  Layers,
  Menu,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Raleway } from "next/font/google"

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
})

export default function AdminDashboard() {
  const contentModules = [
    {
      title: "Home Layout",
      description: "Reorder and manage home page sections",
      icon: <LayoutGrid className="h-6 w-6" />,
      href: "/admin/home-layout",
      color:
        "bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-400",
    },
    {
      title: "Hero Section",
      description: "Customize hero banners and text",
      icon: <Home className="h-6 w-6" />,
      href: "/admin/hero",
      color:
        "bg-gradient-to-br from-teal-100 to-emerald-100 text-teal-600 dark:from-teal-900/30 dark:to-emerald-900/30 dark:text-teal-400",
    },
    {
      title: "Benefits Section",
      description: "Edit benefits icons and text",
      icon: <Award className="h-6 w-6" />,
      href: "/admin/benefits",
      color:
        "bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 dark:from-orange-900/30 dark:to-amber-900/30 dark:text-orange-400",
    },
    {
      title: "Media",
      description: "Manage images and media",
      icon: <ImageIcon className="h-6 w-6" />,
      href: "/admin/media",
      color:
        "bg-gradient-to-br from-pink-100 to-rose-100 text-pink-600 dark:from-pink-900/30 dark:to-rose-900/30 dark:text-pink-400",
    },
    {
      title: "Featured Categories",
      description: "Manage featured category display",
      icon: <Layers className="h-6 w-6" />,
      href: "/admin/categories/featured",
      color:
        "bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-400",
    },
  ]

  const catalogModules = [
    {
      title: "Logo Settings",
      description: "Customize your store's logo",
      icon: <ImageIcon className="h-6 w-6" />,
      href: "/admin/catalog/logo",
      color:
        "bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600 dark:from-blue-900/30 dark:to-cyan-900/30 dark:text-blue-400",
    },
    {
      title: "Notifications",
      description: "Manage notification banners",
      icon: <Bell className="h-6 w-6" />,
      href: "/admin/notifications",
      color:
        "bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-600 dark:from-violet-900/30 dark:to-indigo-900/30 dark:text-violet-400",
    },
    {
      title: "Navbar Menu",
      description: "Edit main menu and sub-menus",
      icon: <Menu className="h-6 w-6" />,
      href: "/admin/navbar-menu",
      color:
        "bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-400",
    },
    {
      title: "Navbar Settings",
      description: "Customize navbar icons and colors",
      icon: <Settings className="h-6 w-6" />,
      href: "/admin/navbar",
      color:
        "bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 dark:from-indigo-900/30 dark:to-purple-900/30 dark:text-indigo-400",
    },
  ]

  const customerModules = [
    {
      title: "Customers",
      description: "View and manage customers",
      icon: <Users className="h-6 w-6" />,
      href: "/admin/customers",
      color:
        "bg-gradient-to-br from-green-100 to-teal-100 text-green-600 dark:from-green-900/30 dark:to-teal-900/30 dark:text-green-400",
    },
    {
      title: "Orders",
      description: "Process and track orders",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/orders",
      color:
        "bg-gradient-to-br from-amber-100 to-yellow-100 text-amber-600 dark:from-amber-900/30 dark:to-yellow-900/30 dark:text-amber-400",
    },
    {
      title: "Analytics",
      description: "View store performance",
      icon: <BarChart3 className="h-6 w-6" />,
      href: "/admin/analytics",
      color:
        "bg-gradient-to-br from-indigo-100 to-blue-100 text-indigo-600 dark:from-indigo-900/30 dark:to-blue-900/30 dark:text-indigo-400",
    },
    {
      title: "Settings",
      description: "Configure store settings",
      icon: <Settings className="h-6 w-6" />,
      href: "/admin/settings",
      color:
        "bg-gradient-to-br from-gray-100 to-slate-100 text-gray-600 dark:from-gray-800/50 dark:to-slate-800/50 dark:text-gray-400",
    },
  ]

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          Admin Dashboard
        </h1>
      </div>

      <Tabs defaultValue="content" className={`space-y-6 ${raleway.className}`}>
        <TabsList className="grid w-full grid-cols-3 rounded-xl p-1 font-medium">
          <TabsTrigger
            value="content"
            className="rounded-lg text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Content Management
          </TabsTrigger>
          <TabsTrigger
            value="catalog"
            className="rounded-lg text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Header Design
          </TabsTrigger>
          <TabsTrigger
            value="customers"
            className="rounded-lg text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm"
          >
            Customers & Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentModules.map((module, index) => (
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
              <CardDescription>Optimize your store's content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-2 items-start">
                <div className="bg-blue-100 text-blue-600 p-1 rounded">1</div>
                <p>
                  Use the <strong>Home Layout</strong> manager to reorder sections and control what appears on your home
                  page.
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="bg-blue-100 text-blue-600 p-1 rounded">2</div>
                <p>
                  Keep your <strong>Hero Section</strong> fresh with seasonal updates and compelling calls-to-action.
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <div className="bg-blue-100 text-blue-600 p-1 rounded">3</div>
                <p>
                  Use <strong>Notifications</strong> to announce sales, shipping delays, or other important information.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="catalog" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {customerModules.map((module, index) => (
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
