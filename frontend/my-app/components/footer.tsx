"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setEmail("")
    }
  }

  return (
    <footer className="bg-background border-t border-transparent" style={{ borderImage: "linear-gradient(to right, #6366f1, #a855f7, #ec4899) 1" }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center space-x-2">
              <Image
                src="/shop.png"
                alt="ShopSphere Logo"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ShopSphere</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Your one-stop destination for modern shopping experience with quality products and exceptional service.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Shop</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="text-muted-foreground hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=jewelery" className="text-muted-foreground hover:text-primary transition-colors">Jewelry</Link></li>
              <li><Link href="/products?category=men's clothing" className="text-muted-foreground hover:text-primary transition-colors">Men's Clothing</Link></li>
              <li><Link href="/products?category=women's clothing" className="text-muted-foreground hover:text-primary transition-colors">Women's Clothing</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Customer Service</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">Subscribe for the latest deals and updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white">
                Join
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 ShopSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
