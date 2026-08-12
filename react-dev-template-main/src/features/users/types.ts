export interface UserRole {
  id: number
  name: string
  slug: string
}

export interface User {
  id: number
  name: string
  email: string
  roleId: number
  roleName: string
  departmentId: number | null
  departmentName: string
  positionId: number | null
  positionName: string
  createdAt: string
}
