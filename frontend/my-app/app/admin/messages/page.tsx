"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, CheckCircle, Search } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getApiUrl } from "@/lib/api"

const API_URL = getApiUrl()
interface MessageRow { id: string; firstName: string; lastName: string; email: string; subject: string; message: string; isReplied: boolean; createdAt: string }

export default function AdminMessagesPage() {
  const { state } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<MessageRow[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (state.isLoading) return
    if (!state.isAuthenticated || state.user?.role !== "ADMIN") router.replace("/")
  }, [state.isLoading, state.isAuthenticated, state.user, router])

  useEffect(() => {
    if (!state.token) return
    fetch(`${API_URL}/admin/contacts`, { headers: { Authorization: `Bearer ${state.token}` } })
      .then((response) => response.json()).then(setMessages)
  }, [state.token])

  const markReplied = async (id: string) => {
    const response = await fetch(`${API_URL}/admin/contacts/${id}/reply`, {
      method: "PUT", headers: { Authorization: `Bearer ${state.token}` },
    })
    if (response.ok) {
      const updated = await response.json()
      setMessages((current) => current.map((message) => message.id === updated.id ? updated : message))
    }
  }

  const visible = messages.filter((message) => `${message.firstName} ${message.lastName} ${message.email} ${message.subject}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen p-5 lg:p-8">
      <div className="mx-auto max-w-7xl"><div className="mb-6"><p className="text-sm text-violet-600">Support</p><h1 className="text-2xl font-black">Contact messages</h1></div>
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3"><Search className="h-4 w-4 text-muted-foreground" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search messages..." className="h-11 w-full bg-transparent text-sm outline-none" /></div>
        <div className="grid gap-4">{visible.map((message) => (
          <article key={message.id} className={`rounded-2xl border bg-card p-5 ${message.isReplied ? "border-border" : "border-violet-400/50 shadow-sm"}`}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row"><div className="flex gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600"><Mail className="h-5 w-5" /></div><div><p className="font-bold">{message.subject}</p><p className="text-sm text-muted-foreground">{message.firstName} {message.lastName} · {message.email}</p></div></div>{!message.isReplied ? <button onClick={() => markReplied(message.id)} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-3 py-2 text-xs font-bold text-white"><CheckCircle className="h-4 w-4" /> Mark replied</button> : <span className="inline-flex h-fit items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-600"><CheckCircle className="h-3 w-3" /> Replied</span>}</div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{message.message}</p>
            <p className="mt-3 text-xs text-muted-foreground">{message.createdAt ? new Date(message.createdAt).toLocaleString("en-IN") : ""}</p>
          </article>
        ))}</div>
      </div>
    </div>
  )
}
