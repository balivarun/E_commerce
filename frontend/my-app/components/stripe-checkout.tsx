"use client"

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { useCart } from '@/contexts/cart-context'
import { useAuth } from '@/contexts/auth-context'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

interface StripeCheckoutProps {
  amount: number
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

function PaymentForm({ amount, onSuccess, onError }: StripeCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const { clearCart } = useCart()
  const { state: authState } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: 'if_required',
      })

      if (error) throw new Error(error.message)

      if (paymentIntent?.status === 'succeeded') {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' }
        if (authState.token) headers['Authorization'] = `Bearer ${authState.token}`

        const res = await fetch(`${API_URL}/verify-payment`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
        })
        const result = await res.json()

        if (result.success) {
          clearCart()
          onSuccess?.()
          alert('Payment successful! View your order in My Orders.')
        } else {
          throw new Error('Payment verification failed')
        }
      }
    } catch (error) {
      console.error('Payment error:', error)
      onError?.(error)
      alert(error instanceof Error ? error.message : 'Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || loading} className="w-full" size="lg">
        {loading ? 'Processing...' : `Pay ₹${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}

export function StripeCheckout({ amount, onSuccess, onError }: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [initializing, setInitializing] = useState(false)
  const { resolvedTheme } = useTheme()
  const { state: cartState } = useCart()
  const { state: authState } = useAuth()

  const initializePayment = async () => {
    setInitializing(true)
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (authState.token) headers['Authorization'] = `Bearer ${authState.token}`

      const res = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers,
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
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create order')
      setClientSecret(data.clientSecret)
    } catch (error) {
      onError?.(error)
      alert('Failed to initialize payment. Please try again.')
    } finally {
      setInitializing(false)
    }
  }

  if (!clientSecret) {
    return (
      <Button className="w-full" size="lg" onClick={initializePayment} disabled={initializing}>
        {initializing ? 'Loading...' : `Pay ₹${amount.toFixed(2)}`}
      </Button>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: { theme: resolvedTheme === 'dark' ? 'night' : 'stripe' },
      }}
    >
      <PaymentForm amount={amount} onSuccess={onSuccess} onError={onError} />
    </Elements>
  )
}
