"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "clothing",
    name: "Clothing",
    image: "/modern-clothing-rack.png",
    href: "/products?category=clothing",
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "/modern-accessories.png",
    href: "/products?category=accessories",
  },
  {
    id: "footwear",
    name: "Footwear",
    image: "/modern-shoes-collection.png",
    href: "/products?category=footwear",
  },
  {
    id: "home",
    name: "Home",
    image: "/modern-home-decor.png",
    href: "/products?category=home",
  },
]

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link href={category.href} className="group block overflow-hidden rounded-lg">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{category.name}</h3>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
