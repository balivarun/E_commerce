"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

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

interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  href: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)

        // Fetch all products from backend to group by category
        const productsResponse = await fetch(`${API_URL}/products`)
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products')
        }
        const products: BackendProduct[] = await productsResponse.json()

        // Group products by category
        const categoryMap = new Map<string, BackendProduct[]>()
        products.forEach(product => {
          const existing = categoryMap.get(product.category) || []
          existing.push(product)
          categoryMap.set(product.category, existing)
        })

        // Create category descriptions
        const descriptions: { [key: string]: string } = {
          electronics: "Latest gadgets and tech accessories",
          jewelery: "Beautiful jewelry and accessories",
          "men's clothing": "Stylish men's fashion and apparel",
          "women's clothing": "Trendy women's fashion and clothing"
        }

        // Build categories with images and product counts
        const categoriesWithData: Category[] = Array.from(categoryMap.entries()).map(([categoryName, categoryProducts]) => {
          const formattedName = categoryName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

          return {
            id: categoryName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
            name: formattedName,
            description: descriptions[categoryName] || `Quality ${formattedName.toLowerCase()} products`,
            image: categoryProducts[0]?.imageUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
            productCount: categoryProducts.length,
            href: `/products?category=${encodeURIComponent(categoryName)}`
          }
        })

        setCategories(categoriesWithData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading categories...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <p className="text-destructive mb-4">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Shop by Categories</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of product categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <Card className="group overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 group-hover:from-indigo-900/70 group-hover:via-indigo-900/30" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm text-white/90 mb-2">
                        {category.description}
                      </p>
                      <p className="text-xs text-white/80">
                        {category.productCount} products
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">
            Use our search feature or browse all products
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all"
          >
            Browse All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
