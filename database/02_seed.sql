-- ==============================================================================
-- HỆ THỐNG QUẢN TRỊ & PHÂN TÍCH DẤU CHÂN CARBON (CARBON LEDGER)
-- Master Data & Initial Seed Data Script
-- Hệ Quản Trị CSDL: PostgreSQL 16
-- Tài liệu căn cứ: docs/05-data-model.md, docs/activity-supported.md,
--                  docs/emission-reference-benchmark.md, docs/08-ai-insight-specification.md
-- ==============================================================================

-- ==============================================================================
-- 1. SEED TÀI KHOẢN NGƯỜI DÙNG (users)
-- Mật khẩu mặc định cho toàn bộ tài khoản thử nghiệm: "password123"
-- BCrypt Hash: $2a$10$wE99v.76vG5.l8qM1m4Bw.hY39s3n542v7N16O6YQ9Y/Y6t2kOgeW
-- ==============================================================================
INSERT INTO users (id, email, password_hash, full_name, avatar_url, global_role, is_active, notification_preferences)
VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'admin.workspace@carbonledger.vn',
    '$2a$10$wE99v.76vG5.l8qM1m4Bw.hY39s3n542v7N16O6YQ9Y/Y6t2kOgeW',
    'Nguyễn Văn An',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'USER',
    TRUE,
    '{"notify_budget_warning": true, "notify_approval_result": true}'::jsonb
),
(
    '22222222-2222-2222-2222-222222222222',
    'member@carbonledger.vn',
    '$2a$10$wE99v.76vG5.l8qM1m4Bw.hY39s3n542v7N16O6YQ9Y/Y6t2kOgeW',
    'Trần Thị Bình',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'USER',
    TRUE,
    '{"notify_budget_warning": true, "notify_approval_result": true}'::jsonb
),
(
    '33333333-3333-3333-3333-333333333333',
    'sysadmin@carbonledger.vn',
    '$2a$10$wE99v.76vG5.l8qM1m4Bw.hY39s3n542v7N16O6YQ9Y/Y6t2kOgeW',
    'Vũ Quản Trị',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'SYSTEM_ADMIN',
    TRUE,
    '{"notify_budget_warning": true, "notify_approval_result": true}'::jsonb
),
(
    '44444444-4444-4444-4444-444444444444',
    'cuong.le@carbonledger.vn',
    '$2a$10$wE99v.76vG5.l8qM1m4Bw.hY39s3n542v7N16O6YQ9Y/Y6t2kOgeW',
    'Lê Hoàng Cường',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'USER',
    TRUE,
    '{"notify_budget_warning": true, "notify_approval_result": true}'::jsonb
),
(
    '55555555-5555-5555-5555-555555555555',
    'diep.pham@carbonledger.vn',
    '$2a$10$wE99v.76vG5.l8qM1m4Bw.hY39s3n542v7N16O6YQ9Y/Y6t2kOgeW',
    'Phạm Ngọc Diệp',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    'USER',
    TRUE,
    '{"notify_budget_warning": true, "notify_approval_result": true}'::jsonb
),
(
    '66666666-6666-6666-6666-666666666666',
    'tuan.hoang@carbonledger.vn',
    '$2a$10$wE99v.76vG5.l8qM1m4Bw.hY39s3n542v7N16O6YQ9Y/Y6t2kOgeW',
    'Hoàng Minh Tuấn',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    'USER',
    TRUE,
    '{"notify_budget_warning": true, "notify_approval_result": true}'::jsonb
)
ON CONFLICT (email) DO NOTHING;

-- ==============================================================================
-- 2. SEED WORKSPACES (workspaces)
-- Multi-tenant: 1 Workspace Hộ gia đình + 1 Workspace Văn phòng nhỏ
-- ==============================================================================
INSERT INTO workspaces (id, name, type, invite_code, status, ai_report_frequency, ai_report_day_of_month, ai_report_time)
VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'Gia Đình Xanh',
    'HOME',
    'GRN888',
    'ACTIVE',
    'MONTHLY',
    -1, -- Ngày cuối cùng của tháng
    '23:59:00'
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'Văn Phòng Công Nghệ Sáng Tạo',
    'OFFICE',
    'OFF999',
    'ACTIVE',
    'WEEKLY',
    1, -- Thứ Hai hàng tuần
    '23:59:00'
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 3. SEED THÀNH VIÊN WORKSPACE (workspace_members)
-- ==============================================================================
INSERT INTO workspace_members (id, workspace_id, user_id, role)
VALUES
('a1111111-0000-0000-0000-000000000001', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'REVIEWER'),
('a1111111-0000-0000-0000-000000000002', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '22222222-2222-2222-2222-222222222222', 'EDITOR'),
('a1111111-0000-0000-0000-000000000003', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '44444444-4444-4444-4444-444444444444', 'EDITOR'),
('a1111111-0000-0000-0000-000000000004', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555', 'EDITOR'),
('b2222222-0000-0000-0000-000000000001', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'REVIEWER')
ON CONFLICT (workspace_id, user_id) DO NOTHING;

-- ==============================================================================
-- 4. SEED YÊU CẦU GIA NHẬP WORKSPACE (workspace_join_requests)
-- ==============================================================================
INSERT INTO workspace_join_requests (id, workspace_id, user_id, invite_code_used, status)
VALUES
(
    'c3333333-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '66666666-6666-6666-6666-666666666666',
    'GRN888',
    'PENDING'
)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- 5. SEED THÔNG SỐ NỀN WORKSPACE (workspace_baselines)
-- ==============================================================================
INSERT INTO workspace_baselines (id, workspace_id, floor_area_m2, occupants, period_valid_from)
VALUES
(
    'd4444444-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    120.00,
    4,
    '2026-01'
),
(
    'd4444444-0000-0000-0000-000000000002',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    250.00,
    10,
    '2026-02'
)
ON CONFLICT DO NOTHING;

-- ==============================================================================
-- 6. SEED MASTER DATA HỆ SỐ QUY CHUẨN QUỐC GIA (standard_emission_factors)
-- Căn cứ chi tiết: docs/activity-supported.md (Bộ TN&MT, IPCC, DEFRA, US EPA)
-- ==============================================================================
INSERT INTO standard_emission_factors 
(id, category_code, activity_name, scope_type, input_unit, default_emission_factor, factor_unit, official_citation, is_active, updated_by_admin_id)
VALUES
(
    'ef000001-0000-0000-0000-000000000001',
    'ELEC_GRID',
    'Sử dụng điện lưới quốc gia EVN',
    'SCOPE_2',
    'kWh',
    0.618700,
    'kg CO2e/kWh',
    'Công văn 1232/BNNMT-BĐKH (BCT chủ trì) / EPA / IEA 2024',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
),
(
    'ef000002-0000-0000-0000-000000000002',
    'FUEL_LPG',
    'Đốt gas (LPG) nấu ăn sinh hoạt',
    'SCOPE_1',
    'kg',
    2.939360,
    'kg CO2e/kg',
    'UK DEFRA 2026 / 2006 IPCC Guidelines',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
),
(
    'ef000003-0000-0000-0000-000000000003',
    'FUEL_DIESEL',
    'Dầu Diesel chạy máy phát điện dự phòng',
    'SCOPE_1',
    'Lít',
    2.687000,
    'kg CO2e/Lít',
    'IPCC Guidelines / UK DEFRA 2026 Bảng Liquid Fuels',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
),
(
    'ef000004-0000-0000-0000-000000000004',
    'MOBILITY',
    'Di chuyển phương tiện cá nhân (Xe máy / Ô tô)',
    'SCOPE_3',
    'km',
    0.103000,
    'kg CO2e/km',
    'UK DEFRA 2026 (Trung bình hỗn hợp xe máy xăng)',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
),
(
    'ef000005-0000-0000-0000-000000000005',
    'WASTE_LANDFILL',
    'Rác thải sinh hoạt chôn lấp tập trung',
    'SCOPE_3',
    'kg',
    0.004465,
    'kg CO2e/kg',
    'UK DEFRA 2026 / US EPA WARM (4.465358 kg CO2e/tấn)',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
),
(
    'ef000006-0000-0000-0000-000000000006',
    'WATER_SUPPLY_TREAT',
    'Tiêu thụ và xử lý nước sạch đô thị',
    'SCOPE_3',
    'm3',
    0.191300,
    'kg CO2e/m3',
    'UK DEFRA 2026 Water Supply & Treatment / US EPA',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
),
(
    'ef000007-0000-0000-0000-000000000007',
    'OFFICE_PAPER',
    'Tiêu thụ giấy in văn phòng A4',
    'SCOPE_3',
    'kg',
    1.343591,
    'kg CO2e/kg',
    'UK DEFRA 2026 Material Use Paper (1343.59114 kg CO2e/tấn)',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
),
(
    'ef000008-0000-0000-0000-000000000008',
    'TRAVEL_FLIGHT',
    'Du lịch & Công tác bằng máy bay thương mại',
    'SCOPE_3',
    'p.km',
    0.109160,
    'kg CO2e/p.km',
    'UK DEFRA 2026 / ICAO (Hạng phổ thông có tính hệ số Radiative Forcing)',
    TRUE,
    '33333333-3333-3333-3333-333333333333'
)
ON CONFLICT (category_code) DO NOTHING;

-- ==============================================================================
-- 7. SEED MỨC PHÁT THẢI THAM CHIẾU QUỐC GIA (system_reference_benchmarks)
-- Căn cứ chi tiết: docs/emission-reference-benchmark.md (Our World in Data 2024)
-- ==============================================================================
INSERT INTO system_reference_benchmarks 
(benchmark_code, benchmark_name, benchmark_value, unit, ratio_multiplier, source_citation, reference_year)
VALUES
(
    'VN_PER_CAPITA_ANNUAL',
    'Mức phát thải bình quân đầu người toàn quốc',
    3670.0000,
    'kg_co2e/capita/year',
    1.0000,
    'Our World in Data (OWID) - Vietnam Profile',
    2024
),
(
    'HOUSEHOLD_BOUNDARY_RATIO',
    'Tỷ lệ ranh giới phát thải Hộ gia đình',
    0.5076,
    'ratio',
    0.5076,
    'OWID 4 groups: Electricity, Transport, Waste, Fugitive emissions (50.8%)',
    2024
),
(
    'WORKPLACE_BOUNDARY_RATIO',
    'Tỷ lệ ranh giới phát thải Nơi làm việc',
    1.0000,
    'ratio',
    1.0000,
    'National Economic Per Capita Basis (100.0%)',
    2024
),
(
    'HOUSEHOLD_PER_CAPITA_MONTHLY',
    'Mức tham chiếu Hộ gia đình mỗi nhân khẩu/tháng',
    155.2495,
    'kg_co2e/capita/month',
    0.5076,
    '3670 * 50.763% / 12 (155.25 kg CO2e)',
    2024
),
(
    'WORKPLACE_PER_CAPITA_MONTHLY',
    'Mức tham chiếu Nơi làm việc mỗi nhân sự/tháng',
    305.8333,
    'kg_co2e/capita/month',
    1.0000,
    '3670 * 100% / 12 (305.83 kg CO2e)',
    2024
),
(
    'OFFICE_FLOOR_MONTHLY',
    'Mức tham chiếu cường độ sàn văn phòng tháng',
    13.0000,
    'kg_co2e/m2/month',
    1.0000,
    '18.0 kWh/m2 * 0.7221 kg CO2e/kWh',
    2024
)
ON CONFLICT (benchmark_code) DO NOTHING;

-- ==============================================================================
-- 8. SEED HẠN NGẠCH NGÂN SÁCH THÁNG (carbon_budgets)
-- ==============================================================================
INSERT INTO carbon_budgets (id, workspace_id, period, target_co2e_kg, alert_threshold_ratio, status)
VALUES
(
    'cb000001-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '2026-10',
    125.00,
    0.85, -- Báo động khi phát thải chạm 85% hạn ngạch (106.25 kg CO2e)
    'ACTIVE'
),
(
    'cb000002-0000-0000-0000-000000000002',
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '2026-10',
    2500.00,
    0.85, -- Báo động khi phát thải chạm 85% hạn ngạch (2125.00 kg CO2e)
    'ACTIVE'
)
ON CONFLICT (workspace_id, period) DO NOTHING;

-- ==============================================================================
-- 9. SEED SỔ CÁI PHÁT THẢI (emission_logs)
-- Mô phỏng đầy đủ các nguồn nạp (MANUAL, EXCEL_IMPORT, AI_VISION) và trạng thái
-- ==============================================================================
INSERT INTO emission_logs 
(id, workspace_id, user_id, factor_id, category_code, activity_name, consumption_quantity, input_unit, factor_applied, total_co2e_kg, activity_date, billing_period, ingestion_source, status, reviewer_id, reviewed_at, note)
VALUES
-- Bản ghi 1: Tiêu thụ điện lưới tháng 10 (Đã duyệt)
(
    'el000001-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '22222222-2222-2222-2222-222222222222',
    'ef000001-0000-0000-0000-000000000001',
    'ELEC_GRID',
    'Sử dụng điện lưới quốc gia EVN',
    80.000,
    'kWh',
    0.618700,
    49.4960,
    '2026-10-15',
    '2026-10',
    'AI_VISION',
    'APPROVED',
    '11111111-1111-1111-1111-111111111111',
    '2026-10-16 09:00:00+00',
    'Quét hóa đơn tiền điện EVN qua AI OCR'
),
-- Bản ghi 2: Đốt gas nấu ăn (Đã duyệt)
(
    'el000002-0000-0000-0000-000000000002',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'ef000002-0000-0000-0000-000000000002',
    'FUEL_LPG',
    'Đốt gas (LPG) nấu ăn sinh hoạt',
    6.000,
    'kg',
    2.939360,
    17.6362,
    '2026-10-18',
    '2026-10',
    'MANUAL',
    'APPROVED',
    '11111111-1111-1111-1111-111111111111',
    '2026-10-18 10:30:00+00',
    'Đổi bình gas PetroVietnam 12kg nửa bình'
),
-- Bản ghi 3: Di chuyển xe máy đi làm (Đã duyệt)
(
    'el000003-0000-0000-0000-000000000003',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '44444444-4444-4444-4444-444444444444',
    'ef000004-0000-0000-0000-000000000004',
    'MOBILITY',
    'Di chuyển phương tiện cá nhân (Xe máy / Ô tô)',
    120.000,
    'km',
    0.103000,
    12.3600,
    '2026-10-20',
    '2026-10',
    'EXCEL_IMPORT',
    'APPROVED',
    '11111111-1111-1111-1111-111111111111',
    '2026-10-21 15:00:00+00',
    'Import lịch trình đi lại tuần 42'
),
-- Bản ghi 4: Nước sinh hoạt (Đang chờ duyệt - PENDING_REVIEW)
(
    'el000004-0000-0000-0000-000000000004',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '22222222-2222-2222-2222-222222222222',
    'ef000006-0000-0000-0000-000000000006',
    'WATER_SUPPLY_TREAT',
    'Tiêu thụ và xử lý nước sạch đô thị',
    18.000,
    'm3',
    0.191300,
    3.4434,
    '2026-10-25',
    '2026-10',
    'MANUAL',
    'PENDING_REVIEW',
    NULL,
    NULL,
    'Hóa đơn nước Sawaco kỳ tháng 10'
),
-- Bản ghi 5: Tiêu thụ giấy in (Bản nháp - DRAFT)
(
    'el000005-0000-0000-0000-000000000005',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '55555555-5555-5555-5555-555555555555',
    'ef000007-0000-0000-0000-000000000007',
    'OFFICE_PAPER',
    'Tiêu thụ giấy in văn phòng A4',
    2.500,
    'kg',
    1.343591,
    3.3590,
    '2026-10-28',
    '2026-10',
    'MANUAL',
    'DRAFT',
    NULL,
    NULL,
    'Mua 1 ram giấy Double A định lượng 80gsm'
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 10. SEED THAM SỐ TOÀN HỆ THỐNG & AI PROMPTS (system_configurations)
-- Căn cứ chi tiết: docs/08-ai-insight-specification.md Section 4.3
-- ==============================================================================
INSERT INTO system_configurations (config_key, config_value, description, updated_by)
VALUES
(
    'AI_MODEL_NAME',
    '{"value": "gemini-1.5-flash"}'::jsonb,
    'Tên mô hình AI chính dùng cho Insight và Vision Fallback',
    '33333333-3333-3333-3333-333333333333'
),
(
    'AI_TEMPERATURE',
    '{"value": 0.2}'::jsonb,
    'Nhiệt độ sinh văn bản thấp để đảm bảo tính xác thực, tránh ảo giác số liệu',
    '33333333-3333-3333-3333-333333333333'
),
(
    'AI_TIMEOUT_MS',
    '{"value": 15000}'::jsonb,
    'Thời gian chờ tối đa (ms) trước khi kích hoạt Circuit Breaker Fallback',
    '33333333-3333-3333-3333-333333333333'
),
(
    'PROMPT_INSIGHT_REPORT',
    '{
        "system_prompt": "BẠN LÀ MỘT CHUYÊN GIA NĂNG LƯỢNG XANH & PHÂN TÍCH DẤU CHÂN CARBON VI MÔ TẠI VIỆT NAM (Personal & Micro-Office Carbon Consultant). Nhiệm vụ của bạn là nhận dữ liệu tổng hợp phát thải từ hệ thống CarbonLedger và xuất ra Báo cáo Phân tích Chuyên sâu cùng Kế hoạch Hành động Cắt giảm Nhanh (Quick Wins).",
        "output_format": "JSON",
        "version": "1.0.0"
    }'::jsonb,
    'System prompt và schema cấu hình cho Báo cáo AI Insight định kỳ/on-demand',
    '33333333-3333-3333-3333-333333333333'
),
(
    'PROMPT_REDUCTION_PLANNER',
    '{
        "system_prompt": "BẠN LÀ CHUYÊN GIA HOẠCH ĐỊNH LỘ TRÌNH PHÁT THẢI RÒNG BẰNG 0 (Net-Zero Transition Planner) chuyên trách phân khúc vi mô (Hộ gia đình & Văn phòng nhỏ tại Việt Nam).",
        "output_format": "JSON",
        "version": "1.0.0"
    }'::jsonb,
    'System prompt và schema cho Lộ trình Cắt giảm Cá nhân hóa theo Mục tiêu',
    '33333333-3333-3333-3333-333333333333'
)
ON CONFLICT (config_key) DO UPDATE SET
    config_value = EXCLUDED.config_value,
    description = EXCLUDED.description,
    updated_at = CURRENT_TIMESTAMP;

-- ==============================================================================
-- 11. SEED BÁO CÁO PHÂN TÍCH AI MẪU (ai_reports)
-- ==============================================================================
INSERT INTO ai_reports 
(id, workspace_id, report_type, period, total_emissions_kg, variance_vs_last_period, breakdown_by_category, actionable_advice_markdown)
VALUES
(
    'ar000001-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'MONTHLY',
    '2026-10',
    82.93,
    -4.20,
    '{
        "ELEC_GRID": {"co2e_kg": 49.50, "percentage": 59.7},
        "FUEL_LPG": {"co2e_kg": 17.64, "percentage": 21.3},
        "MOBILITY": {"co2e_kg": 12.36, "percentage": 14.9},
        "WATER_SUPPLY_TREAT": {"co2e_kg": 3.44, "percentage": 4.1}
    }'::jsonb,
    '### Nhận định Chuyên môn Kỳ Tháng 10/2026
- **Điện lưới quốc gia** tiếp tục là nguồn phát thải áp đảo (59.7% tổng phát thải).
- Mức phát thải bình quân mỗi nhân khẩu: **20.73 kg CO2e/người/tháng**, thấp hơn mức tham chiếu quốc gia (155.25 kg CO2e/tháng).
- **Hành động đề xuất (Quick Wins):**
  1. Tăng nhiệt độ điều hòa lên 26°C kết hợp bật quạt gió: Tiết kiệm dự kiến ~12.5 kg CO2e/tháng.
  2. Gom chuyến đi mua sắm và đi bộ cự ly ngắn < 1.5 km: Tiết kiệm dự kiến ~4.2 kg CO2e/tháng.'
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 12. SEED KẾ HOẠCH LỘ TRÌNH CẮT GIẢM AI (emission_reduction_plans)
-- ==============================================================================
INSERT INTO emission_reduction_plans 
(id, workspace_id, created_by_user_id, baseline_period, baseline_emissions_kg, target_reduction_percentage, target_emissions_kg, time_horizon_months, monthly_roadmap, status)
VALUES
(
    'rp000001-0000-0000-0000-000000000001',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    '2026-10',
    82.93,
    15.00,
    70.49,
    3,
    '[
        {
            "month": 1,
            "period": "2026-11",
            "target_emissions_kg": 78.78,
            "reduction_cumulative_pct": 5.0,
            "actions": [
                {"title": "Cài đặt điều hòa nhiệt độ tối ưu 26°C", "expected_saving_kg": 4.15}
            ]
        },
        {
            "month": 2,
            "period": "2026-12",
            "target_emissions_kg": 74.64,
            "reduction_cumulative_pct": 10.0,
            "actions": [
                {"title": "Tắt nguồn chờ các thiết bị điện tử gia dụng", "expected_saving_kg": 4.14}
            ]
        },
        {
            "month": 3,
            "period": "2027-01",
            "target_emissions_kg": 70.49,
            "reduction_cumulative_pct": 15.0,
            "actions": [
                {"title": "Chuyển đổi 2 ngày đi xe buýt điện / metro thay xe máy cá nhân", "expected_saving_kg": 4.15}
            ]
        }
    ]'::jsonb,
    'ACTIVE'
)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 13. SEED NHẬT KÝ KIỂM TOÁN HỆ THỐNG (system_audit_logs)
-- ==============================================================================
INSERT INTO system_audit_logs (admin_id, action, resource_type, resource_id, details, ip_address)
VALUES
(
    '33333333-3333-3333-3333-333333333333',
    'INIT_SYSTEM_FACTORS',
    'STANDARD_FACTOR',
    'ALL',
    '{"message": "Khởi tạo thành công 8 danh mục hệ số phát thải quy chuẩn quốc gia"}'::jsonb,
    '127.0.0.1'
);

-- ==============================================================================
-- 14. SEED GIÁM SÁT SỬ DỤNG AI (ai_usage_logs)
-- ==============================================================================
INSERT INTO ai_usage_logs (workspace_id, service_type, prompt_tokens, completion_tokens, estimated_cost_usd)
VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'INSIGHT_GENERATOR',
    1250,
    480,
    0.000346
),
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'REDUCTION_PLANNER',
    1680,
    720,
    0.000480
);
