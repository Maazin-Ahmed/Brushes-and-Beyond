"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"

interface TestimonialCardProps {
  testimonial: {
    id: number
    name: string
    avatar: string
    content: string
    rating: number
  }
  className?: string
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <motion.div
      className={cn("bg-background rounded-lg p-6 shadow-md min-w-[300px] w-[350px] snap-start", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={testimonial.avatar || "/placeholder.svg"}
          alt={testimonial.name}
          width={50}
          height={50}
          className="rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < testimonial.rating ? "fill-primary text-primary" : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground">{testimonial.content}</p>
    </motion.div>
  )
}

