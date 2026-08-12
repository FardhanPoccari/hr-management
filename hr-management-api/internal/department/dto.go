package department

// CreateRequest is the payload for POST /departments
type CreateRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
}

// UpdateRequest is the payload for PUT /departments/:id
type UpdateRequest struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description"`
}
