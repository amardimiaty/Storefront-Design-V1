"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutPage() {
  const cart = useCart()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [shippingMethod, setShippingMethod] = useState("standard")

  // Simulate loading checkout data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Calculate shipping and total
  const subtotal = cart?.subtotal || 0
  const shippingCost = shippingMethod === "express" ? 12.99 : 5.99
  const total = subtotal + shippingCost

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cart?.cartItems || cart.cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    })

    if (cart?.clearCart) {
      cart.clearCart()
    }

    setIsSubmitting(false)

    // In a real app, you would redirect to a success page
  }

  // Render loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="mb-6">
          <Link href="/cart" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to cart
          </Link>
        </div>

        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {/* Contact Information Skeleton */}
              <div className="rounded-lg border p-6">
                <Skeleton className="mb-4 h-6 w-48" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>

              {/* Shipping Address Skeleton */}
              <div className="rounded-lg border p-6">
                <Skeleton className="mb-4 h-6 w-48" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              </div>

              {/* Shipping Method Skeleton */}
              <div className="rounded-lg border p-6">
                <Skeleton className="mb-4 h-6 w-48" />
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-md" />
                  <Skeleton className="h-16 w-full rounded-md" />
                </div>
              </div>

              {/* Payment Method Skeleton */}
              <div className="rounded-lg border p-6">
                <Skeleton className="mb-4 h-6 w-48" />
                <div className="space-y-3">
                  <Skeleton className="h-16 w-full rounded-md" />
                  <Skeleton className="h-16 w-full rounded-md" />
                </div>
              </div>

              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          <div>
            <div className="rounded-lg border p-6">
              <Skeleton className="mb-4 h-6 w-36" />

              <div className="max-h-80 overflow-auto">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-center gap-3 py-3">
                    <Skeleton className="h-16 w-16 rounded-md" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="mt-1 h-3 w-16" />
                      <div className="mt-1 flex items-center justify-between">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

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
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-6">
        <Link href="/cart" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to cart
        </Link>
      </div>

      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Contact Information</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required disabled={isSubmitting} />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                  <Input id="address2" disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input id="postal-code" required disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" required disabled={isSubmitting} />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Shipping Method</h2>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} disabled={isSubmitting}>
                <div className="flex items-start space-x-3 rounded-md border p-3">
                  <RadioGroupItem id="standard" value="standard" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="standard" className="flex cursor-pointer items-center justify-between">
                      <div>
                        <span className="font-medium">Standard Shipping</span>
                        <p className="text-sm text-gray-500">Delivery in 3-5 business days</p>
                      </div>
                      <span className="font-semibold">$5.99</span>
                    </Label>
                  </div>
                </div>
                <div className="mt-3 flex items-start space-x-3 rounded-md border p-3">
                  <RadioGroupItem id="express" value="express" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="express" className="flex cursor-pointer items-center justify-between">
                      <div>
                        <span className="font-medium">Express Shipping</span>
                        <p className="text-sm text-gray-500">Delivery in 1-2 business days</p>
                      </div>
                      <span className="font-semibold">$12.99</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Method */}
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} disabled={isSubmitting}>
                <div className="flex items-start space-x-3 rounded-md border p-3">
                  <RadioGroupItem id="credit-card" value="credit-card" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="credit-card" className="cursor-pointer">
                      <span className="font-medium">Credit Card</span>
                      <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or American Express</p>
                    </Label>
                  </div>
                </div>
                <div className="mt-3 flex items-start space-x-3 rounded-md border p-3">
                  <RadioGroupItem id="paypal" value="paypal" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="paypal" className="cursor-pointer">
                      <span className="font-medium">PayPal</span>
                      <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                    </Label>
                  </div>
                </div>
              </RadioGroup>

              {paymentMethod === "credit-card" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 grid gap-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" required disabled={isSubmitting} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-month">Expiry Month</Label>
                      <Input id="expiry-month" placeholder="MM" required disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expiry-year">Expiry Year</Label>
                      <Input id="expiry-year" placeholder="YY" required disabled={isSubmitting} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" required disabled={isSubmitting} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !cart?.cartItems || cart.cartItems.length === 0}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay $${total.toFixed(2)}`
              )}
            </Button>
          </form>
        </div>

        <div>
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <div className="max-h-80 overflow-auto">
              {cart?.cartItems &&
                cart.cartItems.map((item) => (
                  <div key={`${item.id}-${item.variant}`} className="flex items-center gap-3 py-3">
                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      {item.variant && <p className="text-xs text-gray-500">{item.variant}</p>}
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                        <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex items-end justify-between border-t pt-3">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
