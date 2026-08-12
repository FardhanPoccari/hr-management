interface SaveButtonProps {
  onSave: () => void
}

export default function SaveButton({
  onSave,
}: SaveButtonProps) {
  return (
    <div className="flex justify-end">
      <button
        onClick={onSave}
        className="rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-700"
      >
        Save Settings
      </button>
    </div>
  )
}