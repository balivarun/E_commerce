"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Truck, Shield, Headphones, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/products/featured?limit=4`)
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const backendProducts: BackendProduct[] = await response.json()

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
        console.error('Failed to fetch featured products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-24 md:py-32">
        {/* Decorative blur shapes */}
        <div className="absolute top-[-10%] left-[-5%] h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] h-96 w-96 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-indigo-400/10 blur-2xl" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="animate-fade-in text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Discover{" "}
              <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-white bg-clip-text text-transparent">
                Amazing Products
              </span>
            </h1>
            <p className="animate-slide-up text-xl text-white/80 mb-10">
              Shop the latest trends and discover unique finds from top brands around the world
            </p>
            <div className="animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products">
                <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 shadow-lg shadow-indigo-900/30 font-semibold px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/categories">
                <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 bg-transparent px-8">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-primary/10 mb-5">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Discover our most popular items handpicked just for you</p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Loading featured products...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg" className="px-8">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
