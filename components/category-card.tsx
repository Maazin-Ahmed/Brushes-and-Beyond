"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface CategoryCardProps {
  category: {
    id: number
    name: string
    image: string
    href: string
  }
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <motion.div
      className={cn("relative min-w-[280px] w-[280px] h-[320px] rounded-lg overflow-hidden snap-start", className)}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
        <Link href={category.href} className="inline-flex items-center text-white hover:text-accent transition-colors">
          Shop Now <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}

