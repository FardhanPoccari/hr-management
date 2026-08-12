import { useEffect, useState } from "react"
import type { Position } from "../types"
import type { Department } from "#/features/departments/types"

interface PositionFormProps {
  position: Position | null
  departments: Department[]

  onSave: (data: { name: string; departmentId: number }) => void

  onCancel: () => void
}

export default function PositionForm({
  position,
  departments,
  onSave,
  onCancel,
}: PositionFormProps) {
  const [name, setName] = useState("")
  const [departmentId, setDepartmentId] = useState<number | "">("")

  useEffect(() => {
    if (position) {
      setName(position.name)
      setDepartmentId(position.departmentId)
    } else {
      setName("")
      setDepartmentId("")
    }
  }, [position])

  const handleSubmit = () => {
    if (!name.trim() || !departmentId) {
      alert("Position and Department are required")
      return
    }

    onSave({
      name,
      departmentId: Number(departmentId),
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Position Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="Frontend Developer"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Department
        </label>

        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(Number(e.target.value))}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border px-4 py-2 dark:border-slate-700 dark:text-white"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {position ? "Update" : "Save"}
        </button>
      </div>
    </div>
  )
}
