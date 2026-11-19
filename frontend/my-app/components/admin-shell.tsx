"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  LogOut,
  Store,
  ChevronRight,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const navigation = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products & Stock", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Customers", href: "/admin/users", icon: Users },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { state, logout } = useAuth()

  if (state.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080914]">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-violet-400" />
      </div>
    )
  }

  if (!state.isAuthenticated || state.user?.role?.toUpperCase() !== "ADMIN") {
    router.replace("/")
    return null
  }

  const isActive = (href: string) => href === "/admin"
    ? pathname === "/admin"
    : pathname.startsWith(href)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#090a12] dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col border-r border-white/10 bg-[#080914] p-5 text-white lg:flex">
        <Link href="/admin" className="flex items-center gap-3 px-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-lg font-black shadow-lg shadow-violet-500/20">S</span>
          <div>
            <p className="font-black tracking-tight">ShopSphere</p>
            <p className="text-xs font-medium text-violet-300">Admin Console</p>
          </div>
        </Link>

        <nav className="mt-10 space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-violet-500 text-white shadow-lg shadow-violet-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
              >
                <span className="flex items-center gap-3"><item.icon className="h-5 w-5" />{item.label}</span>
                {active && <ChevronRight className="h-4 w-4" />}
              </Link>
            )
          })}
        </nav>

        <div className="mt-auto space-y-2">
          <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 hover:bg-white/5 hover:text-white">
            <Store className="h-5 w-5" /> View storefront
          </Link>
          <button
            onClick={() => { logout(); router.replace("/") }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="h-5 w-5" /> Sign out
          </button>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-72">
        <div className="border-b border-border/70 bg-background/95 px-5 py-4 backdrop-blur lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">Management Console</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{state.user?.name || "Administrator"}</p>
            </div>
            <Link href="/" className="hidden items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm font-semibold hover:bg-muted sm:flex">
              <Store className="h-4 w-4" /> Storefront
            </Link>
          </div>
        </div>

        {children}

        <nav className="fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 rounded-2xl border border-border bg-background/95 p-1 shadow-2xl backdrop-blur lg:hidden">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${isActive(item.href) ? "bg-violet-600 text-white" : "text-muted-foreground"}`}
            >
              <item.icon className="h-5 w-5" />
            </Link>
          ))}
        </nav>
      </main>
    </div>
  )
}
