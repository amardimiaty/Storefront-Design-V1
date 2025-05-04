"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Container } from "@/components/layout/container"
import { FeaturedCategories } from "@/components/categories/featured-categories"
import { TrendingProducts } from "@/components/products/trending-products"
import { AdBanner } from "@/components/advertisements/ad-banner"
import { PromoCard } from "@/components/advertisements/promo-card"
import { TestimonialCarousel } from "@/components/testimonials/testimonial-carousel"
import { ModernNewsletter } from "@/components/newsletter/modern-newsletter"
import FeaturedProducts from "@/components/featured-products"
import PageLoading from "@/components/page-loading"
import { products } from "@/lib/mock-data"
import { EcommerceHero } from "@/components/hero/ecommerce-hero"
import { useHomeLayout, type HomeSectionId } from "@/lib/home-layout-context"
import { BenefitsSection } from "@/components/sections/benefits-section"

export default function HomePage() {
  const { getSectionOrder, isSectionVisible } = useHomeLayout()
  const [isClient, setIsClient] = useState(false)
  const [categoriesSettings, setCategoriesSettings] = useState(null)

  // Add a state to force re-renders when storage changes
  const [storageChanged, setStorageChanged] = useState(0)

  // Listen for storage events to update the UI when settings change
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage changed, updating UI...")
      setStorageChanged((prev) => prev + 1)

      // Re-load featured categories settings
      if (typeof window !== "undefined") {
        try {
          const savedSettings = localStorage.getItem("featured-categories-settings")
          if (savedSettings) {
            setCategoriesSettings(JSON.parse(savedSettings))
          }
        } catch (error) {
          console.error("Error loading featured categories settings:", error)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Also trigger on first load
    handleStorageChange()

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  // Set isClient to true after component mounts to avoid hydration issues
  useEffect(() => {
    setIsClient(true)

    // Load featured categories settings on mount
    if (typeof window !== "undefined") {
      try {
        const savedSettings = localStorage.getItem("featured-categories-settings")
        if (savedSettings) {
          setCategoriesSettings(JSON.parse(savedSettings))
        }
      } catch (error) {
        console.error("Error loading featured categories settings:", error)
      }
    }
  }, [])

  // Get featured products
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 8)

  // Get new arrivals
  const newArrivals = products.filter((product) => product.isNew).slice(0, 4)

  // Mock categories data
  const categories = [
    {
      id: "1",
      name: "Women's Fashion",
      description: "Discover the latest trends in women's clothing",
      image: "/diverse-clothing-tops.png",
      slug: "womens-fashion",
      itemCount: 120,
    },
    {
      id: "2",
      name: "Men's Collection",
      description: "Stylish and comfortable men's apparel",
      image: "/outerwear-collection.png",
      slug: "mens-collection",
      itemCount: 95,
    },
    {
      id: "3",
      name: "Accessories",
      description: "Complete your look with our accessories",
      image: "/diverse-jewelry-collection.png",
      slug: "accessories",
      itemCount: 78,
    },
    {
      id: "4",
      name: "Home Decor",
      description: "Elevate your living space",
      image: "/premium-living-decor.png",
      slug: "home-decor",
      itemCount: 64,
    },
    {
      id: "5",
      name: "Electronics",
      description: "The latest gadgets and tech",
      image: "/premium-electronics-gadgets.png",
      slug: "electronics",
      itemCount: 42,
    },
    {
      id: "6",
      name: "Beauty & Care",
      description: "Premium skincare and beauty products",
      image: "/luxury-cosmetics-display.png",
      slug: "beauty-care",
      itemCount: 56,
    },
    {
      id: "7",
      name: "Jewelry",
      description: "Timeless elegance",
      image: "/diverse-jewelry-collection.png",
      slug: "jewelry",
      itemCount: 22,
    },
    {
      id: "8",
      name: "Watches",
      description: "Precision craftsmanship",
      image: "/luxury-timepiece.png",
      slug: "watches",
      itemCount: 15,
    },
    {
      id: "9",
      name: "Bags",
      description: "Carry in style",
      image: "/diverse-bag-collection.png",
      slug: "bags",
      itemCount: 28,
    },
  ]

  // Mock testimonials data
  const testimonials = [
    {
      id: "1",
      content:
        "I've been shopping here for years and the quality never disappoints. The customer service is exceptional and delivery is always prompt.",
      author: "Sarah Johnson",
      role: "Loyal Customer",
      avatar: "/professional-woman-headshot.png",
      rating: 5,
    },
    {
      id: "2",
      content:
        "The selection of products is amazing. I always find exactly what I'm looking for, and often discover new items I didn't know I needed!",
      author: "Michael Chen",
      role: "Fashion Enthusiast",
      avatar: "/professional-man-headshot.png",
      rating: 5,
    },
    {
      id: "3",
      content:
        "Fast shipping, beautiful packaging, and high-quality products. This is my go-to store for gifts and personal shopping.",
      author: "Emma Rodriguez",
      role: "Interior Designer",
      avatar: "/professional-headshot-person.png",
      rating: 4,
    },
  ]

  // Map of section IDs to their components
  const sectionComponents: Record<HomeSectionId, React.ReactNode> = {
    hero: <EcommerceHero />,
    categories: (
      <section id="categories">
        {categoriesSettings ? (
          <FeaturedCategories
            categories={categories}
            title={categoriesSettings.title}
            subtitle={categoriesSettings.subtitle}
            gridColumns={Number.parseInt(categoriesSettings.gridColumns)}
            maxCategories={Number.parseInt(categoriesSettings.maxCategories)}
            buttonSize={categoriesSettings.buttonSize}
            gridGap={categoriesSettings.gridGap}
            gridWidth={categoriesSettings.gridWidth}
          />
        ) : (
          <FeaturedCategories categories={categories} layout="masonry" />
        )}
      </section>
    ),
    "ad-banner-1": (
      <section className="py-8">
        <Container>
          {(() => {
            // Use IIFE to allow complex logic in JSX
            try {
              // Check if we're on the client side
              if (typeof window !== "undefined") {
                // Try to get saved settings from localStorage
                const savedSettings = localStorage.getItem("promo-banner-1-settings")
                if (savedSettings) {
                  const settings = JSON.parse(savedSettings)
                  return (
                    <AdBanner
                      title={settings.title}
                      description={settings.description}
                      ctaText={settings.ctaText}
                      ctaLink={settings.ctaLink}
                      backgroundColor={settings.backgroundColor}
                      textColor={settings.textColor}
                      size={settings.size}
                      dismissible={settings.dismissible}
                      imageSrc={settings.imageSrc}
                    />
                  )
                }
              }

              // Fall back to default if no saved settings or not on client
              return (
                <AdBanner
                  title="Summer Sale | Up to 50% Off"
                  description="Limited time offer on selected items. Don't miss out!"
                  ctaText="Shop the Sale"
                  ctaLink="/sale"
                  backgroundColor="bg-gradient-to-r from-rose-500 to-orange-500"
                  size="large"
                />
              )
            } catch (error) {
              console.error("Error rendering banner:", error)
              // Return default banner if there's an error
              return (
                <AdBanner
                  title="Summer Sale | Up to 50% Off"
                  description="Limited time offer on selected items. Don't miss out!"
                  ctaText="Shop the Sale"
                  ctaLink="/sale"
                  backgroundColor="bg-gradient-to-r from-rose-500 to-orange-500"
                  size="large"
                />
              )
            }
          })()}
        </Container>
      </section>
    ),
    "new-arrivals": (
      <section id="new-arrivals">
        <TrendingProducts
          title="New Arrivals"
          subtitle="The latest additions to our collection"
          products={newArrivals}
        />
      </section>
    ),
    "promo-cards": (
      <section className="py-12 bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PromoCard
              title="Summer Essentials"
              subtitle="New Collection"
              description="Lightweight fabrics for hot days"
              imageSrc="/diverse-clothing-tops.png"
              ctaText="Shop Now"
              ctaLink="/products?category=summer"
              tag="Featured"
            />
            <PromoCard
              title="Home Decor Sale"
              subtitle="Limited Time"
              description="Transform your space"
              imageSrc="/premium-living-decor.png"
              ctaText="Explore"
              ctaLink="/products?category=home"
              discount="Up to 30% Off"
            />
          </div>
        </Container>
      </section>
    ),
    "featured-products": (
      <section id="featured-products" className="py-12">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <a href="/products" className="text-primary hover:underline">
              View All
            </a>
          </div>
          <FeaturedProducts />
        </Container>
      </section>
    ),
    "ad-banner-2": (
      <section className="py-8">
        <Container>
          {(() => {
            // Use IIFE to allow complex logic in JSX
            try {
              // Check if we're on the client side
              if (typeof window !== "undefined") {
                // Try to get saved settings from localStorage
                const savedSettings = localStorage.getItem("promo-banner-2-settings")
                if (savedSettings) {
                  const settings = JSON.parse(savedSettings)
                  return (
                    <AdBanner
                      title={settings.title}
                      description={settings.description}
                      ctaText={settings.ctaText}
                      ctaLink={settings.ctaLink}
                      backgroundColor={settings.backgroundColor}
                      textColor={settings.textColor}
                      size={settings.size}
                      dismissible={settings.dismissible}
                      imageSrc={settings.imageSrc}
                    />
                  )
                }
              }

              // Fall back to default if no saved settings or not on client
              return (
                <AdBanner
                  title="Free Shipping on Orders Over $50"
                  description="Plus, become a member for exclusive perks and offers"
                  ctaText="Join Now"
                  ctaLink="/membership"
                  backgroundColor="bg-gradient-to-r from-blue-600 to-indigo-600"
                  size="medium"
                />
              )
            } catch (error) {
              console.error("Error rendering banner:", error)
              // Return default banner if there's an error
              return (
                <AdBanner
                  title="Free Shipping on Orders Over $50"
                  description="Plus, become a member for exclusive perks and offers"
                  ctaText="Join Now"
                  ctaLink="/membership"
                  backgroundColor="bg-gradient-to-r from-blue-600 to-indigo-600"
                  size="medium"
                />
              )
            }
          })()}
        </Container>
      </section>
    ),
    testimonials: (
      <section id="testimonials">
        <TestimonialCarousel testimonials={testimonials} />
      </section>
    ),
    newsletter: (
      <section id="newsletter">
        <ModernNewsletter backgroundImage="/featured-products-collection.png" />
      </section>
    ),
    benefits: (
      <section id="benefits" className="py-12">
        <BenefitsSection />
      </section>
    ),
  }

  // If not client-side yet, show loading state to avoid hydration issues
  if (!isClient) {
    return <PageLoading />
  }

  // Get the ordered sections that are visible
  const visibleSections = getSectionOrder()

  return (
    <PageLoading>
      <div className="min-h-screen bg-background text-foreground">
        <main>
          {/* Render sections in the order specified by the context */}
          {visibleSections.map((sectionId) => (
            <div key={`${sectionId}-${storageChanged}`} className="section-wrapper">
              {sectionComponents[sectionId]}
            </div>
          ))}

          {/* Show message if no sections are visible */}
          {visibleSections.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                No sections are currently visible. Visit the admin panel to configure your home page.
              </p>
            </div>
          )}
        </main>
      </div>
    </PageLoading>
  )
}
