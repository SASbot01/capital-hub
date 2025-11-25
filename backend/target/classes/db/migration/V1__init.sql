-- =========================================================
-- CAPITALHUB — V1: Estructura completa del MVP
-- =========================================================

-- =========================================================
-- 1. TABLAS DE USUARIOS Y ROLES
-- =========================================================

CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(80),
    last_name VARCHAR(80),
    role_id BIGINT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- =========================================================
-- 2. TABLAS DE EMPRESAS
-- =========================================================

CREATE TABLE companies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(255),
    about TEXT,
    video_offer_url TEXT,
    projection_mrr INT DEFAULT 0,
    projection_growth INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_company_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================================================
-- 3. PERFILES DE REPRESENTANTES (SETTERS / CLOSERS)
-- =========================================================

CREATE TABLE rep_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    role_type VARCHAR(40) NOT NULL, -- SETTER / CLOSER
    bio TEXT,
    experience_years INT DEFAULT 0,
    hourly_rate DECIMAL(10,2) DEFAULT 0,
    country VARCHAR(100),
    languages VARCHAR(255),
    profile_picture_url TEXT,
    intro_video_url TEXT,
    best_call_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_rep_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================================================
-- 4. JOBS (OFERTAS DE EMPRESA)
-- =========================================================

CREATE TABLE jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    role_required VARCHAR(40) NOT NULL, -- SETTER / CLOSER
    max_slots INT DEFAULT 1,
    max_applicants INT DEFAULT 40,
    salary DECIMAL(10,2),
    commission_percentage DECIMAL(5,2),
    required_language VARCHAR(100),
    crm_type VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_company FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- =========================================================
-- 5. APPLICATIONS (POSTULACIONES)
-- =========================================================

CREATE TABLE applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    rep_id BIGINT NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING', -- PENDING / INTERVIEW / HIRED / REJECTED
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_app_job FOREIGN KEY (job_id) REFERENCES jobs(id),
    CONSTRAINT fk_app_rep FOREIGN KEY (rep_id) REFERENCES rep_profiles(id)
);

-- =========================================================
-- 6. REVIEWS (EMPRESA → REP)
-- =========================================================

CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_id BIGINT NOT NULL,
    rep_id BIGINT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_company FOREIGN KEY (company_id) REFERENCES companies(id),
    CONSTRAINT fk_review_rep FOREIGN KEY (rep_id) REFERENCES rep_profiles(id)
);

-- =========================================================
-- 7. MEDIA (ARCHIVOS SUBIDOS)
-- =========================================================

CREATE TABLE media_files (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50), -- profile_picture, intro_video, best_call
    url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_media_user FOREIGN KEY (user_id) REFERENCES users(id)
);

-- =========================================================
-- 8. TRAINING — CURSOS, LECCIONES, QUIZZES
-- =========================================================

CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    course_id BIGINT NOT NULL,
    title VARCHAR(200),
    content TEXT,
    video_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_lesson_course FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE user_progress (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    lesson_id BIGINT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_progress_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- =========================================================
-- 9. CATÁLOGOS — INDUSTRIAS, IDIOMAS, CRM
-- =========================================================

CREATE TABLE industries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) UNIQUE NOT NULL
);

CREATE TABLE languages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE crm_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- =========================================================
-- 10. MATCHING SCORE (BÁSICO)
-- =========================================================

CREATE TABLE match_scores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    job_id BIGINT NOT NULL,
    rep_id BIGINT NOT NULL,
    score INT CHECK (score BETWEEN 0 AND 100),
    CONSTRAINT fk_match_job FOREIGN KEY (job_id) REFERENCES jobs(id),
    CONSTRAINT fk_match_rep FOREIGN KEY (rep_id) REFERENCES rep_profiles(id)
);

