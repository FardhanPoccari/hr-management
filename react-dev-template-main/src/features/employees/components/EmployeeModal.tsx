import { useEffect, useState } from "react"

import EmployeeForm from "./EmployeeForm"

import type { Employee } from "../types"

interface EmployeeModalProps {
  open: boolean
  onClose: () => void
  employee: Employee | null
  onSave: (employee: Employee) => void
}

const initialForm = {
  employeeId: "",
  fullName: "",
  email: "",
  phone: "",
  gender: "Male",
  department: "",
  position: "",
  hireDate: "",
  salary: "",
  status: "Active",
  address: "",
  photo: "",
}

export default function EmployeeModal({
  open,
  onClose,
  employee,
  onSave,
}: EmployeeModalProps) {
  const [form, setForm] = useState(initialForm)
  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (employee) {
      setForm({
        employeeId: employee.employeeId,
        fullName: employee.fullName,
        email: employee.email,
        phone: employee.phone,
        gender: employee.gender,
        department: employee.department,
        position: employee.position,
        hireDate: employee.hireDate,
        salary: employee.salary.toString(),
        status: employee.status,
        address: employee.address,
        photo: employee.photo,
      })

      setPreview(employee.photo)
    } else {
      setForm(initialForm)
      setPreview("")
    }
  }, [employee, open])

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

  function handlePhotoChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      const image = reader.result as string

      setPreview(image)

      setForm((prev) => ({
        ...prev,
        photo: image,
      }))
    }

    reader.readAsDataURL(file)
  }

  function handleSave() {
    if (
      !form.employeeId ||
      !form.fullName ||
      !form.email ||
      !form.department ||
      !form.position
    ) {
      alert("Please fill all required fields.")
      return
    }

    onSave({
      id: employee ? employee.id : Date.now(),
      employeeId: form.employeeId,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      gender: form.gender as "Male" | "Female",
      department: form.department,
      position: form.position,
      hireDate: form.hireDate,
      salary: Number(form.salary),
      status: form.status as "Active" | "Inactive",
      address: form.address,
      photo: form.photo,
    })

    setForm(initialForm)
    setPreview("")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl dark:bg-slate-900">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">
            {employee ? "Edit Employee" : "Add Employee"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-slate-500 transition hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* Employee Photo */}
        <div className="mb-8 flex flex-col items-center">

          <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-cyan-500 shadow-lg">

            {preview ? (
              <img
                src={preview}
                alt="Employee"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200 text-5xl dark:bg-slate-700">
                👤
              </div>
            )}

          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-4 block text-sm dark:text-white"
          />

        </div>

        <EmployeeForm
          form={form}
          onChange={handleChange}
          onPhotoChange={handlePhotoChange}
        />

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-6 py-2 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-cyan-600 px-6 py-2 font-medium text-white transition hover:bg-cyan-700"
          >
            {employee ? "Update Employee" : "Save Employee"}
          </button>

        </div>

      </div>
    </div>
  )
}