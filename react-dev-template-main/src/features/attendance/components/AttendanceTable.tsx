import { Eye, Pencil, Trash2 } from "lucide-react"

import type { Attendance } from "../types"

interface AttendanceTableProps {
  attendances: Attendance[]
  onEdit: (attendance: Attendance) => void
  onDelete: (attendance: Attendance) => void
}

export default function AttendanceTable({
  attendances,
  onEdit,
  onDelete,
}: AttendanceTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <table className="min-w-full">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="px-4 py-3 text-left font-semibold dark:text-white">
              Employee
            </th>

            <th className="px-4 py-3 text-left font-semibold dark:text-white">
              Department
            </th>

            <th className="px-4 py-3 text-center font-semibold dark:text-white">
              Check In
            </th>

            <th className="px-4 py-3 text-center font-semibold dark:text-white">
              Check Out
            </th>

            <th className="px-4 py-3 text-center font-semibold dark:text-white">
              Date
            </th>

            <th className="px-4 py-3 text-center font-semibold dark:text-white">
              Status
            </th>

            <th className="px-4 py-3 text-center font-semibold dark:text-white">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {attendances.map((attendance) => (
            <tr
              key={attendance.id}
              className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-semibold dark:text-white">
                    {attendance.employeeName}
                  </p>

                  <p className="text-sm text-slate-500">
                    {attendance.employeeId}
                  </p>
                </div>
              </td>

              <td className="px-4 py-3 dark:text-white">
                {attendance.department}
              </td>

              <td className="px-4 py-3 text-center dark:text-white">
                {attendance.checkIn}
              </td>

              <td className="px-4 py-3 text-center dark:text-white">
                {attendance.checkOut}
              </td>

              <td className="px-4 py-3 text-center dark:text-white">
                {attendance.date}
              </td>

              <td className="px-4 py-3 text-center">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    attendance.status === "Present"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : attendance.status === "Late"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {attendance.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">

                  <button
                    className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                    title="View Attendance"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(attendance)}
                    className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                    title="Edit Attendance"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(attendance)}
                    className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                    title="Delete Attendance"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {attendances.length === 0 && (
        <div className="py-10 text-center text-slate-500 dark:text-slate-400">
          No attendance data found.
        </div>
      )}
    </div>
  )
}