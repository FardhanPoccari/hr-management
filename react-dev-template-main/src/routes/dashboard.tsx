import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import DashboardLayout from "#/shared/components/DashboardLayout"

import DashboardStats from "#/features/dashboard/components/DashboardStats"
import DashboardChart from "#/features/dashboard/components/DashboardChart"

import { getUser } from "#/features/auth/auth"
import { getUsers } from "#/features/users/services/user.service"
import { getDepartments } from "#/features/departments/services/department.service"
import { getPositions } from "#/features/positions/services/position.service"
import { getRoles } from "#/features/users/services/user.service"
import type { User } from "#/features/users/types"

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const [name, setName] = useState("Admin")
  const [users, setUsers] = useState<User[]>([])
  const [totalDepartments, setTotalDepartments] = useState(0)
  const [totalPositions, setTotalPositions] = useState(0)
  const [totalRoles, setTotalRoles] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getUser()
    if (user) setName(user.name)

    Promise.all([getUsers(), getDepartments(), getPositions(), getRoles()])
      .then(([userData, departmentData, positionData, roleData]) => {
        setUsers(userData)
        setTotalDepartments(departmentData.length)
        setTotalPositions(positionData.length)
        setTotalRoles(roleData.length)
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const chartData = Object.entries(
    users.reduce<Record<string, number>>((acc, user) => {
      const key = user.departmentName || "Unassigned"
      acc[key] = (acc[key] ?? 0) + 1
      return acc
    }, {})
  ).map(([department, count]) => ({ department, users: count }))

  const recentUsers = users.slice(0, 5)

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Welcome, {name}</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">HR Management Dashboard</p>
      </div>

      {loading ? (
        <div className="text-slate-500 dark:text-slate-400">Loading dashboard...</div>
      ) : (
        <>
          <DashboardStats
            totalUsers={users.length}
            totalDepartments={totalDepartments}
            totalPositions={totalPositions}
            totalRoles={totalRoles}
          />

          <div className="mt-8">
            <DashboardChart data={chartData} />
          </div>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
            <h2 className="mb-5 text-xl font-semibold dark:text-white">Recent Users</h2>

            <table className="w-full">
              <thead className="border-b dark:border-slate-700">
                <tr>
                  <th className="py-3 text-left dark:text-white">Name</th>
                  <th className="text-left dark:text-white">Role</th>
                  <th className="text-left dark:text-white">Department</th>
                  <th className="text-left dark:text-white">Position</th>
                </tr>
              </thead>

              <tbody>
                {recentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                  >
                    <td className="py-3 dark:text-white">{user.name}</td>
                    <td className="dark:text-white">{user.roleName}</td>
                    <td className="dark:text-white">{user.departmentName || "-"}</td>
                    <td className="dark:text-white">{user.positionName || "-"}</td>
                  </tr>
                ))}

                {recentUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}
