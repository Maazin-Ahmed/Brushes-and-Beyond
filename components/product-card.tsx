"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WishlistButton } from "@/components/wishlist-button"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    image: string
    category: string
    rating: number
    reviewCount: number
    isNew?: boolean
  }
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // In a real app, you would add the product to the cart here
    // For now, we'll just show a toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    })
  }

  return (
    <motion.div
      className={cn(
        "group relative rounded-xl overflow-hidden bg-background product-card-shadow transition-all duration-300",
        isHovered ? "shadow-lg scale-[1.03]" : "shadow-md",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-square relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn("object-cover transition-transform duration-500", isHovered ? "scale-110" : "scale-100")}
          />
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </Link>
        {product.isNew && (
          <Badge className="absolute top-2 left-2 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full">
            New
          </Badge>
        )}

        <WishlistButton
          productId={product.id}
          productName={product.name}
          className={cn(
            "absolute top-2 right-2 z-10 opacity-0 transition-opacity duration-300 rounded-full",
            isHovered ? "opacity-100" : "md:opacity-0",
          )}
        />

        {isHovered && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              size="sm"
              className="w-full gap-1 bg-white/90 text-foreground hover:bg-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Quick Add</span>
            </Button>
          </motion.div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium line-clamp-2 mb-1 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">{formattedPrice}</div>
          <Button
            size="sm"
            className="gap-1 rounded-full px-4 bg-gradient-to-r from-primary to-secondary hover:shadow-md transition-all duration-300"
          >
            <span>View</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

