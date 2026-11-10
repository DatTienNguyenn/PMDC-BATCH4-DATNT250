-- ==============================================================================
-- HỆ THỐNG QUẢN TRỊ & PHÂN TÍCH DẤU CHÂN CARBON (CARBON LEDGER)
-- DDL Schema Initialization Script
-- Hệ Quản Trị CSDL: PostgreSQL 16
-- Tài liệu căn cứ: docs/05-data-model.md (v2.0), docs/emission-reference-benchmark.md
-- ==============================================================================

-- Bật extension tạo UUID v4 và hàm băm mã mật
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. DROP EXISTING TABLES (Reverse Dependency Order for Clean Re-run)
-- ==============================================================================
DROP TABLE IF EXISTS emission_reduction_plans CASCADE;
DROP TABLE IF EXISTS ai_usage_logs CASCADE;
DROP TABLE IF EXISTS system_audit_logs CASCADE;
DROP TABLE IF EXISTS system_configurations CASCADE;
DROP TABLE IF EXISTS ai_reports CASCADE;
DROP TABLE IF EXISTS emission_logs CASCADE;
DROP TABLE IF EXISTS carbon_budgets CASCADE;
DROP TABLE IF EXISTS standard_emission_factors CASCADE;
DROP TABLE IF EXISTS system_reference_benchmarks CASCADE;
DROP TABLE IF EXISTS workspace_baselines CASCADE;
DROP TABLE IF EXISTS workspace_join_requests CASCADE;
DROP TABLE IF EXISTS workspace_members CASCADE;
DROP TABLE IF EXISTS workspaces CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ==============================================================================
-- 2. TRIGGER FUNCTION: Tự động cập nhật cột updated_at
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. BẢNG users (Tài khoản người dùng toàn hệ thống)
-- ==============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500) NULL,
    global_role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (global_role IN ('SYSTEM_ADMIN', 'USER')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    notification_preferences JSONB NOT NULL DEFAULT '{"notify_budget_warning": true, "notify_approval_result": true}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 4. BẢNG workspaces (Không gian làm việc / Tenants)
-- ==============================================================================
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('HOME', 'OFFICE', 'HOUSEHOLD', 'SMALL_OFFICE')),
    invite_code VARCHAR(10) NULL UNIQUE,
    invite_code_expires_at TIMESTAMPTZ NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ARCHIVED', 'SUSPENDED', 'LOCKED')),
    ai_report_frequency VARCHAR(20) NOT NULL DEFAULT 'MONTHLY' CHECK (ai_report_frequency IN ('DISABLED', 'WEEKLY', 'MONTHLY')),
    ai_report_day_of_week INT NULL CHECK (ai_report_day_of_week BETWEEN 1 AND 7),
    ai_report_day_of_month INT NULL CHECK (ai_report_day_of_month BETWEEN -1 AND 31),
    ai_report_time TIME NOT NULL DEFAULT '23:59:00',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_workspaces_updated_at
BEFORE UPDATE ON workspaces
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 5. BẢNG workspace_members (Thành viên tham gia Workspace & Vai trò)
-- ==============================================================================
CREATE TABLE workspace_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('REVIEWER', 'EDITOR')),
    last_read_notifications_at TIMESTAMPTZ NULL,
    joined_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_workspace_member UNIQUE (workspace_id, user_id)
);

CREATE INDEX idx_workspace_members_user_id ON workspace_members(user_id);

-- ==============================================================================
-- 6. BẢNG workspace_join_requests (Yêu cầu Tham gia Workspace Chờ duyệt)
-- ==============================================================================
CREATE TABLE workspace_join_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    invite_code_used VARCHAR(10) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED')),
    reviewed_by UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ NULL,
    rejection_reason TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_workspace_join_requests_updated_at
BEFORE UPDATE ON workspace_join_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Partial Index: Tối ưu tải danh sách chờ duyệt & Đảm bảo mỗi user chỉ có tối đa 1 yêu cầu PENDING tại một Workspace
CREATE INDEX idx_ws_join_requests_pending ON workspace_join_requests (workspace_id, status) WHERE status = 'PENDING';
CREATE UNIQUE INDEX idx_ws_join_requests_unique_pending ON workspace_join_requests (workspace_id, user_id) WHERE status = 'PENDING';

-- ==============================================================================
-- 7. BẢNG workspace_baselines (Thông số nền diện tích & nhân khẩu)
-- ==============================================================================
CREATE TABLE workspace_baselines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    floor_area_m2 NUMERIC(10, 2) NOT NULL CHECK (floor_area_m2 > 0),
    occupants INT NOT NULL CHECK (occupants >= 1),
    period_valid_from VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_workspace_baselines_ws_period ON workspace_baselines(workspace_id, period_valid_from);

-- ==============================================================================
-- 8. BẢNG standard_emission_factors (Master Data Hệ số Quy chuẩn Quốc gia)
-- ==============================================================================
CREATE TABLE standard_emission_factors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_code VARCHAR(50) NOT NULL UNIQUE,
    activity_name VARCHAR(100) NOT NULL,
    scope_type VARCHAR(10) NOT NULL CHECK (scope_type IN ('SCOPE_1', 'SCOPE_2', 'SCOPE_3')),
    input_unit VARCHAR(20) NOT NULL,
    default_emission_factor NUMERIC(12, 6) NOT NULL CHECK (default_emission_factor >= 0),
    factor_unit VARCHAR(50) NOT NULL DEFAULT 'kg CO2e/unit',
    official_citation TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    updated_by_admin_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_standard_emission_factors_updated_at
BEFORE UPDATE ON standard_emission_factors
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 9. BẢNG system_reference_benchmarks (Mức Phát thải Tham chiếu Quốc gia)
-- ==============================================================================
CREATE TABLE system_reference_benchmarks (
    id BIGSERIAL PRIMARY KEY,
    benchmark_code VARCHAR(50) UNIQUE NOT NULL,
    benchmark_name VARCHAR(150) NOT NULL,
    benchmark_value NUMERIC(10, 4) NOT NULL,
    unit VARCHAR(30) NOT NULL,
    ratio_multiplier NUMERIC(5, 4) DEFAULT 1.0000,
    source_citation VARCHAR(255) NOT NULL,
    reference_year INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_system_reference_benchmarks_updated_at
BEFORE UPDATE ON system_reference_benchmarks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 10. BẢNG carbon_budgets (Hạn ngạch Ngân sách Phát thải Tháng)
-- ==============================================================================
CREATE TABLE carbon_budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    period VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    target_co2e_kg NUMERIC(12, 2) NOT NULL CHECK (target_co2e_kg > 0),
    alert_threshold_ratio NUMERIC(3, 2) NOT NULL DEFAULT 0.85 CHECK (alert_threshold_ratio > 0 AND alert_threshold_ratio <= 1.00),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'EXPIRED', 'ARCHIVED')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_workspace_period_budget UNIQUE (workspace_id, period)
);

CREATE TRIGGER trg_carbon_budgets_updated_at
BEFORE UPDATE ON carbon_budgets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_carbon_budgets_ws_period ON carbon_budgets (workspace_id, period);

-- ==============================================================================
-- 11. BẢNG emission_logs (Sổ cái Ghi nhận Phát thải & Trạng thái Phê duyệt)
-- ==============================================================================
CREATE TABLE emission_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    factor_id UUID NOT NULL REFERENCES standard_emission_factors(id) ON DELETE RESTRICT,
    category_code VARCHAR(50) NOT NULL,
    activity_name VARCHAR(100) NOT NULL,
    consumption_quantity NUMERIC(12, 3) NOT NULL CHECK (consumption_quantity >= 0),
    input_unit VARCHAR(20) NOT NULL,
    factor_applied NUMERIC(12, 6) NOT NULL, -- Lưu cứng tại thời điểm ghi sổ để đảm bảo tính bất biến
    total_co2e_kg NUMERIC(12, 4) NOT NULL,  -- consumption_quantity * factor_applied
    activity_date DATE NOT NULL,
    billing_period VARCHAR(7) NOT NULL,    -- Format: YYYY-MM
    ingestion_source VARCHAR(20) NOT NULL CHECK (ingestion_source IN ('MANUAL', 'EXCEL_IMPORT', 'AI_VISION')),
    receipt_image_url VARCHAR(500) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING_REVIEW' CHECK (status IN ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED')),
    reviewer_id UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMPTZ NULL,
    rejection_reason TEXT NULL,
    note TEXT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_emission_logs_updated_at
BEFORE UPDATE ON emission_logs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Chiến lược đánh Index (Theo docs/05-data-model.md Section 3)
-- Index 1: Tối ưu hóa tính tổng phát thải tháng & kiểm tra ngưỡng cảnh báo 85%
CREATE INDEX idx_emission_logs_ws_period_status ON emission_logs (workspace_id, billing_period, status);
-- Index 2: Tối ưu hóa phân trang sổ cái phát thải
CREATE INDEX idx_emission_logs_ws_created ON emission_logs (workspace_id, created_at DESC);
-- Index 3: Partial Index cho Hàng đợi duyệt tức thời của Reviewer
CREATE INDEX idx_emission_logs_approval ON emission_logs (workspace_id, status) WHERE status = 'PENDING_REVIEW';

-- ==============================================================================
-- 12. BẢNG ai_reports (Báo cáo Phân tích AI & Đề xuất Cắt giảm Định kỳ)
-- ==============================================================================
CREATE TABLE ai_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    report_type VARCHAR(20) NOT NULL CHECK (report_type IN ('WEEKLY', 'MONTHLY')),
    period VARCHAR(10) NOT NULL, -- Ví dụ: 2026-10 hoặc 2026-W44
    total_emissions_kg NUMERIC(12, 2) NOT NULL,
    variance_vs_last_period NUMERIC(5, 2) NULL,
    breakdown_by_category JSONB NOT NULL,
    actionable_advice_markdown TEXT NOT NULL,
    pdf_file_url VARCHAR(500) NULL,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_reports_ws_period ON ai_reports (workspace_id, period);

-- ==============================================================================
-- 13. BẢNG system_configurations (Cấu hình Tham số Toàn hệ thống & Prompts AI)
-- ==============================================================================
CREATE TABLE system_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value JSONB NOT NULL,
    description VARCHAR(255) NULL,
    updated_by UUID NULL REFERENCES users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_system_configurations_updated_at
BEFORE UPDATE ON system_configurations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 14. BẢNG system_audit_logs (Nhật ký Kiểm toán Thao tác Quản trị Hệ thống)
-- ==============================================================================
CREATE TABLE system_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id VARCHAR(100) NULL,
    details JSONB NULL,
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_system_audit_logs_created ON system_audit_logs (created_at DESC);
CREATE INDEX idx_system_audit_logs_admin ON system_audit_logs (admin_id);

-- ==============================================================================
-- 15. BẢNG ai_usage_logs (Giám sát Lượt gọi API & Chi phí AI)
-- ==============================================================================
CREATE TABLE ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NULL REFERENCES workspaces(id) ON DELETE SET NULL,
    service_type VARCHAR(50) NOT NULL CHECK (service_type IN ('VISION_PARSER', 'INSIGHT_GENERATOR', 'REDUCTION_PLANNER')),
    prompt_tokens INT NOT NULL DEFAULT 0,
    completion_tokens INT NOT NULL DEFAULT 0,
    estimated_cost_usd NUMERIC(10, 6) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_usage_logs_ws_created ON ai_usage_logs (workspace_id, created_at DESC);

-- ==============================================================================
-- 16. BẢNG emission_reduction_plans (Kế hoạch Lộ trình Cắt giảm Cá nhân hóa từ AI)
-- ==============================================================================
CREATE TABLE emission_reduction_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    created_by_user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    baseline_period VARCHAR(7) NOT NULL,
    baseline_emissions_kg NUMERIC(12, 2) NOT NULL,
    target_reduction_percentage NUMERIC(5, 2) NOT NULL CHECK (target_reduction_percentage > 0 AND target_reduction_percentage <= 100),
    target_emissions_kg NUMERIC(12, 2) NOT NULL,
    time_horizon_months INT NOT NULL CHECK (time_horizon_months BETWEEN 1 AND 36),
    monthly_roadmap JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'ARCHIVED')),
    pdf_file_url VARCHAR(500) NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_emission_reduction_plans_updated_at
BEFORE UPDATE ON emission_reduction_plans
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX idx_emission_reduction_plans_ws ON emission_reduction_plans (workspace_id, status);
