"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Truck, Shield, Headphones, Sparkles, Zap, Star, Gift, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getApiUrl } from '@/lib/api'
import Image from "next/image"

interface BackendProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  imageUrl: string
  rating: number
  reviewCount: number
  isNew?: boolean
  isOnSale?: boolean
  category: string
  description: string
  stockQuantity: number
}

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isNew?: boolean
  isOnSale?: boolean
}

const API_URL = getApiUrl()

const sampleProducts: Product[] = [
  {
    id: 'sample-1',
    name: 'MacBook Air M2',
    price: 89999,
    originalPrice: 99999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=904&h=840&fit=crop',
    rating: 4.8,
    reviews: 245,
    isNew: true,
    isOnSale: true,
  },
  {
    id: 'sample-2',
    name: 'iPhone 14 Pro',
    price: 99999,
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=940&h=1112&fit=crop',
    rating: 4.9,
    reviews: 189,
    isNew: true,
  },
  {
    id: 'sample-3',
    name: 'AirPods Pro',
    price: 24999,
    originalPrice: 29999,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=572&h=572&fit=crop',
    rating: 4.7,
    reviews: 324,
    isOnSale: true,
  },
  {
    id: 'sample-4',
    name: 'Samsung Galaxy Watch 6',
    price: 27999,
    originalPrice: 31999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    rating: 4.5,
    reviews: 132,
    isOnSale: true,
  },
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $100"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is safe"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help whenever you need it"
  }
]

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(sampleProducts)
  const [secondsLeft, setSecondsLeft] = useState(8 * 60 * 60)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => (value > 0 ? value - 1 : 8 * 60 * 60))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products/featured?limit=4`)
        if (!response.ok) return

        const backendProducts: BackendProduct[] = await response.json()
        if (!backendProducts.length) return

        const transformedProducts: Product[] = backendProducts.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || undefined,
          image: product.imageUrl,
          rating: product.rating,
          reviews: product.reviewCount,
          isNew: product.isNew,
          isOnSale: product.isOnSale
        }))

        setFeaturedProducts(transformedProducts)
      } catch (err) {
        // Keep showing sample products if backend is unavailable
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-[#080914] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(139,92,246,0.38),transparent_28%),radial-gradient(circle_at_20%_90%,rgba(236,72,153,0.18),transparent_25%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="container relative mx-auto grid min-h-[560px] items-center gap-10 px-4 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span>Fresh arrivals every week</span>
              <span className="rounded-full bg-yellow-300 px-2 py-0.5 text-xs font-bold text-slate-950">NEW</span>
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Find what you love.
              <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
                Own what’s next.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
              Curated tech, fashion, and everyday essentials—selected for quality and made for your world.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/products">
                <Button size="lg" className="h-13 rounded-full bg-white px-7 text-base font-bold text-slate-950 hover:bg-violet-100">
                  Shop collection <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="h-13 rounded-full border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10">
                  Explore categories
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-amber-300 text-amber-300" /> 4.8 customer rating</span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>20+ curated products</span>
              <span>Secure checkout</span>
            </div>
          </div>

          <div className="relative hidden h-[430px] lg:block">
            <div className="absolute right-6 top-5 h-[380px] w-[380px] rounded-[3rem] border border-white/10 bg-gradient-to-br from-violet-500/50 via-fuchsia-500/20 to-amber-300/20 p-5 backdrop-blur">
              <div className="h-full overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&h=900&fit=crop"
                  alt="Featured product"
                  fill
                  sizes="380px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -left-8 bottom-12 rounded-2xl border border-white/15 bg-slate-950/90 p-4 shadow-2xl backdrop-blur">
                <p className="text-xs text-slate-400">Today’s pick</p>
                <p className="mt-1 font-bold">Premium essentials</p>
              </div>
              <div className="absolute -right-4 top-20 rounded-2xl bg-yellow-300 px-4 py-3 text-slate-950 shadow-2xl">
                <p className="text-xs font-semibold">Limited offer</p>
                <p className="text-lg font-black">Save 20%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Offer */}
      <section className="border-b border-border bg-gradient-to-r from-violet-50 via-white to-fuchsia-50 py-4 dark:from-violet-950/30 dark:via-background dark:to-fuchsia-950/20">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-white">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <div>
              <p className="font-bold">Weekend Flash Event</p>
              <p className="text-sm text-muted-foreground">Extra savings on selected favourites</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-violet-600" />
            <span className="text-sm text-muted-foreground">Ends in</span>
            {(() => {
              const hours = Math.floor(secondsLeft / 3600)
              const minutes = Math.floor((secondsLeft % 3600) / 60)
              const seconds = secondsLeft % 60
              return (
                <div className="flex gap-1 font-mono">
                  {[hours, minutes, seconds].map((value, index) => (
                    <span key={index} className="rounded-md bg-foreground px-2 py-1 text-sm font-bold text-background">
                      {String(value).padStart(2, '0')}
                    </span>
                  ))}
                </div>
              )
            })()}
            <Link href="/products" className="ml-2 text-sm font-bold text-violet-600 hover:underline">Shop deals →</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="group overflow-hidden border-border/70 bg-card/80 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-[0_16px_50px_-20px_rgba(124,58,237,.35)]">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 transition-transform group-hover:rotate-3 group-hover:scale-105">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">{feature.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-violet-50/70 to-transparent dark:from-violet-950/20" />
        <div className="container relative mx-auto px-4">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-violet-600">
                <Sparkles className="h-4 w-4" /> Curated for you
              </p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Trending right now</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">Popular picks customers can’t stop talking about.</p>
            </div>
            <Link href="/products">
              <Button variant="outline" size="lg" className="rounded-full px-6">
                Explore all <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 grid overflow-hidden rounded-3xl border border-violet-200/60 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white md:grid-cols-[1fr_auto] md:items-center dark:border-white/10">
            <div className="p-8 md:p-10">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                <Gift className="h-4 w-4" /> Members get more
              </div>
              <h3 className="text-2xl font-black sm:text-3xl">Join ShopSphere and unlock exclusive deals</h3>
              <p className="mt-2 max-w-xl text-white/75">Create an account to save favourites, track orders, and receive members-only offers.</p>
            </div>
            <div className="p-8 pt-0 md:p-10 md:pt-10">
              <Link href="/register">
                <Button size="lg" className="rounded-full bg-white px-7 font-bold text-violet-700 hover:bg-white/90">
                  Create account <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
