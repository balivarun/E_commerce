import Razorpay from 'razorpay'

// Initialize Razorpay instance (for server-side) - only when needed
export const createRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_SECRET || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    throw new Error('Razorpay credentials are not configured')
  }
  
  return new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  })
}

// Client-side configuration
export const razorpayConfig = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  currency: 'INR',
  name: 'ShopSphere',
  description: 'Payment for your order',
  theme: {
    color: '#3B82F6'
  }
}

// Order creation function
export async function createRazorpayOrder(amount: number) {
  try {
    const razorpay = createRazorpayInstance()
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    })
    return order
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

// Payment verification function
export async function verifyRazorpayPayment(
  orderId: string,
  paymentId: string,
  signature: string
) {
  try {
    const crypto = require('crypto')
    const body = orderId + '|' + paymentId
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest('hex')
    
    return expectedSignature === signature
  } catch (error) {
    console.error('Error verifying payment:', error)
    return false
  }
}