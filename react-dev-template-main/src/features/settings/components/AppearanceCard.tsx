export default function AppearanceCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

      <h2 className="mb-6 text-xl font-bold dark:text-white">
        Application Information
      </h2>

      <div className="space-y-5">

        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-700">
          <span className="font-medium dark:text-white">
            Application Name
          </span>

          <span className="text-slate-500">
            HR Management System
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-700">
          <span className="font-medium dark:text-white">
            Version
          </span>

          <span className="text-slate-500">
            v1.0.0
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-700">
          <span className="font-medium dark:text-white">
            Framework
          </span>

          <span className="text-slate-500">
            React + TanStack Router
          </span>
        </div>

        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-700">
          <span className="font-medium dark:text-white">
            Backend
          </span>

          <span className="text-slate-500">
            PHP REST API
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium dark:text-white">
            Database
          </span>

          <span className="text-slate-500">
            MySQL
          </span>
        </div>

      </div>

    </div>
  )
}