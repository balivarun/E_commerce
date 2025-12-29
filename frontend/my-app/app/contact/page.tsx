"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setStatusMessage('Thank you! Your message has been sent successfully.')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setStatus('error')
        setStatusMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setStatusMessage('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get in touch with our team. We're here to help you with any questions or concerns you may have.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {status === 'success' && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <p className="text-green-700 text-sm">{statusMessage}</p>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <p className="text-red-700 text-sm">{statusMessage}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name *</label>
                      <Input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Your first name" 
                        required
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name *</label>
                      <Input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Your last name" 
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email *</label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com" 
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject *</label>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?" 
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full min-h-[120px] px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border border-input bg-background rounded-md"
                      placeholder="Tell us how we can help you..."
                      required
                      disabled={loading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">varunbali47@gmail.com.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+91 9996094192</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon - Fri: 9:00 AM - 6:00 PM<br />
                        Sat: 10:00 AM - 4:00 PM<br />
                        Sun: Closed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Looking for quick answers? Check out our frequently asked questions.
                  </p>
                  <Button variant="outline" className="w-full">
                    Visit FAQ Page
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}