"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, Loader2, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("")
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get('category')
  const urlSearchQuery = searchParams.get('search')

  // Set search term from URL parameter when component mounts
  useEffect(() => {
    if (urlSearchQuery) {
      setSearchTerm(urlSearchQuery)
    }
  }, [urlSearchQuery])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let url = `${API_URL}/products`

        // Build query params for filtering
        const params = new URLSearchParams()
        if (categoryFilter) {
          params.set('category', categoryFilter)
        }
        if (urlSearchQuery) {
          params.set('search', urlSearchQuery)
        }
        if (params.toString()) {
          url += `?${params.toString()}`
        }

        const response = await fetch(url)
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

        setProducts(transformedProducts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categoryFilter, urlSearchQuery])

  const filteredAndSortedProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "newest":
          return a.isNew ? -1 : 1
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading products...</p>
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
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
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

      {/* Gradient Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            {urlSearchQuery
              ? `Search Results for "${urlSearchQuery}"`
              : categoryFilter
                ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Products`
                : 'All Products'
            }
          </h1>
          <p className="text-white/80">
            {urlSearchQuery
              ? `Found ${filteredAndSortedProducts.length} products matching "${urlSearchQuery}"`
              : categoryFilter
                ? `Explore our ${categoryFilter} collection (${products.length} items)`
                : `Discover our complete collection of quality products (${products.length} items)`
            }
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <PackageOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <ProductsContent />
    </Suspense>
  )
}
