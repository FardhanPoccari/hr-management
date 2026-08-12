export interface Employee {
  id: number
  employeeId: string
  fullName: string
  email: string
  phone: string
  gender: "Male" | "Female"
  department: string
  position: string
  hireDate: string
  salary: number
  status: "Active" | "Inactive"
  address: string

  photo: string
}