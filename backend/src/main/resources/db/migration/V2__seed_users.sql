-- USUARIO ADMIN
INSERT INTO users (email, password, first_name, last_name, role, is_active)
VALUES (
    'admin@capitalhub.com',
    '$2a$10$wML/sOqu9Tsb3ZuRV24n4uW9rLoD4Uapjpp5t8p39ewfMcqnanRWq', -- pass: company123 (usamos la misma para no liarnos)
    'Super',
    'Admin',
    'ADMIN',
    TRUE
);

-- USUARIO COMPANY (Este es el que usaremos para entrar)
INSERT INTO users (email, password, first_name, last_name, role, is_active)
VALUES (
    'demo@company.com',
    '$2a$10$wML/sOqu9Tsb3ZuRV24n4uW9rLoD4Uapjpp5t8p39ewfMcqnanRWq', -- pass: company123
    'Demo',
    'Company',
    'COMPANY',
    TRUE
);

-- PERFIL DE EMPRESA
INSERT INTO companies (user_id, name, industry, website, about)
VALUES (
    (SELECT id FROM users WHERE email = 'demo@company.com'),
    'CapitalHub Demo',
    'Technology',
    'https://capitalhub.com',
    'Empresa de prueba para el MVP.'
);