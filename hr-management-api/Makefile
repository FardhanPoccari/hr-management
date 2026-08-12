include .env
export

DB_DSN=mysql://$(DB_USER):$(DB_PASSWORD)@tcp($(DB_HOST):$(DB_PORT))/$(DB_NAME)?charset=utf8mb4&parseTime=True&loc=Local

run:
	go run main.go

tidy:
	go mod tidy

migrateup:
	migrate -path migrations -database "$(DB_DSN)" -verbose up

migratedown:
	migrate -path migrations -database "$(DB_DSN)" -verbose down

migrateforce:
	migrate -path migrations -database "$(DB_DSN)" force $(version)

seed:
	go run cmd/seed/main.go

.PHONY: run tidy migrateup migratedown migrateforce seed
