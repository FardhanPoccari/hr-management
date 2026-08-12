import { Search, Plus } from "lucide-react"

interface EmployeeToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  onAdd: () => void
}

export default function EmployeeToolbar({
  search,
  onSearchChange,
  onAdd,
}: EmployeeToolbarProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-80">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </div>

      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-2 font-medium text-white transition hover:bg-cyan-700"
      >
        <Plus size={18} />
        Add Employee
      </button>
    </div>
  )
}