import Link from "next/link"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Customer Support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>Need help with an order, payment, shipping, or account?</p>
            <div>
              <strong className="text-foreground">Email:</strong>{" "}
              <a className="underline" href="mailto:support@shopsphere.com">support@shopsphere.com</a>
            </div>
            <Link className="inline-block font-medium text-primary underline" href="/contact">
              Open the contact form
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
