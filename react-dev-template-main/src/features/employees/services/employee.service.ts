import type { Employee } from "../types"
import { employeeData } from "../data"

let employees: Employee[] = [...employeeData]

export function getEmployees() {
  return employees
}

export function getEmployee(id: number) {
  return employees.find((item) => item.id === id)
}

export function addEmployee(employee: Employee) {
  employees.push(employee)
}

export function updateEmployee(employee: Employee) {
  employees = employees.map((item) =>
    item.id === employee.id ? employee : item
  )
}

export function deleteEmployee(id: number) {
  employees = employees.filter((item) => item.id !== id)
}