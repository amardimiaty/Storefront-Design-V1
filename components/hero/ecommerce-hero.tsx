"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSpring, animated } from "react-spring"

// Define the slide interface with font options and position settings
interface HeroSlide {
  id: string
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  imageUrl?: string
  titleFont?: string
  subtitleFont?: string
  descriptionFont?: string
  // Position properties
  horizontalPosition?: "left" | "center" | "right"
  verticalPosition?: "top" | "middle" | "bottom"
  contentWidth?: number
  textAlign?: "left" | "center" | "right"
  // Button styling properties
  buttonBgColor?: string
  buttonTextColor?: string
  buttonFont?: string
  buttonSize?: "default" | "sm" | "lg"
  buttonVariant?: "default" | "outline" | "ghost" | "link"
  // Button effect properties
  buttonEffect?: "none" | "scale" | "slide" | "glow" | "shadow" | "underline"
  buttonTransition?: "fast" | "normal" | "slow"
}

// Default slides with modern fonts
const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    title: "Summer Collection",
    subtitle: "New Arrivals",
    description: "Discover our latest summer styles with breathable fabrics perfect for warm weather.",
    buttonText: "Shop Now",
    buttonLink: "/collections/summer",
    imageUrl: "/modern-summer-fashion.png",
    titleFont: "font-display",
    subtitleFont: "font-modern",
    descriptionFont: "font-sans",
    horizontalPosition: "left",
    verticalPosition: "middle",
    contentWidth: 50,
    textAlign: "left",
    buttonBgColor: "#0f172a",
    buttonTextColor: "#ffffff",
    buttonFont: "font-sans",
    buttonSize: "default",
    buttonVariant: "default",
  },
  {
    id: "2",
    title: "Premium Essentials",
    subtitle: "Timeless Classics",
    description: "Elevate your wardrobe with our premium essentials designed to last season after season.",
    buttonText: "Explore",
    buttonLink: "/collections/essentials",
    imageUrl: "/modern-fashion-collection.png",
    titleFont: "font-serif",
    subtitleFont: "font-minimal",
    descriptionFont: "font-sans",
    horizontalPosition: "left",
    verticalPosition: "middle",
    contentWidth: 50,
    textAlign: "left",
    buttonBgColor: "#0f172a",
    buttonTextColor: "#ffffff",
    buttonFont: "font-sans",
    buttonSize: "default",
    buttonVariant: "default",
  },
]

export function EcommerceHero() {
  const [slides, setSlides] = useState<HeroSlide[]>(defaultSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load slides from localStorage if available
  useEffect(() => {
    const storedSlides = localStorage.getItem("heroSlides")
    if (storedSlides) {
      try {
        const parsedSlides = JSON.parse(storedSlides)
        if (Array.isArray(parsedSlides) && parsedSlides.length > 0) {
          setSlides(parsedSlides)
        }
      } catch (error) {
        console.error("Failed to parse hero slides from localStorage:", error)
      }
    }
  }, [])

  // Animation for slide transitions
  const fadeProps = useSpring({
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? "translateY(20px)" : "translateY(0px)",
    config: { tension: 280, friction: 60 },
  })

  // Auto-rotate slides
  useEffect(() => {
    const startTimer = () => {
      timerRef.current = setTimeout(() => {
        setIsTransitioning(true)
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length)
          setIsTransitioning(false)
        }, 500)
      }, 5000)
    }

    startTimer()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [currentSlide, slides.length])

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  }, [])

  // Get the current slide with font fallbacks
  const slide = slides[currentSlide]
  const titleFontClass = slide?.titleFont || "font-display"
  const subtitleFontClass = slide?.subtitleFont || "font-modern"
  const descriptionFontClass = slide?.descriptionFont || "font-sans"

  // Get position settings with fallbacks
  const horizontalPosition = slide?.horizontalPosition || "left"
  const verticalPosition = slide?.verticalPosition || "middle"
  const contentWidth = slide?.contentWidth || 50
  const textAlign = slide?.textAlign || "left"

  // Generate position classes
  const getHorizontalPositionClass = () => {
    switch (horizontalPosition) {
      case "left":
        return "justify-start"
      case "center":
        return "justify-center"
      case "right":
        return "justify-end"
      default:
        return "justify-start"
    }
  }

  const getVerticalPositionClass = () => {
    switch (verticalPosition) {
      case "top":
        return "items-start pt-24"
      case "middle":
        return "items-center"
      case "bottom":
        return "items-end pb-24"
      default:
        return "items-center"
    }
  }

  const getTextAlignClass = () => {
    switch (textAlign) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  // Handle button click for navigation
  const handleButtonClick = () => {
    if (slide?.buttonLink.startsWith("#")) {
      // Handle section scrolling
      const sectionId = slide.buttonLink.substring(1)
      const section = document.getElementById(sectionId)

      if (section) {
        // Add a small offset to account for any fixed headers
        const yOffset = -80
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset

        window.scrollTo({
          top: y,
          behavior: "smooth",
        })

        console.log(`Scrolling to section: ${sectionId}`)
      } else {
        console.warn(`Section with ID "${sectionId}" not found on the page`)
      }
    } else if (slide?.buttonLink) {
      // Handle regular page navigation
      window.location.href = slide.buttonLink
    }
  }

  const getButtonEffectClass = (slide: HeroSlide) => {
    const transitionSpeed =
      slide.buttonTransition === "fast"
        ? "duration-200"
        : slide.buttonTransition === "slow"
          ? "duration-500"
          : "duration-300"

    switch (slide.buttonEffect) {
      case "scale":
        return `transition-transform ${transitionSpeed} hover:scale-105`
      case "glow":
        return `transition-all ${transitionSpeed} hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]`
      case "shadow":
        return `transition-shadow ${transitionSpeed} hover:shadow-lg`
      case "underline":
        return `transition-all ${transitionSpeed} hover:underline`
      case "slide":
        return `transition-all ${transitionSpeed}`
      default:
        return ""
    }
  }

  if (!slide) return null

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white h-screen">
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{
              backgroundImage: slide.imageUrl ? `url(${slide.imageUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          </div>
        ))}
      </div>

      <div
        className={`container mx-auto px-4 h-full flex ${getHorizontalPositionClass()} ${getVerticalPositionClass()} relative z-20`}
      >
        <div className={`${getTextAlignClass()}`} style={{ maxWidth: `${contentWidth}%` }}>
          <animated.div style={fadeProps}>
            <p className={`text-lg md:text-xl mb-3 text-primary-foreground ${subtitleFontClass}`}>{slide.subtitle}</p>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${titleFontClass}`}>{slide.title}</h1>
            <p className={`text-lg md:text-xl mb-8 ${descriptionFontClass}`}>{slide.description}</p>
            <div
              className={`flex ${textAlign === "center" ? "justify-center" : textAlign === "right" ? "justify-end" : "justify-start"}`}
            >
              <Button
                size={(slide.buttonSize as "default" | "sm" | "lg") || "default"}
                variant={(slide.buttonVariant as "default" | "outline" | "ghost" | "link") || "default"}
                className={`${slide.buttonFont || "font-sans"} group ${getButtonEffectClass(slide)}`}
                style={{
                  backgroundColor: slide.buttonVariant === "default" ? slide.buttonBgColor : "transparent",
                  color: slide.buttonTextColor,
                  borderColor: slide.buttonVariant === "outline" ? slide.buttonBgColor : "transparent",
                }}
                onClick={handleButtonClick}
              >
                {slide.buttonText}
                <ArrowRight
                  className={`ml-2 h-4 w-4 ${slide.buttonEffect === "slide" ? "transition-transform group-hover:translate-x-1" : ""}`}
                />
              </Button>
            </div>
          </animated.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true)
              setTimeout(() => {
                setCurrentSlide(index)
                setIsTransitioning(false)
              }, 500)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
