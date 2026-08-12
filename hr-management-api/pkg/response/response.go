package response

import "github.com/gin-gonic/gin"

// Base is the standard envelope used for every API response so the
// frontend always receives the same shape: { success, message, data }.
type Base struct {
	Success bool        `json:"success"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
	Meta    interface{} `json:"meta,omitempty"`
}

func Success(c *gin.Context, code int, message string, data interface{}) {
	c.JSON(code, Base{
		Success: true,
		Message: message,
		Data:    data,
	})
}

// SuccessWithMeta is used for list endpoints that need pagination info.
func SuccessWithMeta(c *gin.Context, code int, message string, data interface{}, meta interface{}) {
	c.JSON(code, Base{
		Success: true,
		Message: message,
		Data:    data,
		Meta:    meta,
	})
}

func Error(c *gin.Context, code int, message string) {
	c.JSON(code, Base{
		Success: false,
		Message: message,
	})
}

// Pagination is a small reusable meta struct for list endpoints.
type Pagination struct {
	Page      int   `json:"page"`
	Limit     int   `json:"limit"`
	TotalRows int64 `json:"total_rows"`
	TotalPage int   `json:"total_page"`
}
