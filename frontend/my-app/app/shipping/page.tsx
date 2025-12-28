import { Truck, Clock, MapPin, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const shippingOptions = [
  {
    icon: Truck,
    name: "Standard Shipping",
    time: "3-5 Business Days",
    price: "Free on orders ₹500+",
    description: "Our standard shipping option for most orders within the continental US."
  },
  {
    icon: Clock,
    name: "Express Shipping",
    time: "1-2 Business Days",
    price: "₹99",
    description: "Fast delivery for when you need your items quickly."
  },
  {
    icon: Package,
    name: "Overnight Shipping",
    time: "Next Business Day",
    price: "₹199",
    description: "Get your order the next business day with our fastest shipping option."
  },
  {
    icon: MapPin,
    name: "International Shipping",
    time: "7-14 Business Days",
    price: "Varies by location",
    description: "We ship to over 100 countries worldwide with tracked delivery."
  }
]

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Shipping Information</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer multiple shipping options to get your orders to you quickly and safely. 
              All orders are processed and shipped within 1-2 business days.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            {shippingOptions.map((option, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <option.icon className="h-6 w-6 text-primary" />
                    <div>
                      <CardTitle className="text-lg">{option.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{option.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="font-semibold text-primary">{option.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Policies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Processing Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Orders are typically processed and shipped within 1-2 business days. 
                    During peak seasons or sales events, processing may take up to 3 business days.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    Enjoy free standard shipping on all orders over ₹500 within India. 
                    Free shipping promotions cannot be combined with other offers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Restrictions</h3>
                  <p className="text-sm text-muted-foreground">
                    Some items may have shipping restrictions due to size, weight, or legal regulations. 
                    Any restrictions will be clearly noted on the product page.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Address Accuracy</h3>
                  <p className="text-sm text-muted-foreground">
                    Please ensure your shipping address is correct before placing your order. 
                    We are not responsible for packages delivered to incorrect addresses provided by the customer.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>International Shipping</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Available Countries</h3>
                  <p className="text-sm text-muted-foreground">
                    We currently ship to over 100 countries worldwide. Shipping costs and delivery times 
                    vary by destination. International customers are responsible for any customs fees, 
                    duties, or taxes that may apply.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Customs and Duties</h3>
                  <p className="text-sm text-muted-foreground">
                    International orders may be subject to customs processing and additional fees. 
                    These charges are determined by your local customs office and are not included in 
                    our shipping costs.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Delivery Timeframes</h3>
                  <p className="text-sm text-muted-foreground">
                    International delivery times are estimates and may vary due to customs processing, 
                    local holidays, or other factors beyond our control.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tracking Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Confirmation</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an order confirmation email immediately after placing your order. 
                    This confirms we've received your order and it's being processed.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Notification</h3>
                  <p className="text-sm text-muted-foreground">
                    Once your order ships, you'll receive a shipping confirmation email with tracking 
                    information. You can track your package using the provided tracking number.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Delivery Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Most carriers provide real-time updates on your package's progress. 
                    You can also track your order status in your account dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Questions About Shipping?</h2>
            <p className="text-muted-foreground mb-6">
              Our customer service team is here to help with any shipping-related questions.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="/faq"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}