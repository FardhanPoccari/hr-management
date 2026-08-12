package main

import (
	"net/http"

	"hr-management-api/config"
	"hr-management-api/internal/middleware"
	"hr-management-api/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDatabase()

	router := gin.Default()

	router.Use(middleware.CORSMiddleware())

	// Explicitly handle preflight (OPTIONS) requests for every path
	router.OPTIONS("/*any", func(c *gin.Context) {
		c.Status(http.StatusNoContent)
	})

	routes.RegisterRoutes(router, config.DB)

	router.Run(":8080")
}