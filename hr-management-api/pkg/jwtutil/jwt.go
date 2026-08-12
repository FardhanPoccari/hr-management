package jwtutil

import (
	"errors"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// Claims is the custom JWT payload embedded in every token issued by
// the login endpoint. RoleID/RoleSlug are embedded so the FE (and the
// auth middleware) can decide which menus to show without another
// round trip.
type Claims struct {
	UserID   uint   `json:"user_id"`
	Email    string `json:"email"`
	RoleID   uint   `json:"role_id"`
	RoleSlug string `json:"role_slug"`
	jwt.RegisteredClaims
}

func secretKey() []byte {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		secret = "hr-management-secret"
	}
	return []byte(secret)
}

// GenerateToken creates a signed JWT valid for 24 hours.
func GenerateToken(userID uint, email string, roleID uint, roleSlug string) (string, error) {
	claims := Claims{
		UserID:   userID,
		Email:    email,
		RoleID:   roleID,
		RoleSlug: roleSlug,
		RegisteredClaims: jwt.RegisteredClaims{
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secretKey())
}

// ValidateToken parses and verifies a JWT string, returning its claims.
func ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return secretKey(), nil
	})

	if err != nil || !token.Valid {
		return nil, errors.New("invalid or expired token")
	}

	return claims, nil
}
