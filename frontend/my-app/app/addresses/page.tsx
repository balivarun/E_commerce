"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MapPin, Plus, Trash2, Home, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Address {
  id: string
  type: 'Home' | 'Work' | 'Other'
  name: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
}

export default function AddressesPage() {
  const { state: authState } = useAuth()
  const router = useRouter()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    type: 'Home' as Address['type'],
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
  })

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) router.push('/login')
  }, [authState.isLoading, authState.isAuthenticated, router])

  useEffect(() => {
    const saved = localStorage.getItem('addresses')
    if (saved) setAddresses(JSON.parse(saved))
  }, [])

  const saveAddresses = (updated: Address[]) => {
    setAddresses(updated)
    localStorage.setItem('addresses', JSON.stringify(updated))
  }

  const handleAdd = () => {
    if (!form.name || !form.phone || !form.street || !form.city || !form.state || !form.pincode) {
      alert('Please fill all fields')
      return
    }
    const newAddress: Address = { ...form, id: Date.now().toString() }
    saveAddresses([...addresses, newAddress])
    setForm({ type: 'Home', name: '', phone: '', street: '', city: '', state: '', pincode: '' })
    setShowForm(false)
  }

  const handleDelete = (id: string) => {
    saveAddresses(addresses.filter(a => a.id !== id))
  }

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <MapPin className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold">Saved Addresses</h1>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Address
          </Button>
        </div>

        {/* Add Address Form */}
        {showForm && (
          <div className="border border-border rounded-xl p-6 bg-card mb-6 shadow-sm">
            <h2 className="font-semibold mb-4">New Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Type */}
              <div className="sm:col-span-2 flex gap-3">
                {(['Home', 'Work', 'Other'] as Address['type'][]).map(t => (
                  <button
                    key={t}
                    onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                      form.type === t
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              {[
                { key: 'name', label: 'Full Name', placeholder: 'John Doe' },
                { key: 'phone', label: 'Phone Number', placeholder: '+91 9999999999' },
                { key: 'street', label: 'Street Address', placeholder: '123, Main Street', full: true },
                { key: 'city', label: 'City', placeholder: 'Mumbai' },
                { key: 'state', label: 'State', placeholder: 'Maharashtra' },
                { key: 'pincode', label: 'Pincode', placeholder: '400001' },
              ].map(({ key, label, placeholder, full }) => (
                <div key={key} className={full ? 'sm:col-span-2' : ''}>
                  <label className="text-sm font-medium block mb-1">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <Button onClick={handleAdd} className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                Save Address
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {addresses.length === 0 && !showForm && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <MapPin className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-xl font-semibold">No saved addresses</h2>
            <p className="text-muted-foreground">Add an address to make checkout faster.</p>
          </div>
        )}

        {/* Address list */}
        <div className="space-y-4">
          {addresses.map(address => (
            <div key={address.id} className="border border-border rounded-xl p-5 bg-card shadow-sm flex justify-between items-start gap-4">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  {address.type === 'Work'
                    ? <Briefcase className="h-5 w-5 text-primary" />
                    : <Home className="h-5 w-5 text-primary" />
                  }
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold">{address.name}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{address.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{address.street}</p>
                  <p className="text-sm text-muted-foreground">{address.city}, {address.state} - {address.pincode}</p>
                  <p className="text-sm text-muted-foreground mt-1">{address.phone}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10 shrink-0"
                onClick={() => handleDelete(address.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
