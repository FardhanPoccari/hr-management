import { api } from "#/shared/lib/api"
import type { Position } from "../types"

interface PositionApi {
  id: number
  name: string
  department_id: number
  department?: { id: number; name: string }
  created_at: string
}

function mapPosition(p: PositionApi): Position {
  return {
    id: p.id,
    name: p.name,
    departmentId: p.department_id,
    departmentName: p.department?.name ?? "",
    createdAt: p.created_at ? p.created_at.slice(0, 10) : "",
  }
}

export async function getPositions(): Promise<Position[]> {
  const res = await api.get<PositionApi[]>("/positions?limit=100")
  return res.data.map(mapPosition)
}

export async function createPosition(data: {
  name: string
  department_id: number
}): Promise<Position> {
  const res = await api.post<PositionApi>("/positions", data)
  return mapPosition(res.data)
}

export async function updatePositionApi(
  id: number,
  data: { name: string; department_id: number }
): Promise<Position> {
  const res = await api.put<PositionApi>(`/positions/${id}`, data)
  return mapPosition(res.data)
}

export async function deletePositionApi(id: number): Promise<void> {
  await api.delete(`/positions/${id}`)
}
