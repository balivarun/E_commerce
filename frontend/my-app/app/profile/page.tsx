"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { User, Mail, Shield } from 'lucide-react'

export default function ProfilePage() {
  const { state: authState } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && !authState.isLoading && !authState.isAuthenticated) {
      router.push('/login')
    }
  }, [mounted, authState.isLoading, authState.isAuthenticated, router])

  if (!mounted || authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {authState.user?.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-xl font-semibold">{authState.user?.name}</h2>
          <p className="text-muted-foreground text-sm">{authState.user?.email}</p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-card">
            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Full Name</p>
              <p className="font-medium">{authState.user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-card">
            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Mail className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email Address</p>
              <p className="font-medium">{authState.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 border border-border rounded-xl bg-card">
            <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Account Role</p>
              <p className="font-medium capitalize">{authState.user?.role || 'Customer'}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
