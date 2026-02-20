"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart, X, LogOut, User, Package, Heart, MapPin, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { state: authState, logout } = useAuth()
  const { state } = useCart()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e)
    }
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    router.push("/")
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Image
              src="/shop.png"
              alt="ShopSphere Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="hidden font-bold sm:inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ShopSphere
            </span>
          </Link>
        </div>

        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Toggle Menu</span>
        </Button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer" onClick={handleSearch} />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full rounded-md border border-input bg-background px-8 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[300px] lg:w-[400px] transition-shadow"
              />
            </form>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {authState.isAuthenticated && authState.user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-8 w-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <span className="text-sm font-medium">
                    {authState.user.name.charAt(0).toUpperCase()}
                  </span>
                </Button>
                {showUserMenu && (
                  <div className="absolute right-0 top-10 z-50 w-64 rounded-lg border bg-background shadow-xl origin-top-right">
                    {/* Account Header */}
                    <div className="px-4 py-3 border-b">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Account</p>
                      <p className="text-sm font-medium mt-0.5">{authState.user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{authState.user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {[
                        { href: '/profile', icon: User, label: 'My Profile' },
                        { href: '/my-orders', icon: Package, label: 'My Orders' },
                        { href: '/wishlist', icon: Heart, label: 'Wishlist' },
                        { href: '/addresses', icon: MapPin, label: 'Saved Addresses' },
                        { href: '/notifications', icon: Bell, label: 'Notifications' },
                      ].map(({ href, icon: Icon, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-accent transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          {label}
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t py-1">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-accent transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {state.itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {state.itemCount}
                  </Badge>
                )}
                <span className="sr-only">Shopping cart</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t md:hidden animate-slide-up">
          <nav className="container mx-auto flex flex-col space-y-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
