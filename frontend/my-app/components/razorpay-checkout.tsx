"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { useAuth } from '@/contexts/auth-context'

declare global {
  interface Window {
    Razorpay: any
  }
}

interface RazorpayCheckoutProps {
  amount: number
  onSuccess?: () => void
  onError?: (error: any) => void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

export function RazorpayCheckout({ amount, onSuccess, onError }: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const { state: cartState, clearCart } = useCart()
  const { state: authState } = useAuth()

  const getHeaders = () => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (authState.token) {
      headers['Authorization'] = `Bearer ${authState.token}`
    }
    return headers
  }

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK not loaded')
      return
    }

    setLoading(true)

    try {
      // Create order on backend — saves to MongoDB with cart items
      const response = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          amount,
          currency: 'INR',
          orderItems: cartState.items.map(item => ({
            productId: item.id,
            productName: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      })

      const order = await response.json()

      if (!response.ok) {
        throw new Error(order.error || 'Failed to create order')
      }

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'ShopSphere',
        description: 'Payment for your order',
        order_id: order.id,
        handler: async function (response: any) {
          try {
            // Verify payment on backend — updates order status to PAID in MongoDB
            const verifyResponse = await fetch(`${API_URL}/verify-payment`, {
              method: 'POST',
              headers: getHeaders(),
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            })

            const verifyResult = await verifyResponse.json()

            if (verifyResult.success) {
              clearCart()
              onSuccess?.()
              alert('Payment successful! View your order in My Orders.')
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            onError?.(error)
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: authState.user?.name || '',
          email: authState.user?.email || '',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (error) {
      console.error('Payment error:', error)
      onError?.(error)
      alert('Failed to initiate payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      className="w-full"
      size="lg"
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
    </Button>
  )
}
