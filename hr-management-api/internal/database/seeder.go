package database

import (
	"fmt"

	"hr-management-api/internal/role"
	"hr-management-api/internal/user"
	"hr-management-api/pkg/hash"

	"gorm.io/gorm"
)

// SeedAdminUser creates a default administrator account so the
// frontend has credentials to log in with right after the migrations
// run. It's idempotent: running it again is a no-op if the admin
// email already exists.
//
// Default credentials: admin@hr-management.com / password123
func SeedAdminUser(db *gorm.DB) error {
	var adminRole role.Role
	if err := db.Where("slug = ?", "admin").First(&adminRole).Error; err != nil {
		return fmt.Errorf("admin role not found, run migrations first: %w", err)
	}

	var count int64
	db.Model(&user.User{}).Where("email = ?", "admin@hr-management.com").Count(&count)
	if count > 0 {
		fmt.Println("ℹ️  Admin user already exists, skipping seed")
		return nil
	}

	hashedPassword, err := hash.HashPassword("password123")
	if err != nil {
		return err
	}

	admin := user.User{
		Name:     "Administrator",
		Email:    "admin@hr-management.com",
		Password: hashedPassword,
		RoleID:   adminRole.ID,
	}

	if err := db.Create(&admin).Error; err != nil {
		return err
	}

	fmt.Println("✅ Admin user seeded: admin@hr-management.com / password123")
	return nil
}
