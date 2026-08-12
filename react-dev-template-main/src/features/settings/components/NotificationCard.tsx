import type { Settings } from "../types"

interface NotificationCardProps {
  settings: Settings
  onToggle: (
    name: "emailNotification" | "browserNotification"
  ) => void
}

export default function NotificationCard({
  settings,
  onToggle,
}: NotificationCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

      <h2 className="mb-6 text-xl font-bold dark:text-white">
        Notifications
      </h2>

      <div className="space-y-5">

        <label className="flex items-center justify-between">

          <div>
            <p className="font-semibold dark:text-white">
              Email Notification
            </p>

            <p className="text-sm text-slate-500">
              Receive updates by email.
            </p>
          </div>

          <input
            type="checkbox"
            checked={settings.emailNotification}
            onChange={() =>
              onToggle("emailNotification")
            }
          />

        </label>

        <label className="flex items-center justify-between">

          <div>
            <p className="font-semibold dark:text-white">
              Browser Notification
            </p>

            <p className="text-sm text-slate-500">
              Receive browser notifications.
            </p>
          </div>

          <input
            type="checkbox"
            checked={settings.browserNotification}
            onChange={() =>
              onToggle("browserNotification")
            }
          />

        </label>

      </div>

    </div>
  )
}