import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

interface DashboardChartProps {
  data: Array<{ department: string; users: number }>
}

export default function DashboardChart({ data }: DashboardChartProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold dark:text-white">
        Users by Department
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="users" fill="#06b6d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
