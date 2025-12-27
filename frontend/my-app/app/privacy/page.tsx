import { Shield, Eye, Lock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, 
              and protect your personal information when you use ShopSphere.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: December 2024
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              {
                icon: Shield,
                title: "Data Protection",
                description: "We use industry-standard security measures to protect your information."
              },
              {
                icon: Eye,
                title: "Transparency",
                description: "We're clear about what data we collect and how we use it."
              },
              {
                icon: Lock,
                title: "Secure Storage",
                description: "Your data is encrypted and stored on secure servers."
              },
              {
                icon: Users,
                title: "Your Rights",
                description: "You have control over your personal information and privacy settings."
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
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    We collect information you provide directly, such as your name, email address, 
                    phone number, shipping address, and payment information when you create an account, 
                    make a purchase, or contact us.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Usage Information</h3>
                  <p className="text-sm text-muted-foreground">
                    We automatically collect information about how you use our website, including 
                    pages visited, products viewed, search terms, and interaction with features.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Device Information</h3>
                  <p className="text-sm text-muted-foreground">
                    We collect information about the device you use to access our services, 
                    including IP address, browser type, operating system, and mobile device identifiers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Cookies and Tracking</h3>
                  <p className="text-sm text-muted-foreground">
                    We use cookies and similar technologies to enhance your experience, 
                    remember preferences, and analyze website traffic.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Order Processing</h3>
                  <p className="text-sm text-muted-foreground">
                    To process and fulfill your orders, communicate about your purchases, 
                    and provide customer support.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Account Management</h3>
                  <p className="text-sm text-muted-foreground">
                    To create and manage your account, verify your identity, and enable you 
                    to use our features and services.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Personalization</h3>
                  <p className="text-sm text-muted-foreground">
                    To personalize your experience, show relevant products and recommendations, 
                    and remember your preferences.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Communication</h3>
                  <p className="text-sm text-muted-foreground">
                    To send you important updates about your orders, account changes, 
                    and promotional offers (if you've opted in).
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Security and Fraud Prevention</h3>
                  <p className="text-sm text-muted-foreground">
                    To protect against fraud, unauthorized access, and other security risks 
                    that could harm you or our service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Service Providers</h3>
                  <p className="text-sm text-muted-foreground">
                    We share information with trusted third-party service providers who help us 
                    operate our business, such as payment processors, shipping companies, and 
                    customer service platforms.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Legal Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    We may disclose information when required by law, to protect our rights, 
                    or to comply with legal processes such as court orders or government requests.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Business Transfers</h3>
                  <p className="text-sm text-muted-foreground">
                    If we're involved in a merger, acquisition, or sale of assets, your information 
                    may be transferred as part of that transaction.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">No Sale of Personal Data</h3>
                  <p className="text-sm text-muted-foreground">
                    We do not sell, rent, or trade your personal information to third parties 
                    for their marketing purposes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights and Choices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Account Information</h3>
                  <p className="text-sm text-muted-foreground">
                    You can access, update, or delete your account information at any time 
                    through your account settings.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Marketing Communications</h3>
                  <p className="text-sm text-muted-foreground">
                    You can opt out of marketing emails by clicking the unsubscribe link 
                    or updating your preferences in your account settings.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Cookie Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    You can manage cookie preferences through your browser settings. 
                    Note that disabling cookies may affect website functionality.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data Portability</h3>
                  <p className="text-sm text-muted-foreground">
                    You can request a copy of your personal data in a machine-readable format. 
                    Contact us to make such a request.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Account Deletion</h3>
                  <p className="text-sm text-muted-foreground">
                    You can request deletion of your account and personal data. 
                    Note that we may retain certain information for legal or business purposes.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Encryption</h3>
                  <p className="text-sm text-muted-foreground">
                    We use SSL encryption to protect data transmitted between your device 
                    and our servers. Sensitive information is encrypted at rest.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Access Controls</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to personal information is restricted to authorized employees 
                    and service providers who need it to perform their job functions.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Regular Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    We regularly monitor our systems for vulnerabilities and potential 
                    security threats, and we maintain incident response procedures.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Data Retention</h3>
                  <p className="text-sm text-muted-foreground">
                    We retain personal information only as long as necessary to provide 
                    our services and comply with legal obligations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy or how we handle your personal information, 
                  please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@shopsphere.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Commerce Street, Business District, New York, NY 10001</p>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  We will respond to your inquiry within 30 days.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Policy Updates</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. When we do, we'll post the updated 
              policy on this page and update the "Last updated" date. For significant changes, 
              we'll notify you via email or through our website.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}