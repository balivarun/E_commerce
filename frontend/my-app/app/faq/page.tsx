"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const faqs = [
  {
    category: "Orders & Shipping",
    questions: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days delivery. International shipping may take 7-14 business days depending on the destination."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order status in your account dashboard."
      },
      {
        question: "What if my package is damaged or lost?",
        answer: "We take full responsibility for packages until they reach you safely. If your package arrives damaged or goes missing, contact our support team immediately and we'll resolve it quickly."
      },
      {
        question: "Can I change or cancel my order?",
        answer: "You can modify or cancel your order within 1 hour of placing it. After that, orders are processed and cannot be changed. Contact support if you need assistance."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items. Products must be unused, in original packaging, and in the same condition you received them. Some items like personal care products are not eligible for return."
      },
      {
        question: "How do I return an item?",
        answer: "Start a return from your account dashboard or contact customer service. We'll provide a prepaid return label and instructions. Most returns are processed within 3-5 business days of receipt."
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are typically processed within 3-5 business days after we receive your return. The refund will appear on your original payment method within 5-10 business days."
      },
      {
        question: "Do you offer exchanges?",
        answer: "Yes, we offer exchanges for different sizes or colors of the same item. The exchange process is the same as a return, and we'll ship the new item once we receive the returned product."
      }
    ]
  },
  {
    category: "Payment & Security",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and other digital wallets. We also support various regional payment methods."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use industry-standard SSL encryption and comply with PCI DSS standards. We never store your full credit card information on our servers."
      },
      {
        question: "Why was my payment declined?",
        answer: "Payment declines can happen for various reasons including insufficient funds, incorrect billing information, or bank security measures. Contact your bank or try a different payment method."
      },
      {
        question: "Do you offer payment plans?",
        answer: "Yes, we partner with payment providers to offer installment plans on eligible purchases over $100. Options will be displayed at checkout if available."
      }
    ]
  },
  {
    category: "Account & Support",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up' in the top right corner and follow the prompts. You can also create an account during checkout. Having an account allows you to track orders, save favorites, and checkout faster."
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer: "Click 'Sign In' then 'Forgot Password'. Enter your email address and we'll send you instructions to reset your password. The link expires in 24 hours for security."
      },
      {
        question: "How do I contact customer support?",
        answer: "You can reach us via email at support@shopsphere.com, live chat on our website, or call us at +1 (555) 123-4567. Our support team is available Monday-Friday 9AM-6PM EST."
      },
      {
        question: "Can I update my shipping address?",
        answer: "Yes, you can update your default shipping address in your account settings. For orders already placed, you can modify the address within 1 hour of ordering."
      }
    ]
  }
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to common questions about shopping, shipping, returns, and more. 
              Can't find what you're looking for? Contact our support team.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search FAQs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {category.category}
                </h2>
                <div className="space-y-2">
                  {category.questions.map((faq, questionIndex) => {
                    const itemId = `${categoryIndex}-${questionIndex}`
                    const isExpanded = expandedItems.has(itemId)
                    
                    return (
                      <Card key={questionIndex}>
                        <CardContent className="p-0">
                          <button
                            className="w-full text-left p-6 flex justify-between items-center hover:bg-muted/50 transition-colors"
                            onClick={() => toggleExpanded(itemId)}
                          >
                            <span className="font-medium pr-4">{faq.question}</span>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-6 pb-6 pt-0 text-muted-foreground">
                              {faq.answer}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No FAQs found matching your search.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="text-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

          <div className="mt-16 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Our customer support team is here to help you with any questions or concerns.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Support
              </a>
              <a 
                href="mailto:support@shopsphere.com"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}