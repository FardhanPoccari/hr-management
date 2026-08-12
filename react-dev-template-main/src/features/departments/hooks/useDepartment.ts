import { useEffect, useState } from "react"

import type { Department } from "../types"

import {
  getDepartments,
  createDepartment,
  updateDepartmentApi,
  deleteDepartmentApi,
} from "../services/department.service"

export function useDepartment() {
  const [allDepartments, setAllDepartments] = useState<Department[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const data = await getDepartments()
      setAllDepartments(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  async function addDepartment(data: { name: string; description: string }) {
    await createDepartment({ name: data.name, description: data.description })
    await refresh()
  }

  async function updateDepartment(department: Department) {
    await updateDepartmentApi(department.id, {
      name: department.name,
      description: department.description,
    })
    await refresh()
  }

  async function deleteDepartment(id: number) {
    await deleteDepartmentApi(id)
    await refresh()
  }

  const departments = allDepartments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  )

  return {
    departments,
    search,
    setSearch,
    loading,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  }
}
