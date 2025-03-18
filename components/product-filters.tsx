"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface FilterSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b pb-4">
      <button className="flex w-full items-center justify-between py-2 font-medium" onClick={() => setIsOpen(!isOpen)}>
        {title}
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      <div className={cn("mt-2", isOpen ? "block" : "hidden")}>{children}</div>
    </div>
  )
}

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 5000])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filters</h3>
        <Button variant="outline" size="sm" className="w-full">
          Clear All
        </Button>
      </div>

      <FilterSection title="Categories">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="category-flowers" />
            <label
              htmlFor="category-flowers"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Crocheted Flowers
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-keychains" />
            <label
              htmlFor="category-keychains"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Custom Keychains
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-art" />
            <label
              htmlFor="category-art"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Art Supplies
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-gift" />
            <label
              htmlFor="category-gift"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Gift Sets
            </label>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="space-y-4">
          <Slider defaultValue={[0, 5000]} max={5000} step={100} value={priceRange} onValueChange={setPriceRange} />
          <div className="flex items-center justify-between">
            <span className="text-sm">₹{priceRange[0]}</span>
            <span className="text-sm">₹{priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Rating">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="rating-5" />
            <label
              htmlFor="rating-5"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              5 Stars
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rating-4" />
            <label
              htmlFor="rating-4"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              4 Stars & Above
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rating-3" />
            <label
              htmlFor="rating-3"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              3 Stars & Above
            </label>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" />
            <label
              htmlFor="in-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              In Stock
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="out-of-stock" />
            <label
              htmlFor="out-of-stock"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Out of Stock
            </label>
          </div>
        </div>
      </FilterSection>
    </div>
  )
}

