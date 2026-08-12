package routes

import (
	"net/http"

	"hr-management-api/internal/auth"
	"hr-management-api/internal/department"
	"hr-management-api/internal/middleware"
	"hr-management-api/internal/position"
	"hr-management-api/internal/role"
	"hr-management-api/internal/user"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// RegisterRoutes wires repository -> service -> handler for every
// domain and attaches them to the given Gin router.
func RegisterRoutes(router *gin.Engine, db *gorm.DB) {
	// ---- dependency wiring -------------------------------------------------
	userRepo := user.NewRepository(db)
	userService := user.NewService(userRepo)
	userHandler := user.NewHandler(userService)

	departmentRepo := department.NewRepository(db)
	departmentService := department.NewService(departmentRepo)
	departmentHandler := department.NewHandler(departmentService)

	positionRepo := position.NewRepository(db)
	positionService := position.NewService(positionRepo)
	positionHandler := position.NewHandler(positionService)

	roleRepo := role.NewRepository(db)
	roleService := role.NewService(roleRepo)
	roleHandler := role.NewHandler(roleService)

	authService := auth.NewService(userRepo)
	authHandler := auth.NewHandler(authService)

	// ---- health check -------------------------------------------------------
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "HR Management API Running"})
	})

	v1 := router.Group("/api/v1")

	// ---- public routes -------------------------------------------------------
	v1.POST("/auth/login", authHandler.Login)

	// ---- protected routes (JWT required) -------------------------------------
	protected := v1.Group("")
	protected.Use(middleware.AuthMiddleware())
	{
		// current user's menu permissions, for FE sidebar hide/show
		protected.GET("/me/menus", roleHandler.GetMyMenus)

		users := protected.Group("/users")
		{
			users.POST("", userHandler.Create)
			users.GET("", userHandler.GetAll)
			users.GET("/:id", userHandler.GetByID)
			users.PUT("/:id", userHandler.Update)
			users.DELETE("/:id", userHandler.Delete)
		}

		departments := protected.Group("/departments")
		{
			departments.POST("", departmentHandler.Create)
			departments.GET("", departmentHandler.GetAll)
			departments.GET("/:id", departmentHandler.GetByID)
			departments.PUT("/:id", departmentHandler.Update)
			departments.DELETE("/:id", departmentHandler.Delete)
		}

		positions := protected.Group("/positions")
		{
			positions.POST("", positionHandler.Create)
			positions.GET("", positionHandler.GetAll)
			positions.GET("/:id", positionHandler.GetByID)
			positions.PUT("/:id", positionHandler.Update)
			positions.DELETE("/:id", positionHandler.Delete)
		}

		roles := protected.Group("/roles")
		{
			roles.GET("", roleHandler.GetAll)
			roles.GET("/:id/menus", roleHandler.GetMenusByRole)
		}
	}
}
