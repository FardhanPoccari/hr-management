package role

import "gorm.io/gorm"

type Repository interface {
	FindAllRoles() ([]Role, error)
	FindRoleByID(id uint) (*Role, error)
	FindMenusByRoleID(roleID uint) ([]RoleMenu, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}

func (r *repository) FindAllRoles() ([]Role, error) {
	var roles []Role
	if err := r.db.Order("id ASC").Find(&roles).Error; err != nil {
		return nil, err
	}
	return roles, nil
}

func (r *repository) FindRoleByID(id uint) (*Role, error) {
	var role Role
	if err := r.db.First(&role, id).Error; err != nil {
		return nil, err
	}
	return &role, nil
}

// FindMenusByRoleID returns every menu with its permission flags for a
// given role. This is exactly the "menus visible/allowed to this role"
// list the frontend needs to hide/show sidebar items and buttons.
func (r *repository) FindMenusByRoleID(roleID uint) ([]RoleMenu, error) {
	var roleMenus []RoleMenu
	if err := r.db.Preload("Menu").Where("role_id = ?", roleID).Find(&roleMenus).Error; err != nil {
		return nil, err
	}
	return roleMenus, nil
}
