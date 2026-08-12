import type { Attendance } from "./types"

export const attendanceData: Attendance[] = [
  {
    id: 1,
    employeeId: "EMP001",
    employeeName: "John Doe",
    department: "IT",

    checkIn: "08:00",

    checkOut: "17:00",

    date: "2026-08-03",

    status: "Present",

    notes: "",
  },

  {
    id: 2,
    employeeId: "EMP002",
    employeeName: "Jane Smith",
    department: "HR",

    checkIn: "08:30",

    checkOut: "17:00",

    date: "2026-08-03",

    status: "Late",

    notes: "",
  },
]