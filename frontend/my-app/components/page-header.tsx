import type { LucideIcon } from "lucide-react"
import { Sparkles } from "lucide-react"

interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  icon?: LucideIcon
}

export function PageHeader({ eyebrow = "ShopSphere", title, description, icon: Icon }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-[#080914] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(139,92,246,.35),transparent_30%),radial-gradient(circle_at_15%_100%,rgba(236,72,153,.16),transparent_24%)]" />
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="container relative mx-auto px-4 py-10 md:py-14">
        <div className="max-w-3xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-violet-300">
            {Icon ? <Icon className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {eyebrow}
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">{description}</p>}
        </div>
      </div>
    </section>
  )
}
