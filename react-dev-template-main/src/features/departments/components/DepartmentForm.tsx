import { useEffect, useState } from "react"

import type { Department } from "../types"

interface DepartmentFormProps {
  department: Department | null

  onSave: (department: Department) => void

  onCancel: () => void
}

export default function DepartmentForm({
  department,
  onSave,
  onCancel,
}: DepartmentFormProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (department) {
      setName(department.name)
      setDescription(department.description)
    } else {
      setName("")
      setDescription("")
    }
  }, [department])

  function handleSubmit() {
    if (!name.trim()) {
      alert("Department name is required")
      return
    }

    onSave({
      id: department ? department.id : Date.now(),
      name,
      description,
      createdAt:
        department?.createdAt ??
        new Date().toLocaleDateString(),
    })

    setName("")
    setDescription("")
  }

  return (
    <div className="space-y-4">

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Department Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="Enter department name"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Description
        </label>

        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="Enter description"
        />
      </div>

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border px-4 py-2 dark:border-slate-700 dark:text-white"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-700"
        >
          {department ? "Update Department" : "Save Department"}
        </button>

      </div>

    </div>
  )
}