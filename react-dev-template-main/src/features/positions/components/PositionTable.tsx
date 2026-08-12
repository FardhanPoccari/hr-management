import { Pencil, Trash2 } from "lucide-react"
import type { Position } from "../types"

interface Props {
  data: Position[]
  onEdit: (position: Position) => void
  onDelete: (position: Position) => void
}

export default function PositionTable({ data, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-100 dark:bg-slate-800">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-white">ID</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-white">Position</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-white">Department</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-white">Created</th>
            <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-white">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((position) => (
            <tr
              key={position.id}
              className="border-t border-slate-200 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <td className="px-4 py-3 dark:text-white">{position.id}</td>
              <td className="px-4 py-3 font-medium dark:text-white">{position.name}</td>
              <td className="px-4 py-3 dark:text-white">{position.departmentName}</td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{position.createdAt}</td>
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(position)}
                    className="rounded-lg bg-yellow-500 p-2 text-white transition hover:bg-yellow-600"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(position)}
                    className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td colSpan={5} className="py-8 text-center text-slate-500 dark:text-slate-400">
                No position data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
