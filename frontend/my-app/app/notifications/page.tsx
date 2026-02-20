"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Bell, ShoppingBag, Tag, Truck, CheckCircle, Info } from 'lucide-react'

interface Notification {
  id: string
  type: 'order' | 'offer' | 'delivery' | 'success' | 'info'
  title: string
  message: string
  time: string
  read: boolean
}

const typeConfig = {
  order: { icon: ShoppingBag, className: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  offer: { icon: Tag, className: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
  delivery: { icon: Truck, className: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  success: { icon: CheckCircle, className: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  info: { icon: Info, className: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' },
}

const defaultNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Welcome to ShopSphere!',
    message: 'Your account has been created successfully. Start shopping now!',
    time: 'Just now',
    read: false,
  },
  {
    id: '2',
    type: 'offer',
    title: 'Special Offer Just for You!',
    message: 'Get 10% off on your first order. Use code FIRST10 at checkout.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'delivery',
    title: 'Free Shipping Available',
    message: 'Orders above ₹500 qualify for free standard shipping.',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'New Products Added',
    message: 'Check out the latest arrivals in Electronics and Fashion categories.',
    time: '1 day ago',
    read: true,
  },
]

export default function NotificationsPage() {
  const { state: authState } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications)

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) router.push('/login')
  }, [authState.isLoading, authState.isAuthenticated, router])

  const markAllRead = () => {
    setNotifications(n => n.map(item => ({ ...item, read: true })))
  }

  const markRead = (id: string) => {
    setNotifications(n => n.map(item => item.id === id ? { ...item, read: true } : item))
  }

  const unreadCount = notifications.filter(n => !n.read).length

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
      <main className="flex-1 container mx-auto px-4 py-10 max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm text-primary hover:underline"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-3">
          {notifications.map(notification => {
            const config = typeConfig[notification.type]
            const Icon = config.icon
            return (
              <div
                key={notification.id}
                onClick={() => markRead(notification.id)}
                className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-colors ${
                  notification.read
                    ? 'bg-card border-border opacity-70'
                    : 'bg-card border-primary/30 shadow-sm'
                }`}
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${config.className}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-medium text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            )
          })}
        </div>
      </main>
      <Footer />
    </div>
  )
}
