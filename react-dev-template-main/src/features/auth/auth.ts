import type { AuthUser } from "./types"

export function setSession(token: string, user: AuthUser) {
  localStorage.setItem("token", token)
  localStorage.setItem("user", JSON.stringify(user))
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("token")
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem("user")
  return raw ? (JSON.parse(raw) as AuthUser) : null
}

export function clearSession() {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
}

export function isAuthenticated(): boolean {
  return !!getToken()
}
