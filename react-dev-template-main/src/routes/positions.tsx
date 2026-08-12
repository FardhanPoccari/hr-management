import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

import DashboardLayout from "#/shared/components/DashboardLayout"

import PositionTable from "#/features/positions/components/PositionTable"
import PositionToolbar from "#/features/positions/components/PositionToolbar"
import PositionModal from "#/features/positions/components/PositionModal"

import { usePosition } from "#/features/positions/hooks/usePosition"
import type { Position } from "#/features/positions/types"

export const Route = createFileRoute("/positions")({
  component: PositionsPage,
})

function PositionsPage() {
  const { positions, departments, addPosition, updatePosition, deletePosition } =
    usePosition()

  const [open, setOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null)
  const [search, setSearch] = useState("")

  const filteredPositions = positions.filter(
    (position) =>
      position.name.toLowerCase().includes(search.toLowerCase()) ||
      position.departmentName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Positions</h1>
        <p className="mb-6 text-slate-500 dark:text-slate-400">Manage company positions</p>

        <PositionToolbar
          search={search}
          onSearchChange={setSearch}
          onAdd={() => {
            setSelectedPosition(null)
            setOpen(true)
          }}
        />
      </div>

      <PositionTable
        data={filteredPositions}
        onEdit={(position) => {
          setSelectedPosition(position)
          setOpen(true)
        }}
        onDelete={(position) => {
          const confirmDelete = window.confirm(`Delete position "${position.name}"?`)
          if (confirmDelete) {
            deletePosition(position.id)
          }
        }}
      />

      <PositionModal
        open={open}
        position={selectedPosition}
        departments={departments}
        onClose={() => {
          setOpen(false)
          setSelectedPosition(null)
        }}
        onSave={(data) => {
          if (selectedPosition) {
            updatePosition(selectedPosition.id, data)
          } else {
            addPosition(data)
          }

          setOpen(false)
          setSelectedPosition(null)
        }}
      />
    </DashboardLayout>
  )
}
