import type React from "react"

interface AttendanceFormProps {
  form: {
    employeeId: string
    employeeName: string
    department: string
    checkIn: string
    checkOut: string
    date: string
    status: string
    notes: string
  }

  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => void
}

export default function AttendanceForm({
  form,
  onChange,
}: AttendanceFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <Input
          label="Employee ID"
          name="employeeId"
          value={form.employeeId}
          onChange={onChange}
        />

        <Input
          label="Employee Name"
          name="employeeName"
          value={form.employeeName}
          onChange={onChange}
        />

        <Input
          label="Department"
          name="department"
          value={form.department}
          onChange={onChange}
        />

        <Input
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={onChange}
        />

        <Input
          label="Check In"
          name="checkIn"
          type="time"
          value={form.checkIn}
          onChange={onChange}
        />

        <Input
          label="Check Out"
          name="checkOut"
          type="time"
          value={form.checkOut}
          onChange={onChange}
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={onChange}
          options={[
            "Present",
            "Late",
            "Absent",
            "Leave",
            "Sick",
          ]}
        />

      </div>

      <div className="mt-5">
        <label className="mb-2 block font-medium dark:text-white">
          Notes
        </label>

        <textarea
          rows={4}
          name="notes"
          value={form.notes}
          onChange={onChange}
          className="w-full rounded-lg border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="Additional notes..."
        />
      </div>
    </>
  )
}

interface InputProps {
  label: string
  name: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
  type?: string
}

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block font-medium dark:text-white">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  )
}

interface SelectProps {
  label: string
  name: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void
  options: string[]
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
}: SelectProps) {
  return (
    <div>
      <label className="mb-2 block font-medium dark:text-white">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}