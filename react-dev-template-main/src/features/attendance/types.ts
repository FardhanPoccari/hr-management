export interface Attendance {
  id: number

  employeeId: string

  employeeName: string

  department: string

  checkIn: string

  checkOut: string

  date: string

  status:
    | "Present"
    | "Late"
    | "Absent"
    | "Leave"
    | "Sick"

  notes: string
}