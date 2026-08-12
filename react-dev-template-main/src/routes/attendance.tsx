import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"

import DashboardLayout from "#/shared/components/DashboardLayout"

import AttendanceTable from "#/features/attendance/components/AttendanceTable"
import AttendanceToolbar from "#/features/attendance/components/AttendanceToolbar"
import AttendanceModal from "#/features/attendance/components/AttendanceModal"

import { useAttendance } from "#/features/attendance/hooks/useAttendance"

import type { Attendance } from "#/features/attendance/types"

export const Route = createFileRoute("/attendance")({
  component: AttendancePage,
})

function AttendancePage() {
  const {
    attendances,
    search,
    setSearch,
    addAttendance,
    updateAttendance,
    deleteAttendance,
  } = useAttendance()

  const [selectedAttendance, setSelectedAttendance] =
    useState<Attendance | null>(null)

  const [openModal, setOpenModal] = useState(false)

  const [status, setStatus] = useState("")
  const [date, setDate] = useState("")

  function handleClose() {
    setSelectedAttendance(null)
    setOpenModal(false)
  }

  function handleSave(attendance: Attendance) {
    if (selectedAttendance) {
      updateAttendance(attendance)
    } else {
      addAttendance(attendance)
    }

    handleClose()
  }

  const filteredAttendance = attendances.filter((attendance) => {
    const matchStatus =
      !status || attendance.status === status

    const matchDate =
      !date || attendance.date === date

    return matchStatus && matchDate
  })

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          Attendance
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Manage employee attendance records.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">

        <div className="mb-6">

          <h2 className="text-xl font-semibold dark:text-white">
            Attendance List
          </h2>

          <p className="text-sm text-slate-500">
            Total Attendance : {filteredAttendance.length}
          </p>

        </div>

        <AttendanceToolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          date={date}
          onDateChange={setDate}
          onAdd={() => {
            setSelectedAttendance(null)
            setOpenModal(true)
          }}
        />

        <AttendanceTable
          attendances={filteredAttendance}
          onEdit={(attendance) => {
            setSelectedAttendance(attendance)
            setOpenModal(true)
          }}
          onDelete={(attendance) => {
            if (
              window.confirm(
                `Delete attendance for "${attendance.employeeName}"?`
              )
            ) {
              deleteAttendance(attendance.id)
            }
          }}
        />

      </div>

      <AttendanceModal
        open={openModal}
        attendance={selectedAttendance}
        onClose={handleClose}
        onSave={handleSave}
      />

    </DashboardLayout>
  )
}