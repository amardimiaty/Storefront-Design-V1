"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, Loader2, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function CartPage() {
  const cart = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [isRemovingItem, setIsRemovingItem] = useState<string | null>(null)
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Simulate loading cart data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleRemoveItem = async (id: string, variant: string | null) => {
    if (!cart?.removeFromCart) return

    const itemKey = `${id}-${variant}`
    setIsRemovingItem(itemKey)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    cart.removeFromCart(id, variant)

    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    })

    setIsRemovingItem(null)
  }

  const handleQuantityChange = async (id: string, variant: string | null, newQuantity: number) => {
    if (!cart?.updateQuantity || newQuantity < 1) return

    const itemKey = `${id}-${variant}`
    setIsUpdatingQuantity(itemKey)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    cart.updateQuantity(id, variant, newQuantity)
    setIsUpdatingQuantity(null)
  }

  const handleApplyPromo = async () => {
    if (!promoCode) return

    setIsApplyingPromo(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Invalid promo code",
      description: "The promo code you entered is invalid or has expired.",
      variant: "destructive",
    })

    setIsApplyingPromo(false)
  }

  // Calculate shipping and total
  const subtotal = cart?.subtotal || 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="mb-6">
          <Link href="/products" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Continue shopping
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border">
              <div className="divide-y">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-20 w-20 rounded-md" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="mt-1 h-4 w-1/4" />
                        <Skeleton className="mt-1 h-4 w-1/6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-6 w-8" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                      </div>
                      <div className="text-right">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="mt-1 h-8 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-end justify-between border-t pt-3">
                  <span className="text-lg font-semibold">Total</span>
                  <Skeleton className="h-6 w-20" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-20" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-6">
        <Link href="/products" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Continue shopping
        </Link>
      </div>

      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

      {cart?.cartItems && cart.cartItems.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-lg border">
              <div className="divide-y">
                {cart.cartItems.map((item, index) => {
                  const itemKey = `${item.id}-${item.variant}`
                  const isRemoving = isRemovingItem === itemKey
                  const isUpdating = isUpdatingQuantity === itemKey

                  return (
                    <motion.div
                      key={itemKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-md">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          {item.variant && <p className="text-sm text-gray-500">{item.variant}</p>}
                          <p className="mt-1 font-semibold">${item.price.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.variant, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating || isRemoving}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">
                            {isUpdating ? <Loader2 className="mx-auto h-4 w-4 animate-spin" /> : item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.variant, item.quantity + 1)}
                            disabled={isUpdating || isRemoving}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1 h-8 text-red-500 hover:text-red-600"
                            onClick={() => handleRemoveItem(item.id, item.variant)}
                            disabled={isRemoving || isUpdating}
                          >
                            {isRemoving ? (
                              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="mr-1 h-4 w-4" />
                            )}
                            {isRemoving ? "Removing..." : "Remove"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex items-end justify-between border-t pt-3">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                  <Button variant="outline" onClick={handleApplyPromo} disabled={isApplyingPromo || !promoCode}>
                    {isApplyingPromo ? (
                      <>
                        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>

                <Button asChild className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <ShoppingCart className="mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
