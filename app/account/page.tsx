"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, LogOut, Package, Settings, User } from "lucide-react"

// Mock user data
const mockUser = {
  id: "u1",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phone: "+1 (555) 123-4567",
  addresses: [
    {
      id: "a1",
      firstName: "John",
      lastName: "Doe",
      company: "Acme Inc",
      streetAddress1: "123 Main St",
      streetAddress2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      phone: "555-123-4567",
      isDefault: true,
    },
  ],
}

// Mock order data
const mockOrders = [
  {
    id: "ord-001",
    date: "2023-10-15",
    status: "Delivered",
    total: 129.97,
    items: [
      { id: "1", name: "Minimalist Cotton Tee", quantity: 2, price: 29.99 },
      { id: "3", name: "Leather Crossbody Bag", quantity: 1, price: 69.99 },
    ],
  },
  {
    id: "ord-002",
    date: "2023-09-28",
    status: "Delivered",
    total: 89.99,
    items: [{ id: "2", name: "Classic Denim Jacket", quantity: 1, price: 89.99 }],
  },
  {
    id: "ord-003",
    date: "2023-11-05",
    status: "Processing",
    total: 49.99,
    items: [{ id: "6", name: "Canvas Sneakers", quantity: 1, price: 49.99 }],
  },
]

export default function AccountPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<typeof mockUser | null>(null)
  const [orders, setOrders] = useState<typeof mockOrders>([])
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  // Simulate fetching user data
  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser(mockUser)
      setOrders(mockOrders)
      setFirstName(mockUser.firstName)
      setLastName(mockUser.lastName)
      setEmail(mockUser.email)
      setPhone(mockUser.phone || "")
      setIsLoading(false)
    }

    fetchUserData()
  }, [])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Update user state
    setUser((prev) => {
      if (!prev) return null
      return {
        ...prev,
        firstName,
        lastName,
        email,
        phone,
      }
    })

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })

    setIsSaving(false)
  }

  const handleLogout = () => {
    // In a real app, you would clear auth tokens, etc.
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
    // Redirect to home page
    window.location.href = "/"
  }

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg">Loading your account...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-4 rounded-lg border p-8 text-center">
          <h1 className="text-2xl font-bold">Not Logged In</h1>
          <p className="text-gray-600">Please log in to view your account.</p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/account/login">Log In</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/account/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="mt-2 text-gray-600">Welcome back, {user.firstName}!</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveProfile}>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSaving}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Shipping Addresses</CardTitle>
              <CardDescription>Manage your shipping addresses.</CardDescription>
            </CardHeader>
            <CardContent>
              {user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {address.firstName} {address.lastName}
                          </p>
                          {address.isDefault && (
                            <span className="inline-block rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        {address.company && <p>{address.company}</p>}
                        <p>{address.streetAddress1}</p>
                        {address.streetAddress2 && <p>{address.streetAddress2}</p>}
                        <p>
                          {address.city}, {address.state} {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                        <p>Phone: {address.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">You haven't added any addresses yet.</p>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline">Add New Address</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View and track your orders.</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="rounded-lg border">
                      <div className="flex items-center justify-between border-b p-4">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">Placed on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <span
                            className={`inline-block rounded-full px-2 py-1 text-xs ${
                              order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="mb-2 font-medium">Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end border-t p-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">You haven't placed any orders yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-medium">Email Preferences</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="marketing-emails" className="h-4 w-4 rounded border-gray-300" />
                    <Label htmlFor="marketing-emails">Receive marketing emails</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="order-updates"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                    <Label htmlFor="order-updates">Receive order updates</Label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Password</h3>
                <Button variant="outline">Change Password</Button>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Account Actions</h3>
                <div className="space-y-2">
                  <Button variant="destructive" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
