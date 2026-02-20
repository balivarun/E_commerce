"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useWishlist } from '@/contexts/wishlist-context'
import { useCart } from '@/contexts/cart-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function WishlistPage() {
  const { state, removeItem } = useWishlist()
  const { addItem } = useCart()

  const handleMoveToCart = (item: typeof state.items[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image })
    removeItem(item.id)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-7 w-7 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <span className="text-muted-foreground text-lg">({state.items.length} items)</span>
        </div>

        {/* Empty state */}
        {state.items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Heart className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
            <p className="text-muted-foreground">Save items you love by clicking the heart icon on any product.</p>
            <Link href="/products">
              <Button className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                Browse Products
              </Button>
            </Link>
          </div>
        )}

        {/* Wishlist grid */}
        {state.items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {state.items.map((item) => (
              <div key={item.id} className="border border-border rounded-xl overflow-hidden bg-card shadow-sm group">
                <Link href={`/products/${item.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="font-medium text-sm line-clamp-2 mb-2 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(item.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>

                  <p className="font-bold text-primary mb-3">₹{item.price.toFixed(2)}</p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs"
                      onClick={() => handleMoveToCart(item)}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Move to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
