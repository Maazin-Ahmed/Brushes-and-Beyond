"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface WishlistButtonProps {
  productId: number
  productName: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export function WishlistButton({
  productId,
  productName,
  className,
  variant = "ghost",
  size = "icon",
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()

  // Check if product is in wishlist on component mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsWishlisted(wishlist.includes(productId))
  }, [productId])

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (isWishlisted) {
      // Remove from wishlist
      const newWishlist = wishlist.filter((id: number) => id !== productId)
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      setIsWishlisted(false)

      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
        variant: "default",
      })
    } else {
      // Add to wishlist
      const newWishlist = [...wishlist, productId]
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      setIsWishlisted(true)

      toast({
        title: "Added to wishlist",
        description: `${productName} has been added to your wishlist.`,
        variant: "default",
      })
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleWishlist()
      }}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`h-5 w-5 ${isWishlisted ? "fill-primary text-primary" : ""}`} />
    </Button>
  )
}

