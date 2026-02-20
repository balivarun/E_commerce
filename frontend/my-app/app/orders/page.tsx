"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Package, ShoppingBag, CheckCircle, XCircle, Clock } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
}

interface Order {
  id: string
  razorpayOrderId: string
  razorpayPaymentId: string
  totalAmount: number
  currency: string
  status: 'CREATED' | 'PAID' | 'FAILED' | 'CANCELLED' | 'REFUNDED'
  customerName: string
  customerEmail: string
  orderItems: OrderItem[]
  createdAt: string
}

const statusConfig = {
  PAID: {
    label: 'Paid',
    icon: CheckCircle,
    className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  CREATED: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
  FAILED: {
    label: 'Failed',
    icon: XCircle,
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
  CANCELLED: {
    label: 'Cancelled',
    icon: XCircle,
    className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  },
  REFUNDED: {
    label: 'Refunded',
    icon: CheckCircle,
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
}

export default function OrdersPage() {
  const { state: authState } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push('/login')
    }
  }, [authState.isLoading, authState.isAuthenticated, router])

  useEffect(() => {
    if (!authState.isAuthenticated || !authState.token) return

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/my-orders`, {
          headers: {
            'Authorization': `Bearer ${authState.token}`,
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) throw new Error('Failed to fetch orders')

        const data = await response.json()
        setOrders(data)
      } catch (err) {
        setError('Failed to load orders. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [authState.isAuthenticated, authState.token])

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-10 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-7 w-7 text-primary" />
          <h1 className="text-3xl font-bold">My Orders</h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <Package className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-xl font-semibold">No orders yet</h2>
            <p className="text-muted-foreground">When you place an order, it will appear here.</p>
            <Link
              href="/products"
              className="mt-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders list */}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.CREATED
              const StatusIcon = status.icon
              const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })

              return (
                <div
                  key={order.id}
                  className="border border-border rounded-xl overflow-hidden bg-card shadow-sm"
                >
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-muted/40 border-b border-border">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-muted-foreground">Order placed</p>
                      <p className="font-medium">{date}</p>
                    </div>
                    <div className="flex flex-col gap-1 sm:text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-semibold text-lg">₹{order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col gap-1 sm:text-right">
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="text-xs font-mono text-muted-foreground truncate max-w-[160px]">
                        {order.razorpayOrderId}
                      </p>
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.className}`}>
                        <StatusIcon className="h-4 w-4" />
                        {status.label}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4">
                    {order.orderItems && order.orderItems.length > 0 ? (
                      <div className="divide-y divide-border">
                        {order.orderItems.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-3">
                            <div className="flex flex-col">
                              <p className="font-medium">{item.productName}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-semibold">
                              ₹{(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground py-2">
                        Order details not available
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
