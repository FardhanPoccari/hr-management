import { api } from "#/shared/lib/api"
import type { Department } from "../types"

interface DepartmentApi {
  id: number
  name: string
  description: string
  created_at: string
}

function mapDepartment(d: DepartmentApi): Department {
  return {
    id: d.id,
    name: d.name,
    description: d.description ?? "",
    createdAt: d.created_at ? d.created_at.slice(0, 10) : "",
  }
}

export async function getDepartments(): Promise<Department[]> {
  const res = await api.get<DepartmentApi[]>("/departments?limit=100")
  return res.data.map(mapDepartment)
}

export async function getDepartment(id: number): Promise<Department | undefined> {
  try {
    const res = await api.get<DepartmentApi>(`/departments/${id}`)
    return mapDepartment(res.data)
  } catch {
    return undefined
  }
}

export async function createDepartment(data: {
  name: string
  description: string
}): Promise<Department> {
  const res = await api.post<DepartmentApi>("/departments", data)
  return mapDepartment(res.data)
}

export async function updateDepartmentApi(
  id: number,
  data: { name: string; description: string }
): Promise<Department> {
  const res = await api.put<DepartmentApi>(`/departments/${id}`, data)
  return mapDepartment(res.data)
}

export async function deleteDepartmentApi(id: number): Promise<void> {
  await api.delete(`/departments/${id}`)
}
