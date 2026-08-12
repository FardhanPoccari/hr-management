import { useMemo, useState } from "react"

import type { Employee } from "../types"

import {
  getEmployees,
  addEmployee as add,
  updateEmployee as update,
  deleteEmployee as remove,
} from "../services/employee.service"

export function useEmployee() {
  const [employees, setEmployees] = useState(getEmployees())

  const [search, setSearch] = useState("")

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) =>
      employee.fullName
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [employees, search])

  function addEmployee(employee: Employee) {
    add(employee)
    setEmployees([...getEmployees()])
  }

  function updateEmployee(employee: Employee) {
    update(employee)
    setEmployees([...getEmployees()])
  }

  function deleteEmployee(id: number) {
    remove(id)
    setEmployees([...getEmployees()])
  }

  return {
    employees: filteredEmployees,
    search,
    setSearch,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  }
}