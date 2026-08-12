package position

import "gorm.io/gorm"

type Repository interface {
	Create(pos *Position) error
	FindAll(search string, page, limit int) ([]Position, int64, error)
	FindByID(id uint) (*Position, error)
	Update(pos *Position) error
	Delete(id uint) error
	DepartmentExists(departmentID uint) bool
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}

func (r *repository) Create(pos *Position) error {
	return r.db.Create(pos).Error
}

func (r *repository) FindAll(search string, page, limit int) ([]Position, int64, error) {
	var positions []Position
	var total int64

	query := r.db.Model(&Position{}).Preload("Department")
	if search != "" {
		query = query.Where("name LIKE ?", "%"+search+"%")
	}

	countQuery := r.db.Model(&Position{})
	if search != "" {
		countQuery = countQuery.Where("name LIKE ?", "%"+search+"%")
	}
	if err := countQuery.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit
	if err := query.Order("id DESC").Offset(offset).Limit(limit).Find(&positions).Error; err != nil {
		return nil, 0, err
	}

	return positions, total, nil
}

func (r *repository) FindByID(id uint) (*Position, error) {
	var pos Position
	if err := r.db.Preload("Department").First(&pos, id).Error; err != nil {
		return nil, err
	}
	return &pos, nil
}

func (r *repository) Update(pos *Position) error {
	return r.db.Save(pos).Error
}

func (r *repository) Delete(id uint) error {
	return r.db.Delete(&Position{}, id).Error
}

func (r *repository) DepartmentExists(departmentID uint) bool {
	var count int64
	r.db.Table("departments").Where("id = ? AND deleted_at IS NULL", departmentID).Count(&count)
	return count > 0
}
