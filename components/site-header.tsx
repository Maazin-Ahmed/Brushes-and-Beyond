"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Search, ShoppingCart, Heart, User, Menu, X, Paintbrush, Flower2, KeyRound, Gift } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { useCart } from "@/contexts/cart-context"

export function SiteHeader() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { itemCount } = useCart()

  const routes = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Shop",
      href: "/shop",
      children: [
        {
          name: "Crocheted Flowers",
          href: "/shop/crocheted-flowers",
          icon: <Flower2 className="h-4 w-4" />,
        },
        {
          name: "Custom Keychains",
          href: "/shop/keychains",
          icon: <KeyRound className="h-4 w-4" />,
        },
        {
          name: "Art Supplies",
          href: "/shop/art-supplies",
          icon: <Paintbrush className="h-4 w-4" />,
        },
        {
          name: "Gift Sets",
          href: "/shop/gift-sets",
          icon: <Gift className="h-4 w-4" />,
        },
      ],
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <div className="px-7">
              <Link
                href="/"
                className="flex items-center"
                onClick={(e) => {
                  const sheet = document.querySelector("[data-radix-sheet-content]")
                  if (sheet) {
                    const closeButton = sheet.querySelector('button[type="button"]')
                    if (closeButton) {
                      closeButton.click()
                    }
                  }
                }}
              >
                <Logo className="h-10 w-10" />
                <span className="ml-2 text-xl font-bold">Brushes and Beyond</span>
              </Link>
            </div>
            <nav className="mt-8 flex flex-col gap-4 px-7">
              {routes.map((route) => (
                <div key={route.href} className="flex flex-col gap-2">
                  <Link
                    href={route.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === route.href ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {route.name}
                  </Link>
                  {route.children && (
                    <div className="ml-4 flex flex-col gap-2">
                      {route.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                            pathname === child.href ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {child.icon}
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden md:flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-bold">Brushes and Beyond</span>
          </Link>
          <Link href="/" className="md:hidden">
            <Logo className="h-8 w-8" />
          </Link>
        </div>
        <nav className="mx-6 hidden md:flex items-center space-x-6 lg:space-x-8">
          {routes.map((route) => (
            <div key={route.href} className="relative group">
              <Link
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === route.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {route.name}
              </Link>
              {route.children && (
                <div className="absolute left-0 top-full hidden group-hover:block bg-background border rounded-md shadow-lg p-4 w-56 z-50">
                  <div className="flex flex-col gap-2">
                    {route.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary p-2 rounded-md",
                          pathname === child.href ? "text-primary bg-muted" : "text-muted-foreground",
                        )}
                      >
                        {child.icon}
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative flex items-center">
              <Input type="search" placeholder="Search products..." className="w-[200px] lg:w-[300px]" autoFocus />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <ThemeToggle />

          <Button variant="ghost" size="icon" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href="/login">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

