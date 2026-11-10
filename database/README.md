# 🗄️ CarbonLedger Database Initialization & Schema (`/database`)

Thư mục lưu trữ toàn bộ mã nguồn DDL, dữ liệu mẫu (Seed Data) và kịch bản khởi tạo cơ sở dữ liệu quan hệ **PostgreSQL 16** cho dự án **Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ (Personal & Micro-Office Carbon Ledger)**.

---

## 📌 1. Danh Mục Tệp Tin

| Tệp tin | Vai trò & Mục đích |
|---|---|
| [`01_schema.sql`](01_schema.sql) | DDL script khởi tạo toàn bộ 14 bảng dữ liệu, kiểu dữ liệu UUID v4, JSONB, ràng buộc CHECK, khóa ngoại và chỉ mục tối ưu (Partial Indexes). |
| [`02_seed.sql`](02_seed.sql) | Master Data 8 hoạt động phát thải quy chuẩn, mốc tham chiếu quốc gia (OWID 2024), tài khoản người dùng 3 roles, 2 workspaces đa người thuê và sổ cái mẫu. |
| [`docker-compose.yml`](docker-compose.yml) | Cấu hình Docker Compose khởi chạy PostgreSQL 16 Alpine, tự động mount và chạy các script SQL khi container khởi động lần đầu. |
| [`init.sh`](init.sh) | Kịch bản bash tiện ích tự động hóa các thao tác: chạy docker, chạy local psql, reset toàn bộ volume, và đối soát số lượng bản ghi (verify). |

---

## 🚀 2. Hướng Dẫn Khởi Chạy Nhanh (Quick Start)

### Cách 1: Khởi chạy bằng Docker Compose (Khuyến nghị)

Chỉ cần một dòng lệnh từ thư mục gốc dự án:

```bash
# Khởi chạy database và tự động nạp schema + seed data
npm run db:up

# Hoặc chạy trực tiếp script init:
./database/init.sh docker
```

Để xóa dữ liệu cũ và nạp lại toàn bộ từ đầu (Reset):
```bash
npm run db:reset
# Hoặc: ./database/init.sh reset
```

Để dừng container:
```bash
npm run db:down
```

### Cách 2: Khởi chạy trên PostgreSQL cục bộ (Local psql)

Nếu bạn đã có dịch vụ PostgreSQL đang chạy trực tiếp trên máy host:

```bash
# Thiết lập biến môi trường kết nối (nếu khác mặc định)
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=carbon_ledger
export DB_USER=postgres
export DB_PASSWORD=your_password

# Chạy lệnh nạp script
./database/init.sh local
```

---

## 🔑 3. Thông Số Kết Nối Mặc Định

| Tham số | Giá trị mặc định |
|---|---|
| **Host** | `localhost` |
| **Port** | `5432` |
| **Database Name** | `carbon_ledger` |
| **Username** | `carbon_admin` |
| **Password** | `carbon_secret` |
| **JDBC Connection URL** | `jdbc:postgresql://localhost:5432/carbon_ledger` |

---

## 👥 4. Dữ Liệu Tài Khoản Thử Nghiệm (Seed Accounts)

Toàn bộ tài khoản có mật khẩu mặc định là: **`password123`**

| Vai trò (Role) | Họ và tên | Email | Mô tả quyền hạn |
|---|---|---|---|
| **Trưởng nhóm (Reviewer)** | Nguyễn Văn An | `admin.workspace@carbonledger.vn` | Quản trị Workspace `Gia Đình Xanh`, duyệt bản ghi phát thải, cấu hình ngân sách & xem báo cáo AI. |
| **Thành viên (Editor)** | Trần Thị Bình | `member@carbonledger.vn` | Khai báo phát thải cá nhân (DRAFT, PENDING_REVIEW), xem Dashboard cá nhân. |
| **Quản trị hệ thống (System Admin)** | Vũ Quản Trị | `sysadmin@carbonledger.vn` | Quản trị danh mục hệ số phát thải quốc gia, cấu hình Prompt AI & xem Audit Logs. |

---

## 📊 5. Cấu Trúc Các Bảng Dữ Liệu (14 Bảng)

1. `users`: Tài khoản người dùng toàn hệ thống, phân quyền `global_role` (`SYSTEM_ADMIN`, `USER`).
2. `workspaces`: Không gian làm việc đa người thuê (`HOME`, `OFFICE`), cấu hình lịch báo cáo AI.
3. `workspace_members`: Liên kết người dùng vào Workspace với vai trò `role` (`REVIEWER`, `EDITOR`).
4. `workspace_join_requests`: Kiểm soát luồng xin gia nhập 2 bước qua Invite Code (`PENDING`, `APPROVED`, `REJECTED`).
5. `workspace_baselines`: Thông số nền diện tích ($m^2$) và số nhân khẩu/nhân sự phục vụ tính đối chuẩn.
6. `standard_emission_factors`: Danh mục hệ số phát thải quy chuẩn 8 hoạt động (Điện, Gas, Dầu, Xe, Rác, Nước, Giấy, Máy bay).
7. `system_reference_benchmarks`: Mức phát thải tham chiếu quốc gia ($3,670\text{ kg CO}_2\text{e/người/năm}$, tỷ lệ hộ gia đình $50.8\%$, nơi làm việc $100\%$).
8. `carbon_budgets`: Hạn ngạch phát thải tháng và ngưỡng cảnh báo sớm $85\%$.
9. `emission_logs`: Sổ cái ghi nhận phát thải, lưu cứng `factor_applied` bảo đảm tính bất biến, trạng thái duyệt.
10. `ai_reports`: Báo cáo phân tích bất thường định kỳ và giải pháp cắt giảm nhanh (Quick Wins).
11. `system_configurations`: Cấu hình tham số AI (`AI_MODEL_NAME`, Prompts) tránh hardcode trong mã nguồn.
12. `system_audit_logs`: Nhật ký kiểm toán thao tác của Quản trị viên hệ thống.
13. `ai_usage_logs`: Giám sát số token và chi phí gọi Google Gemini API.
14. `emission_reduction_plans`: Lộ trình mục tiêu cắt giảm phát thải nhiều tháng cá nhân hóa do AI hoạch định.

---

## 🔍 6. Các Truy Vấn Đối Soát Mẫu (Verification Queries)

Sau khi khởi tạo xong, bạn có thể kiểm tra dữ liệu bằng các câu lệnh SQL sau:

```sql
-- 1. Thống kê tổng số lượng bản ghi của toàn bộ các bảng
SELECT table_name, 
       (xpath('/row/cnt/text()', xml_count))[1]::text::int as record_count
FROM (
  SELECT table_name, 
         query_to_xml(format('select count(*) as cnt from %I', table_name), false, true, '') as xml_count
  FROM information_schema.tables
  WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
) t
ORDER BY table_name;

-- 2. Kiểm tra tính toán tổng phát thải tháng 10/2026 của Workspace Gia Đình Xanh
SELECT 
    w.name AS workspace_name,
    l.billing_period,
    l.category_code,
    SUM(l.consumption_quantity) AS total_consumption,
    l.input_unit,
    SUM(l.total_co2e_kg) AS total_co2e_kg
FROM emission_logs l
JOIN workspaces w ON l.workspace_id = w.id
WHERE l.status = 'APPROVED'
GROUP BY w.name, l.billing_period, l.category_code, l.input_unit
ORDER BY total_co2e_kg DESC;

-- 3. Kiểm tra tỷ lệ phát thải so với hạn ngạch ngân sách (Cảnh báo 85%)
SELECT 
    w.name,
    b.period,
    b.target_co2e_kg AS monthly_budget_kg,
    COALESCE(SUM(l.total_co2e_kg), 0) AS current_emissions_kg,
    ROUND((COALESCE(SUM(l.total_co2e_kg), 0) / b.target_co2e_kg) * 100, 2) AS usage_percent,
    CASE 
        WHEN COALESCE(SUM(l.total_co2e_kg), 0) >= b.target_co2e_kg THEN '🚨 VƯỢT HẠN NGẠCH'
        WHEN COALESCE(SUM(l.total_co2e_kg), 0) >= (b.target_co2e_kg * b.alert_threshold_ratio) THEN '⚠️ CẢNH BÁO SỚM 85%'
        ELSE '✅ AN TOÀN'
    END AS budget_status
FROM carbon_budgets b
JOIN workspaces w ON b.workspace_id = w.id
LEFT JOIN emission_logs l ON l.workspace_id = b.workspace_id AND l.billing_period = b.period AND l.status = 'APPROVED'
GROUP BY w.name, b.period, b.target_co2e_kg, b.alert_threshold_ratio;
```
