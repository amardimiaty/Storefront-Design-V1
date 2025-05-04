"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CartContextType {
  cartItems: any[]
  addToCart: (product: any) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([])

  const addToCart = (product: any) => {
    setCartItems((prevItems) => [...prevItems, product])
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
  )
}
