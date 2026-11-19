"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Package, Search, AlertTriangle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getApiUrl } from "@/lib/api"

const API_URL = getApiUrl()

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  category: string
  imageUrl: string
  stockQuantity: number
  isNew?: boolean
  isOnSale?: boolean
}

const blankProduct: Omit<Product, "id"> = {
  name: "", price: 0, originalPrice: undefined, description: "", category: "",
  imageUrl: "", stockQuantity: 0, isNew: false, isOnSale: false,
}

export default function AdminProductsPage() {
  const { state } = useAuth()
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<(Omit<Product, "id"> & { id?: string }) | null>(null)

  useEffect(() => {
    if (state.isLoading) return
    if (!state.isAuthenticated || state.user?.role !== "ADMIN") router.replace("/")
  }, [state.isLoading, state.isAuthenticated, state.user, router])

  useEffect(() => {
    if (!state.token) return
    fetch(`${API_URL}/products`, { headers: { Authorization: `Bearer ${state.token}` } })
      .then((response) => response.json())
      .then(setProducts)
  }, [state.token])

  const saveProduct = async () => {
    if (!editing) return
    const method = editing.id ? "PUT" : "POST"
    const url = editing.id ? `${API_URL}/products/${editing.id}` : `${API_URL}/products`
    const { id, ...body } = editing
    void id
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${state.token}` },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      const saved = await response.json()
      setProducts((current) => editing.id
        ? current.map((product) => product.id === saved.id ? saved : product)
        : [saved, ...current])
      setEditing(null)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Delete this product?")) return
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${state.token}` },
    })
    if (response.ok) setProducts((current) => current.filter((product) => product.id !== id))
  }

  const visible = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div><p className="text-sm text-violet-600">Inventory</p><h1 className="text-2xl font-black">Products</h1></div>
          <button onClick={() => setEditing({ ...blankProduct })} className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white"><Plus className="h-4 w-4" /> Add product</button>
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3"><Search className="h-4 w-4 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search inventory..." className="h-11 w-full bg-transparent text-sm outline-none" /></div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="p-4">Product</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Stock</th><th className="p-4 text-right">Actions</th></tr></thead>
              <tbody>
                {visible.map((product) => (
                  <tr key={product.id} className="border-b border-border/60 last:border-0">
                    <td className="p-4"><div className="flex items-center gap-3"><div className="relative h-12 w-12 overflow-hidden rounded-xl bg-muted"><Image src={product.imageUrl} alt={product.name} fill sizes="48px" className="object-cover" /></div><div><p className="font-bold">{product.name}</p><p className="max-w-xs truncate text-xs text-muted-foreground">{product.description}</p></div></div></td>
                    <td className="p-4">{product.category}</td><td className="p-4 font-bold">₹{product.price}</td>
                    <td className="p-4"><span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold ${product.stockQuantity <= 10 ? "bg-red-500/10 text-red-600" : "bg-emerald-500/10 text-emerald-600"}`}>{product.stockQuantity <= 10 && <AlertTriangle className="h-3 w-3" />}{product.stockQuantity}</span></td>
                    <td className="p-4"><div className="flex justify-end gap-2"><button onClick={() => setEditing(product)} className="rounded-lg border p-2 hover:border-violet-400"><Pencil className="h-4 w-4" /></button><button onClick={() => deleteProduct(product.id)} className="rounded-lg border p-2 text-red-600 hover:border-red-400"><Trash2 className="h-4 w-4" /></button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-card p-6 shadow-2xl">
            <h2 className="mb-5 text-xl font-black">{editing.id ? "Edit product" : "Add product"}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[['name','Product name','text'],['category','Category','text'],['price','Price','number'],['originalPrice','Original price','number'],['stockQuantity','Stock quantity','number'],['imageUrl','Image URL','url']].map(([key, label, type]) => (
                <label key={key} className="text-sm font-medium">{label}<input type={type} value={String(editing[key as keyof typeof editing] ?? '')} onChange={(event) => setEditing((current) => current ? ({ ...current, [key]: type === 'number' ? Number(event.target.value) : event.target.value }) : current)} className="mt-1 h-11 w-full rounded-xl border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-violet-500" /></label>
              ))}
              <label className="sm:col-span-2 text-sm font-medium">Description<textarea value={editing.description} onChange={(event) => setEditing((current) => current ? ({ ...current, description: event.target.value }) : current)} className="mt-1 min-h-24 w-full rounded-xl border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-violet-500" /></label>
            </div>
            <div className="mt-6 flex justify-end gap-3"><button onClick={() => setEditing(null)} className="rounded-xl border px-4 py-2.5 text-sm">Cancel</button><button onClick={saveProduct} className="rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white">Save product</button></div>
          </div>
        </div>
      )}
    </div>
  )
}
