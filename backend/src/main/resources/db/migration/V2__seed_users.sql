-- =========================================================
-- CAPITALHUB — V2: Seed inicial de usuarios (ADMIN + COMPANY)
-- =========================================================

-- ==========================================
-- CONTRASEÑAS EN BCRYPT (para desarrollo)
-- password: admin123
-- password: company123
-- ==========================================

-- Hashes generados con BCrypt (Spring):
-- admin123   => $2a$10$QmInRn7QG8Jm2f0eiOAFxeTtCa56zUoaZMhUlCT3VkOITkkpFmS4y
-- company123 => $2a$10$wML/sOqu9Tsb3ZuRV24n4uW9rLoD4Uapjpp5t8p39ewfMcqnanRWq

-- ============================
-- 1. USUARIO ADMIN
-- ============================

INSERT INTO users (email, password, first_name, last_name, role_id)
VALUES (
    'admin@capitalhub.com',
    '$2a$10$QmInRn7QG8Jm2f0eiOAFxeTtCa56zUoaZMhUlCT3VkOITkkpFmS4y',
    'Super',
    'Admin',
    (SELECT id FROM roles WHERE name = 'ADMIN')
);

-- ============================
-- 2. USUARIO COMPANY + PERFIL COMPANY
-- ============================

INSERT INTO users (email, password, first_name, last_name, role_id)
VALUES (
    'demo@company.com',
    '$2a$10$wML/sOqu9Tsb3ZuRV24n4uW9rLoD4Uapjpp5t8p39ewfMcqnanRWq',
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
