"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type WishlistItem = {
  id: string
  name: string
  price: number
  image: string
  slug: string
  category?: string
}

type WishlistContextType = {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [wishlistCount, setWishlistCount] = useState(0)

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist")
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist)
        setWishlistItems(parsedWishlist)
        setWishlistCount(parsedWishlist.length)
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
        localStorage.removeItem("wishlist")
      }
    }
  }, [])

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems))
    setWishlistCount(wishlistItems.length)
  }, [wishlistItems])

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.some((existingItem) => existingItem.id === item.id)) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.id === id)
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
