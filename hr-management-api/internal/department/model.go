package department

import "time"

// Department maps to the `departments` table.
type Department struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	Name        string     `json:"name" gorm:"size:150;not null"`
	Description string     `json:"description" gorm:"size:255"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	DeletedAt   *time.Time `json:"-" gorm:"index"`
}

func (Department) TableName() string {
	return "departments"
}
