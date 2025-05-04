"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type NotificationMessage = {
  id: string
  text: string
  highlight: string
  active: boolean
}

type NotificationContextType = {
  notifications: NotificationMessage[]
  activeNotifications: NotificationMessage[]
  addNotification: (text: string, highlight: string) => void
  removeNotification: (id: string) => void
  toggleNotification: (id: string) => void
  updateNotification: (id: string, text: string, highlight: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Initial notifications
const defaultNotifications: NotificationMessage[] = [
  {
    id: "1",
    text: "Summer Sale! Get 20% off on all products with code ",
    highlight: "SUMMER20",
    active: false,
  },
  {
    id: "2",
    text: "Free shipping on all orders over $50! ",
    highlight: "Limited time offer",
    active: false,
  },
  {
    id: "3",
    text: "New arrivals just dropped! ",
    highlight: "Shop the collection",
    active: false,
  },
  {
    id: "4",
    text: "Join our rewards program and earn points with every purchase ",
    highlight: "Sign up now",
    active: false,
  },
]

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationMessage[]>(() => {
    // Try to load from localStorage in client
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("notifications")
      return saved ? JSON.parse(saved) : defaultNotifications
    }
    return defaultNotifications
  })

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  // Filter active notifications
  const activeNotifications = notifications.filter((notification) => notification.active)

  // Add a new notification
  const addNotification = (text: string, highlight: string) => {
    const newNotification: NotificationMessage = {
      id: Date.now().toString(),
      text,
      highlight,
      active: false, // Changed from true to false
    }
    setNotifications((prev) => [...prev, newNotification])
  }

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Toggle a notification's active status
  const toggleNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, active: !notification.active } : notification,
      ),
    )
  }

  // Update a notification
  const updateNotification = (id: string, text: string, highlight: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, text, highlight } : notification)),
    )
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        activeNotifications,
        addNotification,
        removeNotification,
        toggleNotification,
        updateNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
