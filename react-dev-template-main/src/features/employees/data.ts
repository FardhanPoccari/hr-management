import type { Employee } from "./types"

export const employeeData: Employee[] = [
  {
    id: 1,
    employeeId: "EMP001",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "081234567890",
    gender: "Male",
    department: "IT",
    position: "Frontend Developer",
    hireDate: "2025-01-10",
    salary: 8000000,
    status: "Active",
    address: "Jakarta",
    photo: "",
  },
  {
    id: 2,
    employeeId: "EMP002",
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "081298765432",
    gender: "Female",
    department: "HR",
    position: "HR Staff",
    hireDate: "2024-06-15",
    salary: 7000000,
    status: "Active",
    address: "Bandung",
    photo: "",
  },
]