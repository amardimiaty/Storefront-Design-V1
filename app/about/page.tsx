"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold md:text-5xl"
        >
          About ModernStore
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-gray-600"
        >
          We're on a mission to bring high-quality, sustainable products to conscious consumers around the world.
        </motion.p>
      </div>

      {/* Our Story */}
      <div className="mb-20 grid gap-12 md:grid-cols-2 md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold">Our Story</h2>
          <div className="mt-6 space-y-4 text-gray-600">
            <p>
              ModernStore was founded in 2020 with a simple idea: create a curated shopping experience that connects
              people with products that are both beautiful and functional.
            </p>
            <p>
              What started as a small online boutique has grown into a destination for those who value quality,
              sustainability, and thoughtful design. We believe that the items we bring into our lives should bring us
              joy, serve a purpose, and stand the test of time.
            </p>
            <p>
              Our team scours the globe to find independent makers, ethical brands, and innovative products that align
              with our values. We're proud to offer a collection that's been carefully selected with our customers and
              the planet in mind.
            </p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-square overflow-hidden rounded-lg"
        >
          <Image src="/modern-store-team.png" alt="Our team at work" fill className="object-cover" />
        </motion.div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold"
        >
          Our Values
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Quality",
              description:
                "We believe in offering products that are built to last. Quality over quantity is at the heart of everything we do.",
              icon: "✨",
            },
            {
              title: "Sustainability",
              description:
                "We're committed to reducing our environmental impact by partnering with brands that prioritize sustainable practices.",
              icon: "🌱",
            },
            {
              title: "Transparency",
              description:
                "We provide clear information about our products, pricing, and business practices because we value your trust.",
              icon: "🔍",
            },
            {
              title: "Community",
              description:
                "We support independent makers and ethical manufacturers who treat their workers fairly and contribute positively to their communities.",
              icon: "👥",
            },
            {
              title: "Innovation",
              description:
                "We're always on the lookout for innovative products and solutions that make everyday life better.",
              icon: "💡",
            },
            {
              title: "Customer Experience",
              description:
                "We're dedicated to providing an exceptional shopping experience from browsing to unboxing and beyond.",
              icon: "🎁",
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg border p-6"
            >
              <div className="mb-4 text-4xl">{value.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold"
        >
          Meet Our Team
        </motion.h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              image: "/professional-woman-headshot.png",
            },
            {
              name: "Sam Rodriguez",
              role: "Creative Director",
              image: "/professional-man-headshot.png",
            },
            {
              name: "Taylor Kim",
              role: "Head of Product",
              image: "/professional-headshot-person.png",
            },
            {
              name: "Jordan Smith",
              role: "Customer Experience",
              image: "/placeholder.svg?height=400&width=400&query=professional headshot diverse",
            },
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 aspect-square w-40 overflow-hidden rounded-full">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-20 rounded-lg bg-gray-50 p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center text-3xl font-bold"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              quote:
                "ModernStore has completely changed how I shop. The quality of every item I've purchased has been exceptional, and I love knowing that my purchases are supporting ethical practices.",
              author: "Jamie L.",
              location: "New York, NY",
            },
            {
              quote:
                "I appreciate the thoughtfulness that goes into curating ModernStore's collection. It makes shopping so much easier when I know that everything offered aligns with my values.",
              author: "Morgan T.",
              location: "Portland, OR",
            },
            {
              quote:
                "The customer service at ModernStore is unmatched. When I had an issue with my order, the team went above and beyond to make it right. I'm a customer for life!",
              author: "Casey B.",
              location: "Austin, TX",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <p className="mb-4 italic text-gray-600">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
