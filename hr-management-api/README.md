# HR Management API

Backend REST API untuk HR Management System — CRUD **User**, **Department**, **Position**, endpoint **Login**, dan **Role & Menu Permission** (untuk hide/show menu di frontend).

Dibangun dengan Go + Gin + GORM (MySQL), struktur mengikuti pola [arfian/simple-blog-system](https://github.com/arfian/simple-blog-system) yang disederhanakan: setiap domain punya `model`, `dto`, `repository`, `service`, `handler` dalam satu folder di `internal/`.

## Prerequisites

- Go 1.21+ (project ini pakai `go 1.26.4` di go.mod, sesuaikan kalau perlu)
- MySQL
- [golang-migrate CLI](https://github.com/golang-migrate/migrate) (untuk jalankan migration)

## Project Structure

```
.
├── cmd/
│   └── seed/               # entrypoint: go run cmd/seed/main.go (seed admin user)
├── config/
│   └── database.go         # koneksi GORM ke MySQL
├── docs/
├── internal/
│   ├── auth/                # login (handler, service, dto)
│   ├── database/            # seeder
│   ├── department/          # CRUD department (model, dto, repository, service, handler)
│   ├── middleware/           # JWT auth middleware, role guard
│   ├── position/             # CRUD position (relasi ke department)
│   ├── role/                  # role + menu + role_menu (untuk hide/show menu di FE)
│   ├── routes/                # register semua route
│   └── user/                  # CRUD user (relasi ke role/department/position)
├── log/
├── migrations/                 # SQL migration (golang-migrate format)
├── pkg/
│   ├── hash/                   # bcrypt helper
│   ├── jwtutil/                 # generate & validate JWT
│   └── response/                 # JSON response envelope standar
├── .env.example
├── Makefile
├── go.mod
└── main.go
```

## 1. Setup

```bash
cd hr-management-api
cp .env.example .env
# sesuaikan DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET di .env
```

## 2. Install dependency

Repo ini menambahkan `github.com/golang-jwt/jwt/v5` dan mempromosikan `golang.org/x/crypto` (bcrypt) jadi dependency langsung. **Wajib** jalankan ini sekali supaya `go.sum` lengkap (sandbox saya tidak punya akses internet jadi tidak bisa generate hash-nya):

```bash
go mod tidy
```

## 3. Jalankan migration

```bash
# install golang-migrate CLI kalau belum ada
# mac:   brew install golang-migrate
# linux: curl -L https://github.com/golang-migrate/migrate/releases/download/$version/migrate.$platform-amd64.tar.gz | tar xvz

make migrateup
```

Migration akan membuat tabel `roles`, `departments`, `positions`, `users`, `menus`, `role_menus`, sekaligus seed data:
- Role: `Administrator` (slug `admin`), `Staff` (slug `staff`)
- Menu: `User Management`, `Department`, `Position`
- `role_menus`: admin full access (view/create/update/delete semua menu), staff view-only

Kalau perlu rollback:

```bash
make migratedown
```

## 4. Seed admin user

```bash
make seed
# atau: go run cmd/seed/main.go
```

Ini membuat akun default:

```
email:    admin@hr-management.com
password: password123
```

## 5. Run server

```bash
make run
# atau: go run main.go
```

Server jalan di `http://localhost:8080` (sesuai `APP_PORT` di `.env`).

## API Endpoints

### Auth

| Method | Endpoint              | Auth | Deskripsi     |
|--------|------------------------|------|---------------|
| POST   | `/api/v1/auth/login`   | ❌   | Login, return JWT token |

Request:
```json
{ "email": "admin@hr-management.com", "password": "password123" }
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "<jwt-token>",
    "user": {
      "id": 1,
      "name": "Administrator",
      "email": "admin@hr-management.com",
      "role_id": 1,
      "role_name": "Administrator",
      "role_slug": "admin"
    }
  }
}
```

Semua endpoint di bawah ini butuh header:
```
Authorization: Bearer <token>
```

### User

| Method | Endpoint             | Deskripsi        |
|--------|------------------------|------------------|
| POST   | `/api/v1/users`        | Create user      |
| GET    | `/api/v1/users`        | List user (`?search=&page=&limit=`) |
| GET    | `/api/v1/users/:id`    | Detail user      |
| PUT    | `/api/v1/users/:id`    | Update user      |
| DELETE | `/api/v1/users/:id`    | Delete user (soft delete) |

### Department

| Method | Endpoint                   | Deskripsi         |
|--------|------------------------------|-------------------|
| POST   | `/api/v1/departments`        | Create department |
| GET    | `/api/v1/departments`        | List department   |
| GET    | `/api/v1/departments/:id`    | Detail department |
| PUT    | `/api/v1/departments/:id`    | Update department |
| DELETE | `/api/v1/departments/:id`    | Delete department |

### Position

| Method | Endpoint                 | Deskripsi      |
|--------|---------------------------|----------------|
| POST   | `/api/v1/positions`        | Create position (butuh `department_id`) |
| GET    | `/api/v1/positions`        | List position  |
| GET    | `/api/v1/positions/:id`    | Detail position |
| PUT    | `/api/v1/positions/:id`    | Update position |
| DELETE | `/api/v1/positions/:id`    | Delete position |

### Role & Menu Permission (untuk hide/show menu di FE)

| Method | Endpoint                     | Deskripsi |
|--------|-------------------------------|-----------|
| GET    | `/api/v1/roles`               | List semua role |
| GET    | `/api/v1/me/menus`            | Daftar menu yang boleh dilihat user yang sedang login (berdasarkan `role_id` di JWT) |
| GET    | `/api/v1/roles/:id/menus`     | Daftar menu + permission untuk role tertentu |

Response `/api/v1/me/menus`:
```json
{
  "success": true,
  "message": "Menus retrieved successfully",
  "data": [
    {
      "menu_id": 1,
      "key": "user",
      "name": "User Management",
      "path": "/users",
      "icon": "users",
      "can_view": true,
      "can_create": true,
      "can_update": true,
      "can_delete": true
    }
  ]
}
```

Cara pakai di FE: setelah login, panggil `/api/v1/me/menus`, lalu render sidebar hanya dari `key`/`path` yang ada di response tersebut. Tombol create/update/delete di masing-masing halaman ditampilkan sesuai flag `can_create` / `can_update` / `can_delete`.

## Catatan

- Password di-hash dengan bcrypt (`pkg/hash`).
- Token JWT berlaku 24 jam, payload berisi `user_id`, `email`, `role_id`, `role_slug`.
- Semua tabel pakai soft delete (`deleted_at`) via GORM, kecuali `menus` & `role_menus` (data referensi).
- Struktur per-domain (`model.go`, `dto.go`, `repository.go`, `service.go`, `handler.go`) sengaja dipisah biar mudah dites & konsisten dengan pola clean-ish architecture di repo referensi, tapi diflatten (tanpa folder `handler/model/service/...` bersarang) karena skeleton yang kamu kirim sudah pakai pola flat per-domain.
