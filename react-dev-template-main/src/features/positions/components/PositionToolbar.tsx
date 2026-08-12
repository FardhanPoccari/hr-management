import { Plus, Search } from "lucide-react"

interface Props {
  search: string
  onSearchChange: (value: string) => void
  onAdd: () => void
}

export default function PositionToolbar({
  search,
  onSearchChange,
  onAdd,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-80">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search position..."
          className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Position
      </button>
    </div>
  )
}