"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { useUser } from '@clerk/nextjs'

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

export function RazorpayCheckout({ amount, onSuccess, onError }: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const { clearCart } = useCart()
  const { user } = useUser()

  const handlePayment = async () => {
    if (!window.Razorpay) {
      alert('Razorpay SDK not loaded')
      return
    }

    setLoading(true)

    try {
      // Create order on server
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
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
            // Verify payment on server
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
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
              alert('Payment successful!')
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
          name: user?.fullName || '',
          email: user?.primaryEmailAddress?.emailAddress || '',
          contact: user?.primaryPhoneNumber?.phoneNumber || '',
        },
        theme: {
          color: '#3B82F6',
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
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