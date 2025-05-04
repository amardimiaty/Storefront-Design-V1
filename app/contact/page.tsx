"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"
import StoreLocation from "@/components/store-location"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    })

    // Reset form
    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setIsSubmitting(false)
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
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-gray-600"
        >
          Have a question or feedback? We'd love to hear from you. Fill out the form below or reach out directly.
        </motion.p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border p-8"
        >
          <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div>
            <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">123 Fashion Avenue, New York, NY 10001</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">hello@modernstore.com</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold">Business Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold">Customer Support</h2>
            <p className="text-gray-600">
              Our customer support team is available during business hours. For urgent inquiries outside of business
              hours, please email us and we'll get back to you as soon as possible.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Store Location Map */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Visit Our Store</h2>
        <StoreLocation />
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              question: "What are your shipping options?",
              answer:
                "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and free shipping on orders over $50.",
            },
            {
              question: "What is your return policy?",
              answer:
                "We accept returns within 30 days of delivery. Items must be unworn and in original packaging with tags attached.",
            },
            {
              question: "Do you ship internationally?",
              answer:
                "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location.",
            },
            {
              question: "How can I track my order?",
              answer:
                "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order in your account dashboard.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg border p-6"
            >
              <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
