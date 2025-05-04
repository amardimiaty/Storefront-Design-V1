"use client"

import { Check, ChevronDown } from "lucide-react"
import { useThemeColor } from "./theme-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const themes = [
  {
    value: "default",
    label: "Default",
    color: "bg-primary",
  },
  {
    value: "purple",
    label: "Purple",
    color: "bg-purple-500",
  },
  {
    value: "blue",
    label: "Blue",
    color: "bg-blue-500",
  },
  {
    value: "green",
    label: "Green",
    color: "bg-green-500",
  },
]

export function ThemeSelector() {
  const { themeColor, setThemeColor } = useThemeColor()

  const currentTheme = themes.find((t) => t.value === themeColor) || themes[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <div className={cn("h-4 w-4 rounded-full", currentTheme.color)} />
          <span>{currentTheme.label}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setThemeColor(theme.value as any)}
            className="flex items-center gap-2"
          >
            <div className={cn("h-4 w-4 rounded-full", theme.color)} />
            <span>{theme.label}</span>
            {theme.value === themeColor && <Check className="ml-auto h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
