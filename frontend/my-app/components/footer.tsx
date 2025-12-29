import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Image
                src="/shop.png"
                alt="ShopSphere Logo"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="font-bold">ShopSphere</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for modern shopping experience with quality products and exceptional service.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Shop</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="text-muted-foreground hover:text-primary">Electronics</Link></li>
              <li><Link href="/products?category=jewelery" className="text-muted-foreground hover:text-primary">Jewelry</Link></li>
              <li><Link href="/products?category=men's clothing" className="text-muted-foreground hover:text-primary">Men's Clothing</Link></li>
              <li><Link href="/products?category=women's clothing" className="text-muted-foreground hover:text-primary">Women's Clothing</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Customer Service</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="/shipping" className="text-muted-foreground hover:text-primary">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-muted-foreground hover:text-primary">Returns</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-primary">Support</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-1 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ShopSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}