export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  role_id: number
  role_name: string
  role_slug: string
}

export interface LoginResult {
  token: string
  user: AuthUser
}

export interface MenuPermission {
  menu_id: number
  key: string
  name: string
  path: string
  icon: string
  can_view: boolean
  can_create: boolean
  can_update: boolean
  can_delete: boolean
}
