import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import DashboardLayout from "#/shared/components/DashboardLayout"

import EmployeeTable from "#/features/employees/components/EmployeeTable"
import EmployeeToolbar from "#/features/employees/components/EmployeeToolbar"
import EmployeeModal from "#/features/employees/components/EmployeeModal"

import { useEmployee } from "#/features/employees/hooks/useEmployee"
import type { Employee } from "#/features/employees/types"

export const Route = createFileRoute("/employees")({
  component: EmployeesPage,
})

function EmployeesPage() {
  const {
    employees,
    search,
    setSearch,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployee()

  const [openModal, setOpenModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null)

  function handleCloseModal() {
    setOpenModal(false)
    setSelectedEmployee(null)
  }

  function handleSave(employee: Employee) {
    if (selectedEmployee) {
      updateEmployee(employee)
    } else {
      addEmployee(employee)
    }

    handleCloseModal()
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Employees
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage all employees in your company.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-2xl bg-white p-6 shadow-lg transition-colors dark:bg-slate-900">

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          <div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
              Employee List
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Employee: {employees.length}
            </p>
          </div>

        </div>

        <EmployeeToolbar
          search={search}
          onSearchChange={setSearch}
          onAdd={() => {
            setSelectedEmployee(null)
            setOpenModal(true)
          }}
        />

        <EmployeeTable
          employees={employees}
          onEdit={(employee) => {
            setSelectedEmployee(employee)
            setOpenModal(true)
          }}
          onDelete={(employee) => {
            const confirmDelete = window.confirm(
              `Delete employee "${employee.fullName}"?`
            )

            if (confirmDelete) {
              deleteEmployee(employee.id)
            }
          }}
        />

      </div>

      <EmployeeModal
        open={openModal}
        employee={selectedEmployee}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </DashboardLayout>
  )
}