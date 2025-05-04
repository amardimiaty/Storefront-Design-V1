"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  const footerLinks = [
    {
      title: "Shop",
      links: [
        { name: "All Products", href: "/shop" },
        { name: "New Arrivals", href: "/new-arrivals" },
        { name: "Featured", href: "/featured" },
        { name: "Sale", href: "/sale" },
        { name: "Brands", href: "/brands" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Contact Us", href: "/contact" },
        { name: "Blog", href: "/blog" },
        { name: "FAQs", href: "/faqs" },
        { name: "Store Locator", href: "/stores" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "My Account", href: "/account" },
        { name: "Track Order", href: "/track-order" },
        { name: "Shipping & Returns", href: "/shipping" },
        { name: "Size Guide", href: "/size-guide" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
  ]

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
  ]

  const paymentMethods = [
    { name: "Visa", image: "/payment-visa.png" },
    { name: "Mastercard", image: "/payment-mastercard.png" },
    { name: "American Express", image: "/payment-amex.png" },
    { name: "PayPal", image: "/payment-paypal.png" },
    { name: "Apple Pay", image: "/payment-applepay.png" },
  ]

  // Don't render the footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      {/* Newsletter Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Newsletter</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and be the first to receive updates on new arrivals, special offers, and
              exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="pr-10 rounded-full h-12 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <Button className="h-12 px-6 rounded-full">
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 dark:from-primary dark:to-blue-400">
                ModernStore
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              ModernStore offers a curated selection of high-quality products for the modern lifestyle. Discover the
              perfect items for your home, wardrobe, and beyond.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>123 Premium Avenue, New York, NY 10001, USA</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Customer Care: +1 (800) 123-4567</span>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>+1 (800) 123-4567</span>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>support@modernstore.com</span>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>

            <div className="flex space-x-3">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-primary hover:text-white dark:hover:bg-primary transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((group) => (
            <div key={group.title} className="lg:col-span-2">
              <h3 className="text-base font-bold mb-6">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                    >
                      <span className="relative overflow-hidden">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-base font-bold">We Accept</h3>
            <div className="flex flex-wrap gap-4">
              {paymentMethods.map((item) => (
                <div
                  key={item.name}
                  className="h-8 w-12 relative bg-white dark:bg-gray-800 rounded-md p-1 flex items-center justify-center"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={32}
                    height={20}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-muted-foreground text-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p>&copy; {currentYear} ModernStore. All rights reserved.</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
