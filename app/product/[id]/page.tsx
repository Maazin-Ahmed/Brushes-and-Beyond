"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment, Float, Text } from "@react-three/drei"
import * as THREE from "three" // Import THREE

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"

// Sample product data
const product = {
  id: 1,
  name: "Handmade Crocheted Rose Bouquet",
  price: 1299,
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  category: "Crocheted Flowers",
  rating: 4.8,
  reviewCount: 124,
  description:
    "This beautiful handmade crocheted rose bouquet is perfect for home decor or as a thoughtful gift. Each rose is carefully crafted with high-quality yarn to create a realistic and long-lasting flower arrangement that will never wilt or fade.",
  features: [
    "Handmade with premium acrylic yarn",
    "Available in various colors",
    "Long-lasting alternative to real flowers",
    "Perfect for home decor or as a gift",
    "Each bouquet contains 7 roses",
    "Comes with a decorative vase",
  ],
  specifications: {
    Material: "Premium acrylic yarn",
    Dimensions: "Approximately 25cm x 15cm",
    Weight: "250g",
    "Colors Available": "Red, Pink, White, Yellow, Purple",
    "Care Instructions": "Dust with a soft cloth or air duster",
  },
  stock: 15,
  sku: "CF-RB-001",
  has3DModel: true,
}

// Sample related products
const relatedProducts = [
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

function Model() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <primitive object={new THREE.Object3D()} scale={1.5} position={[0, 0, 0]} />
          <Text
            position={[0, -2, 0]}
            fontSize={0.3}
            color="#663399"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist_Bold.json"
          >
            Crocheted with Love
          </Text>
        </Float>
      </PresentationControls>
      <Environment preset="sunset" />
      <OrbitControls enableZoom={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.5} />
    </Canvas>
  )
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [view, setView] = useState<"2d" | "3d">("2d")

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price)

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-6">
        <Link href="/shop" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            {view === "2d" ? (
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full">
                <Model />
              </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              {product.has3DModel && (
                <Button variant="secondary" size="sm" onClick={() => setView(view === "2d" ? "3d" : "2d")}>
                  {view === "2d" ? "View 3D" : "View 2D"}
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-background/80 hover:bg-background"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </div>
          <div className="flex gap-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`relative aspect-square w-20 overflow-hidden rounded-md border ${
                  selectedImage === index ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-primary text-primary" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            <p className="text-2xl font-bold mb-4">{formattedPrice}</p>
            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center">
                <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={incrementQuantity} disabled={quantity >= product.stock}>
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{product.stock} available</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="flex-1 sm:flex-none">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 sm:flex-none"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart className={`h-5 w-5 mr-2 ${isWishlisted ? "fill-destructive text-destructive" : ""}`} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
              <Button size="lg" variant="outline" className="flex-1 sm:flex-none">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </div>

            <div className="border rounded-lg p-4 bg-muted/30">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-5 w-5 text-primary" />
                <p className="font-medium">Shipping Information</p>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Free shipping on orders above ₹999</p>
              <p className="text-sm text-muted-foreground">Cash on Delivery available (additional ₹50 charge)</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">SKU</p>
                <p className="text-muted-foreground">{product.sku}</p>
              </div>
              <div>
                <p className="font-medium">Category</p>
                <p className="text-muted-foreground">{product.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mb-12">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
          <TabsTrigger
            value="details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Product Details
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
          >
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-muted-foreground mb-6">{product.description}</p>
              <h3 className="text-xl font-semibold mb-4">Features</h3>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Product in use" fill className="object-cover" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="pt-6">
          <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                    <td className="py-3 px-4 font-medium">{key}</td>
                    <td className="py-3 px-4 text-muted-foreground">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="pt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Customer Reviews</h3>
            <Button>Write a Review</Button>
          </div>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Reviewer"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Priya Sharma</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 5 ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">2 months ago</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                The knitted roses I ordered were absolutely beautiful! They look so realistic and the craftsmanship is
                exceptional. Will definitely order more for my home decor.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src="/placeholder.svg?height=50&width=50"
                  alt="Reviewer"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">Rahul Patel</p>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">3 months ago</span>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground">
                I bought this as a gift for my mother and she absolutely loved it. The quality is excellent and the
                colors are vibrant. Highly recommend!
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Related Products</h2>
          <Button variant="outline" asChild>
            <Link href="/shop">
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

