package user

// CreateRequest is the payload for POST /users
type CreateRequest struct {
	Name         string `json:"name" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Password     string `json:"password" binding:"required,min=6"`
	RoleID       uint   `json:"role_id" binding:"required"`
	DepartmentID *uint  `json:"department_id"`
	PositionID   *uint  `json:"position_id"`
}

// UpdateRequest is the payload for PUT /users/:id
// Password is optional here: leave it blank to keep the current password.
type UpdateRequest struct {
	Name         string `json:"name" binding:"required"`
	Email        string `json:"email" binding:"required,email"`
	Password     string `json:"password" binding:"omitempty,min=6"`
	RoleID       uint   `json:"role_id" binding:"required"`
	DepartmentID *uint  `json:"department_id"`
	PositionID   *uint  `json:"position_id"`
}
