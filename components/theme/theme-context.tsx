"use client"

import type React from "react"

// This file is kept for compatibility but no longer provides theme switching functionality
// The theme is now fixed to light mode with blue color scheme

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function useThemeColor() {
  // Return dummy values since we no longer support theme switching
  return {
    theme: "light",
    setTheme: () => {},
    themeColor: "blue",
    setThemeColor: () => {},
  }
}
