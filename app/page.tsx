"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, Flower } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { TestimonialCard } from "@/components/testimonial-card"

// Sample data
const featuredProducts = [
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
]

const categories = [
  {
    id: 1,
    name: "Crocheted Flowers",
    image: "/placeholder.svg?height=400&width=400",
    href: "/shop/crocheted-flowers",
  },
  {
    id: 2,
    name: "Custom Keychains",
    image: "/placeholder.svg?height=400&width=400",
    href: "/shop/keychains",
  },
  {
    id: 3,
    name: "Art Supplies",
    image: "/placeholder.svg?height=400&width=400",
    href: "/shop/art-supplies",
  },
  {
    id: 4,
    name: "Gift Sets",
    image: "/placeholder.svg?height=400&width=400",
    href: "/shop/gift-sets",
  },
]

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The crocheted roses I ordered were absolutely beautiful! They look so realistic and the craftsmanship is exceptional. Will definitely order more for my home decor.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul Patel",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "I ordered a custom keychain for my wife's birthday and she loved it! The quality is excellent and the personalization was perfect. Fast shipping too!",
    rating: 5,
  },
  {
    id: 3,
    name: "Ananya Gupta",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The art supplies I purchased were of premium quality. The brushes are perfect for my watercolor paintings. Highly recommend for all artists!",
    rating: 4,
  },
]

export default function Home() {
  const categoriesRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: featuredProgress } = useScroll({
    target: featuredRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  })

  const featuredOpacity = useTransform(featuredProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const featuredY = useTransform(featuredProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const storyOpacity = useTransform(storyProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const storyX = useTransform(storyProgress, [0, 0.2, 0.8, 1], [-100, 0, 0, -100])
  const storyImageX = useTransform(storyProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const scrollCategories = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const scrollTestimonials = (direction: "left" | "right") => {
    if (testimonialsRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400
      testimonialsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Featured Categories */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 floral-pattern opacity-30" />
        <div className="container relative z-10">
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="creative-heading text-3xl md:text-4xl font-bold">Explore Our Collections</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mt-2" />
            </motion.div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollCategories("left")}
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollCategories("right")}
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          </div>
          <motion.div
            ref={categoriesRef}
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section ref={featuredRef} className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-secondary/5 relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <motion.div
          className="absolute -top-10 right-10 w-20 h-20 text-primary/30"
          animate={{
            y: [0, 10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Flower className="w-full h-full" />
        </motion.div>

        <div className="container">
          <motion.div
            className="flex items-center justify-between mb-12"
            style={{ opacity: featuredOpacity, y: featuredY }}
          >
            <div>
              <h2 className="creative-heading text-3xl md:text-4xl font-bold">Featured Creations</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mt-2" />
            </div>
            <Button
              variant="outline"
              asChild
              className="rounded-full px-6 border-2 hover:bg-primary/10 transition-all duration-300"
            >
              <Link href="/shop">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Artist Story */}
      <section ref={storyRef} className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 floral-pattern opacity-20" />
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div style={{ opacity: storyOpacity, x: storyX }}>
              <h2 className="creative-heading text-3xl md:text-4xl font-bold mb-6">Our Blooming Story</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Brushes and Beyond was born from a passion for creating beautiful, handcrafted art that brings joy to
                people's lives. What started as a hobby creating crocheted flowers for friends and family has blossomed
                into a thriving business offering a wide range of artistic products.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Each item is carefully crafted with love and attention to detail, ensuring that every customer receives
                a unique piece of art that will be cherished for years to come. We take pride in using high-quality
                materials and supporting local artisans in India.
              </p>
              <Button className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300">
                <Link href="/about">Discover Our Journey</Link>
              </Button>
            </motion.div>
            <motion.div className="relative" style={{ opacity: storyOpacity, x: storyImageX }}>
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-secondary/20 blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-xl animate-float-slow">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Artist at work"
                  width={600}
                  height={600}
                  className="rounded-lg object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-lg font-medium">Meera Patel</p>
                  <p className="text-sm text-muted-foreground">Founder & Lead Artist</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-secondary/5 relative">
        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-r from-primary/20 to-secondary/20" />
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="creative-heading text-3xl md:text-4xl font-bold">Customer Love</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mt-2" />
            </motion.div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollTestimonials("left")}
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Scroll left</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scrollTestimonials("right")}
                className="rounded-full hover:bg-primary/10"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Scroll right</span>
              </Button>
            </div>
          </div>
          <div ref={testimonialsRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 floral-pattern opacity-20" />
        <div className="container relative z-10">
          <motion.div
            className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-8 md:p-12 floral-border"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-dancing text-3xl md:text-4xl font-bold mb-4">Join Our Creative Community</h2>
              <p className="mb-8 text-lg opacity-90">
                Subscribe to our newsletter for exclusive offers, new product announcements, and creative inspiration
                delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-3 rounded-full border border-white/20 bg-white/10 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <Button
                  variant="secondary"
                  className="rounded-full px-6 py-3 bg-white text-primary hover:bg-white/90 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

