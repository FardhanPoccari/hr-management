export default function BackupCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

      <h2 className="mb-6 text-xl font-bold dark:text-white">
        Backup & Restore
      </h2>

      <div className="flex flex-wrap gap-4">

        <button
          className="rounded-xl bg-cyan-600 px-6 py-3 font-medium text-white transition hover:bg-cyan-700"
        >
          Backup Data
        </button>

        <button
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium dark:border-slate-700 dark:text-white"
        >
          Restore Data
        </button>

      </div>

    </div>
  )
}