package role

import "time"

// Role maps to the `roles` table, e.g. Administrator, Staff.
type Role struct {
	ID        uint       `json:"id" gorm:"primaryKey"`
	Name      string     `json:"name" gorm:"size:100;not null"`
	Slug      string     `json:"slug" gorm:"size:100;not null;uniqueIndex"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
	DeletedAt *time.Time `json:"-" gorm:"index"`
}

func (Role) TableName() string {
	return "roles"
}

// Menu maps to the `menus` table. Each menu represents one entry in the
// frontend sidebar (User, Department, Position, ...).
type Menu struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"size:100;not null"`
	Key       string    `json:"key" gorm:"column:key;size:100;not null;uniqueIndex"`
	Path      string    `json:"path" gorm:"size:150"`
	Icon      string    `json:"icon" gorm:"size:100"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (Menu) TableName() string {
	return "menus"
}

// RoleMenu is the permission matrix: for a given role + menu, which
// actions (view/create/update/delete) are allowed. This is what the FE
// uses to decide which menus/buttons to show or hide per logged-in role.
type RoleMenu struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	RoleID    uint      `json:"role_id" gorm:"not null"`
	MenuID    uint      `json:"menu_id" gorm:"not null"`
	Menu      Menu      `json:"menu" gorm:"foreignKey:MenuID"`
	CanView   bool      `json:"can_view"`
	CanCreate bool      `json:"can_create"`
	CanUpdate bool      `json:"can_update"`
	CanDelete bool      `json:"can_delete"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (RoleMenu) TableName() string {
	return "role_menus"
}
