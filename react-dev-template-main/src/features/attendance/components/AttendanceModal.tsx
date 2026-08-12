import { useEffect, useState } from "react"

import AttendanceForm from "./AttendanceForm"

import type { Attendance } from "../types"

interface AttendanceModalProps {
  open: boolean
  onClose: () => void
  attendance: Attendance | null
  onSave: (attendance: Attendance) => void
}

const initialForm = {
  employeeId: "",
  employeeName: "",
  department: "",
  checkIn: "",
  checkOut: "",
  date: "",
  status: "Present",
  notes: "",
}

export default function AttendanceModal({
  open,
  onClose,
  attendance,
  onSave,
}: AttendanceModalProps) {
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    if (attendance) {
      setForm({
        employeeId: attendance.employeeId,
        employeeName: attendance.employeeName,
        department: attendance.department,
        checkIn: attendance.checkIn,
        checkOut: attendance.checkOut,
        date: attendance.date,
        status: attendance.status,
        notes: attendance.notes ?? "",
      })
    } else {
      setForm(initialForm)
    }
  }, [attendance, open])

  if (!open) return null

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  function handleSave() {
    if (
      !form.employeeId ||
      !form.employeeName ||
      !form.department ||
      !form.date
    ) {
      alert("Please complete all required fields.")
      return
    }

    onSave({
      id: attendance ? attendance.id : Date.now(),

      employeeId: form.employeeId,
      employeeName: form.employeeName,
      department: form.department,

      checkIn: form.checkIn,
      checkOut: form.checkOut,

      date: form.date,

      status: form.status as
        | "Present"
        | "Late"
        | "Absent"
        | "Leave"
        | "Sick",

      notes: form.notes,
    })

    setForm(initialForm)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

      <div className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-bold dark:text-white">
            {attendance ? "Edit Attendance" : "Add Attendance"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 hover:text-red-500"
          >
            ✕
          </button>

        </div>

        <AttendanceForm
          form={form}
          onChange={handleChange}
        />

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-6 py-2 dark:border-slate-700 dark:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-cyan-600 px-6 py-2 font-medium text-white transition hover:bg-cyan-700"
          >
            {attendance ? "Update Attendance" : "Save Attendance"}
          </button>

        </div>

      </div>

    </div>
  )
}