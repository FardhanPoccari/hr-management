package user

import (
	"time"

	"hr-management-api/internal/department"
	"hr-management-api/internal/position"
	"hr-management-api/internal/role"
)

// User maps to the `users` table.
type User struct {
	ID           uint                   `json:"id" gorm:"primaryKey"`
	Name         string                 `json:"name" gorm:"size:150;not null"`
	Email        string                 `json:"email" gorm:"size:150;not null;uniqueIndex"`
	Password     string                 `json:"-" gorm:"size:255;not null"`
	RoleID       uint                   `json:"role_id" gorm:"not null"`
	Role         role.Role              `json:"role" gorm:"foreignKey:RoleID"`
	DepartmentID *uint                  `json:"department_id"`
	Department   *department.Department `json:"department" gorm:"foreignKey:DepartmentID"`
	PositionID   *uint                  `json:"position_id"`
	Position     *position.Position     `json:"position" gorm:"foreignKey:PositionID"`
	CreatedAt    time.Time              `json:"created_at"`
	UpdatedAt    time.Time              `json:"updated_at"`
	DeletedAt    *time.Time             `json:"-" gorm:"index"`
}

func (User) TableName() string {
	return "users"
}
