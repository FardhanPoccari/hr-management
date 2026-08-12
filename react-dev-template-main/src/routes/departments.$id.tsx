import { createFileRoute, Link } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import DashboardLayout from "#/shared/components/DashboardLayout"

import DepartmentProfile from "#/features/departments/components/DepartmentProfile"

import { getDepartment } from "#/features/departments/services/department.service"
import type { Department } from "#/features/departments/types"
import { employeeData } from "#/features/employees/data"

export const Route = createFileRoute("/departments/$id")({
  component: DepartmentDetailPage,
})

function DepartmentDetailPage() {
  const { id } = Route.useParams()

  const [department, setDepartment] = useState<Department | null | undefined>(
    undefined
  )

  useEffect(() => {
    getDepartment(Number(id)).then((d) => setDepartment(d ?? null))
  }, [id])

  if (department === undefined) {
    return (
      <DashboardLayout>
        <div className="p-10 text-center text-slate-500 dark:text-slate-400">
          Loading...
        </div>
      </DashboardLayout>
    )
  }

  if (!department) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl bg-white p-10 text-center shadow-lg dark:bg-slate-900">
          <h1 className="text-3xl font-bold dark:text-white">
            Department Not Found
          </h1>

          <Link
            to="/departments"
            className="mt-6 inline-block rounded-xl bg-cyan-600 px-6 py-3 text-white"
          >
            Back
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const employees = employeeData.filter(
    (employee) => employee.department === department.name
  )

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link to="/departments" className="text-cyan-600 hover:underline">
          ← Back to Departments
        </Link>
      </div>

      <DepartmentProfile department={department} totalEmployees={employees.length} />

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
        <h2 className="mb-4 text-xl font-semibold dark:text-white">
          Employees in this Department
        </h2>

        <table className="w-full">
          <thead className="border-b dark:border-slate-700">
            <tr>
              <th className="py-3 text-left dark:text-white">Employee ID</th>
              <th className="text-left dark:text-white">Name</th>
              <th className="text-left dark:text-white">Position</th>
              <th className="text-left dark:text-white">Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <td className="py-3 dark:text-white">{employee.employeeId}</td>
                <td className="dark:text-white">{employee.fullName}</td>
                <td className="dark:text-white">{employee.position}</td>
                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-slate-500 dark:text-slate-400">
                  No employees in this department.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
