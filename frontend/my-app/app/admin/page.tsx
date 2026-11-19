"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Package, ShoppingBag, Users,
  IndianRupee, TrendingUp, AlertTriangle
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
  const { state } = useAuth()
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

  const cards = [
    { label: "Revenue", value: `₹${(data?.revenue || 0).toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-emerald-600 bg-emerald-500/10" },
    { label: "Orders", value: data?.totalOrders || 0, icon: ShoppingBag, color: "text-violet-600 bg-violet-500/10" },
    { label: "Customers", value: data?.totalUsers || 0, icon: Users, color: "text-blue-600 bg-blue-500/10" },
    { label: "Products", value: data?.totalProducts || 0, icon: Package, color: "text-amber-600 bg-amber-500/10" },
  ]

  return (
    <div className="mx-auto max-w-7xl p-5 lg:p-8">
      <div className="mb-7">
        <p className="text-sm font-bold text-violet-600">STORE OVERVIEW</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight">Good to see you, {state.user?.name?.split(" ")[0]}.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Here is what is happening in your store today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${card.color}`}><card.icon className="h-5 w-5" /></div>
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-2xl font-black">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-5 flex items-center justify-between"><h2 className="text-base font-black">Recent orders</h2><Link href="/admin/orders" className="text-sm font-bold text-violet-600">Manage orders</Link></div>
          <div className="space-y-3">
            {(data?.recentOrders || []).map((order) => (
              <Link href="/admin/orders" key={order.id} className="flex items-center justify-between rounded-xl border border-border/70 p-4 transition hover:border-violet-400/50 hover:bg-violet-500/[0.03]">
                <div><p className="font-bold">{order.customerName || "Customer"}</p><p className="text-xs text-muted-foreground">#{order.id.slice(-8)}</p></div>
                <div className="text-right"><p className="font-black">₹{order.totalAmount?.toFixed(2)}</p><p className="text-xs text-muted-foreground">{order.status}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-amber-500" /><h2 className="font-black">Low stock</h2></div><Link href="/admin/products" className="text-xs font-bold text-violet-600">Manage stock</Link></div>
          <div className="space-y-3">
            {(data?.lowStockProducts || []).map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-xl bg-muted/50 p-3"><span className="text-sm font-bold">{product.name}</span><span className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-bold text-red-600">{product.stockQuantity} left</span></div>
            ))}
            {!data?.lowStockCount && <p className="text-sm text-muted-foreground">All inventory levels are healthy.</p>}
          </div>
          <div className="mt-5 rounded-xl bg-violet-500/10 p-4"><div className="flex items-center gap-2 text-violet-600"><TrendingUp className="h-4 w-4" /><span className="text-sm font-bold">{data?.unrepliedMessages || 0} unanswered messages</span></div></div>
        </section>
      </div>
    </div>
  )
}
