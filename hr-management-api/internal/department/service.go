package department

import "errors"

type Service interface {
	Create(req CreateRequest) (*Department, error)
	GetAll(search string, page, limit int) ([]Department, int64, error)
	GetByID(id uint) (*Department, error)
	Update(id uint, req UpdateRequest) (*Department, error)
	Delete(id uint) error
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo: repo}
}

func (s *service) Create(req CreateRequest) (*Department, error) {
	dept := &Department{
		Name:        req.Name,
		Description: req.Description,
	}
	if err := s.repo.Create(dept); err != nil {
		return nil, err
	}
	return dept, nil
}

func (s *service) GetAll(search string, page, limit int) ([]Department, int64, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 10
	}
	return s.repo.FindAll(search, page, limit)
}

func (s *service) GetByID(id uint) (*Department, error) {
	dept, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("department not found")
	}
	return dept, nil
}

func (s *service) Update(id uint, req UpdateRequest) (*Department, error) {
	dept, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("department not found")
	}

	dept.Name = req.Name
	dept.Description = req.Description

	if err := s.repo.Update(dept); err != nil {
		return nil, err
	}
	return dept, nil
}

func (s *service) Delete(id uint) error {
	if _, err := s.repo.FindByID(id); err != nil {
		return errors.New("department not found")
	}
	return s.repo.Delete(id)
}
