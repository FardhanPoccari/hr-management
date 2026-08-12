import { useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"

import DashboardLayout from "#/shared/components/DashboardLayout"

import DepartmentTable from "#/features/departments/components/DepartmentTable"
import DepartmentToolbar from "#/features/departments/components/DepartmentToolbar"
import DepartmentModal from "#/features/departments/components/DepartmentModal"

import { useDepartment } from "#/features/departments/hooks/useDepartment"
import type { Department } from "#/features/departments/types"

export const Route = createFileRoute("/departments")({
  component: DepartmentsPage,
})

function DepartmentsPage() {
  const {
    departments,
    search,
    setSearch,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartment()

  const navigate = useNavigate()

  const [openModal, setOpenModal] = useState(false)

  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null)

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Departments
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage all departments in your company.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg transition-colors dark:bg-slate-900">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold dark:text-white">
              Department List
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total Department: {departments.length}
            </p>
          </div>
        </div>

        <DepartmentToolbar
          search={search}
          onSearchChange={setSearch}
          onAdd={() => {
            setSelectedDepartment(null)
            setOpenModal(true)
          }}
        />

        <DepartmentTable
          data={departments}
          onView={(department) => {
            navigate({
              to: "/departments/$id",
              params: {
                id: department.id.toString(),
              },
            })
          }}
          onEdit={(department) => {
            setSelectedDepartment(department)
            setOpenModal(true)
          }}
          onDelete={(department) => {
            if (
              confirm(
                `Delete department "${department.name}"?`
              )
            ) {
              deleteDepartment(department.id)
            }
          }}
        />
      </div>

      <DepartmentModal
        open={openModal}
        department={selectedDepartment}
        onClose={() => {
          setOpenModal(false)
          setSelectedDepartment(null)
        }}
        onSave={(department) => {
          if (selectedDepartment) {
            updateDepartment(department)
          } else {
            addDepartment(department)
          }

          setSelectedDepartment(null)
          setOpenModal(false)
        }}
      />
    </DashboardLayout>
  )
}