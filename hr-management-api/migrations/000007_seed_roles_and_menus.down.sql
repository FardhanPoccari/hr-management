DELETE FROM role_menus;
DELETE FROM menus;
DELETE FROM roles WHERE slug IN ('admin', 'staff');
