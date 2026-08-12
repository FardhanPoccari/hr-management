import type { Attendance } from "../types"
import { attendanceData } from "../data"

let attendances: Attendance[] = [...attendanceData]

export function getAttendances() {
  return attendances
}

export function getAttendance(id: number) {
  return attendances.find(
    (attendance) => attendance.id === id
  )
}

export function addAttendance(attendance: Attendance) {
  attendances.push(attendance)
}

export function updateAttendance(updated: Attendance) {
  attendances = attendances.map((attendance) =>
    attendance.id === updated.id
      ? updated
      : attendance
  )
}

export function deleteAttendance(id: number) {
  attendances = attendances.filter(
    (attendance) => attendance.id !== id
  )
}