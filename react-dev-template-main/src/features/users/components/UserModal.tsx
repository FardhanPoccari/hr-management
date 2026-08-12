import type { User, UserRole } from "../types"
import type { UserFormData } from "../services/user.service"
import type { Department } from "#/features/departments/types"
import type { Position } from "#/features/positions/types"
import UserForm from "./UserForm"

interface Props {
  open: boolean
  user: User | null
  roles: UserRole[]
  departments: Department[]
  positions: Position[]
  onClose: () => void
  onSave: (data: UserFormData) => void
}

export default function UserModal({
  open,
  user,
  roles,
  departments,
  positions,
  onClose,
  onSave,
}: Props) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold dark:text-white">
            {user ? "Edit User" : "Add User"}
          </h2>

          <button onClick={onClose} className="text-2xl dark:text-white">
            ×
          </button>
        </div>

        <UserForm
          user={user}
          roles={roles}
          departments={departments}
          positions={positions}
          onCancel={onClose}
          onSave={onSave}
        />
      </div>
    </div>
  )
}
