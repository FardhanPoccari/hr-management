package position

// CreateRequest is the payload for POST /positions
type CreateRequest struct {
	Name         string `json:"name" binding:"required"`
	DepartmentID uint   `json:"department_id" binding:"required"`
}

// UpdateRequest is the payload for PUT /positions/:id
type UpdateRequest struct {
	Name         string `json:"name" binding:"required"`
	DepartmentID uint   `json:"department_id" binding:"required"`
}
