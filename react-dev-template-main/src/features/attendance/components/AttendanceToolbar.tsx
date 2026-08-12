import { Calendar, Plus, Search } from "lucide-react"

interface AttendanceToolbarProps {
  search: string
  onSearchChange: (value: string) => void

  status: string
  onStatusChange: (value: string) => void

  date: string
  onDateChange: (value: string) => void

  onAdd: () => void
}

export default function AttendanceToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  date,
  onDateChange,
  onAdd,
}: AttendanceToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}
      <div className="relative w-full lg:max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search employee..."
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 shadow-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      <div className="flex flex-col gap-3 md:flex-row">

        {/* Date */}
        <div className="relative">
          <Calendar
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="date"
            value={date}
            onChange={(e) =>
              onDateChange(e.target.value)
            }
            className="rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 shadow-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {/* Status */}
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="Absent">Absent</option>
        </select>

        {/* Button */}
        <button
          onClick={onAdd}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-medium text-white transition hover:bg-cyan-700"
        >
          <Plus size={18} />
          Add Attendance
        </button>

      </div>
    </div>
  )
}