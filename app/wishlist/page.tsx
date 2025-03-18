"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, Heart, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample product data (in a real app, you would fetch this from an API)
const allProducts = [
  {
    id: 1,
    name: "Handmade Crocheted Rose Bouquet",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Crocheted Flowers",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 2,
    name: "Custom Name Keychain",
    price: 499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Keychains",
    rating: 4.9,
    reviewCount: 86,
  },
  {
    id: 3,
    name: "Watercolor Brush Set",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    category: "Art Supplies",
    rating: 4.7,
    reviewCount: 52,
  },
  {
    id: 4,
    name: "Crocheted Sunflower",
    price: 699,
    image: "/placeholder.svg?height=300&width=300",
    category: "Crocheted Flowers",
    rating: 4.6,
    reviewCount: 38,
  },
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<typeof allProducts>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get wishlist from localStorage
    const wishlistIds = JSON.parse(localStorage.getItem("wishlist") || "[]")

    // Filter products that are in the wishlist
    const items = allProducts.filter((product) => wishlistIds.includes(product.id))
    setWishlistItems(items)
    setIsLoading(false)
  }, [])

  const removeFromWishlist = (productId: number) => {
    // Update localStorage
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    const newWishlist = wishlist.filter((id: number) => id !== productId)
    localStorage.setItem("wishlist", JSON.stringify(newWishlist))

    // Update state
    setWishlistItems(wishlistItems.filter((item) => item.id !== productId))
  }

  const isEmpty = wishlistItems.length === 0 && !isLoading

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
        <h1 className="text-3xl md:text-4xl font-bold creative-heading">Your Wishlist</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : isEmpty ? (
        <motion.div
          className="flex flex-col items-center justify-center py-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Looks like you haven't added any items to your wishlist yet. Explore our collections to find something
            special!
          </p>
          <Button asChild size="lg" className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary">
            <Link href="/shop">Explore Our Products</Link>
          </Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              className="border rounded-lg overflow-hidden bg-background shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative aspect-square">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <div className="p-4">
                <div className="text-sm text-muted-foreground mb-1">{item.category}</div>
                <h3 className="font-medium line-clamp-2 mb-2">{item.name}</h3>
                <div className="flex justify-between items-center">
                  <div className="font-semibold">₹{item.price.toLocaleString()}</div>
                  <Button size="sm" className="rounded-full">
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

