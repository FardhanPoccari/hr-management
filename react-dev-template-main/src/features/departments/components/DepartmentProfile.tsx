import type { Department } from "../types"

interface Props {
  department: Department
  totalEmployees: number
}

export default function DepartmentProfile({
  department,
  totalEmployees,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900">

      <div className="flex flex-col items-center">

        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-cyan-600 text-5xl text-white">
          🏢
        </div>

        <h1 className="mt-5 text-3xl font-bold dark:text-white">
          {department.name}
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Department Information
        </p>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <Info
          title="Department Name"
          value={department.name}
        />

        <Info
          title="Created"
          value={department.createdAt}
        />

        <Info
          title="Total Employees"
          value={totalEmployees.toString()}
        />

      </div>

      <div className="mt-8">

        <h3 className="mb-2 text-lg font-semibold dark:text-white">
          Description
        </h3>

        <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800 dark:text-white">
          {department.description}
        </div>

      </div>

    </div>
  )
}

interface InfoProps {
  title: string
  value: string
}

function Info({
  title,
  value,
}: InfoProps) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-lg font-semibold dark:text-white">
        {value}
      </p>
    </div>
  )
}