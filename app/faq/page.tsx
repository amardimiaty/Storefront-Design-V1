"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

// FAQ data organized by categories
const faqData = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How do I track my order?",
        answer:
          "Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can also log in to your account to view the status of your order and tracking information.",
      },
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping typically takes 3-5 business days within the continental United States. Express shipping takes 1-2 business days. International shipping times vary by destination, usually between 7-14 business days.",
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes, we offer free standard shipping on all orders over $50 within the continental United States.",
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer:
          "If your order hasn't shipped yet, we may be able to update the shipping address. Please contact our customer service team as soon as possible with your order number and the new shipping address.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to many countries worldwide. International shipping rates and delivery times vary by location. Import duties and taxes may apply and are the responsibility of the customer.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original packaging with tags attached. Sale items are final sale and cannot be returned.",
      },
      {
        question: "How do I return an item?",
        answer:
          "To return an item, log in to your account, navigate to your order history, select the order containing the item you wish to return, and follow the prompts to initiate a return. Print the return shipping label (if applicable), package the item securely with all original packaging and tags, and drop off the package at the specified carrier.",
      },
      {
        question: "How long do refunds take to process?",
        answer:
          "Once we receive your return, it typically takes 3-5 business days to inspect the item and process the refund. After the refund is processed, it may take an additional 5-10 business days for the funds to appear in your account, depending on your payment method and financial institution.",
      },
      {
        question: "Can I exchange an item for a different size or color?",
        answer:
          "To exchange an item, please return the original item for a refund and place a new order for the desired item. This ensures the fastest processing time.",
      },
      {
        question: "What if my item arrives damaged?",
        answer:
          "If your item arrives damaged, please contact our customer service team within 48 hours of delivery. Please include your order number and photos of the damaged item and packaging. We'll work with you to resolve the issue promptly.",
      },
    ],
  },
  {
    category: "Products & Sizing",
    questions: [
      {
        question: "How do I find the right size?",
        answer:
          "We provide detailed size guides on each product page. If you're between sizes, we generally recommend sizing up. If you need additional assistance, please contact our customer service team.",
      },
      {
        question: "Are your products sustainable?",
        answer:
          "We're committed to sustainability and ethical practices. Many of our products are made from sustainable materials, and we're continuously working to improve our environmental impact. You can find specific sustainability information on individual product pages.",
      },
      {
        question: "How do I care for my products?",
        answer:
          "Care instructions are provided on each product page and on the care label of the item. Following these instructions will help maintain the quality and longevity of your purchase.",
      },
      {
        question: "Do you offer gift wrapping?",
        answer:
          "Yes, we offer gift wrapping for a small additional fee. You can select this option during checkout. We can also include a personalized gift message at no extra charge.",
      },
      {
        question: "Are your products true to size?",
        answer:
          "Our products generally run true to size, but there may be slight variations depending on the specific item and brand. We recommend checking the size guide on each product page for the most accurate information.",
      },
    ],
  },
  {
    category: "Account & Payment",
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "You can create an account by clicking on the 'Account' icon in the top right corner of our website and selecting 'Register'. You'll need to provide your email address and create a password. You can also create an account during the checkout process.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your full credit card details on our servers.",
      },
      {
        question: "Can I save my payment information for future purchases?",
        answer:
          "Yes, you can save your payment information securely in your account for faster checkout in the future. You can manage your saved payment methods in your account settings.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "To reset your password, click on the 'Account' icon, select 'Login', and then click on 'Forgot Password'. Enter your email address, and we'll send you instructions to reset your password.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredFAQs, setFilteredFAQs] = useState(faqData)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setFilteredFAQs(faqData)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = faqData
      .map((category) => {
        const filteredQuestions = category.questions.filter(
          (q) => q.question.toLowerCase().includes(query) || q.answer.toLowerCase().includes(query),
        )
        return {
          ...category,
          questions: filteredQuestions,
        }
      })
      .filter((category) => category.questions.length > 0)

    setFilteredFAQs(filtered)
  }

  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-gray-600"
        >
          Find answers to common questions about our products, shipping, returns, and more.
        </motion.p>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mx-auto mb-12 max-w-xl"
      >
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </motion.div>

      {/* FAQ Categories */}
      <div className="space-y-12">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <h2 className="mb-6 text-2xl font-bold">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`${categoryIndex}-${itemIndex}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <h3 className="text-lg font-medium">No results found</h3>
            <p className="mt-2 text-gray-600">
              We couldn't find any FAQs matching your search. Please try a different search term or browse our
              categories below.
            </p>
            <Button onClick={() => setFilteredFAQs(faqData)} className="mt-4">
              View All FAQs
            </Button>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 rounded-lg bg-gray-50 p-8 text-center"
      >
        <h3 className="mb-2 text-xl font-semibold">Still have questions?</h3>
        <p className="mb-4 text-gray-600">
          If you couldn't find the answer to your question, our customer service team is here to help.
        </p>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild>
            <a href="mailto:support@modernstore.com">Email Us</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/contact">Contact Page</a>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
