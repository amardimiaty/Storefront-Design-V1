import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Montserrat, Raleway, Merriweather } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/layout/header"
import Footer from "@/components/footer"
import { WishlistProvider } from "@/components/wishlist/wishlist-context"
import { CartProvider } from "@/components/cart/cart-context"
import CookieConsent from "@/components/cookie-consent"
import NewsletterPopup from "@/components/newsletter-popup"
import { NotificationProvider } from "@/lib/notification-context"
import { HomeLayoutProvider } from "@/lib/home-layout-context"
import { MenuProvider } from "@/lib/menu-context"

// Font definitions
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-modern",
})

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-minimal",
})

export const metadata: Metadata = {
  title: "ModernShop - Premium eCommerce Experience",
  description: "Discover a curated selection of premium products for modern living",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${raleway.variable} ${merriweather.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans min-h-screen bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <HomeLayoutProvider>
            <NotificationProvider>
              <WishlistProvider>
                <CartProvider>
                  <MenuProvider>
                    <div className="relative flex min-h-screen flex-col">
                      <Header />
                      <main className="flex-1 pt-16 md:pt-20">{children}</main>
                      <Footer />
                    </div>
                    <Toaster />
                    <CookieConsent />
                    <NewsletterPopup />
                  </MenuProvider>
                </CartProvider>
              </WishlistProvider>
            </NotificationProvider>
          </HomeLayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
