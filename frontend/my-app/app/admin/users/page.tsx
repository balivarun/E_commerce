"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getApiUrl } from "@/lib/api"

const API_URL = getApiUrl()
interface UserRow { id: string; name: string; email: string; role: string; createdAt: string }

export default function AdminUsersPage() {
  const { state } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<UserRow[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (state.isLoading) return
    if (!state.isAuthenticated || state.user?.role !== "ADMIN") router.replace("/")
  }, [state.isLoading, state.isAuthenticated, state.user, router])

  useEffect(() => {
    if (!state.token) return
    fetch(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${state.token}` } })
      .then((response) => response.json()).then(setUsers)
  }, [state.token])

  const changeRole = async (id: string, role: string) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/role`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${state.token}` },
      body: JSON.stringify({ role }),
    })
    if (response.ok) {
      const updated = await response.json()
      setUsers((current) => current.map((user) => user.id === updated.id ? updated : user))
    }
  }

  const visible = users.filter((user) => `${user.name} ${user.email}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-slate-50 p-6 dark:bg-[#090a12] lg:ml-64">
      <div className="mx-auto max-w-7xl"><div className="mb-6"><p className="text-sm text-violet-600">Access</p><h1 className="text-2xl font-black">Customers</h1></div>
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3"><Search className="h-4 w-4 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search customers..." className="h-11 w-full bg-transparent text-sm outline-none" /></div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card"><table className="w-full text-left text-sm"><thead className="border-b border-border bg-muted/40 text-xs uppercase text-muted-foreground"><tr><th className="p-4">Customer</th><th className="p-4">Email</th><th className="p-4">Role</th><th className="p-4">Joined</th></tr></thead><tbody>{visible.map((user) => (
          <tr key={user.id} className="border-b border-border/60 last:border-0"><td className="p-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500/10 font-bold text-violet-600">{user.name?.charAt(0).toUpperCase()}</div><span className="font-bold">{user.name}</span></div></td><td className="p-4 text-muted-foreground">{user.email}</td><td className="p-4"><select value={user.role} onChange={(event) => changeRole(user.id, event.target.value)} className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-bold"><option value="USER">USER</option><option value="ADMIN">ADMIN</option></select></td><td className="p-4 text-xs text-muted-foreground">{user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN") : "—"}</td></tr>
        ))}</tbody></table></div>
      </div>
    </div>
  )
}
