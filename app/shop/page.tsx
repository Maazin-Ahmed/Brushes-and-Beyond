import type { Metadata } from "next"
import { Filter, Grid3X3, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"

export const metadata: Metadata = {
  title: "Shop | Brushes and Beyond",
  description: "Browse our collection of handmade knitted flowers, custom keychains, and artistic products.",
}

// Sample data
const products = [
  {
    id: 1,
    name: "Handmade Crocheted Rose Bouquet",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Crocheted Flowers",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
  },
  {
    id: 2,
    name: "Custom Name Keychain",
    price: 499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Keychains",
    rating: 4.9,
    reviewCount: 86,
    isNew: false,
  },
  {
    id: 3,
    name: "Watercolor Brush Set",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    category: "Art Supplies",
    rating: 4.7,
    reviewCount: 52,
    isNew: true,
  },
  {
    id: 4,
    name: "Crocheted Sunflower",
    price: 699,
    image: "/placeholder.svg?height=300&width=300",
    category: "Crocheted Flowers",
    rating: 4.6,
    reviewCount: 38,
    isNew: false,
  },
  {
    id: 5,
    name: "Personalized Family Keychain",
    price: 799,
    image: "/placeholder.svg?height=300&width=300",
    category: "Keychains",
    rating: 4.5,
    reviewCount: 42,
    isNew: true,
  },
  {
    id: 6,
    name: "Acrylic Paint Set",
    price: 1499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Art Supplies",
    rating: 4.8,
    reviewCount: 67,
    isNew: false,
  },
  {
    id: 7,
    name: "Crocheted Tulip Arrangement",
    price: 1099,
    image: "/placeholder.svg?height=300&width=300",
    category: "Crocheted Flowers",
    rating: 4.7,
    reviewCount: 29,
    isNew: false,
  },
  {
    id: 8,
    name: "Artist Gift Set",
    price: 2499,
    image: "/placeholder.svg?height=300&width=300",
    category: "Gift Sets",
    rating: 4.9,
    reviewCount: 18,
    isNew: true,
  },
]

export default function ShopPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
          <p className="text-muted-foreground">Browse our collection of handcrafted items</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Grid3X3 className="h-4 w-4 mr-2" />
            Grid
          </Button>
          <Button variant="outline" size="sm">
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="hidden md:block">
          <ProductFilters />
        </div>
        <div className="md:col-span-3">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <Button variant="outline" size="sm" className="md:hidden w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Input placeholder="Search products..." className="w-full sm:w-[250px]" />
              <Select defaultValue="newest">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

