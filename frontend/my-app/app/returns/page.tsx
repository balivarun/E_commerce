import { RotateCcw, Package, CreditCard, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const returnSteps = [
  {
    icon: Package,
    title: "Initiate Return",
    description: "Start your return from your account dashboard or contact customer service."
  },
  {
    icon: RotateCcw,
    title: "Package & Ship",
    description: "Pack your item in original packaging and use our prepaid return label."
  },
  {
    icon: Clock,
    title: "Processing",
    description: "We'll inspect your return within 3-5 business days of receipt."
  },
  {
    icon: CreditCard,
    title: "Refund Issued",
    description: "Your refund will be processed to your original payment method."
  }
]

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Returns & Exchanges</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not satisfied with your purchase? We offer hassle-free returns within 30 days 
              of delivery. Your satisfaction is our priority.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">How Returns Work</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {returnSteps.map((step, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <step.icon className="h-12 w-12 mx-auto text-primary" />
                      <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Return Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">30-Day Return Window</h3>
                  <p className="text-sm text-muted-foreground">
                    You have 30 days from the delivery date to return most items. 
                    The return window starts from the date you receive your order.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Item Condition</h3>
                  <p className="text-sm text-muted-foreground">
                    Items must be unused, in original condition, and in original packaging. 
                    All tags and labels must be attached. We reserve the right to refuse returns 
                    that don't meet these conditions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Original Packaging</h3>
                  <p className="text-sm text-muted-foreground">
                    Please return items in their original packaging when possible. 
                    This helps ensure your return is processed quickly and protects the item during shipping.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Return Shipping</h3>
                  <p className="text-sm text-muted-foreground">
                    We provide prepaid return labels for most returns within the US. 
                    International customers may be responsible for return shipping costs.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Non-Returnable Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For health and safety reasons, the following items cannot be returned:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Personal care items (cosmetics, skincare, etc.)</li>
                  <li>• Intimate apparel and swimwear</li>
                  <li>• Food and beverage items</li>
                  <li>• Custom or personalized products</li>
                  <li>• Digital downloads and gift cards</li>
                  <li>• Items marked as final sale</li>
                  <li>• Hazardous materials</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exchanges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Size & Color Exchanges</h3>
                  <p className="text-sm text-muted-foreground">
                    We're happy to exchange items for a different size or color of the same product. 
                    Exchanges follow the same process as returns, and we'll ship your new item once 
                    we receive the original.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Price Differences</h3>
                  <p className="text-sm text-muted-foreground">
                    If you're exchanging for a more expensive item, you'll be charged the difference. 
                    If the new item costs less, we'll refund the difference to your original payment method.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <p className="text-sm text-muted-foreground">
                    Exchanges are subject to inventory availability. If your preferred size or color 
                    isn't available, we'll process a full refund instead.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Refund Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Processing Time</h3>
                  <p className="text-sm text-muted-foreground">
                    Refunds are typically processed within 3-5 business days after we receive and 
                    inspect your return. You'll receive an email confirmation when your refund is processed.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p className="text-sm text-muted-foreground">
                    Refunds are issued to your original payment method. Credit card refunds may take 
                    5-10 business days to appear on your statement, depending on your bank.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Costs</h3>
                  <p className="text-sm text-muted-foreground">
                    Original shipping costs are non-refundable unless the return is due to our error. 
                    We cover return shipping costs for defective or incorrect items.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Start a Return?</h2>
            <p className="text-muted-foreground mb-6">
              Sign in to your account to initiate a return or contact our customer service team for assistance.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">
                Start Return Process
              </Button>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}