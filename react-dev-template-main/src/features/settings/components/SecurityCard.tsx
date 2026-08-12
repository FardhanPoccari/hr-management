import type React from "react"

interface SecurityCardProps {
  currentPassword: string
  newPassword: string
  confirmPassword: string

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}

export default function SecurityCard({
  currentPassword,
  newPassword,
  confirmPassword,
  onChange,
}: SecurityCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

      <h2 className="mb-6 text-xl font-bold dark:text-white">
        Security
      </h2>

      <div className="space-y-5">

        <Input
          label="Current Password"
          name="currentPassword"
          value={currentPassword}
          onChange={onChange}
        />

        <Input
          label="New Password"
          name="newPassword"
          value={newPassword}
          onChange={onChange}
        />

        <Input
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
        />

      </div>

    </div>
  )
}

interface InputProps {
  label: string
  name: string
  value: string
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void
}

function Input({
  label,
  name,
  value,
  onChange,
}: InputProps) {
  return (
    <div>

      <label className="mb-2 block font-medium dark:text-white">
        {label}
      </label>

      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />

    </div>
  )
}