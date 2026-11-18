export function getApiUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim()
  const runningOnVercel = typeof window !== "undefined"
    && window.location.hostname.endsWith("vercel.app")

  if (!configured) {
    return runningOnVercel
      ? "https://e-commerce-1-2nbq.onrender.com/api"
      : "http://localhost:8080/api"
  }

  const baseUrl = configured.replace(/\/+$/, "")
  if (/\/api$/i.test(baseUrl)) {
    return baseUrl
  }

  return `${baseUrl}/api`
}
