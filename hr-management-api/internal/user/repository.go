package user

import "gorm.io/gorm"

type Repository interface {
	Create(u *User) error
	FindAll(search string, page, limit int) ([]User, int64, error)
	FindByID(id uint) (*User, error)
	FindByEmail(email string) (*User, error)
	Update(u *User) error
	Delete(id uint) error
	RoleExists(roleID uint) bool
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}

func (r *repository) Create(u *User) error {
	return r.db.Create(u).Error
}

func (r *repository) FindAll(search string, page, limit int) ([]User, int64, error) {
	var users []User
	var total int64

	baseQuery := r.db.Model(&User{})
	if search != "" {
		baseQuery = baseQuery.Where("name LIKE ? OR email LIKE ?", "%"+search+"%", "%"+search+"%")
	}

	if err := baseQuery.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit
	query := r.db.Model(&User{}).Preload("Role").Preload("Department").Preload("Position")
	if search != "" {
		query = query.Where("name LIKE ? OR email LIKE ?", "%"+search+"%", "%"+search+"%")
	}
	if err := query.Order("id DESC").Offset(offset).Limit(limit).Find(&users).Error; err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

func (r *repository) FindByID(id uint) (*User, error) {
	var u User
	if err := r.db.Preload("Role").Preload("Department").Preload("Position").First(&u, id).Error; err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *repository) FindByEmail(email string) (*User, error) {
	var u User
	if err := r.db.Preload("Role").Where("email = ?", email).First(&u).Error; err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *repository) Update(u *User) error {
	return r.db.Save(u).Error
}

func (r *repository) Delete(id uint) error {
	return r.db.Delete(&User{}, id).Error
}

func (r *repository) RoleExists(roleID uint) bool {
	var count int64
	r.db.Table("roles").Where("id = ? AND deleted_at IS NULL", roleID).Count(&count)
	return count > 0
}
