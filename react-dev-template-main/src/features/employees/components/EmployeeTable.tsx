import { Link } from "@tanstack/react-router"
import { Eye, Pencil, Trash2 } from "lucide-react"

import type { Employee } from "../types"

interface EmployeeTableProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="px-4 py-3 text-left font-semibold dark:text-white">
              ID
            </th>

            <th className="px-4 py-3 text-left font-semibold dark:text-white">
              Employee
            </th>

            <th className="px-4 py-3 text-left font-semibold dark:text-white">
              Department
            </th>

            <th className="px-4 py-3 text-left font-semibold dark:text-white">
              Position
            </th>

            <th className="px-4 py-3 text-left font-semibold dark:text-white">
              Status
            </th>

            <th className="px-4 py-3 text-center font-semibold dark:text-white">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {employees.map((employee) => (
            <tr
              key={employee.id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <td className="px-4 py-3 dark:text-white">
                {employee.employeeId}
              </td>

              <td className="px-4 py-3">
                <div>
                  <Link
                    to="/employees/$id"
                    params={{
                      id: employee.id.toString(),
                    }}
                    className="font-medium text-cyan-600 transition hover:underline dark:text-cyan-400"
                  >
                    {employee.fullName}
                  </Link>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {employee.email}
                  </p>
                </div>
              </td>

              <td className="px-4 py-3 dark:text-white">
                {employee.department}
              </td>

              <td className="px-4 py-3 dark:text-white">
                {employee.position}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {employee.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">

                  {/* View */}
                  <Link
                    to="/employees/$id"
                    params={{
                      id: employee.id.toString(),
                    }}
                    className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                    title="View Employee"
                  >
                    <Eye size={18} />
                  </Link>

                  {/* Edit */}
                  <button
                    onClick={() => onEdit(employee)}
                    className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                    title="Edit Employee"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onDelete(employee)}
                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                    title="Delete Employee"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {employees.length === 0 && (
        <div className="py-10 text-center text-slate-500 dark:text-slate-400">
          No employee data found.
        </div>
      )}
    </div>
  )
}