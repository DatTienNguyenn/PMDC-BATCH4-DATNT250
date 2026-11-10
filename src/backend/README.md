# 🌿 CarbonLedger Backend API Service (`/src/backend`)

Hệ thống Core API Xử lý Nghiệp vụ & Dịch vụ AI cho Dự án **Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ (Personal & Micro-Office Carbon Ledger)**.

---

## 🚀 1. Ngăn Xếp Công Nghệ (Tech Stack)

Căn cứ theo đặc tả kỹ thuật tại [01-PRD.md](../../docs/01-PRD.md), [c4-documentation.md](../../docs/c4-documentation/c4-documentation.md) và [api-schema.md](../../docs/api-schema/api-schema.md):

| Thành phần | Công nghệ / Thư viện | Mục đích sử dụng |
|---|---|---|
| **Runtime & Language** | **Java 21 LTS (OpenJDK 21)** | Nền tảng thực thi hiệu năng cao, Record patterns, Virtual Threads ready |
| **Framework Core** | **Spring Boot 3.3.5** | Khung kiến trúc ứng dụng RESTful API chuẩn mực |
| **Security & RBAC** | **Spring Security 6.x + JJWT (0.12.6)** | Xác thực không lưu phiên (Stateless JWT), phân quyền RBAC 3 vai trò |
| **Multi-Tenancy** | **TenantContextFilter + ThreadLocal** | Cách ly dữ liệu các Workspace bằng discriminator column `workspace_id` |
| **Data Persistence** | **Spring Data JPA + Hibernate 6** | Tương thích 14 bảng cơ sở dữ liệu quan hệ PostgreSQL 16 |
| **Database Driver** | **PostgreSQL JDBC Driver + HikariCP** | Connection pooling tối ưu hóa cho môi trường phân tán |
| **Math Precision** | **`java.math.BigDecimal` (HALF_UP)** | Loại bỏ hoàn toàn sai số làm tròn trong kế toán phát thải carbon |
| **Excel Streaming** | **Apache POI (5.3.0)** | Phân tích tệp `.xlsx` nạp hàng loạt ($\le 5\text{s}$ cho 100 dòng) |
| **PDF Generation** | **OpenPDF (2.0.3)** | Xuất báo cáo đồ họa vector chuẩn in ấn ($\le 3-5\text{s}$) |
| **Rate Limiting** | **Bucket4j (8.10.1)** | Chống nghẽn và lạm dụng API |
| **API Documentation** | **Springdoc OpenAPI 3 (2.6.0)** | Tự động tạo Swagger UI tương tác tại `/swagger-ui.html` |
| **AI Integration** | **Google Gemini 1.5 Flash (RestClient)** | Phân tích cơ cấu phát thải và gợi ý lộ trình cắt giảm cá nhân hóa |

---

## 🏛️ 2. Cấu Trúc Gói Lớp (Package Architecture)

Mã nguồn tuân thủ mô hình phân tầng chặt chẽ C4 Level 3 & Level 4:

```
com.carbonledger.backend
├── config                       # Cấu hình Spring Security, CORS, OpenAPI, AI RestClient, Scheduler
├── security                     # JWT Provider, Auth Filter, TenantContextFilter, WorkspaceSecurity
├── entity                       # 14 JPA Entities (Users, Workspaces, EmissionLogs, Budgets, etc.)
│   └── enums                    # Kiểu liệt kê chuẩn (GlobalRole, WorkspaceRole, LogStatus, etc.)
├── repository                   # Spring Data JPA Repositories (Hỗ trợ truy vấn multi-tenant)
├── service                      # Các Engine nghiệp vụ lõi:
│   ├── EmissionCalculationEngine.java  # Tính toán kg CO2e = Sản lượng x Hệ số (BigDecimal)
│   ├── ExcelProcessingEngine.java       # Validate tệp Excel Apache POI Streaming
│   ├── ApprovalWorkflowEngine.java      # Vòng đời duyệt PENDING_REVIEW -> APPROVED / REJECTED
│   ├── BudgetAndAlertEngine.java        # Đối soát hạn mức 85%/100% & Benchmark Quốc gia (155.25 kg)
│   ├── AIInsightService.java            # Gom dữ liệu, gọi LLM Gemini & Tác vụ Cronjob @Scheduled
│   ├── GeminiClient.java                # Client kết nối Google Gemini API với JSON mode
│   ├── PdfExportService.java            # Kết xuất tài liệu PDF in ấn
│   ├── MasterDataService.java           # Quản lý danh mục 8 hệ số phát thải quy chuẩn
│   └── AuditLogService.java             # Ghi vết kiểm toán các thao tác nhạy cảm
├── controller                   # REST Controllers (/api/v1/auth, /workspaces, /emissions, /approvals, /budgets, /reports, /admin)
├── dto                          # DTOs Request/Response và RFC 7807 Problem Details
└── exception                    # Bộ xử lý lỗi tập trung GlobalExceptionHandler
```

---

## 🔐 3. Cơ Chế Multi-Tenancy & Phân Quyền

1. **Header Định danh Không gian (`X-Workspace-Id`):**
   - Mọi request yêu cầu ngữ cảnh dữ liệu phải đính kèm Header `X-Workspace-Id: <UUID>`.
   - `TenantContextFilter` tự động giải mã, kiểm tra quyền thành viên trong bảng `workspace_members`, và lưu trữ trong `TenantContext` (ThreadLocal).
2. **Quyền hạn 3 Vai trò (RBAC):**
   - **`SYSTEM_ADMIN`:** Toàn quyền quản trị danh mục hệ số quy chuẩn (`/api/v1/admin/**`) và xem Audit Log.
   - **`REVIEWER` (Trưởng nhóm):** Duyệt/Từ chối bản ghi (`/api/v1/approvals/**`), thiết lập ngân sách (`/api/v1/budgets`), xuất PDF.
   - **`EDITOR` (Thành viên):** Nạp phát thải thủ công hoặc Excel; bản ghi nạp vào sẽ lưu ở trạng thái `PENDING_REVIEW` chờ duyệt.

---

## 📐 4. Độ Chính Xác Tính Toán (Exact Math Precision)

Toàn bộ các trường định lượng phát thải, sản lượng và hệ số áp dụng trong hệ thống sử dụng kiểu `java.math.BigDecimal` với chế độ làm tròn `RoundingMode.HALF_UP`:
$$\text{Total CO}_2\text{e} (\text{kg}) = \text{Sản lượng} \times \text{Hệ số phát thải chuẩn quy đổi}$$
Hệ số áp dụng tại thời điểm duyệt được đóng băng vĩnh viễn trên bản ghi `emission_logs.factor_applied` (`NUMERIC(12, 6)`), bảo đảm tính bất biến của sổ cái carbon theo thời gian.

---

## 🛠️ 5. Hướng Dẫn Khởi Chạy & Kiểm Thử

### Yêu Cầu Môi Trường
- **JDK:** OpenJDK 21 LTS (Hệ thống đã tích hợp cấu hình tự động tại `~/.mavenrc` hoặc dùng JDK cài đặt trên máy).
- **PostgreSQL 16:** Đang chạy tại cổng `5432` với database `carbon_ledger` (xem hướng dẫn tại `database/README.md`).

### Các Lệnh Thực Thi Tiện Ích

Từ thư mục gốc dự án:
```bash
# Khởi chạy PostgreSQL qua docker-compose (nếu dùng Docker)
npm run db:up

# Kiểm thử toàn bộ unit tests backend
npm run backend:test

# Khởi chạy backend ở môi trường development (port 8080)
npm run backend:dev

# Đóng gói file JAR backend
npm run backend:build
```

Hoặc trực tiếp từ thư mục `/src/backend`:
```bash
cd src/backend

# Chạy Unit Tests
./mvnw test

# Khởi chạy Spring Boot Dev Server
./mvnw spring-boot:run

# Build JAR package (bỏ qua tests nếu cần)
./mvnw clean package -DskipTests
```

---

## 📖 6. Tài Liệu API Tương Tác (Swagger UI)

Khi ứng dụng backend đang chạy, truy cập tài liệu API trực tiếp tại:
- **Swagger UI:** `http://localhost:8080/swagger-ui.html`
- **OpenAPI Schema (JSON):** `http://localhost:8080/v3/api-docs`
- **Health Check Endpoint:** `http://localhost:8080/api/v1/health`
