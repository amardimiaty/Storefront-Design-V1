// Mock data for the entire store

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number | null
  images: string[]
  category: string
  tags: string[]
  featured: boolean
  inStock: boolean
  rating: number
  reviewCount: number
  variants: ProductVariant[]
  attributes: ProductAttribute[]
  createdAt: string
  brand?: string
  bestSeller?: boolean
  new?: boolean
  sale?: boolean
  salePercentage?: number
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  inStock: boolean
  attributes: {
    name: string
    value: string
  }[]
}

export interface ProductAttribute {
  name: string
  values: string[]
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parentId: string | null
  featured?: boolean
  productCount?: number
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  addresses: Address[]
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  company?: string
  streetAddress1: string
  streetAddress2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault: boolean
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  title: string
  content: string
  createdAt: string
  helpful?: number
  verified?: boolean
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  description?: string
  featured?: boolean
  productCount?: number
}

// Mock Categories
export const categories: Category[] = [
  {
    id: "clothing",
    name: "Clothing",
    slug: "clothing",
    description: "High-quality clothing for everyday wear",
    image: "/modern-clothing-rack.png",
    parentId: null,
    featured: true,
    productCount: 124,
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    description: "Stylish accessories to complete your look",
    image: "/modern-accessories.png",
    parentId: null,
    featured: true,
    productCount: 86,
  },
  {
    id: "footwear",
    name: "Footwear",
    slug: "footwear",
    description: "Comfortable and stylish footwear for all occasions",
    image: "/modern-shoes-collection.png",
    parentId: null,
    featured: true,
    productCount: 68,
  },
  {
    id: "home",
    name: "Home",
    slug: "home",
    description: "Beautiful items for your modern home",
    image: "/modern-home-decor.png",
    parentId: null,
    featured: true,
    productCount: 93,
  },
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image: "/category-electronics.png",
    parentId: null,
    featured: true,
    productCount: 112,
  },
  {
    id: "beauty",
    name: "Beauty",
    slug: "beauty",
    description: "Premium beauty and personal care products",
    image: "/category-beauty.png",
    parentId: null,
    featured: true,
    productCount: 75,
  },
  {
    id: "jewelry",
    name: "Jewelry & Watches",
    slug: "jewelry-watches",
    description: "Elegant jewelry and premium timepieces",
    image: "/luxury-jewelry-watches.png",
    parentId: null,
    featured: false,
    productCount: 54,
  },
  {
    id: "tops",
    name: "Tops",
    slug: "tops",
    description: "T-shirts, blouses, and more",
    image: "/diverse-clothing-tops.png",
    parentId: "clothing",
    productCount: 48,
  },
  {
    id: "bottoms",
    name: "Bottoms",
    slug: "bottoms",
    description: "Pants, shorts, and skirts",
    image: "/assorted-clothing-bottoms.png",
    parentId: "clothing",
    productCount: 36,
  },
  {
    id: "outerwear",
    name: "Outerwear",
    slug: "outerwear",
    description: "Jackets, coats, and more",
    image: "/outerwear-collection.png",
    parentId: "clothing",
    productCount: 24,
  },
  {
    id: "dresses",
    name: "Dresses",
    slug: "dresses",
    description: "Casual and formal dresses",
    image: "/diverse-dress-collection.png",
    parentId: "clothing",
    productCount: 16,
  },
  {
    id: "bags",
    name: "Bags",
    slug: "bags",
    description: "Handbags, backpacks, and more",
    image: "/diverse-bag-collection.png",
    parentId: "accessories",
    productCount: 32,
  },
  {
    id: "jewelry-acc",
    name: "Jewelry",
    slug: "jewelry-accessories",
    description: "Necklaces, earrings, and more",
    image: "/diverse-jewelry-collection.png",
    parentId: "accessories",
    productCount: 28,
  },
  {
    id: "watches-acc",
    name: "Watches",
    slug: "watches-accessories",
    description: "Analog, digital, and smart watches",
    image: "/watch-collection.png",
    parentId: "accessories",
    productCount: 18,
  },
  {
    id: "hats",
    name: "Hats & Caps",
    slug: "hats-caps",
    description: "Stylish hats and caps",
    image: "/placeholder.svg?height=800&width=800&query=hat collection",
    parentId: "accessories",
    productCount: 8,
  },
  {
    id: "sneakers",
    name: "Sneakers",
    slug: "sneakers",
    description: "Casual and athletic sneakers",
    image: "/placeholder.svg?height=800&width=800&query=sneaker collection",
    parentId: "footwear",
    productCount: 24,
  },
  {
    id: "boots",
    name: "Boots",
    slug: "boots",
    description: "Stylish and functional boots",
    image: "/placeholder.svg?height=800&width=800&query=boot collection",
    parentId: "footwear",
    productCount: 16,
  },
  {
    id: "sandals",
    name: "Sandals",
    slug: "sandals",
    description: "Comfortable sandals for warm weather",
    image: "/placeholder.svg?height=800&width=800&query=sandal collection",
    parentId: "footwear",
    productCount: 12,
  },
  {
    id: "formal-shoes",
    name: "Formal Shoes",
    slug: "formal-shoes",
    description: "Elegant shoes for formal occasions",
    image: "/placeholder.svg?height=800&width=800&query=formal shoe collection",
    parentId: "footwear",
    productCount: 16,
  },
  {
    id: "decor",
    name: "Decor",
    slug: "decor",
    description: "Beautiful decor for your home",
    image: "/placeholder.svg?height=800&width=800&query=home decor collection",
    parentId: "home",
    productCount: 36,
  },
  {
    id: "furniture",
    name: "Furniture",
    slug: "furniture",
    description: "Stylish and functional furniture",
    image: "/placeholder.svg?height=800&width=800&query=furniture collection",
    parentId: "home",
    productCount: 24,
  },
  {
    id: "kitchenware",
    name: "Kitchenware",
    slug: "kitchenware",
    description: "High-quality kitchenware",
    image: "/placeholder.svg?height=800&width=800&query=kitchenware collection",
    parentId: "home",
    productCount: 18,
  },
  {
    id: "bedding",
    name: "Bedding",
    slug: "bedding",
    description: "Comfortable bedding for a good night's sleep",
    image: "/placeholder.svg?height=800&width=800&query=bedding collection",
    parentId: "home",
    productCount: 15,
  },
  {
    id: "smartphones",
    name: "Smartphones",
    slug: "smartphones",
    description: "Latest smartphones from top brands",
    image: "/placeholder.svg?height=800&width=800&query=smartphone collection",
    parentId: "electronics",
    productCount: 28,
  },
  {
    id: "laptops",
    name: "Laptops",
    slug: "laptops",
    description: "Powerful laptops for work and play",
    image: "/placeholder.svg?height=800&width=800&query=laptop collection",
    parentId: "electronics",
    productCount: 24,
  },
  {
    id: "audio",
    name: "Audio",
    slug: "audio",
    description: "High-quality audio equipment",
    image: "/placeholder.svg?height=800&width=800&query=audio equipment collection",
    parentId: "electronics",
    productCount: 32,
  },
  {
    id: "wearables",
    name: "Wearables",
    slug: "wearables",
    description: "Smart watches and fitness trackers",
    image: "/placeholder.svg?height=800&width=800&query=wearable tech collection",
    parentId: "electronics",
    productCount: 18,
  },
  {
    id: "skincare",
    name: "Skincare",
    slug: "skincare",
    description: "Premium skincare products",
    image: "/placeholder.svg?height=800&width=800&query=skincare collection",
    parentId: "beauty",
    productCount: 32,
  },
  {
    id: "makeup",
    name: "Makeup",
    slug: "makeup",
    description: "High-quality makeup products",
    image: "/placeholder.svg?height=800&width=800&query=makeup collection",
    parentId: "beauty",
    productCount: 28,
  },
  {
    id: "fragrance",
    name: "Fragrance",
    slug: "fragrance",
    description: "Luxury fragrances for men and women",
    image: "/placeholder.svg?height=800&width=800&query=fragrance collection",
    parentId: "beauty",
    productCount: 15,
  },
]

// Mock Brands
export const brands: Brand[] = [
  {
    id: "apple",
    name: "Apple",
    slug: "apple",
    logo: "/brand-apple.png",
    description: "Innovative technology products",
    featured: true,
    productCount: 42,
  },
  {
    id: "samsung",
    name: "Samsung",
    slug: "samsung",
    logo: "/brand-samsung.png",
    description: "Leading electronics manufacturer",
    featured: true,
    productCount: 38,
  },
  {
    id: "nike",
    name: "Nike",
    slug: "nike",
    logo: "/brand-nike.png",
    description: "Athletic apparel and footwear",
    featured: true,
    productCount: 56,
  },
  {
    id: "adidas",
    name: "Adidas",
    slug: "adidas",
    logo: "/brand-adidas.png",
    description: "Sports clothing and accessories",
    featured: true,
    productCount: 48,
  },
  {
    id: "sony",
    name: "Sony",
    slug: "sony",
    logo: "/brand-sony.png",
    description: "Consumer electronics and entertainment",
    featured: true,
    productCount: 32,
  },
  {
    id: "lg",
    name: "LG",
    slug: "lg",
    logo: "/brand-lg.png",
    description: "Home appliances and electronics",
    featured: true,
    productCount: 28,
  },
  {
    id: "microsoft",
    name: "Microsoft",
    slug: "microsoft",
    logo: "/brand-microsoft.png",
    description: "Software and hardware technology",
    featured: true,
    productCount: 24,
  },
  {
    id: "philips",
    name: "Philips",
    slug: "philips",
    logo: "/brand-philips.png",
    description: "Health technology and consumer electronics",
    featured: true,
    productCount: 22,
  },
  {
    id: "zara",
    name: "Zara",
    slug: "zara",
    logo: "/placeholder.svg?height=200&width=200&query=zara logo",
    description: "Fast fashion clothing and accessories",
    featured: false,
    productCount: 64,
  },
  {
    id: "hm",
    name: "H&M",
    slug: "hm",
    logo: "/placeholder.svg?height=200&width=200&query=h&m logo",
    description: "Affordable fashion for everyone",
    featured: false,
    productCount: 58,
  },
  {
    id: "dyson",
    name: "Dyson",
    slug: "dyson",
    logo: "/placeholder.svg?height=200&width=200&query=dyson logo",
    description: "Innovative home appliances",
    featured: false,
    productCount: 18,
  },
  {
    id: "canon",
    name: "Canon",
    slug: "canon",
    logo: "/placeholder.svg?height=200&width=200&query=canon logo",
    description: "Imaging and optical products",
    featured: false,
    productCount: 24,
  },
]

// Expanded Mock Products
export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Cotton Tee",
    slug: "minimalist-cotton-tee",
    description:
      "A comfortable and stylish cotton t-shirt with a minimalist design. Perfect for everyday wear and easy to pair with any outfit. Made from 100% organic cotton that's soft on your skin and environmentally friendly. The relaxed fit and clean lines make this tee a versatile addition to any wardrobe.",
    price: 29.99,
    compareAtPrice: 39.99,
    images: [
      "/minimalist-cotton-t-shirt.png",
      "/minimalist-cotton-t-shirt-back.png",
      "/minimalist-cotton-tee-detail.png",
      "/minimalist-cotton-tshirt-worn.png",
    ],
    category: "clothing",
    tags: ["t-shirt", "cotton", "minimalist", "tops"],
    featured: true,
    inStock: true,
    rating: 4.5,
    reviewCount: 127,
    brand: "zara",
    bestSeller: true,
    sale: true,
    salePercentage: 25,
    variants: [
      {
        id: "1-1",
        name: "White / XS",
        sku: "MCT-WXS",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "XS" },
        ],
      },
      {
        id: "1-2",
        name: "White / S",
        sku: "MCT-WS",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "S" },
        ],
      },
      {
        id: "1-3",
        name: "White / M",
        sku: "MCT-WM",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "M" },
        ],
      },
      {
        id: "1-4",
        name: "White / L",
        sku: "MCT-WL",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "L" },
        ],
      },
      {
        id: "1-5",
        name: "White / XL",
        sku: "MCT-WXL",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "XL" },
        ],
      },
      {
        id: "1-6",
        name: "Black / XS",
        sku: "MCT-BXS",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "XS" },
        ],
      },
      {
        id: "1-7",
        name: "Black / S",
        sku: "MCT-BS",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "S" },
        ],
      },
      {
        id: "1-8",
        name: "Black / M",
        sku: "MCT-BM",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "M" },
        ],
      },
      {
        id: "1-9",
        name: "Black / L",
        sku: "MCT-BL",
        price: 29.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "L" },
        ],
      },
      {
        id: "1-10",
        name: "Black / XL",
        sku: "MCT-BXL",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "XL" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["White", "Black", "Gray", "Navy"],
      },
      {
        name: "Size",
        values: ["XS", "S", "M", "L", "XL"],
      },
    ],
    createdAt: "2023-01-15T08:00:00Z",
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    description:
      "A timeless denim jacket that never goes out of style. Made from high-quality denim with a comfortable fit and classic details. Features a button-up front, chest pockets, and adjustable waist tabs. This versatile piece can be dressed up or down and works for any season.",
    price: 89.99,
    compareAtPrice: null,
    images: [
      "/classic-denim-jacket.png",
      "/denim-jacket-back.png",
      "/denim-jacket-detail.png",
      "/placeholder.svg?height=800&width=800&query=denim jacket worn",
    ],
    category: "clothing",
    tags: ["jacket", "denim", "classic", "outerwear"],
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 94,
    brand: "hm",
    variants: [
      {
        id: "2-1",
        name: "Blue / S",
        sku: "CDJ-BS",
        price: 89.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Blue" },
          { name: "Size", value: "S" },
        ],
      },
      {
        id: "2-2",
        name: "Blue / M",
        sku: "CDJ-BM",
        price: 89.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Blue" },
          { name: "Size", value: "M" },
        ],
      },
      {
        id: "2-3",
        name: "Blue / L",
        sku: "CDJ-BL",
        price: 89.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Blue" },
          { name: "Size", value: "L" },
        ],
      },
      {
        id: "2-4",
        name: "Blue / XL",
        sku: "CDJ-BXL",
        price: 89.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Blue" },
          { name: "Size", value: "XL" },
        ],
      },
      {
        id: "2-5",
        name: "Dark Blue / S",
        sku: "CDJ-DBS",
        price: 89.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Dark Blue" },
          { name: "Size", value: "S" },
        ],
      },
      {
        id: "2-6",
        name: "Dark Blue / M",
        sku: "CDJ-DBM",
        price: 89.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Dark Blue" },
          { name: "Size", value: "M" },
        ],
      },
      {
        id: "2-7",
        name: "Dark Blue / L",
        sku: "CDJ-DBL",
        price: 89.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Dark Blue" },
          { name: "Size", value: "L" },
        ],
      },
      {
        id: "2-8",
        name: "Dark Blue / XL",
        sku: "CDJ-DBXL",
        price: 89.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Dark Blue" },
          { name: "Size", value: "XL" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Blue", "Dark Blue"],
      },
      {
        name: "Size",
        values: ["S", "M", "L", "XL"],
      },
    ],
    createdAt: "2023-02-10T10:30:00Z",
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    slug: "leather-crossbody-bag",
    description:
      "A stylish and practical leather crossbody bag with multiple compartments. Perfect for everyday use or special occasions. Crafted from genuine leather with a durable lining and adjustable strap. The compact size fits all your essentials while the timeless design complements any outfit.",
    price: 59.99,
    compareAtPrice: 79.99,
    images: [
      "/leather-crossbody-bag.png",
      "/placeholder.svg?height=800&width=800&query=leather bag inside",
      "/placeholder.svg?height=800&width=800&query=leather bag detail",
      "/placeholder.svg?height=800&width=800&query=leather bag worn",
    ],
    category: "accessories",
    tags: ["bag", "leather", "crossbody", "accessories"],
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 78,
    brand: "zara",
    sale: true,
    salePercentage: 25,
    variants: [
      {
        id: "3-1",
        name: "Brown",
        sku: "LCB-BR",
        price: 59.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Brown" }],
      },
      {
        id: "3-2",
        name: "Black",
        sku: "LCB-BL",
        price: 59.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Black" }],
      },
      {
        id: "3-3",
        name: "Tan",
        sku: "LCB-TN",
        price: 59.99,
        inStock: false,
        attributes: [{ name: "Color", value: "Tan" }],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Brown", "Black", "Tan"],
      },
    ],
    createdAt: "2023-03-05T14:15:00Z",
  },
  {
    id: "4",
    name: "Wool Blend Sweater",
    slug: "wool-blend-sweater",
    description:
      "A warm and cozy wool blend sweater with a classic design. Perfect for colder days and easy to layer with other pieces. The premium wool blend provides exceptional warmth while remaining breathable and comfortable. The ribbed cuffs and hem ensure a perfect fit that retains its shape wear after wear.",
    price: 69.99,
    compareAtPrice: null,
    images: [
      "/wool-blend-sweater.png",
      "/placeholder.svg?height=800&width=800&query=wool sweater back",
      "/placeholder.svg?height=800&width=800&query=wool sweater detail",
      "/placeholder.svg?height=800&width=800&query=wool sweater worn",
    ],
    category: "clothing",
    tags: ["sweater", "wool", "winter", "tops"],
    featured: true,
    inStock: true,
    rating: 4.3,
    reviewCount: 56,
    brand: "hm",
    variants: [
      {
        id: "4-1",
        name: "Gray / S",
        sku: "WBS-GS",
        price: 69.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "S" },
        ],
      },
      {
        id: "4-2",
        name: "Gray / M",
        sku: "WBS-GM",
        price: 69.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "M" },
        ],
      },
      {
        id: "4-3",
        name: "Gray / L",
        sku: "WBS-GL",
        price: 69.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "L" },
        ],
      },
      {
        id: "4-4",
        name: "Navy / S",
        sku: "WBS-NS",
        price: 69.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Navy" },
          { name: "Size", value: "S" },
        ],
      },
      {
        id: "4-5",
        name: "Navy / M",
        sku: "WBS-NM",
        price: 69.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Navy" },
          { name: "Size", value: "M" },
        ],
      },
      {
        id: "4-6",
        name: "Navy / L",
        sku: "WBS-NL",
        price: 69.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Navy" },
          { name: "Size", value: "L" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Gray", "Navy", "Burgundy", "Green"],
      },
      {
        name: "Size",
        values: ["S", "M", "L", "XL"],
      },
    ],
    createdAt: "2023-04-20T09:45:00Z",
  },
  {
    id: "5",
    name: "Minimalist Watch",
    slug: "minimalist-watch",
    description:
      "A sleek and minimalist watch with a clean design. Features a high-quality movement and comfortable strap. The sapphire crystal face resists scratches while the stainless steel case provides durability. Water-resistant up to 50 meters, this versatile timepiece transitions seamlessly from day to night.",
    price: 129.99,
    compareAtPrice: 149.99,
    images: [
      "/minimalist-watch.png",
      "/placeholder.svg?height=800&width=800&query=minimalist watch side",
      "/placeholder.svg?height=800&width=800&query=minimalist watch detail",
      "/placeholder.svg?height=800&width=800&query=minimalist watch worn",
    ],
    category: "accessories",
    tags: ["watch", "minimalist", "accessories", "timepiece"],
    featured: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 112,
    brand: "zara",
    sale: true,
    salePercentage: 13,
    variants: [
      {
        id: "5-1",
        name: "Black / Leather",
        sku: "MW-BL",
        price: 129.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Strap", value: "Leather" },
        ],
      },
      {
        id: "5-2",
        name: "Black / Metal",
        sku: "MW-BM",
        price: 149.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Strap", value: "Metal" },
        ],
      },
      {
        id: "5-3",
        name: "Silver / Leather",
        sku: "MW-SL",
        price: 129.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Silver" },
          { name: "Strap", value: "Leather" },
        ],
      },
      {
        id: "5-4",
        name: "Silver / Metal",
        sku: "MW-SM",
        price: 149.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Silver" },
          { name: "Strap", value: "Metal" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Black", "Silver", "Rose Gold"],
      },
      {
        name: "Strap",
        values: ["Leather", "Metal", "Nylon"],
      },
    ],
    createdAt: "2023-05-12T11:20:00Z",
  },
  {
    id: "6",
    name: "Canvas Sneakers",
    slug: "canvas-sneakers",
    description:
      "Comfortable and stylish canvas sneakers perfect for casual wear. Features a durable rubber sole and cushioned insole. The breathable canvas upper keeps your feet cool while the classic design pairs with virtually any casual outfit. The vulcanized rubber outsole provides excellent traction and durability.",
    price: 49.99,
    compareAtPrice: null,
    images: [
      "/canvas-sneakers.png",
      "/placeholder.svg?height=800&width=800&query=canvas sneakers side",
      "/placeholder.svg?height=800&width=800&query=canvas sneakers top",
      "/placeholder.svg?height=800&width=800&query=canvas sneakers worn",
    ],
    category: "footwear",
    tags: ["sneakers", "canvas", "casual", "shoes"],
    featured: false,
    inStock: true,
    rating: 4.4,
    reviewCount: 87,
    brand: "nike",
    variants: [
      {
        id: "6-1",
        name: "White / 7",
        sku: "CS-W7",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "7" },
        ],
      },
      {
        id: "6-2",
        name: "White / 8",
        sku: "CS-W8",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "8" },
        ],
      },
      {
        id: "6-3",
        name: "White / 9",
        sku: "CS-W9",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "9" },
        ],
      },
      {
        id: "6-4",
        name: "White / 10",
        sku: "CS-W10",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "10" },
        ],
      },
      {
        id: "6-5",
        name: "Black / 7",
        sku: "CS-B7",
        price: 49.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "7" },
        ],
      },
      {
        id: "6-6",
        name: "Black / 8",
        sku: "CS-B8",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "8" },
        ],
      },
      {
        id: "6-7",
        name: "Black / 9",
        sku: "CS-B9",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "9" },
        ],
      },
      {
        id: "6-8",
        name: "Black / 10",
        sku: "CS-B10",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "10" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["White", "Black", "Navy", "Red"],
      },
      {
        name: "Size",
        values: ["7", "8", "9", "10", "11", "12"],
      },
    ],
    createdAt: "2023-06-08T15:30:00Z",
  },
  {
    id: "7",
    name: "Ceramic Planter",
    slug: "ceramic-planter",
    description:
      "A beautiful ceramic planter perfect for indoor plants. Features a minimalist design and drainage hole. The high-fired ceramic construction ensures durability while the glazed finish adds a touch of elegance to any room. Available in multiple sizes to accommodate various plants from succulents to larger houseplants.",
    price: 39.99,
    compareAtPrice: null,
    images: [
      "/ceramic-planter.png",
      "/placeholder.svg?height=800&width=800&query=ceramic planter side",
      "/placeholder.svg?height=800&width=800&query=ceramic planter with plant",
      "/placeholder.svg?height=800&width=800&query=ceramic planter detail",
    ],
    category: "home",
    tags: ["planter", "ceramic", "home decor", "plants"],
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 42,
    brand: "zara",
    variants: [
      {
        id: "7-1",
        name: "White / Small",
        sku: "CP-WS",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "Small" },
        ],
      },
      {
        id: "7-2",
        name: "White / Medium",
        sku: "CP-WM",
        price: 39.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "Medium" },
        ],
      },
      {
        id: "7-3",
        name: "White / Large",
        sku: "CP-WL",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "Large" },
        ],
      },
      {
        id: "7-4",
        name: "Terracotta / Small",
        sku: "CP-TS",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Terracotta" },
          { name: "Size", value: "Small" },
        ],
      },
      {
        id: "7-5",
        name: "Terracotta / Medium",
        sku: "CP-TM",
        price: 39.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Terracotta" },
          { name: "Size", value: "Medium" },
        ],
      },
      {
        id: "7-6",
        name: "Terracotta / Large",
        sku: "CP-TL",
        price: 49.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Terracotta" },
          { name: "Size", value: "Large" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["White", "Terracotta", "Black", "Blue"],
      },
      {
        name: "Size",
        values: ["Small", "Medium", "Large"],
      },
    ],
    createdAt: "2023-07-14T13:10:00Z",
  },
  {
    id: "8",
    name: "Linen Throw Pillow",
    slug: "linen-throw-pillow",
    description:
      "A soft and comfortable linen throw pillow to add style and comfort to your home. Features a removable cover for easy cleaning. The natural linen fabric provides a textured look and exceptional durability. Each pillow includes a plush polyester insert that maintains its shape and provides the perfect amount of support.",
    price: 34.99,
    compareAtPrice: 44.99,
    images: [
      "/linen-throw-pillow.png",
      "/placeholder.svg?height=800&width=800&query=linen pillow side",
      "/placeholder.svg?height=800&width=800&query=linen pillow on couch",
      "/placeholder.svg?height=800&width=800&query=linen pillow detail",
    ],
    category: "home",
    tags: ["pillow", "linen", "home decor", "soft furnishings"],
    featured: false,
    inStock: true,
    rating: 4.5,
    reviewCount: 38,
    brand: "hm",
    sale: true,
    salePercentage: 22,
    variants: [
      {
        id: "8-1",
        name: "Natural / 16x16",
        sku: "LTP-N16",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Natural" },
          { name: "Size", value: "16x16" },
        ],
      },
      {
        id: "8-2",
        name: "Natural / 18x18",
        sku: "LTP-N18",
        price: 34.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Natural" },
          { name: "Size", value: "18x18" },
        ],
      },
      {
        id: "8-3",
        name: "Natural / 20x20",
        sku: "LTP-N20",
        price: 39.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Natural" },
          { name: "Size", value: "20x20" },
        ],
      },
      {
        id: "8-4",
        name: "Gray / 16x16",
        sku: "LTP-G16",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "16x16" },
        ],
      },
      {
        id: "8-5",
        name: "Gray / 18x18",
        sku: "LTP-G18",
        price: 34.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "18x18" },
        ],
      },
      {
        id: "8-6",
        name: "Gray / 20x20",
        sku: "LTP-G20",
        price: 39.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "20x20" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Natural", "Gray", "Blue", "Terracotta"],
      },
      {
        name: "Size",
        values: ["16x16", "18x18", "20x20", "24x24"],
      },
    ],
    createdAt: "2023-08-22T16:45:00Z",
  },
  {
    id: "9",
    name: "Premium Noise-Cancelling Headphones",
    slug: "premium-noise-cancelling-headphones",
    description:
      "Experience immersive sound with these premium noise-cancelling headphones. Featuring advanced acoustic technology, comfortable ear cups, and long battery life. The active noise cancellation blocks out ambient noise for an uninterrupted listening experience, while the premium drivers deliver rich, detailed audio across all frequencies.",
    price: 249.99,
    compareAtPrice: 299.99,
    images: [
      "/premium-noise-cancelling-headphones.png",
      "/placeholder.svg?height=800&width=800&query=headphones side view",
      "/placeholder.svg?height=800&width=800&query=headphones folded",
      "/placeholder.svg?height=800&width=800&query=headphones worn",
    ],
    category: "electronics",
    tags: ["headphones", "audio", "noise-cancelling", "wireless"],
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
    brand: "sony",
    sale: true,
    salePercentage: 17,
    variants: [
      {
        id: "9-1",
        name: "Black",
        sku: "NCH-BL",
        price: 249.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Black" }],
      },
      {
        id: "9-2",
        name: "Silver",
        sku: "NCH-SL",
        price: 249.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Silver" }],
      },
      {
        id: "9-3",
        name: "Blue",
        sku: "NCH-BL",
        price: 249.99,
        inStock: false,
        attributes: [{ name: "Color", value: "Blue" }],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Black", "Silver", "Blue"],
      },
    ],
    createdAt: "2023-09-05T10:15:00Z",
  },
  {
    id: "10",
    name: "Luxury Timepiece",
    slug: "luxury-timepiece",
    description:
      "A sophisticated luxury timepiece that combines classic design with modern technology. Features a Swiss movement, sapphire crystal, and genuine leather strap. The elegant dial with applied indices is protected by scratch-resistant sapphire crystal, while the exhibition caseback reveals the intricate automatic movement. Water-resistant to 100 meters.",
    price: 599.99,
    compareAtPrice: null,
    images: [
      "/luxury-timepiece.png",
      "/placeholder.svg?height=800&width=800&query=luxury watch side view",
      "/placeholder.svg?height=800&width=800&query=luxury watch movement",
      "/placeholder.svg?height=800&width=800&query=luxury watch worn",
    ],
    category: "jewelry",
    tags: ["watch", "luxury", "timepiece", "accessories"],
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 78,
    brand: "zara",
    new: true,
    variants: [
      {
        id: "10-1",
        name: "Silver / Brown Leather",
        sku: "LT-SBL",
        price: 599.99,
        inStock: true,
        attributes: [
          { name: "Case", value: "Silver" },
          { name: "Strap", value: "Brown Leather" },
        ],
      },
      {
        id: "10-2",
        name: "Silver / Black Leather",
        sku: "LT-SBL",
        price: 599.99,
        inStock: true,
        attributes: [
          { name: "Case", value: "Silver" },
          { name: "Strap", value: "Black Leather" },
        ],
      },
      {
        id: "10-3",
        name: "Gold / Brown Leather",
        sku: "LT-GBL",
        price: 649.99,
        inStock: true,
        attributes: [
          { name: "Case", value: "Gold" },
          { name: "Strap", value: "Brown Leather" },
        ],
      },
      {
        id: "10-4",
        name: "Gold / Black Leather",
        sku: "LT-GBL",
        price: 649.99,
        inStock: false,
        attributes: [
          { name: "Case", value: "Gold" },
          { name: "Strap", value: "Black Leather" },
        ],
      },
    ],
    attributes: [
      {
        name: "Case",
        values: ["Silver", "Gold", "Rose Gold"],
      },
      {
        name: "Strap",
        values: ["Brown Leather", "Black Leather", "Metal"],
      },
    ],
    createdAt: "2023-10-12T14:30:00Z",
  },
  {
    id: "11",
    name: "Premium Skincare Set",
    slug: "premium-skincare-set",
    description:
      "A comprehensive skincare set featuring cleanser, toner, serum, and moisturizer. Made with natural ingredients to nourish and rejuvenate your skin. The gentle yet effective formulations are suitable for all skin types and free from harsh chemicals. Regular use helps improve skin texture, reduce fine lines, and create a radiant complexion.",
    price: 89.99,
    compareAtPrice: 119.99,
    images: [
      "/premium-skincare-luxury.png",
      "/placeholder.svg?height=800&width=800&query=skincare products arranged",
      "/placeholder.svg?height=800&width=800&query=skincare product detail",
      "/placeholder.svg?height=800&width=800&query=skincare application",
    ],
    category: "beauty",
    tags: ["skincare", "beauty", "natural", "gift set"],
    featured: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 92,
    brand: "zara",
    sale: true,
    salePercentage: 25,
    variants: [
      {
        id: "11-1",
        name: "Normal Skin",
        sku: "PSS-NS",
        price: 89.99,
        inStock: true,
        attributes: [{ name: "Skin Type", value: "Normal" }],
      },
      {
        id: "11-2",
        name: "Dry Skin",
        sku: "PSS-DS",
        price: 89.99,
        inStock: true,
        attributes: [{ name: "Skin Type", value: "Dry" }],
      },
      {
        id: "11-3",
        name: "Oily Skin",
        sku: "PSS-OS",
        price: 89.99,
        inStock: true,
        attributes: [{ name: "Skin Type", value: "Oily" }],
      },
      {
        id: "11-4",
        name: "Combination Skin",
        sku: "PSS-CS",
        price: 89.99,
        inStock: false,
        attributes: [{ name: "Skin Type", value: "Combination" }],
      },
    ],
    attributes: [
      {
        name: "Skin Type",
        values: ["Normal", "Dry", "Oily", "Combination", "Sensitive"],
      },
    ],
    createdAt: "2023-11-08T09:20:00Z",
  },
  {
    id: "12",
    name: "4K Smart TV",
    slug: "4k-smart-tv",
    description:
      "Experience stunning visuals with this 4K Smart TV featuring HDR technology, built-in streaming apps, and voice control. The ultra-high-definition display delivers lifelike images with vibrant colors and deep blacks. Smart features include popular streaming services, voice assistants, and screen mirroring from your mobile devices.",
    price: 799.99,
    compareAtPrice: 899.99,
    images: [
      "/premium-4k-smart-tv.png",
      "/placeholder.svg?height=800&width=800&query=smart tv side view",
      "/placeholder.svg?height=800&width=800&query=smart tv interface",
      "/placeholder.svg?height=800&width=800&query=smart tv in living room",
    ],
    category: "electronics",
    tags: ["tv", "4k", "smart", "entertainment"],
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 124,
    brand: "samsung",
    sale: true,
    salePercentage: 11,
    variants: [
      {
        id: "12-1",
        name: "43 inch",
        sku: "4KTV-43",
        price: 499.99,
        inStock: true,
        attributes: [{ name: "Size", value: "43 inch" }],
      },
      {
        id: "12-2",
        name: "50 inch",
        sku: "4KTV-50",
        price: 599.99,
        inStock: true,
        attributes: [{ name: "Size", value: "50 inch" }],
      },
      {
        id: "12-3",
        name: "55 inch",
        sku: "4KTV-55",
        price: 699.99,
        inStock: true,
        attributes: [{ name: "Size", value: "55 inch" }],
      },
      {
        id: "12-4",
        name: "65 inch",
        sku: "4KTV-65",
        price: 799.99,
        inStock: true,
        attributes: [{ name: "Size", value: "65 inch" }],
      },
      {
        id: "12-5",
        name: "75 inch",
        sku: "4KTV-75",
        price: 1099.99,
        inStock: false,
        attributes: [{ name: "Size", value: "75 inch" }],
      },
    ],
    attributes: [
      {
        name: "Size",
        values: ["43 inch", "50 inch", "55 inch", "65 inch", "75 inch"],
      },
    ],
    createdAt: "2023-12-15T11:30:00Z",
  },
  {
    id: "13",
    name: "Wireless Earbuds",
    slug: "wireless-earbuds",
    description:
      "Premium wireless earbuds with active noise cancellation, touch controls, and long battery life. The ergonomic design ensures a comfortable fit for extended listening sessions, while the advanced Bluetooth technology provides a stable connection. The charging case extends battery life up to 24 hours for all-day listening.",
    price: 129.99,
    compareAtPrice: 159.99,
    images: [
      "/placeholder.svg?height=800&width=800&query=wireless earbuds with case",
      "/placeholder.svg?height=800&width=800&query=wireless earbuds detail",
      "/placeholder.svg?height=800&width=800&query=wireless earbuds worn",
    ],
    category: "electronics",
    tags: ["earbuds", "wireless", "audio", "bluetooth"],
    featured: false,
    inStock: true,
    rating: 4.5,
    reviewCount: 87,
    brand: "apple",
    sale: true,
    salePercentage: 19,
    variants: [
      {
        id: "13-1",
        name: "Black",
        sku: "WEB-BL",
        price: 129.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Black" }],
      },
      {
        id: "13-2",
        name: "White",
        sku: "WEB-WH",
        price: 129.99,
        inStock: true,
        attributes: [{ name: "Color", value: "White" }],
      },
      {
        id: "13-3",
        name: "Blue",
        sku: "WEB-BL",
        price: 129.99,
        inStock: false,
        attributes: [{ name: "Color", value: "Blue" }],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Black", "White", "Blue"],
      },
    ],
    createdAt: "2024-01-10T13:45:00Z",
  },
  {
    id: "14",
    name: "Designer Sunglasses",
    slug: "designer-sunglasses",
    description:
      "Stylish designer sunglasses with UV protection and polarized lenses. The lightweight frame provides all-day comfort, while the premium lenses reduce glare and protect your eyes from harmful UV rays. The timeless design complements any face shape and adds a touch of sophistication to any outfit.",
    price: 149.99,
    compareAtPrice: null,
    images: [
      "/placeholder.svg?height=800&width=800&query=designer sunglasses front",
      "/placeholder.svg?height=800&width=800&query=designer sunglasses side",
      "/placeholder.svg?height=800&width=800&query=designer sunglasses worn",
    ],
    category: "accessories",
    tags: ["sunglasses", "designer", "eyewear", "accessories"],
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 64,
    brand: "zara",
    new: true,
    variants: [
      {
        id: "14-1",
        name: "Black / Square",
        sku: "DS-BSQ",
        price: 149.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Shape", value: "Square" },
        ],
      },
      {
        id: "14-2",
        name: "Black / Round",
        sku: "DS-BRD",
        price: 149.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Shape", value: "Round" },
        ],
      },
      {
        id: "14-3",
        name: "Tortoise / Square",
        sku: "DS-TSQ",
        price: 149.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Tortoise" },
          { name: "Shape", value: "Square" },
        ],
      },
      {
        id: "14-4",
        name: "Tortoise / Round",
        sku: "DS-TRD",
        price: 149.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Tortoise" },
          { name: "Shape", value: "Round" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Black", "Tortoise", "Gold", "Silver"],
      },
      {
        name: "Shape",
        values: ["Square", "Round", "Aviator", "Cat Eye"],
      },
    ],
    createdAt: "2024-02-18T10:15:00Z",
  },
  {
    id: "15",
    name: "Organic Cotton Bedding Set",
    slug: "organic-cotton-bedding-set",
    description:
      "Luxurious organic cotton bedding set including duvet cover, fitted sheet, and pillowcases. The 400 thread count fabric is soft, breathable, and environmentally friendly. The GOTS-certified organic cotton is grown without harmful pesticides or chemicals, making it better for you and the planet. The set comes in a reusable cotton storage bag.",
    price: 129.99,
    compareAtPrice: 159.99,
    images: [
      "/placeholder.svg?height=800&width=800&query=organic cotton bedding set",
      "/placeholder.svg?height=800&width=800&query=bedding detail",
      "/placeholder.svg?height=800&width=800&query=bedding on bed",
    ],
    category: "home",
    tags: ["bedding", "organic", "cotton", "home"],
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 52,
    brand: "hm",
    sale: true,
    salePercentage: 19,
    variants: [
      {
        id: "15-1",
        name: "White / Twin",
        sku: "OCBS-WT",
        price: 99.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "Twin" },
        ],
      },
      {
        id: "15-2",
        name: "White / Queen",
        sku: "OCBS-WQ",
        price: 129.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "Queen" },
        ],
      },
      {
        id: "15-3",
        name: "White / King",
        sku: "OCBS-WK",
        price: 149.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "White" },
          { name: "Size", value: "King" },
        ],
      },
      {
        id: "15-4",
        name: "Gray / Twin",
        sku: "OCBS-GT",
        price: 99.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "Twin" },
        ],
      },
      {
        id: "15-5",
        name: "Gray / Queen",
        sku: "OCBS-GQ",
        price: 129.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "Queen" },
        ],
      },
      {
        id: "15-6",
        name: "Gray / King",
        sku: "OCBS-GK",
        price: 149.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Gray" },
          { name: "Size", value: "King" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["White", "Gray", "Blue", "Beige"],
      },
      {
        name: "Size",
        values: ["Twin", "Full", "Queen", "King"],
      },
    ],
    createdAt: "2024-03-05T15:30:00Z",
  },
  {
    id: "16",
    name: "Smart Fitness Watch",
    slug: "smart-fitness-watch",
    description:
      "Track your health and fitness with this advanced smart watch featuring heart rate monitoring, sleep tracking, and workout detection. The bright AMOLED display is easy to read in any lighting conditions, while the water-resistant design allows you to wear it during swimming and other water activities. Connects to your smartphone for notifications and app integration.",
    price: 179.99,
    compareAtPrice: 199.99,
    images: [
      "/placeholder.svg?height=800&width=800&query=smart fitness watch",
      "/placeholder.svg?height=800&width=800&query=fitness watch features",
      "/placeholder.svg?height=800&width=800&query=fitness watch worn",
    ],
    category: "electronics",
    tags: ["fitness", "smartwatch", "wearable", "health"],
    featured: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 108,
    brand: "apple",
    new: true,
    variants: [
      {
        id: "16-1",
        name: "Black / Small",
        sku: "SFW-BS",
        price: 179.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "Small" },
        ],
      },
      {
        id: "16-2",
        name: "Black / Large",
        sku: "SFW-BL",
        price: 179.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "Large" },
        ],
      },
      {
        id: "16-3",
        name: "Silver / Small",
        sku: "SFW-SS",
        price: 179.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Silver" },
          { name: "Size", value: "Small" },
        ],
      },
      {
        id: "16-4",
        name: "Silver / Large",
        sku: "SFW-SL",
        price: 179.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Silver" },
          { name: "Size", value: "Large" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Black", "Silver", "Blue", "Pink"],
      },
      {
        name: "Size",
        values: ["Small", "Large"],
      },
    ],
    createdAt: "2024-04-12T09:45:00Z",
  },
  {
    id: "17",
    name: "Premium Yoga Mat",
    slug: "premium-yoga-mat",
    description:
      "High-quality yoga mat with excellent grip, cushioning, and eco-friendly materials. The non-slip surface provides stability for all yoga poses, while the 6mm thickness offers joint protection and comfort. The mat is free from harmful chemicals and comes with a carrying strap for easy transport to and from your yoga studio.",
    price: 69.99,
    compareAtPrice: null,
    images: [
      "/placeholder.svg?height=800&width=800&query=premium yoga mat",
      "/placeholder.svg?height=800&width=800&query=yoga mat rolled",
      "/placeholder.svg?height=800&width=800&query=yoga mat in use",
    ],
    category: "accessories",
    tags: ["yoga", "fitness", "exercise", "wellness"],
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 76,
    brand: "nike",
    variants: [
      {
        id: "17-1",
        name: "Purple",
        sku: "PYM-PU",
        price: 69.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Purple" }],
      },
      {
        id: "17-2",
        name: "Blue",
        sku: "PYM-BL",
        price: 69.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Blue" }],
      },
      {
        id: "17-3",
        name: "Black",
        sku: "PYM-BK",
        price: 69.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Black" }],
      },
      {
        id: "17-4",
        name: "Green",
        sku: "PYM-GR",
        price: 69.99,
        inStock: false,
        attributes: [{ name: "Color", value: "Green" }],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Purple", "Blue", "Black", "Green", "Pink"],
      },
    ],
    createdAt: "2024-05-20T14:15:00Z",
  },
  {
    id: "18",
    name: "Stainless Steel Water Bottle",
    slug: "stainless-steel-water-bottle",
    description:
      "Double-walled stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. The leak-proof design ensures your bag stays dry, while the wide mouth accommodates ice cubes and makes cleaning easy. The durable powder-coated finish resists scratches and provides a secure grip. BPA-free and eco-friendly.",
    price: 34.99,
    compareAtPrice: 39.99,
    images: [
      "/placeholder.svg?height=800&width=800&query=stainless steel water bottle",
      "/placeholder.svg?height=800&width=800&query=water bottle detail",
      "/placeholder.svg?height=800&width=800&query=water bottle in use",
    ],
    category: "accessories",
    tags: ["water bottle", "hydration", "eco-friendly", "stainless steel"],
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 92,
    brand: "adidas",
    sale: true,
    salePercentage: 13,
    variants: [
      {
        id: "18-1",
        name: "Black / 18oz",
        sku: "SSWB-B18",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "18oz" },
        ],
      },
      {
        id: "18-2",
        name: "Black / 32oz",
        sku: "SSWB-B32",
        price: 34.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Size", value: "32oz" },
        ],
      },
      {
        id: "18-3",
        name: "Silver / 18oz",
        sku: "SSWB-S18",
        price: 29.99,
        inStock: true,
        attributes: [
          { name: "Color", value: "Silver" },
          { name: "Size", value: "18oz" },
        ],
      },
      {
        id: "18-4",
        name: "Silver / 32oz",
        sku: "SSWB-S32",
        price: 34.99,
        inStock: false,
        attributes: [
          { name: "Color", value: "Silver" },
          { name: "Size", value: "32oz" },
        ],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Black", "Silver", "Blue", "Red", "Green"],
      },
      {
        name: "Size",
        values: ["18oz", "32oz", "40oz"],
      },
    ],
    createdAt: "2024-06-08T11:30:00Z",
  },
  {
    id: "19",
    name: "Wireless Charging Pad",
    slug: "wireless-charging-pad",
    description:
      "Convenient wireless charging pad compatible with all Qi-enabled devices. Features fast charging technology, LED indicators, and a non-slip surface. The sleek, minimalist design complements any desk or nightstand, while the advanced chipset prevents overheating and optimizes charging efficiency. Includes a 3-foot USB-C cable.",
    price: 29.99,
    compareAtPrice: 39.99,
    images: [
      "/placeholder.svg?height=800&width=800&query=wireless charging pad",
      "/placeholder.svg?height=800&width=800&query=charging pad with phone",
      "/placeholder.svg?height=800&width=800&query=charging pad detail",
    ],
    category: "electronics",
    tags: ["charger", "wireless", "smartphone", "accessories"],
    featured: false,
    inStock: true,
    rating: 4.5,
    reviewCount: 68,
    brand: "samsung",
    sale: true,
    salePercentage: 25,
    variants: [
      {
        id: "19-1",
        name: "Black",
        sku: "WCP-BL",
        price: 29.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Black" }],
      },
      {
        id: "19-2",
        name: "White",
        sku: "WCP-WH",
        price: 29.99,
        inStock: true,
        attributes: [{ name: "Color", value: "White" }],
      },
      {
        id: "19-3",
        name: "Gray",
        sku: "WCP-GR",
        price: 29.99,
        inStock: false,
        attributes: [{ name: "Color", value: "Gray" }],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Black", "White", "Gray"],
      },
    ],
    createdAt: "2024-07-15T13:20:00Z",
  },
  {
    id: "20",
    name: "Handcrafted Ceramic Mug Set",
    slug: "handcrafted-ceramic-mug-set",
    description:
      "Set of four uniquely designed handcrafted ceramic mugs, each with a 12oz capacity. Each mug is individually crafted by artisans, making every set one-of-a-kind. The durable stoneware construction retains heat well and is microwave, dishwasher, and oven safe. The ergonomic handle provides a comfortable grip for your morning coffee or evening tea.",
    price: 49.99,
    compareAtPrice: null,
    images: [
      "/placeholder.svg?height=800&width=800&query=ceramic mug set",
      "/placeholder.svg?height=800&width=800&query=ceramic mug detail",
      "/placeholder.svg?height=800&width=800&query=ceramic mug in use",
    ],
    category: "home",
    tags: ["mug", "ceramic", "handcrafted", "kitchenware"],
    featured: false,
    inStock: true,
    rating: 4.9,
    reviewCount: 45,
    brand: "hm",
    new: true,
    variants: [
      {
        id: "20-1",
        name: "Multicolor",
        sku: "HCMS-MC",
        price: 49.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Multicolor" }],
      },
      {
        id: "20-2",
        name: "Earth Tones",
        sku: "HCMS-ET",
        price: 49.99,
        inStock: true,
        attributes: [{ name: "Color", value: "Earth Tones" }],
      },
      {
        id: "20-3",
        name: "Blue Shades",
        sku: "HCMS-BS",
        price: 49.99,
        inStock: false,
        attributes: [{ name: "Color", value: "Blue Shades" }],
      },
    ],
    attributes: [
      {
        name: "Color",
        values: ["Multicolor", "Earth Tones", "Blue Shades", "Pastel"],
      },
    ],
    createdAt: "2024-08-22T10:45:00Z",
  },
]

// Mock Reviews
export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    userId: "u1",
    userName: "John D.",
    rating: 5,
    title: "Perfect fit and very comfortable",
    content:
      "This t-shirt is exactly what I was looking for. The material is soft, it fits perfectly, and the minimalist design goes with everything in my wardrobe. Highly recommend!",
    createdAt: "2023-02-15T10:30:00Z",
    verified: true,
    helpful: 24,
  },
  {
    id: "r2",
    productId: "1",
    userId: "u2",
    userName: "Sarah M.",
    rating: 4,
    title: "Great quality but runs small",
    content:
      "The quality of this shirt is excellent, but I would recommend sizing up. I normally wear a medium and had to exchange for a large. Other than that, it's perfect!",
    createdAt: "2023-03-05T14:15:00Z",
    verified: true,
    helpful: 18,
  },
  {
    id: "r3",
    productId: "2",
    userId: "u3",
    userName: "Michael T.",
    rating: 5,
    title: "Classic style that will last for years",
    content:
      "This denim jacket is incredibly well-made. The stitching is perfect, the denim is substantial without being too heavy, and the fit is exactly as described. Worth every penny!",
    createdAt: "2023-04-12T09:45:00Z",
    verified: true,
    helpful: 32,
  },
  {
    id: "r4",
    productId: "3",
    userId: "u4",
    userName: "Emily R.",
    rating: 4,
    title: "Beautiful bag with plenty of space",
    content:
      "I love this crossbody bag! The leather is beautiful and the size is perfect for everyday use. The only reason I'm giving 4 stars instead of 5 is that I wish it had one more interior pocket.",
    createdAt: "2023-05-20T16:30:00Z",
    verified: true,
    helpful: 15,
  },
  {
    id: "r5",
    productId: "4",
    userId: "u5",
    userName: "David L.",
    rating: 5,
    title: "Warm and stylish",
    content:
      "This sweater exceeded my expectations. It's incredibly warm without being bulky, and the quality is outstanding. I've received many compliments when wearing it. Definitely worth the price!",
    createdAt: "2023-06-08T11:20:00Z",
    verified: true,
    helpful: 27,
  },
  {
    id: "r6",
    productId: "5",
    userId: "u6",
    userName: "Jessica K.",
    rating: 5,
    title: "Elegant and functional",
    content:
      "This watch is the perfect combination of style and functionality. The minimalist design goes with everything, and the quality is evident. The battery life is impressive, and it's comfortable to wear all day.",
    createdAt: "2023-07-15T13:40:00Z",
    verified: true,
    helpful: 19,
  },
  {
    id: "r7",
    productId: "6",
    userId: "u7",
    userName: "Robert P.",
    rating: 4,
    title: "Great everyday sneakers",
    content:
      "These canvas sneakers are perfect for casual wear. They're comfortable right out of the box and go with everything. The only reason for 4 stars instead of 5 is that they run slightly large.",
    createdAt: "2023-08-22T10:15:00Z",
    verified: false,
    helpful: 12,
  },
  {
    id: "r8",
    productId: "7",
    userId: "u8",
    userName: "Amanda G.",
    rating: 5,
    title: "Beautiful addition to my home",
    content:
      "This ceramic planter is even more beautiful in person. The craftsmanship is excellent, and it's the perfect size for my fiddle leaf fig. The drainage hole is a plus, and the glazed finish is stunning.",
    createdAt: "2023-09-10T15:30:00Z",
    verified: true,
    helpful: 21,
  },
  {
    id: "r9",
    productId: "8",
    userId: "u9",
    userName: "Thomas H.",
    rating: 4,
    title: "Soft and comfortable",
    content:
      "These linen throw pillows are a great addition to my couch. The fabric is soft yet durable, and the removable cover makes cleaning easy. The only reason for 4 stars is that the color was slightly different than pictured.",
    createdAt: "2023-10-18T12:45:00Z",
    verified: true,
    helpful: 14,
  },
  {
    id: "r10",
    productId: "9",
    userId: "u10",
    userName: "Olivia W.",
    rating: 5,
    title: "Amazing sound quality",
    content:
      "These headphones are incredible! The noise cancellation is top-notch, and the sound quality is crystal clear. Battery life is impressive, and they're comfortable to wear for hours. Worth every penny!",
    createdAt: "2023-11-25T09:30:00Z",
    verified: true,
    helpful: 38,
  },
  {
    id: "r11",
    productId: "10",
    userId: "u11",
    userName: "William S.",
    rating: 5,
    title: "Elegant and sophisticated",
    content:
      "This timepiece is a work of art. The craftsmanship is impeccable, and it looks much more expensive than it is. The movement is precise, and the leather strap is comfortable and high-quality. A perfect addition to my collection.",
    createdAt: "2023-12-12T14:20:00Z",
    verified: true,
    helpful: 29,
  },
  {
    id: "r12",
    productId: "11",
    userId: "u12",
    userName: "Sophia L.",
    rating: 4,
    title: "Great products, noticeable results",
    content:
      "I've been using this skincare set for a month, and I can already see improvements in my skin's texture and tone. The products are gentle yet effective, and a little goes a long way. The only reason for 4 stars is the scent, which is a bit strong for my preference.",
    createdAt: "2024-01-08T11:15:00Z",
    verified: true,
    helpful: 22,
  },
  {
    id: "r13",
    productId: "12",
    userId: "u13",
    userName: "James M.",
    rating: 5,
    title: "Stunning picture quality",
    content:
      "This TV has exceeded all my expectations. The 4K resolution is crystal clear, and the colors are vibrant and true to life. The smart features are intuitive and responsive, and setup was a breeze. Highly recommend!",
    createdAt: "2024-02-15T16:40:00Z",
    verified: true,
    helpful: 41,
  },
  {
    id: "r14",
    productId: "13",
    userId: "u14",
    userName: "Emma C.",
    rating: 4,
    title: "Great sound, comfortable fit",
    content:
      "These wireless earbuds have excellent sound quality and stay securely in my ears during workouts. The battery life is impressive, and the charging case is compact and convenient. The only downside is that the touch controls can be a bit sensitive.",
    createdAt: "2024-03-22T13:10:00Z",
    verified: true,
    helpful: 17,
  },
  {
    id: "r15",
    productId: "14",
    userId: "u15",
    userName: "Daniel R.",
    rating: 5,
    title: "Stylish and high-quality",
    content:
      "These sunglasses are the perfect combination of style and functionality. The polarized lenses provide excellent clarity and UV protection, and the frame is lightweight yet sturdy. They look much more expensive than they are!",
    createdAt: "2024-04-10T10:30:00Z",
    verified: false,
    helpful: 13,
  },
  {
    id: "r16",
    productId: "15",
    userId: "u16",
    userName: "Natalie P.",
    rating: 5,
    title: "Luxurious and comfortable",
    content:
      "This bedding set is absolutely worth the investment. The organic cotton is incredibly soft and gets better with each wash. The quality is evident in every detail, from the stitching to the buttons. I'm sleeping better than ever!",
    createdAt: "2024-05-18T15:45:00Z",
    verified: true,
    helpful: 26,
  },
  {
    id: "r17",
    productId: "16",
    userId: "u17",
    userName: "Christopher L.",
    rating: 4,
    title: "Feature-packed and reliable",
    content:
      "This fitness watch has all the features I need to track my workouts and health metrics. The battery life is impressive, and the app is intuitive and comprehensive. The only reason for 4 stars is that the sleep tracking could be more accurate.",
    createdAt: "2024-06-25T12:20:00Z",
    verified: true,
    helpful: 19,
  },
  {
    id: "r18",
    productId: "17",
    userId: "u18",
    userName: "Megan S.",
    rating: 5,
    title: "Perfect for my yoga practice",
    content:
      "This yoga mat has transformed my practice. The grip is exceptional, even during hot yoga, and the cushioning provides perfect support for my joints. It's also easy to clean and doesn't have that strong rubber smell that many mats have. Worth every penny!",
    createdAt: "2024-07-12T09:15:00Z",
    verified: true,
    helpful: 31,
  },
  {
    id: "r19",
    productId: "18",
    userId: "u19",
    userName: "Andrew T.",
    rating: 5,
    title: "Keeps drinks cold all day",
    content:
      "This water bottle is amazing! I filled it with ice water in the morning, and it was still cold with ice cubes intact when I got home from work. The design is sleek, and it doesn't leak at all. Highly recommend for anyone looking to stay hydrated throughout the day.",
    createdAt: "2024-08-08T14:30:00Z",
    verified: true,
    helpful: 24,
  },
  {
    id: "r20",
    productId: "19",
    userId: "u20",
    userName: "Lauren B.",
    rating: 4,
    title: "Convenient and efficient",
    content:
      "This wireless charging pad works great with my phone and earbuds. It charges quickly and the LED indicator is helpful without being too bright at night. The only reason for 4 stars is that positioning can be a bit finicky to get the optimal charging speed.",
    createdAt: "2024-09-15T11:45:00Z",
    verified: true,
    helpful: 16,
  },
]

// Mock Users
export const users: User[] = [
  {
    id: "u1",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    addresses: [
      {
        id: "a1",
        firstName: "John",
        lastName: "Doe",
        company: "Acme Inc",
        streetAddress1: "123 Main St",
        streetAddress2: "Apt 4B",
        city: "New York",
        state: "NY",
        postalCode: "10001",
        country: "United States",
        phone: "555-123-4567",
        isDefault: true,
      },
    ],
  },
  {
    id: "u2",
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    addresses: [
      {
        id: "a2",
        firstName: "Jane",
        lastName: "Smith",
        streetAddress1: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        postalCode: "90001",
        country: "United States",
        phone: "555-987-6543",
        isDefault: true,
      },
    ],
  },
  {
    id: "u3",
    email: "michael.johnson@example.com",
    firstName: "Michael",
    lastName: "Johnson",
    addresses: [
      {
        id: "a3",
        firstName: "Michael",
        lastName: "Johnson",
        company: "Johnson Enterprises",
        streetAddress1: "789 Pine St",
        streetAddress2: "Suite 300",
        city: "Chicago",
        state: "IL",
        postalCode: "60601",
        country: "United States",
        phone: "555-456-7890",
        isDefault: true,
      },
    ],
  },
  {
    id: "u4",
    email: "emily.williams@example.com",
    firstName: "Emily",
    lastName: "Williams",
    addresses: [
      {
        id: "a4",
        firstName: "Emily",
        lastName: "Williams",
        streetAddress1: "321 Maple Rd",
        city: "Houston",
        state: "TX",
        postalCode: "77001",
        country: "United States",
        phone: "555-234-5678",
        isDefault: true,
      },
    ],
  },
  {
    id: "u5",
    email: "david.brown@example.com",
    firstName: "David",
    lastName: "Brown",
    addresses: [
      {
        id: "a5",
        firstName: "David",
        lastName: "Brown",
        company: "Brown & Associates",
        streetAddress1: "654 Cedar Ln",
        city: "Miami",
        state: "FL",
        postalCode: "33101",
        country: "United States",
        phone: "555-876-5432",
        isDefault: true,
      },
    ],
  },
]

// Helper functions to simulate API calls
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Function to get products by category
export async function getProductsByCategory(categoryId: string, limit = 8): Promise<Product[]> {
  await delay(800) // Simulate network delay
  return products.filter((product) => product.category === categoryId).slice(0, limit)
}

// Function to get featured products
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  await delay(600) // Simulate network delay
  return products.filter((product) => product.featured).slice(0, limit)
}

// Function to get new arrivals
export async function getNewArrivals(limit = 8): Promise<Product[]> {
  await delay(700) // Simulate network delay
  return products.filter((product) => product.new).slice(0, limit)
}

// Function to get sale products
export async function getSaleProducts(limit = 8): Promise<Product[]> {
  await delay(750) // Simulate network delay
  return products.filter((product) => product.sale).slice(0, limit)
}

// Function to get best sellers
export async function getBestSellers(limit = 8): Promise<Product[]> {
  await delay(650) // Simulate network delay
  return products.filter((product) => product.bestSeller).slice(0, limit)
}

// Function to search products
export async function searchProducts(query: string): Promise<Product[]> {
  await delay(900) // Simulate network delay
  const lowercaseQuery = query.toLowerCase()
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

// Function to get products by brand
export async function getProductsByBrand(brandId: string, limit = 8): Promise<Product[]> {
  await delay(800) // Simulate network delay
  return products.filter((product) => product.brand === brandId).slice(0, limit)
}

// Function to get related products
export async function getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
  await delay(700) // Simulate network delay
  const product = products.find((p) => p.id === productId)
  if (!product) return []

  return products
    .filter(
      (p) =>
        p.id !== productId && (p.category === product.category || p.tags.some((tag) => product.tags.includes(tag))),
    )
    .slice(0, limit)
}
