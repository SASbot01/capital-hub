-- =========================================================
-- CAPITALHUB — V2: Seed inicial de usuarios (ADMIN + COMPANY)
-- =========================================================

-- 1. INSERTAR ROLES (Faltaba esto)
INSERT IGNORE INTO roles (name) VALUES ('ADMIN'), ('COMPANY'), ('SETTER'), ('CLOSER');

-- ============================
-- 2. USUARIO ADMIN
-- ============================
INSERT INTO users (email, password, first_name, last_name, role_id)
VALUES (
    'admin@capitalhub.com',
    '$2a$10$QmInRn7QG8Jm2f0eiOAFxeTtCa56zUoaZMhUlCT3VkOITkkpFmS4y', -- admin123
    'Super',
    'Admin',
    (SELECT id FROM roles WHERE name = 'ADMIN')
);

-- ============================
-- 3. USUARIO COMPANY + PERFIL
-- ============================
INSERT INTO users (email, password, first_name, last_name, role_id)
VALUES (
    'demo@company.com',
    '$2a$10$wML/sOqu9Tsb3ZuRV24n4uW9rLoD4Uapjpp5t8p39ewfMcqnanRWq', -- company123
    'Demo',
    'Company',
    (SELECT id FROM roles WHERE name = 'COMPANY')
);

INSERT INTO companies (user_id, name, industry, website, about)
VALUES (
    (SELECT id FROM users WHERE email = 'demo@company.com'),
    'Demo Company',
    'Marketing',
    'https://demo-company.com',
    'Empresa de ejemplo creada automáticamente para desarrollo.'
);