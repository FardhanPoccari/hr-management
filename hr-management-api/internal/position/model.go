package position

import (
	"time"

	"hr-management-api/internal/department"
)

// Position maps to the `positions` table. Each position belongs to a
// single department.
type Position struct {
	ID           uint                  `json:"id" gorm:"primaryKey"`
	Name         string                `json:"name" gorm:"size:150;not null"`
	DepartmentID uint                  `json:"department_id" gorm:"not null"`
	Department   department.Department `json:"department" gorm:"foreignKey:DepartmentID"`
	CreatedAt    time.Time             `json:"created_at"`
	UpdatedAt    time.Time             `json:"updated_at"`
	DeletedAt    *time.Time            `json:"-" gorm:"index"`
}

func (Position) TableName() string {
	return "positions"
}
