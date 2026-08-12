INSERT INTO roles (name, slug, created_at, updated_at) VALUES
('Administrator', 'admin', NOW(), NOW()),
('Staff', 'staff', NOW(), NOW());

INSERT INTO menus (name, `key`, path, icon, created_at, updated_at) VALUES
('User Management', 'user', '/users', 'users', NOW(), NOW()),
('Department', 'department', '/departments', 'building', NOW(), NOW()),
('Position', 'position', '/positions', 'briefcase', NOW(), NOW());

-- admin (role_id = 1) full access to all menus
INSERT INTO role_menus (role_id, menu_id, can_view, can_create, can_update, can_delete, created_at, updated_at)
SELECT 1, id, 1, 1, 1, 1, NOW(), NOW() FROM menus;

-- staff (role_id = 2) view-only access to all menus
INSERT INTO role_menus (role_id, menu_id, can_view, can_create, can_update, can_delete, created_at, updated_at)
SELECT 2, id, 1, 0, 0, 0, NOW(), NOW() FROM menus;
