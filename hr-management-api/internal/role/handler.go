package role

import (
	"net/http"
	"strconv"

	"hr-management-api/pkg/response"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service: service}
}

// GetAll godoc
// GET /api/v1/roles
func (h *Handler) GetAll(c *gin.Context) {
	roles, err := h.service.GetAllRoles()
	if err != nil {
		response.Error(c, http.StatusInternalServerError, err.Error())
		return
	}
	response.Success(c, http.StatusOK, "Roles retrieved successfully", roles)
}

// GetMenusByRole godoc
// GET /api/v1/roles/:id/menus
func (h *Handler) GetMenusByRole(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		response.Error(c, http.StatusBadRequest, "Invalid role id")
		return
	}

	menus, err := h.service.GetMenusByRoleID(uint(id))
	if err != nil {
		response.Error(c, http.StatusNotFound, err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Menus retrieved successfully", menus)
}

// GetMyMenus godoc
// GET /api/v1/me/menus  (uses role_id from the JWT of the currently logged in user)
func (h *Handler) GetMyMenus(c *gin.Context) {
	roleIDRaw, exists := c.Get("role_id")
	if !exists {
		response.Error(c, http.StatusUnauthorized, "Role information not found")
		return
	}

	roleID, ok := roleIDRaw.(uint)
	if !ok {
		response.Error(c, http.StatusInternalServerError, "Invalid role id in token")
		return
	}

	menus, err := h.service.GetMenusByRoleID(roleID)
	if err != nil {
		response.Error(c, http.StatusNotFound, err.Error())
		return
	}

	response.Success(c, http.StatusOK, "Menus retrieved successfully", menus)
}
