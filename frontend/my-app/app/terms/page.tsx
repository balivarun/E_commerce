import { FileText, Shield, AlertTriangle, Scale } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These terms and conditions govern your use of ShopSphere and the purchase 
              of products through our platform. Please read them carefully.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 2024
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              {
                icon: FileText,
                title: "Legal Agreement",
                description: "These terms form a binding legal agreement between you and ShopSphere."
              },
              {
                icon: Shield,
                title: "User Protection",
                description: "Our terms protect both users and the platform from misuse."
              },
              {
                icon: AlertTriangle,
                title: "Important Rules",
                description: "Key rules and restrictions you need to know about using our service."
              },
              {
                icon: Scale,
                title: "Fair Use",
                description: "Guidelines to ensure fair and respectful use of our platform."
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  By accessing or using ShopSphere, you agree to be bound by these Terms of Service 
                  and our Privacy Policy. If you do not agree to these terms, please do not use our service.
                </p>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to modify these terms at any time. Your continued use of the 
                  service after changes are posted constitutes acceptance of the updated terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Eligibility</h3>
                  <p className="text-sm text-muted-foreground">
                    You must be at least 18 years old to create an account and make purchases. 
                    By registering, you represent that you meet this age requirement.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Account Information</h3>
                  <p className="text-sm text-muted-foreground">
                    You must provide accurate, complete, and current information when creating 
                    your account. You're responsible for maintaining the confidentiality of your 
                    account credentials.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Account Security</h3>
                  <p className="text-sm text-muted-foreground">
                    You're responsible for all activities that occur under your account. 
                    Notify us immediately of any unauthorized access or security breaches.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Information and Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Product Descriptions</h3>
                  <p className="text-sm text-muted-foreground">
                    We strive to provide accurate product descriptions and images. However, 
                    we don't guarantee that descriptions or images are complete, reliable, 
                    current, or error-free.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Pricing</h3>
                  <p className="text-sm text-muted-foreground">
                    All prices are subject to change without notice. We reserve the right 
                    to correct pricing errors, even after an order has been submitted or confirmed.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <p className="text-sm text-muted-foreground">
                    Product availability is subject to change. We'll notify you if an item 
                    becomes unavailable after you've placed an order.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Orders and Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Acceptance</h3>
                  <p className="text-sm text-muted-foreground">
                    All orders are subject to our acceptance. We may refuse or cancel any order 
                    at any time for any reason, including suspected fraud or violation of these terms.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Payment</h3>
                  <p className="text-sm text-muted-foreground">
                    Payment is required at the time of order. We accept major credit cards and 
                    other payment methods as displayed at checkout. You authorize us to charge 
                    your selected payment method.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Modifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Orders can only be modified or cancelled within a limited time after placement. 
                    Contact customer service immediately if you need to make changes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Conduct</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Prohibited Uses</h3>
                  <p className="text-sm text-muted-foreground mb-2">You may not use our service to:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                    <li>• Violate any laws or regulations</li>
                    <li>• Infringe on intellectual property rights</li>
                    <li>• Transmit harmful or malicious code</li>
                    <li>• Harass, abuse, or harm other users</li>
                    <li>• Use automated systems to access our service</li>
                    <li>• Attempt to gain unauthorized access to our systems</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Content Guidelines</h3>
                  <p className="text-sm text-muted-foreground">
                    Any content you submit (reviews, comments, etc.) must be accurate, 
                    respectful, and not violate any laws or third-party rights.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Our Content</h3>
                  <p className="text-sm text-muted-foreground">
                    All content on our website, including text, graphics, logos, images, and software, 
                    is owned by ShopSphere or our licensors and is protected by copyright and other 
                    intellectual property laws.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Limited License</h3>
                  <p className="text-sm text-muted-foreground">
                    We grant you a limited, non-exclusive, non-transferable license to access and 
                    use our service for personal, non-commercial purposes.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">User Content</h3>
                  <p className="text-sm text-muted-foreground">
                    By submitting content to our platform, you grant us a license to use, display, 
                    and distribute that content in connection with our service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disclaimer and Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    Our service is provided "as is" without warranties of any kind. We don't 
                    guarantee that the service will be uninterrupted, secure, or error-free.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Limitation of Liability</h3>
                  <p className="text-sm text-muted-foreground">
                    To the maximum extent permitted by law, ShopSphere shall not be liable for 
                    any indirect, incidental, special, or consequential damages arising from your 
                    use of our service.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Maximum Liability</h3>
                  <p className="text-sm text-muted-foreground">
                    Our total liability to you for all claims arising from your use of our service 
                    shall not exceed the amount you paid us in the 12 months preceding the claim.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">By You</h3>
                  <p className="text-sm text-muted-foreground">
                    You may terminate your account at any time by contacting customer service 
                    or using the account deletion feature in your settings.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">By Us</h3>
                  <p className="text-sm text-muted-foreground">
                    We may suspend or terminate your account at any time if you violate these 
                    terms, engage in fraudulent activity, or for any other reason at our discretion.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Effect of Termination</h3>
                  <p className="text-sm text-muted-foreground">
                    Upon termination, your right to use our service ceases immediately. 
                    We may delete your account and any associated data.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governing Law and Disputes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Governing Law</h3>
                  <p className="text-sm text-muted-foreground">
                    These terms are governed by the laws of the State of New York, without regard 
                    to conflict of law principles.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                  <p className="text-sm text-muted-foreground">
                    Any disputes arising from these terms or your use of our service will be 
                    resolved through binding arbitration in accordance with the rules of the 
                    American Arbitration Association.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> legal@shopsphere.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Commerce Street, Business District, New York, NY 10001</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Agreement</h2>
            <p className="text-muted-foreground">
              By using ShopSphere, you acknowledge that you have read, understood, and agree 
              to be bound by these Terms of Service. These terms constitute the entire agreement 
              between you and ShopSphere regarding your use of our service.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}