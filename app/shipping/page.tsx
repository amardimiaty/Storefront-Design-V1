"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Clock, Package, Globe, RefreshCw, AlertCircle } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold"
        >
          Shipping & Returns
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-gray-600"
        >
          Everything you need to know about our shipping policies and return process.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Shipping Information */}
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Information
              </CardTitle>
              <CardDescription>Details about our shipping options and delivery times.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Options</h3>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Standard Shipping</p>
                        <p className="text-sm text-gray-600">Delivery in 3-5 business days</p>
                      </div>
                      <p className="font-semibold">$5.99</p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Express Shipping</p>
                        <p className="text-sm text-gray-600">Delivery in 1-2 business days</p>
                      </div>
                      <p className="font-semibold">$12.99</p>
                    </div>
                  </div>
                  <div className="rounded-lg border p-4 bg-primary/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Free Shipping</p>
                        <p className="text-sm text-gray-600">On orders over $50</p>
                      </div>
                      <p className="font-semibold">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Shipping Policies</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Orders are processed within 1-2 business days.</li>
                  <li>Shipping times are estimates and not guaranteed.</li>
                  <li>We ship Monday through Friday, excluding holidays.</li>
                  <li>You will receive a tracking number once your order ships.</li>
                  <li>We currently ship to the United States and Canada.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">International Shipping</h3>
                <p className="text-gray-600">
                  We offer international shipping to select countries. International orders may be subject to import
                  duties and taxes, which are the responsibility of the customer.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Returns & Exchanges */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <RefreshCw className="mr-2 h-5 w-5" />
                Returns & Exchanges
              </CardTitle>
              <CardDescription>Our policies for returns and exchanges.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Return Policy</h3>
                <ul className="list-inside list-disc space-y-2 text-gray-600">
                  <li>Returns are accepted within 30 days of delivery.</li>
                  <li>Items must be unworn, unwashed, and in original packaging with tags attached.</li>
                  <li>Sale items are final sale and cannot be returned.</li>
                  <li>Return shipping costs are the responsibility of the customer.</li>
                  <li>Refunds will be issued to the original payment method.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Exchange Process</h3>
                <p className="text-gray-600">
                  To exchange an item, please return the original item for a refund and place a new order for the
                  desired item. This ensures the fastest processing time.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">How to Return an Item</h3>
                <ol className="list-inside list-decimal space-y-2 text-gray-600">
                  <li>Log in to your account and navigate to your order history.</li>
                  <li>Select the order containing the item you wish to return.</li>
                  <li>Follow the prompts to initiate a return.</li>
                  <li>Print the return shipping label (if applicable).</li>
                  <li>Package the item securely with all original packaging and tags.</li>
                  <li>Drop off the package at the specified carrier.</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16"
      >
        <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long does shipping take?</AccordionTrigger>
            <AccordionContent>
              Standard shipping typically takes 3-5 business days within the continental United States. Express shipping
              takes 1-2 business days. International shipping times vary by destination, usually between 7-14 business
              days.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I change my shipping address after placing an order?</AccordionTrigger>
            <AccordionContent>
              If your order hasn't shipped yet, we may be able to update the shipping address. Please contact our
              customer service team as soon as possible with your order number and the new shipping address.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer free standard shipping on all orders over $50 within the continental United States.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>How do I track my order?</AccordionTrigger>
            <AccordionContent>
              Once your order ships, you'll receive a shipping confirmation email with a tracking number. You can also
              log in to your account to view the status of your order and tracking information.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>What if my item arrives damaged?</AccordionTrigger>
            <AccordionContent>
              If your item arrives damaged, please contact our customer service team within 48 hours of delivery. Please
              include your order number and photos of the damaged item and packaging. We'll work with you to resolve the
              issue promptly.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>How long do refunds take to process?</AccordionTrigger>
            <AccordionContent>
              Once we receive your return, it typically takes 3-5 business days to inspect the item and process the
              refund. After the refund is processed, it may take an additional 5-10 business days for the funds to
              appear in your account, depending on your payment method and financial institution.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </motion.div>

      {/* Shipping Icons Section */}
      <div className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Fast Processing</h3>
          <p className="text-gray-600">Orders are processed within 1-2 business days.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Secure Packaging</h3>
          <p className="text-gray-600">All items are carefully packaged to ensure safe delivery.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center text-center"
        >
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">Global Shipping</h3>
          <p className="text-gray-600">We ship to multiple countries worldwide.</p>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 rounded-lg bg-gray-50 p-8 text-center"
      >
        <AlertCircle className="mx-auto mb-4 h-10 w-10 text-primary" />
        <h3 className="mb-2 text-xl font-semibold">Need Help?</h3>
        <p className="mb-4 text-gray-600">
          If you have any questions about shipping, returns, or your order, our customer service team is here to help.
        </p>
        <p className="font-medium">
          Contact us at{" "}
          <a href="mailto:support@modernstore.com" className="text-primary hover:underline">
            support@modernstore.com
          </a>
        </p>
      </motion.div>
    </div>
  )
}
