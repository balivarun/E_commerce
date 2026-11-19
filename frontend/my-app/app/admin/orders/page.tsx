"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Truck, PackageCheck, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getApiUrl } from "@/lib/api"

const API_URL = getApiUrl()

interface OrderRow {
  id: string
  customerName: string
  customerEmail: string
  totalAmount: number
  status: string
  trackingNumber?: string
  carrier?: string
  createdAt: string
}

export default function AdminOrdersPage() {
  const { state } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<OrderRow | null>(null)
  const [status, setStatus] = useState("PROCESSING")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [carrier, setCarrier] = useState("")

  useEffect(() => {
    if (state.isLoading) return
    if (!state.isAuthenticated || state.user?.role !== "ADMIN") router.replace("/")
  }, [state.isLoading, state.isAuthenticated, state.user, router])

  useEffect(() => {
    if (!state.token) return
    fetch(`${API_URL}/admin/orders`, { headers: { Authorization: `Bearer ${state.token}` } })
      .then((response) => response.json()).then(setOrders)
  }, [state.token])

  const openShipment = (order: OrderRow) => {
    setSelected(order)
    setStatus(order.status)
    setTrackingNumber(order.trackingNumber || "")
    setCarrier(order.carrier || "")
  }

  const saveShipment = async () => {
    if (!selected) return
    const response = await fetch(`${API_URL}/admin/orders/${selected.id}/shipment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${state.token}` },
      body: JSON.stringify({ status, trackingNumber, carrier, estimatedDeliveryDays: 5 }),
    })
    if (response.ok) {
      const updated = await response.json()
      setOrders((current) => current.map((order) => order.id === updated.id ? updated : order))
      setSelected(null)
    }
  }

  const visible = orders.filter((order) =>
    `${order.customerName} ${order.customerEmail} ${order.id}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6"><p className="text-sm text-violet-600">Fulfillment</p><h1 className="text-2xl font-black">Orders</h1></div>
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3"><Search className="h-4 w-4 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customer or order..." className="h-11 w-full bg-transparent text-sm outline-none" /></div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="p-4">Customer</th><th className="p-4">Order</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4 text-right">Update</th></tr></thead>
            <tbody>{visible.map((order) => (
              <tr key={order.id} className="border-b border-border/60 last:border-0"><td className="p-4"><p className="font-bold">{order.customerName || "Customer"}</p><p className="text-xs text-muted-foreground">{order.customerEmail}</p></td><td className="p-4 font-mono text-xs">#{order.id.slice(-10)}</td><td className="p-4 font-bold">₹{order.totalAmount?.toFixed(2)}</td><td className="p-4"><span className="rounded-full bg-violet-500/10 px-2 py-1 text-xs font-bold text-violet-600">{order.status}</span></td><td className="p-4 text-right"><button onClick={() => openShipment(order)} className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-bold hover:border-violet-400"><Truck className="h-4 w-4" /> Shipment</button></td></tr>
            ))}</tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-md rounded-3xl bg-card p-6"><div className="mb-5 flex items-center gap-3"><PackageCheck className="h-6 w-6 text-violet-600" /><h2 className="text-xl font-black">Update shipment</h2></div><div className="space-y-4"><label className="block text-sm font-medium">Status<select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3">{["PROCESSING","SHIPPED","OUT_FOR_DELIVERY","DELIVERED","CANCELLED","REFUNDED"].map((value) => <option key={value}>{value}</option>)}</select></label><label className="block text-sm font-medium">Tracking number<input value={trackingNumber} onChange={(event) => setTrackingNumber(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3" /></label><label className="block text-sm font-medium">Carrier<input value={carrier} onChange={(event) => setCarrier(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3" /></label></div><div className="mt-6 flex justify-end gap-3"><button onClick={() => setSelected(null)} className="rounded-xl border px-4 py-2.5 text-sm">Cancel</button><button onClick={saveShipment} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white">Save update</button></div></div></div>
      )}
    </div>
  )
}
