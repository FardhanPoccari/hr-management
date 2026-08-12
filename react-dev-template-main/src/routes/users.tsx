import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import DashboardLayout from "#/shared/components/DashboardLayout"

import UserTable from "#/features/users/components/UserTable"
import UserToolbar from "#/features/users/components/UserToolbar"
import UserModal from "#/features/users/components/UserModal"

import { useUsers } from "#/features/users/hooks/useUsers"
import type { User } from "#/features/users/types"

export const Route = createFileRoute("/users")({
  component: UsersPage,
})

function UsersPage() {
  const {
    users,
    roles,
    departments,
    positions,
    search,
    setSearch,
    addUser,
    updateUser,
    deleteUser,
  } = useUsers()

  const [openModal, setOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Users</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage all user accounts and their access.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg transition-colors dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold dark:text-white">User List</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Total User: {users.length}
            </p>
          </div>
        </div>

        <UserToolbar
          search={search}
          onSearchChange={setSearch}
          onAdd={() => {
            setSelectedUser(null)
            setOpenModal(true)
          }}
        />

        <UserTable
          data={users}
          onEdit={(user) => {
            setSelectedUser(user)
            setOpenModal(true)
          }}
          onDelete={(user) => {
            if (confirm(`Delete user "${user.name}"?`)) {
              deleteUser(user.id)
            }
          }}
        />
      </div>

      <UserModal
        open={openModal}
        user={selectedUser}
        roles={roles}
        departments={departments}
        positions={positions}
        onClose={() => {
          setOpenModal(false)
          setSelectedUser(null)
        }}
        onSave={(data) => {
          if (selectedUser) {
            updateUser(selectedUser.id, data)
          } else {
            addUser(data)
          }

          setOpenModal(false)
          setSelectedUser(null)
        }}
      />
    </DashboardLayout>
  )
}
