package user

import (
	"errors"

	"hr-management-api/pkg/hash"
)

type Service interface {
	Create(req CreateRequest) (*User, error)
	GetAll(search string, page, limit int) ([]User, int64, error)
	GetByID(id uint) (*User, error)
	Update(id uint, req UpdateRequest) (*User, error)
	Delete(id uint) error
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo: repo}
}

func (s *service) Create(req CreateRequest) (*User, error) {
	if !s.repo.RoleExists(req.RoleID) {
		return nil, errors.New("role not found")
	}

	if _, err := s.repo.FindByEmail(req.Email); err == nil {
		return nil, errors.New("email already registered")
	}

	hashedPassword, err := hash.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}

	u := &User{
		Name:         req.Name,
		Email:        req.Email,
		Password:     hashedPassword,
		RoleID:       req.RoleID,
		DepartmentID: req.DepartmentID,
		PositionID:   req.PositionID,
	}

	if err := s.repo.Create(u); err != nil {
		return nil, err
	}

	return s.repo.FindByID(u.ID)
}

func (s *service) GetAll(search string, page, limit int) ([]User, int64, error) {
	if page < 1 {
		page = 1
	}
	if limit < 1 {
		limit = 10
	}
	return s.repo.FindAll(search, page, limit)
}

func (s *service) GetByID(id uint) (*User, error) {
	u, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("user not found")
	}
	return u, nil
}

func (s *service) Update(id uint, req UpdateRequest) (*User, error) {
	u, err := s.repo.FindByID(id)
	if err != nil {
		return nil, errors.New("user not found")
	}

	if !s.repo.RoleExists(req.RoleID) {
		return nil, errors.New("role not found")
	}

	if req.Email != u.Email {
		if existing, err := s.repo.FindByEmail(req.Email); err == nil && existing.ID != u.ID {
			return nil, errors.New("email already registered")
		}
	}

	u.Name = req.Name
	u.Email = req.Email
	u.RoleID = req.RoleID
	u.DepartmentID = req.DepartmentID
	u.PositionID = req.PositionID

	if req.Password != "" {
		hashedPassword, err := hash.HashPassword(req.Password)
		if err != nil {
			return nil, err
		}
		u.Password = hashedPassword
	}

	if err := s.repo.Update(u); err != nil {
		return nil, err
	}

	return s.repo.FindByID(u.ID)
}

func (s *service) Delete(id uint) error {
	if _, err := s.repo.FindByID(id); err != nil {
		return errors.New("user not found")
	}
	return s.repo.Delete(id)
}
