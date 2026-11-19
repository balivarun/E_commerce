import Link from "next/link"
import { LayoutDashboard, Package, ShoppingBag, Users, MessageSquare } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const items = [
    { href: '/admin', icon: LayoutDashboard },
    { href: '/admin/products', icon: Package },
    { href: '/admin/orders', icon: ShoppingBag },
    { href: '/admin/users', icon: Users },
    { href: '/admin/messages', icon: MessageSquare },
  ]

  return (
    <div>
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-2xl border border-border bg-background/95 p-1 shadow-xl backdrop-blur lg:hidden">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-violet-500/10 hover:text-violet-600">
            <item.icon className="h-5 w-5" />
          </Link>
        ))}
      </div>
      {children}
    </div>
  )
}
