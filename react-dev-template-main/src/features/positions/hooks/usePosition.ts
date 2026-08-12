import { useEffect, useState } from "react"

import type { Position } from "../types"
import type { Department } from "#/features/departments/types"

import {
  getPositions,
  createPosition,
  updatePositionApi,
  deletePositionApi,
} from "../services/position.service"
import { getDepartments } from "#/features/departments/services/department.service"

export function usePosition() {
  const [allPositions, setAllPositions] = useState<Position[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const [positionData, departmentData] = await Promise.all([
        getPositions(),
        getDepartments(),
      ])
      setAllPositions(positionData)
      setDepartments(departmentData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function addPosition(data: { name: string; departmentId: number }) {
    await createPosition({ name: data.name, department_id: data.departmentId })
    await refresh()
  }

  async function updatePosition(
    id: number,
    data: { name: string; departmentId: number }
  ) {
    await updatePositionApi(id, {
      name: data.name,
      department_id: data.departmentId,
    })
    await refresh()
  }

  async function deletePosition(id: number) {
    await deletePositionApi(id)
    await refresh()
  }

  return {
    positions: allPositions,
    departments,
    loading,
    addPosition,
    updatePosition,
    deletePosition,
  }
}
