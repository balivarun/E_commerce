"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, LogIn } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login(email, password)
      router.push("/")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(139,92,246,.12),transparent_24%),radial-gradient(circle_at_85%_80%,rgba(236,72,153,.10),transparent_24%)]" />

        <Card className="relative grid w-full max-w-4xl overflow-hidden border-border/70 rounded-3xl p-0 shadow-2xl shadow-violet-500/10 md:grid-cols-[.9fr_1.1fr]">
          <div className="hidden flex-col justify-between bg-[#080914] p-8 text-white md:flex">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-300">ShopSphere</p>
              <h2 className="mt-5 text-3xl font-black leading-tight">Welcome back to your collection.</h2>
              <p className="mt-4 text-sm leading-6 text-slate-300">Track orders, save favourites, and enjoy a faster checkout.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Secure sign-in protected by JWT authentication.
            </div>
          </div>

          <div>
            <CardHeader className="space-y-1 pb-2 pt-8 text-center">
              <CardTitle className="text-2xl font-black">Sign in</CardTitle>
              <CardDescription>Enter your account details to continue</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white" disabled={loading}>
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                    Create one
                  </Link>
                </p>
              </CardFooter>
            </form>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
