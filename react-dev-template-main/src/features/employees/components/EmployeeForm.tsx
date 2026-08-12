import type React from "react"

interface EmployeeFormProps {
  form: {
    employeeId: string
    fullName: string
    email: string
    phone: string
    gender: string
    department: string
    position: string
    hireDate: string
    salary: string
    status: string
    address: string
    photo: string
  }

  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => void

  onPhotoChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}

export default function EmployeeForm({
  form,
  onChange,
  onPhotoChange,
}: EmployeeFormProps) {
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
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={onChange}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
        />

        <Input
          label="Phone Number"
          name="phone"
          value={form.phone}
          onChange={onChange}
        />

        <Select
          label="Gender"
          name="gender"
          value={form.gender}
          onChange={onChange}
          options={["Male", "Female"]}
        />

        <Input
          label="Department"
          name="department"
          value={form.department}
          onChange={onChange}
        />

        <Input
          label="Position"
          name="position"
          value={form.position}
          onChange={onChange}
        />

        <Input
          label="Hire Date"
          name="hireDate"
          type="date"
          value={form.hireDate}
          onChange={onChange}
        />

        <Input
          label="Salary"
          name="salary"
          type="number"
          value={form.salary}
          onChange={onChange}
        />

        <Select
          label="Status"
          name="status"
          value={form.status}
          onChange={onChange}
          options={["Active", "Inactive"]}
        />

        {/* Upload Photo */}
        <div className="md:col-span-2">
          <label className="mb-2 block font-medium dark:text-white">
            Employee Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="w-full rounded-lg border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

          {form.photo && (
            <img
              src={form.photo}
              alt="Preview"
              className="mt-4 h-24 w-24 rounded-full border object-cover"
            />
          )}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block font-medium dark:text-white">
          Address
        </label>

        <textarea
          rows={3}
          name="address"
          value={form.address}
          onChange={onChange}
          className="w-full rounded-lg border p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
        <option value="">Select {label}</option>

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