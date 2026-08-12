import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import DashboardLayout from "#/shared/components/DashboardLayout"

import CompanyCard from "#/features/settings/components/CompanyCard"
import NotificationCard from "#/features/settings/components/NotificationCard"
import SecurityCard from "#/features/settings/components/SecurityCard"
import BackupCard from "#/features/settings/components/BackupCard"
import SaveButton from "#/features/settings/components/SaveButton"

import { useSettings } from "#/features/settings/hooks/useSettings"

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
})

function SettingsPage() {
  const { settings, save } = useSettings()

  const [form, setForm] = useState(settings)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }


  function handleToggle(
    field: "emailNotification" | "browserNotification"
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  function handlePasswordChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = e.target

    if (name === "currentPassword") {
      setCurrentPassword(value)
    }

    if (name === "newPassword") {
      setNewPassword(value)
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value)
    }
  }

  function handleSave() {
    if (
      newPassword &&
      newPassword !== confirmPassword
    ) {
      alert("Confirm password does not match.")
      return
    }

    save(form)

    alert("Settings saved successfully.")
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage your application settings.
        </p>
      </div>

      <div className="space-y-6">

        <CompanyCard
          settings={form}
          onChange={handleChange}
        />


        <NotificationCard
          settings={form}
          onToggle={handleToggle}
        />

        <SecurityCard
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          onChange={handlePasswordChange}
        />

        <BackupCard />

        <SaveButton
          onSave={handleSave}
        />

      </div>

    </DashboardLayout>
  )
}