package middleware

import (
	"net/http"
	"strings"

	"hr-management-api/pkg/jwtutil"
	"hr-management-api/pkg/response"

	"github.com/gin-gonic/gin"
)

// AuthMiddleware validates the "Authorization: Bearer <token>" header and,
// on success, stores user_id / role_id / role_slug in the Gin context so
// downstream handlers (and RoleRequired) can use them.
func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			response.Error(c, http.StatusUnauthorized, "Authorization header is required")
			c.Abort()
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			response.Error(c, http.StatusUnauthorized, "Authorization header format must be Bearer <token>")
			c.Abort()
			return
		}

		claims, err := jwtutil.ValidateToken(parts[1])
		if err != nil {
			response.Error(c, http.StatusUnauthorized, "Invalid or expired token")
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("email", claims.Email)
		c.Set("role_id", claims.RoleID)
		c.Set("role_slug", claims.RoleSlug)

		c.Next()
	}
}

// RoleRequired restricts a route/group to a set of allowed role slugs.
// Example: router.Use(middleware.RoleRequired("admin"))
func RoleRequired(allowedSlugs ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		roleSlug, exists := c.Get("role_slug")
		if !exists {
			response.Error(c, http.StatusForbidden, "Role information not found")
			c.Abort()
			return
		}

		for _, slug := range allowedSlugs {
			if roleSlug == slug {
				c.Next()
				return
			}
		}

		response.Error(c, http.StatusForbidden, "You don't have permission to access this resource")
		c.Abort()
	}
}
