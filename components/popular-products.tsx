"use client"

import Image from "next/image"
import Link from "next/link"

// Sample data
const products = [
  {
    id: 1,
    name: "Handmade Crocheted Rose Bouquet",
    image: "/placeholder.svg?height=50&width=50",
    sales: 124,
    revenue: "₹161,076",
  },
  {
    id: 2,
    name: "Custom Name Keychain",
    image: "/placeholder.svg?height=50&width=50",
    sales: 98,
    revenue: "₹48,902",
  },
  {
    id: 3,
    name: "Watercolor Brush Set",
    image: "/placeholder.svg?height=50&width=50",
    sales: 67,
    revenue: "₹60,233",
  },
  {
    id: 4,
    name: "Crocheted Sunflower",
    image: "/placeholder.svg?height=50&width=50",
    sales: 52,
    revenue: "₹36,348",
  },
]

export function PopularProducts() {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="flex items-center gap-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={50}
            height={50}
            className="rounded-md object-cover"
          />
          <div className="flex-1 space-y-1">
            <Link href={`/admin/products/${product.id}`} className="font-medium hover:underline">
              {product.name}
            </Link>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{product.sales} sales</span>
              <span className="mx-2">•</span>
              <span>{product.revenue}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

