import { useEffect, useState } from "react"

import type { User, UserRole } from "../types"
import type { UserFormData } from "../services/user.service"
import type { Department } from "#/features/departments/types"
import type { Position } from "#/features/positions/types"

interface Props {
  user: User | null
  roles: UserRole[]
  departments: Department[]
  positions: Position[]

  onSave: (data: UserFormData) => void
  onCancel: () => void
}

export default function UserForm({
  user,
  roles,
  departments,
  positions,
  onSave,
  onCancel,
}: Props) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [roleId, setRoleId] = useState<number | "">("")
  const [departmentId, setDepartmentId] = useState<number | "">("")
  const [positionId, setPositionId] = useState<number | "">("")

  useEffect(() => {
    if (user) {
      setName(user.name)
      setEmail(user.email)
      setPassword("")
      setRoleId(user.roleId)
      setDepartmentId(user.departmentId ?? "")
      setPositionId(user.positionId ?? "")
    } else {
      setName("")
      setEmail("")
      setPassword("")
      setRoleId("")
      setDepartmentId("")
      setPositionId("")
    }
  }, [user])

  function handleSubmit() {
    if (!name.trim() || !email.trim() || !roleId) {
      alert("Name, email, and role are required")
      return
    }

    if (!user && !password.trim()) {
      alert("Password is required for a new user")
      return
    }

    onSave({
      name,
      email,
      password: password.trim() ? password : undefined,
      roleId: Number(roleId),
      departmentId: departmentId ? Number(departmentId) : null,
      positionId: positionId ? Number(positionId) : null,
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block font-medium dark:text-white">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium dark:text-white">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="john@mail.com"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium dark:text-white">
          Password {user && <span className="text-sm text-slate-400">(leave blank to keep current)</span>}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          placeholder="••••••"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium dark:text-white">Role</label>
        <select
          value={roleId}
          onChange={(e) => setRoleId(Number(e.target.value))}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">Select role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium dark:text-white">Department (optional)</label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value ? Number(e.target.value) : "")}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">None</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium dark:text-white">Position (optional)</label>
        <select
          value={positionId}
          onChange={(e) => setPositionId(e.target.value ? Number(e.target.value) : "")}
          className="w-full rounded-lg border px-4 py-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        >
          <option value="">None</option>
          {positions.map((pos) => (
            <option key={pos.id} value={pos.id}>
              {pos.name}
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
          className="rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700"
        >
          {user ? "Update User" : "Save User"}
        </button>
      </div>
    </div>
  )
}
