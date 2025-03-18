"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, Download, Package, ShoppingBag } from "lucide-react"
import confetti from "canvas-confetti"

import { Button } from "@/components/ui/button"

export default function OrderSuccessPage() {
  useEffect(() => {
    // Show celebration confetti
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // Create confetti burst
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container py-16 md:py-24 max-w-4xl mx-auto">
      <motion.div
        className="bg-background rounded-xl shadow-sm border p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative mx-auto mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-primary" />
          </div>
          <motion.div
            className="absolute -top-4 -right-4"
            initial={{ rotate: -30 }}
            animate={{ rotate: [0, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.3, repeat: 5, repeatType: "reverse" }}
          >
            <div className="text-4xl">🎉</div>
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold mb-4 creative-heading">Order Placed Successfully!</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Thank you for your purchase. We've received your order and will process it shortly.
        </p>

        <div className="bg-muted/30 p-6 rounded-lg mb-8 max-w-md mx-auto text-left">
          <h2 className="font-medium mb-4">Order Details</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Order Number:</span>
              <span className="font-medium">BB-87654321</span>
            </div>
            <div className="flex justify-between">
              <span>Order Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Method:</span>
              <span>UPI</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Address:</span>
              <span className="text-right">
                123 Main Street
                <br />
                Mumbai, Maharashtra
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-medium">Total Amount:</span>
              <span className="font-medium">₹3,296</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
          <div className="bg-muted/20 p-4 rounded-lg text-center">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium mb-1">Order Confirmed</h3>
            <p className="text-xs text-muted-foreground">Your order has been confirmed</p>
          </div>

          <div className="bg-muted/20 p-4 rounded-lg text-center">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">Processing</h3>
            <p className="text-xs text-muted-foreground">Your order is being processed</p>
          </div>

          <div className="bg-muted/20 p-4 rounded-lg text-center">
            <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">Out for Delivery</h3>
            <p className="text-xs text-muted-foreground">Estimated delivery in 3-5 days</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary">
            <Link href="/account/orders">Track Your Order</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>

        <div className="mt-8 text-center">
          <Button variant="link" className="text-sm text-muted-foreground flex items-center mx-auto">
            <Download className="h-4 w-4 mr-1" /> Download Invoice
          </Button>
        </div>
      </motion.div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6 creative-heading">Thank You for Shopping with Brushes and Beyond</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          We hope you love your new purchase! Share your experience with us by tagging #BrushesAndBeyond on social
          media.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <Image
            src="/placeholder.svg?height=100&width=100&text=Instagram"
            alt="Instagram"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <Image
            src="/placeholder.svg?height=100&width=100&text=Facebook"
            alt="Facebook"
            width={100}
            height={100}
            className="rounded-lg"
          />
          <Image
            src="/placeholder.svg?height=100&width=100&text=Twitter"
            alt="Twitter"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

