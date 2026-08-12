package role

import "errors"

// MenuPermission is the flattened shape returned to the frontend for
// each menu item, e.g.:
// { "key": "user", "name": "User Management", "path": "/users", "can_view": true, ... }
type MenuPermission struct {
	MenuID    uint   `json:"menu_id"`
	Key       string `json:"key"`
	Name      string `json:"name"`
	Path      string `json:"path"`
	Icon      string `json:"icon"`
	CanView   bool   `json:"can_view"`
	CanCreate bool   `json:"can_create"`
	CanUpdate bool   `json:"can_update"`
	CanDelete bool   `json:"can_delete"`
}

type Service interface {
	GetAllRoles() ([]Role, error)
	GetMenusByRoleID(roleID uint) ([]MenuPermission, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{repo: repo}
}

func (s *service) GetAllRoles() ([]Role, error) {
	return s.repo.FindAllRoles()
}

func (s *service) GetMenusByRoleID(roleID uint) ([]MenuPermission, error) {
	if _, err := s.repo.FindRoleByID(roleID); err != nil {
		return nil, errors.New("role not found")
	}

	roleMenus, err := s.repo.FindMenusByRoleID(roleID)
	if err != nil {
		return nil, err
	}

	permissions := make([]MenuPermission, 0, len(roleMenus))
	for _, rm := range roleMenus {
		// Menus with no view access are skipped entirely so the FE can
		// simply render whatever comes back in this list as the sidebar.
		if !rm.CanView {
			continue
		}
		permissions = append(permissions, MenuPermission{
			MenuID:    rm.MenuID,
			Key:       rm.Menu.Key,
			Name:      rm.Menu.Name,
			Path:      rm.Menu.Path,
			Icon:      rm.Menu.Icon,
			CanView:   rm.CanView,
			CanCreate: rm.CanCreate,
			CanUpdate: rm.CanUpdate,
			CanDelete: rm.CanDelete,
		})
	}

	return permissions, nil
}
