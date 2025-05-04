import { delay, products, categories, reviews } from "@/lib/mock-data"

// Simulated API functions with realistic delays

export async function getProducts(
  options: {
    category?: string
    search?: string
    sort?: string
    featured?: boolean
  } = {},
) {
  // Simulate API delay
  await delay(800)

  let filteredProducts = [...products]

  // Filter by category
  if (options.category) {
    filteredProducts = filteredProducts.filter((product) => product.category === options.category)
  }

  // Filter by search term
  if (options.search) {
    const searchLower = options.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    )
  }

  // Filter featured products
  if (options.featured) {
    filteredProducts = filteredProducts.filter((product) => product.featured)
  }

  // Apply sorting
  if (options.sort) {
    switch (options.sort) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      default:
        // 'featured' - no specific sorting
        break
    }
  }

  return {
    products: filteredProducts,
    total: filteredProducts.length,
  }
}

export async function getProduct(slug: string) {
  // Simulate API delay
  await delay(1000)

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    throw new Error(`Product with slug "${slug}" not found`)
  }

  return product
}

export async function getCategories() {
  // Simulate API delay
  await delay(500)

  return {
    categories,
  }
}

export async function getCategory(slug: string) {
  // Simulate API delay
  await delay(500)

  const category = categories.find((c) => c.slug === slug)

  if (!category) {
    throw new Error(`Category with slug "${slug}" not found`)
  }

  return category
}

export async function getProductReviews(productId: string) {
  // Simulate API delay
  await delay(700)

  const productReviews = reviews.filter((review) => review.productId === productId)

  return {
    reviews: productReviews,
    total: productReviews.length,
  }
}

export async function createCheckout(items: any[]) {
  // Simulate API delay
  await delay(1200)

  return {
    id: `checkout-${Date.now()}`,
    token: `token-${Math.random().toString(36).substring(2, 15)}`,
    lines: items,
    subtotalPrice: {
      gross: {
        amount: items.reduce((total, item) => total + item.price * item.quantity, 0),
        currency: "USD",
      },
    },
  }
}

export async function completeCheckout(checkoutId: string, paymentData: any) {
  // Simulate API delay
  await delay(1500)

  return {
    order: {
      id: `order-${Date.now()}`,
      number: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      status: "CONFIRMED",
      created: new Date().toISOString(),
      total: {
        gross: {
          amount: paymentData.amount,
          currency: "USD",
        },
      },
    },
  }
}

export async function login(email: string, password: string) {
  // Simulate API delay
  await delay(1000)

  // This is a mock function, in a real app you would validate credentials
  if (email && password) {
    return {
      token: `token-${Math.random().toString(36).substring(2, 15)}`,
      user: {
        id: "u1",
        email,
        firstName: "John",
        lastName: "Doe",
      },
    }
  }

  throw new Error("Invalid credentials")
}

export async function register(userData: {
  email: string
  password: string
  firstName: string
  lastName: string
}) {
  // Simulate API delay
  await delay(1200)

  // This is a mock function, in a real app you would create a user
  if (userData.email && userData.password) {
    return {
      token: `token-${Math.random().toString(36).substring(2, 15)}`,
      user: {
        id: `user-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
      },
    }
  }

  throw new Error("Invalid user data")
}
