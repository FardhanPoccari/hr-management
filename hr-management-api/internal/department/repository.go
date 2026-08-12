package department

import "gorm.io/gorm"

type Repository interface {
	Create(dept *Department) error
	FindAll(search string, page, limit int) ([]Department, int64, error)
	FindByID(id uint) (*Department, error)
	Update(dept *Department) error
	Delete(id uint) error
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}

func (r *repository) Create(dept *Department) error {
	return r.db.Create(dept).Error
}

func (r *repository) FindAll(search string, page, limit int) ([]Department, int64, error) {
	var departments []Department
	var total int64

	query := r.db.Model(&Department{})
	if search != "" {
		query = query.Where("name LIKE ?", "%"+search+"%")
	}

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	offset := (page - 1) * limit
	if err := query.Order("id DESC").Offset(offset).Limit(limit).Find(&departments).Error; err != nil {
		return nil, 0, err
	}

	return departments, total, nil
}

func (r *repository) FindByID(id uint) (*Department, error) {
	var dept Department
	if err := r.db.First(&dept, id).Error; err != nil {
		return nil, err
	}
	return &dept, nil
}

func (r *repository) Update(dept *Department) error {
	return r.db.Save(dept).Error
}

func (r *repository) Delete(id uint) error {
	return r.db.Delete(&Department{}, id).Error
}
