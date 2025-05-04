"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variant: string | null
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, variant: string | null) => void
  updateQuantity: (id: string, variant: string | null, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on initial render only
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error)
    }
    setIsInitialized(true)
  }, [])

  // Save cart to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isInitialized])

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.variant === item.variant,
      )

      if (existingItemIndex > -1) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity
        return updatedItems
      } else {
        // Add new item
        return [...prevItems, item]
      }
    })
  }

  const removeFromCart = (id: string, variant: string | null) => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.variant === variant)))
  }

  const updateQuantity = (id: string, variant: string | null, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.variant === variant ? { ...item, quantity } : item)),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  // Instead of throwing an error, return undefined
  return context
}
