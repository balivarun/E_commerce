import Image from "next/image"
import { Users, Award, Shield, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const features = [
  {
    icon: Users,
    title: "Customer First",
    description: "We put our customers at the heart of everything we do, ensuring exceptional service and satisfaction."
  },
  {
    icon: Award,
    title: "Quality Products",
    description: "We curate only the highest quality products from trusted brands and verified suppliers."
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description: "Your privacy and security are our priority with encrypted transactions and secure data handling."
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "We believe in giving back to our community and supporting sustainable business practices."
  }
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop",
    description: "With 15 years in e-commerce, Sarah founded ShopSphere to create a better online shopping experience."
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    description: "Michael leads our technology team, ensuring our platform is fast, secure, and user-friendly."
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Customer Experience",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    description: "Emily oversees customer service and ensures every interaction with ShopSphere exceeds expectations."
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">About ShopSphere</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We're on a mission to revolutionize online shopping by providing an exceptional, 
              secure, and personalized experience for customers worldwide.
            </p>
            <div className="relative w-full max-w-2xl mx-auto h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
                alt="ShopSphere Team"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Founded in 2020, ShopSphere began as a small startup with a big vision: to create 
                  the world's most customer-centric online marketplace. What started as a team of 
                  three passionate entrepreneurs has grown into a thriving company serving thousands 
                  of customers globally.
                </p>
                <p className="text-muted-foreground">
                  We believe that shopping online should be more than just a transaction – it should 
                  be an experience that delights, inspires, and connects people with products they love. 
                  Every feature we build and every partnership we form is guided by this principle.
                </p>
                <p className="text-muted-foreground">
                  Today, ShopSphere is proud to offer millions of products across hundreds of categories, 
                  all backed by our commitment to quality, security, and exceptional customer service.
                </p>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop"
                  alt="Our Journey"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-muted/50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">ShopSphere by Numbers</h2>
            <div className="grid gap-6 md:grid-cols-4 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">2M+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">Products</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Shopping?</h2>
            <p className="text-muted-foreground mb-6">
              Join millions of satisfied customers and discover amazing products today.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/products"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Browse Products
              </a>
              <a 
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}