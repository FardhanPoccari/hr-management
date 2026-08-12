import type { Department } from "../types"
import DepartmentForm from "./DepartmentForm"

interface DepartmentModalProps {
  open: boolean
  onClose: () => void

  department: Department | null

  onSave: (department: Department) => void
}

export default function DepartmentModal({
  open,
  onClose,
  department,
  onSave,
}: DepartmentModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">
            {department ? "Edit Department" : "Add Department"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-red-500"
          >
            ×
          </button>
        </div>

        <DepartmentForm
          department={department}
          onCancel={onClose}
          onSave={onSave}
        />

      </div>
    </div>
  )
}