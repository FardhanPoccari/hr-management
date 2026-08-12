import { api } from "#/shared/lib/api"
import type { User, UserRole } from "../types"

interface UserApi {
  id: number
  name: string
  email: string
  role_id: number
  role?: { id: number; name: string; slug: string }
  department_id: number | null
  department?: { id: number; name: string } | null
  position_id: number | null
  position?: { id: number; name: string } | null
  created_at: string
}

interface RoleApi {
  id: number
  name: string
  slug: string
}

function mapUser(u: UserApi): User {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    roleId: u.role_id,
    roleName: u.role?.name ?? "",
    departmentId: u.department_id,
    departmentName: u.department?.name ?? "",
    positionId: u.position_id,
    positionName: u.position?.name ?? "",
    createdAt: u.created_at ? u.created_at.slice(0, 10) : "",
  }
}

export async function getUsers(search = ""): Promise<User[]> {
  const query = search ? `&search=${encodeURIComponent(search)}` : ""
  const res = await api.get<UserApi[]>(`/users?limit=100${query}`)
  return res.data.map(mapUser)
}

export async function getRoles(): Promise<UserRole[]> {
  const res = await api.get<RoleApi[]>("/roles")
  return res.data.map((r) => ({ id: r.id, name: r.name, slug: r.slug }))
}

export interface UserFormData {
  name: string
  email: string
  password?: string
  roleId: number
  departmentId: number | null
  positionId: number | null
}

export async function createUser(data: UserFormData): Promise<User> {
  const res = await api.post<UserApi>("/users", {
    name: data.name,
    email: data.email,
    password: data.password,
    role_id: data.roleId,
    department_id: data.departmentId,
    position_id: data.positionId,
  })
  return mapUser(res.data)
}

export async function updateUserApi(id: number, data: UserFormData): Promise<User> {
  const res = await api.put<UserApi>(`/users/${id}`, {
    name: data.name,
    email: data.email,
    password: data.password ?? "",
    role_id: data.roleId,
    department_id: data.departmentId,
    position_id: data.positionId,
  })
  return mapUser(res.data)
}

export async function deleteUserApi(id: number): Promise<void> {
  await api.delete(`/users/${id}`)
}
