"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

// Sample cart data
const cartItems = [
  {
    id: 1,
    name: "Handmade Crocheted Rose Bouquet",
    price: 1299,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 1,
    color: "Pink",
    inStock: true,
  },
  {
    id: 2,
    name: "Custom Name Keychain",
    price: 499,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 2,
    customization: "Sarah",
    inStock: true,
  },
  {
    id: 4,
    name: "Crocheted Sunflower",
    price: 699,
    image: "/placeholder.svg?height=200&width=200",
    quantity: 1,
    color: "Yellow",
    inStock: true,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true)
    }
  }

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal > 999 ? 0 : 99
  const total = subtotal - discount + shipping

  const isEmpty = items.length === 0

  return (
    <div className="container py-10 md:py-16">
      <div className="flex flex-col gap-2 mb-8">
        <Link
          href="/shop"
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold creative-heading">Your Shopping Bag</h1>
      </div>

      {isEmpty ? (
        <motion.div
          className="flex flex-col items-center justify-center py-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your shopping bag is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Looks like you haven't added any items to your bag yet. Explore our collections to find something special!
          </p>
          <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary">
            <Link href="/shop">Explore Our Products</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-background rounded-xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium">Shopping Bag ({items.length} items)</h2>
              </div>

              <div className="space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 pb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    {index > 0 && <Separator className="mb-6" />}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="rounded-md object-cover w-[100px] h-[100px]"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-col sm:flex-row justify-between gap-2">
                        <div>
                          <h3 className="font-medium line-clamp-1">{item.name}</h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.color && <p>Color: {item.color}</p>}
                            {item.customization && <p>Customization: {item.customization}</p>}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="font-medium">₹{item.price.toLocaleString()}</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              className="bg-background rounded-xl shadow-sm border p-6 sticky top-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-medium mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="rounded-full"
                  />
                  <Button variant="outline" onClick={applyPromoCode} className="rounded-full" disabled={promoApplied}>
                    Apply
                  </Button>
                </div>
                {promoApplied && <p className="text-sm text-green-600 mt-2">Promo code applied successfully!</p>}
                {!promoApplied && <p className="text-sm text-muted-foreground mt-2">Try "WELCOME10" for 10% off</p>}
              </div>

              <Button asChild className="w-full rounded-full bg-gradient-to-r from-primary to-secondary py-6 text-lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Secure Payment</p>
                <div className="flex justify-center gap-2">
                  <Image src="/placeholder.svg?height=30&width=40" alt="Visa" width={40} height={30} />
                  <Image src="/placeholder.svg?height=30&width=40" alt="Mastercard" width={40} height={30} />
                  <Image src="/placeholder.svg?height=30&width=40" alt="UPI" width={40} height={30} />
                  <Image src="/placeholder.svg?height=30&width=40" alt="NetBanking" width={40} height={30} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Product Recommendations */}
      {!isEmpty && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 creative-heading">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-background rounded-xl shadow-sm p-4 border">
                <div className="aspect-square relative rounded-md overflow-hidden mb-3">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=Product ${i + 1}`}
                    alt={`Recommended product ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium line-clamp-1">Recommended Product {i + 1}</h3>
                <p className="text-sm text-muted-foreground mb-3">Crocheted Flowers</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">₹799</span>
                  <Button size="sm" variant="outline" className="rounded-full h-8">
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

