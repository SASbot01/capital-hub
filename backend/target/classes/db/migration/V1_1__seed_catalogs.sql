-- 1. ROLES DEL SISTEMA
INSERT INTO roles (name) VALUES 
('ADMIN'),
('COMPANY'),
('REP');

-- 2. INDUSTRIAS
INSERT INTO industries (name) VALUES
('Marketing'),
('Consultoría'),
('E-commerce'),
('Coaching'),
('Tecnología'),
('Educación'),
('Inmobiliaria'),
('Salud y Bienestar'),
('Servicios Empresariales');

-- 3. IDIOMAS
INSERT INTO languages (name) VALUES
('Español'),
('Inglés'),
('Portugués'),
('Francés'),
('Alemán'),
('Italiano');

-- 4. TIPOS DE CRM
INSERT INTO crm_types (name) VALUES
('HubSpot'),
('GoHighLevel'),
('Salesforce'),
('Pipedrive'),
('Zoho CRM'),
('Close CRM'),
('Otro');