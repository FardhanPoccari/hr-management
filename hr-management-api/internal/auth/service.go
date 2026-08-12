package auth

import (
	"errors"

	"hr-management-api/internal/user"
	"hr-management-api/pkg/hash"
	"hr-management-api/pkg/jwtutil"
)

type Service interface {
	Login(req LoginRequest) (*LoginResponse, error)
}

type service struct {
	userRepo user.Repository
}

func NewService(userRepo user.Repository) Service {
	return &service{userRepo: userRepo}
}

func (s *service) Login(req LoginRequest) (*LoginResponse, error) {
	u, err := s.userRepo.FindByEmail(req.Email)
	if err != nil {
		return nil, errors.New("invalid email or password")
	}

	if !hash.ComparePassword(u.Password, req.Password) {
		return nil, errors.New("invalid email or password")
	}

	token, err := jwtutil.GenerateToken(u.ID, u.Email, u.RoleID, u.Role.Slug)
	if err != nil {
		return nil, err
	}

	return &LoginResponse{
		Token: token,
		User: UserSummary{
			ID:       u.ID,
			Name:     u.Name,
			Email:    u.Email,
			RoleID:   u.RoleID,
			RoleName: u.Role.Name,
			RoleSlug: u.Role.Slug,
		},
	}, nil
}
