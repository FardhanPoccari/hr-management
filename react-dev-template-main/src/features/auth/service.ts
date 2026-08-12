import { api } from "#/shared/lib/api"
import type { LoginPayload, LoginResult, MenuPermission } from "./types"

export async function login(payload: LoginPayload): Promise<LoginResult> {
  const res = await api.post<LoginResult>("/auth/login", payload)
  return res.data
}

export async function getMyMenus(): Promise<MenuPermission[]> {
  const res = await api.get<MenuPermission[]>("/me/menus")
  return res.data
}
