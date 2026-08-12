import type React from "react"

import type { Settings } from "../types"

interface CompanyCardProps {
  settings: Settings
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}

export default function CompanyCard({
  settings,
  onChange,
}: CompanyCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

      <h2 className="mb-6 text-xl font-bold dark:text-white">
        Company Information
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <Input
          label="Company Name"
          name="companyName"
          value={settings.companyName}
          onChange={onChange}
        />

        <Input
          label="Company Email"
          name="companyEmail"
          value={settings.companyEmail}
          onChange={onChange}
          type="email"
        />

        <Input
          label="Company Phone"
          name="companyPhone"
          value={settings.companyPhone}
          onChange={onChange}
        />

      </div>

      <div className="mt-5">
        <label className="mb-2 block font-medium dark:text-white">
          Company Address
        </label>

        <textarea
          rows={4}
          name="companyAddress"
          value={settings.companyAddress}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
        className="w-full rounded-xl border border-slate-300 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      />
    </div>
  )
}