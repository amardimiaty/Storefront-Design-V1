"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/products/featured-products"
import CategoryGrid from "@/components/products/category-grid"
import Newsletter from "@/components/newsletter"
import StoreLocation from "@/components/store-location"

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <Image src="/minimalist-fashion-store.png" alt="Modern Store Hero" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container relative z-10 mx-auto flex h-full items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl text-white"
          >
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">Discover Modern Essentials</h1>
            <p className="mt-4 text-lg md:text-xl">
              Curated collections for the contemporary lifestyle. Quality products that stand the test of time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full bg-transparent text-white hover:bg-white hover:text-black"
              >
                <Link href="/collections">Explore Collections</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-3xl font-bold md:text-4xl">Shop by Category</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
              Explore our carefully curated categories designed to meet your everyday needs with style and
              functionality.
            </p>
          </motion.div>
          <div className="mt-12">
            <CategoryGrid />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-3xl font-bold md:text-4xl">Featured Products</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
              Our most popular products based on sales and customer satisfaction.
            </p>
          </motion.div>
          <div className="mt-12">
            <FeaturedProducts />
          </div>
        </div>
      </section>

      {/* Store Location */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-center text-3xl font-bold md:text-4xl">Visit Our Store</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
              Come experience our products in person at our flagship store.
            </p>
          </motion.div>
          <div className="mt-12">
            <StoreLocation />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
