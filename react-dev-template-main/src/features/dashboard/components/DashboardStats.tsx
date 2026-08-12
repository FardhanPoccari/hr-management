interface DashboardStatsProps {
  totalUsers: number
  totalDepartments: number
  totalPositions: number
  totalRoles: number
}

export default function DashboardStats({
  totalUsers,
  totalDepartments,
  totalPositions,
  totalRoles,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl bg-cyan-600 p-6 text-white shadow-lg">
        <h3 className="text-lg font-medium">Users</h3>
        <p className="mt-4 text-5xl font-bold">{totalUsers}</p>
      </div>

      <div className="rounded-2xl bg-emerald-600 p-6 text-white shadow-lg">
        <h3 className="text-lg font-medium">Departments</h3>
        <p className="mt-4 text-5xl font-bold">{totalDepartments}</p>
      </div>

      <div className="rounded-2xl bg-violet-600 p-6 text-white shadow-lg">
        <h3 className="text-lg font-medium">Positions</h3>
        <p className="mt-4 text-5xl font-bold">{totalPositions}</p>
      </div>

      <div className="rounded-2xl bg-orange-500 p-6 text-white shadow-lg">
        <h3 className="text-lg font-medium">Roles</h3>
        <p className="mt-4 text-5xl font-bold">{totalRoles}</p>
      </div>
    </div>
  )
}
