package main

import (
	"fmt"
	"net/http"
	"os"

	"hr-management-api/config"
	"hr-management-api/internal/database"
	"hr-management-api/internal/middleware"
	"hr-management-api/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.ConnectDatabase()

	// Seed default administrator
	if err := database.SeedAdminUser(config.DB); err != nil {
		fmt.Printf("❌ Failed to seed admin user: %v\n", err)
		os.Exit(1)
	}

	router := gin.Default()

	router.Use(middleware.CORSMiddleware())

	router.OPTIONS("/*any", func(c *gin.Context) {
		c.Status(http.StatusNoContent)
	})

	routes.RegisterRoutes(router, config.DB)

	router.Run(":8080")
}