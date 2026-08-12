  import type { Employee } from "../types"
  import EmployeeAvatar from "./EmployeeAvatar"

  interface Props {
    employee: Employee
  }

  export default function EmployeeProfile({
    employee,
  }: Props) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-slate-900">

        <div className="flex flex-col items-center">

          <EmployeeAvatar
            name={employee.fullName}
            photo={employee.photo}
          />

          <h1 className="mt-5 text-3xl font-bold dark:text-white">
            {employee.fullName}
          </h1>

          <p className="text-slate-500">
            {employee.position}
          </p>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          <Info
            title="Employee ID"
            value={employee.employeeId}
          />

          <Info
            title="Department"
            value={employee.department}
          />

          <Info
            title="Email"
            value={employee.email}
          />

          <Info
            title="Phone"
            value={employee.phone}
          />

          <Info
            title="Gender"
            value={employee.gender}
          />

          <Info
            title="Hire Date"
            value={employee.hireDate}
          />

          <Info
            title="Salary"
            value={`Rp ${employee.salary.toLocaleString("id-ID")}`}
          />

          <Info
            title="Status"
            value={employee.status}
          />

        </div>

        <div className="mt-8">

          <h3 className="mb-2 text-lg font-semibold dark:text-white">
            Address
          </h3>

          <div className="rounded-xl bg-slate-100 p-4 dark:bg-slate-800 dark:text-white">
            {employee.address}
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