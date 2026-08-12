package auth

// LoginRequest is the payload for POST /auth/login
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// LoginResponse is what the frontend receives after a successful login.
// It stores this token in localStorage and attaches it as
// "Authorization: Bearer <token>" on every subsequent request.
type LoginResponse struct {
	Token string      `json:"token"`
	User  UserSummary `json:"user"`
}

// UserSummary is the minimal profile info returned alongside the token,
// enough for the FE to greet the user and know their role right away.
type UserSummary struct {
	ID       uint   `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	RoleID   uint   `json:"role_id"`
	RoleName string `json:"role_name"`
	RoleSlug string `json:"role_slug"`
}
