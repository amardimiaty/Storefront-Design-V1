"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Category } from "@/components/mega-menu"

interface MobileCategoryMenuProps {
  categories: Category[]
  onClose: () => void
}

export default function MobileCategoryMenu({ categories, onClose }: MobileCategoryMenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)

  const handleBack = () => {
    setActiveCategory(null)
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-950 overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">{activeCategory ? activeCategory.name : "Categories"}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
      </div>

      <div className="p-4">
        {!activeCategory ? (
          <div className="grid grid-cols-1 gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900"
                onClick={() => setActiveCategory(category)}
              >
                <div className="flex items-center gap-3">
                  {category.icon}
                  <span className="font-medium">{category.name}</span>
                  {category.new && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      New
                    </Badge>
                  )}
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button className="flex items-center gap-2 mb-4 text-primary" onClick={handleBack}>
              <ChevronLeft className="h-4 w-4" />
              Back to Categories
            </button>

            <div className="grid grid-cols-1 gap-4 mb-6">
              {activeCategory.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.name}
                  href={subcategory.href}
                  className={cn(
                    "block p-3 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900",
                    "flex items-center justify-between",
                  )}
                  onClick={onClose}
                >
                  <div className="flex items-center gap-2">
                    <span>{subcategory.name}</span>
                    {subcategory.featured && (
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        Popular
                      </Badge>
                    )}
                    {subcategory.new && (
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        New
                      </Badge>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>

            {activeCategory.promotion && (
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="relative h-40 mb-4 overflow-hidden rounded-md">
                  <Image
                    src={activeCategory.promotion.image || "/placeholder.svg"}
                    alt={activeCategory.promotion.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-2">{activeCategory.promotion.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{activeCategory.promotion.description}</p>
                <Link href={activeCategory.promotion.href} onClick={onClose}>
                  <Button size="sm" className="w-full">
                    Shop Now
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
