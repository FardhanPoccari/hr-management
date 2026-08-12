package position

import "errors"

type Service interface {
	Create(req CreateRequest) (*Position, error)
	GetAll(search string, page, limit int) ([]Position, int64, error)
	GetByID(id uint) (*Position, error)
	Update(id uint, req UpdateRequest) (*Position, error)
	Delete(id uint) error
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo: repo}
}

func (s *service) Create(req CreateRequest) (*Position, error) {
	if !s.repo.DepartmentExists(req.DepartmentID) {
		return nil, errors.New("department not found")
	}

	pos := &Position{
		Name:         req.Name,
		DepartmentID: req.DepartmentID,
	}
	if err := s.repo.Create(pos); err != nil {
		return nil, err
	}
	return s.repo.FindByID(pos.ID)
}

func (s *service) GetAll(search string, page, limit int) ([]Position, int64, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 10
	}
	return s.repo.FindAll(search, page, limit)
}

func (s *service) GetByID(id uint) (*Position, error) {
	pos, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("position not found")
	}
	return pos, nil
}

func (s *service) Update(id uint, req UpdateRequest) (*Position, error) {
	pos, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("position not found")
	}

	if !s.repo.DepartmentExists(req.DepartmentID) {
		return nil, errors.New("department not found")
	}

	pos.Name = req.Name
	pos.DepartmentID = req.DepartmentID

	if err := s.repo.Update(pos); err != nil {
		return nil, err
	}
	return s.repo.FindByID(pos.ID)
}

func (s *service) Delete(id uint) error {
	if _, err := s.repo.FindByID(id); err != nil {
		return errors.New("position not found")
	}
	return s.repo.Delete(id)
}
