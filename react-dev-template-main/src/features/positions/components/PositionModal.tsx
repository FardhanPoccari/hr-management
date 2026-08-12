import type { Position } from "../types"
import type { Department } from "#/features/departments/types"
import PositionForm from "./PositionForm"

interface PositionModalProps {
  open: boolean
  position: Position | null
  departments: Department[]
  onClose: () => void

  onSave: (data: { name: string; departmentId: number }) => void
}

export default function PositionModal({
  open,
  position,
  departments,
  onClose,
  onSave,
}: PositionModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">
            {position ? "Edit Position" : "Add Position"}
          </h2>

          <button onClick={onClose} className="text-2xl dark:text-white">
            ×
          </button>
        </div>

        <PositionForm
          position={position}
          departments={departments}
          onCancel={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
