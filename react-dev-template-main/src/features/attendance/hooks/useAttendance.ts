import { useMemo, useState } from "react"

import type { Attendance } from "../types"

import {
  getAttendances,
  addAttendance as add,
  updateAttendance as update,
  deleteAttendance as remove,
} from "../services/attendance.service"

export function useAttendance() {
  const [attendances, setAttendances] = useState(
    getAttendances()
  )

  const [search, setSearch] = useState("")

  const filteredAttendance = useMemo(() => {
    return attendances.filter((attendance) =>
      attendance.employeeName
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [attendances, search])

  function addAttendance(attendance: Attendance) {
    add(attendance)
    setAttendances([...getAttendances()])
  }

  function updateAttendance(attendance: Attendance) {
    update(attendance)
    setAttendances([...getAttendances()])
  }

  function deleteAttendance(id: number) {
    remove(id)
    setAttendances([...getAttendances()])
  }

  return {
    attendances: filteredAttendance,
    search,
    setSearch,
    addAttendance,
    updateAttendance,
    deleteAttendance,
  }
}