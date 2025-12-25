import { ArrowRight, Truck, Shield, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"

const featuredProducts = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 199.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 128,
    isOnSale: true
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 256,
    isNew: true
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 89,
    isOnSale: true
  },
  {
    id: "4",
    name: "Ergonomic Office Chair",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 167
  }
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $100"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is safe"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Get help whenever you need it"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Shop the latest trends and discover unique finds from top brands around the world
            </p>
            <Button size="lg" className="mr-4">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Explore Categories
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground">Discover our most popular items</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
