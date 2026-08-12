import { useEffect, useState } from "react"

import type { User, UserRole } from "../types"
import type { Department } from "#/features/departments/types"
import type { Position } from "#/features/positions/types"

import {
  getUsers,
  getRoles,
  createUser,
  updateUserApi,
  deleteUserApi,
  type UserFormData,
} from "../services/user.service"
import { getDepartments } from "#/features/departments/services/department.service"
import { getPositions } from "#/features/positions/services/position.service"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<UserRole[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const [userData, roleData, departmentData, positionData] = await Promise.all([
        getUsers(search),
        getRoles(),
        getDepartments(),
        getPositions(),
      ])
      setUsers(userData)
      setRoles(roleData)
      setDepartments(departmentData)
      setPositions(positionData)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  async function addUser(data: UserFormData) {
    await createUser(data)
    await refresh()
  }

  async function updateUser(id: number, data: UserFormData) {
    await updateUserApi(id, data)
    await refresh()
  }

  async function deleteUser(id: number) {
    await deleteUserApi(id)
    await refresh()
  }

  return {
    users,
    roles,
    departments,
    positions,
    search,
    setSearch,
    loading,
    addUser,
    updateUser,
    deleteUser,
  }
}
