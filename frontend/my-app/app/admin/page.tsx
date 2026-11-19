"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard, Package, ShoppingBag, Users, MessageSquare,
  IndianRupee, TrendingUp, AlertTriangle, LogOut
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getApiUrl } from "@/lib/api"

const API_URL = getApiUrl()

interface DashboardData {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  revenue: number
  lowStockCount: number
  unrepliedMessages: number
  categoryRevenue: Record<string, number>
  recentOrders: Array<{ id: string; customerName: string; totalAmount: number; status: string; createdAt: string }>
  lowStockProducts: Array<{ id: string; name: string; stockQuantity: number }>
}

export default function AdminDashboardPage() {
  const { state, logout } = useAuth()
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (state.isLoading) return
    if (!state.isAuthenticated || state.user?.role !== "ADMIN") {
      router.replace("/")
      return
    }

    fetch(`${API_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${state.token}` },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load dashboard")
        setData(await response.json())
      })
      .finally(() => setLoading(false))
  }, [state.isLoading, state.isAuthenticated, state.user, state.token, router])

  const nav = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Customers", href: "/admin/users", icon: Users },
    { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  ]

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center"><div className="h-10 w-10 animate-spin rounded-full border-b-2 border-violet-600" /></div>
  }

  const cards = [
    { label: "Revenue", value: `₹${(data?.revenue || 0).toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-emerald-600 bg-emerald-500/10" },
    { label: "Orders", value: data?.totalOrders || 0, icon: ShoppingBag, color: "text-violet-600 bg-violet-500/10" },
    { label: "Customers", value: data?.totalUsers || 0, icon: Users, color: "text-blue-600 bg-blue-500/10" },
    { label: "Products", value: data?.totalProducts || 0, icon: Package, color: "text-amber-600 bg-amber-500/10" },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090a12]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-border bg-background p-5 lg:block">
        <Link href="/" className="mb-8 flex items-center gap-2 px-2 text-xl font-black">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white">S</span>
          ShopSphere
        </Link>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-violet-500/10 hover:text-violet-600">
              <item.icon className="h-4 w-4" />{item.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => { logout(); router.push("/") }} className="absolute bottom-6 left-5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </aside>

      <main className="lg:ml-64">
        <header className="border-b border-border bg-background/90 px-6 py-5 backdrop-blur">
          <h1 className="text-2xl font-black">Admin overview</h1>
          <p className="text-sm text-muted-foreground">Monitor store performance and operations.</p>
        </header>

        <div className="mx-auto max-w-7xl p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${card.color}`}><card.icon className="h-5 w-5" /></div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="mt-1 text-2xl font-black">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-5 flex items-center justify-between"><h2 className="font-bold">Recent orders</h2><Link href="/admin/orders" className="text-sm text-violet-600">View all</Link></div>
              <div className="space-y-3">
                {(data?.recentOrders || []).map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-xl border border-border/70 p-4">
                    <div><p className="font-medium">{order.customerName || "Customer"}</p><p className="text-xs text-muted-foreground">#{order.id.slice(-8)}</p></div>
                    <div className="text-right"><p className="font-bold">₹{order.totalAmount?.toFixed(2)}</p><p className="text-xs text-muted-foreground">{order.status}</p></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-5 flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-500" /><h2 className="font-bold">Low stock</h2></div>
              <div className="space-y-3">
                {(data?.lowStockProducts || []).map((product) => (
                  <div key={product.id} className="flex items-center justify-between rounded-xl bg-muted/50 p-3"><span className="text-sm font-medium">{product.name}</span><span className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-bold text-red-600">{product.stockQuantity} left</span></div>
                ))}
                {!data?.lowStockCount && <p className="text-sm text-muted-foreground">All inventory levels are healthy.</p>}
              </div>
              <div className="mt-5 rounded-xl bg-violet-500/10 p-4"><div className="flex items-center gap-2 text-violet-600"><TrendingUp className="h-4 w-4" /><span className="text-sm font-bold">{data?.unrepliedMessages || 0} unanswered messages</span></div></div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
