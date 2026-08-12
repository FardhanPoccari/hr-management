# =========================
# Stage 1: Build
# =========================
FROM golang:1.26.4-alpine AS builder

WORKDIR /app

# Copy dependency
COPY go.mod go.sum ./

# Download dependency
RUN go mod download

# Copy source code
COPY . .

# Build aplikasi
RUN CGO_ENABLED=0 GOOS=linux go build -o server .


# =========================
# Stage 2: Run
# =========================
FROM alpine:latest

WORKDIR /app

# Install certificate
RUN apk add --no-cache ca-certificates

# Copy hasil build
COPY --from=builder /app/server .

# Copy .env untuk sementara
COPY .env .

EXPOSE 8080

CMD ["./server"]