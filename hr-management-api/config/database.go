package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	// Load file .env
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Failed to load .env file: %v", err)
	}

	// Debug (sementara)
	fmt.Println("===================================")
	fmt.Println("HOST :", os.Getenv("DB_HOST"))
	fmt.Println("PORT :", os.Getenv("DB_PORT"))
	fmt.Println("USER :", os.Getenv("DB_USER"))
	fmt.Println("DB   :", os.Getenv("DB_NAME"))
	fmt.Println("===================================")

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	fmt.Println("DSN :", dsn)

	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}

	DB = database

	fmt.Println("✅ Database Connected Successfully")
}