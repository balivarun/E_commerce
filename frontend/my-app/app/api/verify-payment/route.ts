import { NextRequest, NextResponse } from 'next/server'
import { verifyRazorpayPayment } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const { orderId, paymentId, signature } = await request.json()

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const isValid = await verifyRazorpayPayment(orderId, paymentId, signature)

    if (isValid) {
      // Here you can add logic to update your database
      // For example: mark order as paid, send confirmation email, etc.
      
      return NextResponse.json({ 
        success: true, 
        message: 'Payment verified successfully' 
      })
    } else {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    )
  }
}