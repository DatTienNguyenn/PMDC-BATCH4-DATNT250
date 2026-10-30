# BẢNG KIỂM CHUẨN KIẾN TRÚC C4 DOCUMENTATION (C4 ARCHITECTURE VERIFICATION & COMPLIANCE BENCHMARK)

## Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ
### (Personal & Micro-Office Carbon Ledger)

---

## 📑 MỤC LỤC
1. [Mục Đích, Phạm Vi & Tiêu Chuẩn Áp Dụng](#1-mục-đích-phạm-vi--tiêu-chuẩn-áp-dụng)
2. [Khung Đánh Giá & Quy Định Thang Điểm (Quality Gate Framework)](#2-khung-đánh-giá--quy-định-thang-điểm-quality-gate-framework)
3. [Bảng Kiểm Chuẩn Chi Tiết 5 Trụ Cột (5-Pillar Verification Checklist)](#3-bảng-kiểm-chuẩn-chi-tiết-5-trụ-cột-5-pillar-verification-checklist)
   - [Trụ cột 1: Chuẩn mực Cấu trúc & Quy ước Mô hình C4](#trụ-cột-1-chuẩn-mực-cấu-trúc--quy-ước-mô-hình-c4-c4-model-standard-compliance)
   - [Trụ cột 2: Độ phủ Nghiệp vụ, Use Cases & User Stories](#trụ-cột-2-độ-phủ-nghiệp-vụ-use-cases--user-stories-business-coverage)
   - [Trụ cột 3: Độ khớp Kiến trúc Thông tin (IA) & RESTful API](#trụ-cột-3-độ-khớp-kiến-trúc-thông-tin-ia--restful-api-alignment)
   - [Trụ cột 4: Độ khớp Cơ sở Dữ liệu & Tính Toàn vẹn Dữ liệu](#trụ-cột-4-độ-khớp-cơ-sở-dữ-liệu--tính-toàn-vẹn-dữ-liệu-database--data-integrity)
   - [Trụ cột 5: Kiểm chuẩn Ràng buộc Phi chức năng (NFRs) & Bảo mật](#trụ-cột-5-kiểm-chuẩn-ràng-buộc-phi-chức-năng-nfrs--bảo-mật-operational-readiness)
4. [Ma Trận Đối Soát Truy Vết Toàn Diện (End-to-End Traceability Matrix)](#4-ma-trận-đối-soát-truy-vết-toàn-diện-end-to-end-traceability-matrix)
5. [Báo Cáo Đánh Giá & Minh Chứng Kiểm Chuẩn (Verification Findings & Evidence)](#5-báo-cáo-đánh-giá--minh-chứng-kiểm-chuẩn-verification-findings--evidence)
6. [Biên Bản Nghiệm Thu & Phê Duyệt Kiến Trúc (Architecture Sign-Off Declaration)](#6-biên-bản-nghiệm-thu--phê-duyệt-kiến-trúc-architecture-sign-off-declaration)

---

## 1. MỤC ĐÍCH, PHẠM VI & TIÊU CHUẨN ÁP DỤNG

### 1.1. Mục Đích
Tài liệu này đóng vai trò là **Bộ Tiêu Chuẩn Kiểm Chuẩn & Đánh Giá Chất Lượng Kiến Trúc (Quality Gate & Compliance Benchmark)** dành riêng cho tài liệu Thiết kế Kiến trúc C4 (`docs/c4-documentation/c4-documentation.md`) thuộc dự án **Personal & Micro-Office Carbon Ledger**. Tài liệu nhằm bảo đảm rằng:
1. Mô hình C4 được xây dựng chuẩn mực theo đúng lý thuyết kiến trúc của **Simon Brown**, có phân cấp đầy đủ và chặt chẽ từ Tổng quan (Context) đến Thành phần chi tiết (Component) và Triển khai (Deployment).
2. Thiết kế kiến trúc phản ánh chính xác $100\%$ các yêu cầu nghiệp vụ, ma trận phân quyền, phạm vi bài toán đã cam kết trong [docs/PRD.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/PRD.md) và [spec.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/spec.md).
3. Không tồn tại bất kỳ độ lệch (gap/mismatch) nào giữa kiến trúc logic với 26 màn hình trong [docs/information-architecture/information-architecture.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/information-architecture/information-architecture.md), hệ thống API trong [docs/api-schema/api-schema.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/api-schema/api-schema.md) và 11 bảng cơ sở dữ liệu PostgreSQL.

### 1.2. Hồ Sơ Tài Liệu Dự Án Làm Căn Cứ Đối Soát
- **PRD & DB Schema:** [docs/PRD.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/PRD.md) (Phiên bản đã phê duyệt).
- **Kiến trúc Thông tin & Sitemap:** [docs/information-architecture/information-architecture.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/information-architecture/information-architecture.md).
- **Đặc tả RESTful API Schema:** [docs/api-schema/api-schema.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/api-schema/api-schema.md) & [docs/api-schema/openapi.yaml](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/api-schema/openapi.yaml).
- **Đặc tả Phạm vi & Use Cases:** [spec.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/spec.md) & [docs/usecase/use-cases.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/usecase/use-cases.md).
- **Danh mục User Stories Chuẩn INVEST & Gherkin:** [docs/user-stories.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/user-stories.md).
- **Phương pháp luận Phát thải Tham chiếu Quốc gia:** [docs/emission-reference-benchmark.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/emission-reference-benchmark.md).
- **Danh mục Hoạt động & Hệ số Quy chuẩn:** [docs/activity-supported.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/activity-supported.md).
- **Kế hoạch Phát hành MVP 6 Tuần:** [docs/MVP.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-c4-documentation/docs/MVP.md).

---

## 2. KHUNG ĐÁNH GIÁ & QUY ĐỊNH THANG ĐIỂM (QUALITY GATE FRAMEWORK)

### 2.1. Phân Bổ Trọng Số 5 Trụ Cột Đánh Giá

| STT | Trụ Cột Đánh Giá (Audit Pillars) | Số Tiêu Chí | Trọng Số (%) | Điểm Tối Đa |
|:---:|---|:---:|:---:|:---:|
| **1** | **Chuẩn mực Cấu trúc & Quy ước Mô hình C4 (C4 Model Compliance)** | 5 tiêu chí | $20\%$ | 20 điểm |
| **2** | **Độ phủ Nghiệp vụ, Use Cases & User Stories (Business Coverage)** | 6 tiêu chí | $20\%$ | 20 điểm |
| **3** | **Độ khớp Kiến trúc Thông tin (IA) & RESTful API (IA & API Alignment)** | 5 tiêu chí | $20\%$ | 20 điểm |
| **4** | **Độ khớp Cơ sở Dữ liệu & Tính Toàn vẹn Dữ liệu (Database & Data Integrity)** | 5 tiêu chí | $20\%$ | 20 điểm |
| **5** | **Kiểm chuẩn Ràng buộc Phi chức năng (NFRs) & Bảo mật (NFR & Security)** | 5 tiêu chí | $20\%$ | 20 điểm |
| **TỔNG**| **TOÀN BỘ 5 TRỤ CỘT KIỂM CHUẨN** | **26 tiêu chí** | **$100\%$** | **100 điểm** |

### 2.2. Điều Kiện Vượt Qua Kiểm Chuẩn (Pass / Fail Criteria)
- **ĐẠT (PASSED):** Tổng điểm đánh giá đạt $\ge 90/100$ điểm, trong đó **không có bất kỳ tiêu chí nào bị đánh giá FAIL (0 điểm)** đối với các hạng mục Bắt buộc (Mandatory / Blocker).
- **KHÔNG ĐẠT (FAILED):** Tổng điểm $< 90/100$ điểm HOẶC có ít nhất 1 tiêu chí Blocker không đáp ứng (sai lệch dữ liệu, thiếu tầng kiến trúc, hoặc vi phạm tính bất biến).

---

## 3. BẢNG KIỂM CHUẨN CHI TIẾT 5 TRỤ CỘT (5-PILLAR VERIFICATION CHECKLIST)

### Trụ Cột 1: Chuẩn Mực Cấu Trúc & Quy Ước Mô Hình C4 (C4 Model Standard Compliance)

> **Mục tiêu:** Kiểm tra xem tài liệu C4 có tuân thủ đúng 4 cấp độ trực quan hóa kiến trúc của Simon Brown, phân tách ranh giới rõ ràng và sử dụng cú pháp biểu đồ Mermaid hợp lệ hay không.

| Mã TC | Tiêu Chí Kiểm Chuẩn Chi Tiết | Yêu Cầu Cụ Thể | Trọng Số | Đánh Giá | Minh Chứng Trong Tài Liệu C4 |
|:---:|---|---|:---:|:---:|---|
| **C4-01** | **C4 Level 1: System Context Diagram** | - Xác định rõ ranh giới hệ thống phần mềm trung tâm.<br>- Định danh đầy đủ 3 Personas: System Admin, Reviewer, Editor.<br>- Liệt kê đầy đủ 3 External Cloud Systems: Google Gemini API, SMTP Gateway, Volume Storage.<br>- Thể hiện rõ giao thức kết nối (HTTPS, SMTP, POSIX) và bản chất tương tác. | 4 điểm | **ĐẠT (4/4)** ✅ | Mục 2.1 & 2.2 thể hiện sơ đồ Mermaid Context Diagram chuẩn mực, bảng phân loại Actor/System chi tiết. |
| **C4-02** | **C4 Level 2: Container Diagram** | - Phóng to chi tiết bên trong ranh giới hệ thống thành các khối thực thi (Containers).<br>- Phân định rõ 4 Containers nội bộ: React 18 Vite Client (SPA/PWA), Java 21 Spring Boot Core API, PostgreSQL 16 RDBMS, Volume File Storage.<br>- Định rõ giao thức giao tiếp giữa các Container (HTTPS/JSON REST, JDBC/TCP, Direct Mount). | 4 điểm | **ĐẠT (4/4)** ✅ | Mục 3.1 & 3.2 mô tả chi tiết từng Container, tech stack, cơ chế bảo mật và giao thức mạng. |
| **C4-03** | **C4 Level 3: Component Diagram** | - Phóng to bên trong Container Java Spring Boot Core.<br>- Chia tách thành các tầng rõ ràng: Filter/Security Gateway, REST Controllers, Core Business Engines, Background Schedulers, Spring Data Repositories.<br>- Định danh đầy đủ các Engine: `CalcEngine`, `ExcelProcessor`, `ApprovalEngine`, `BudgetAlertEngine`, `AIInsightService`, `PDFGenerator`. | 4 điểm | **ĐẠT (4/4)** ✅ | Mục 4.1 & 4.2 cung cấp sơ đồ phân rã Component mạch lạc kèm danh mục chức năng 100% khớp PRD. |
| **C4-04** | **C4 Level 4: Code & Deployment Architecture** | - Cung cấp mô hình lớp thực thể miền nghiệp vụ cốt lõi (Domain Class Diagram) với kiểu số thực `BigDecimal`.<br>- Thể hiện các Design Patterns (Template Method, Strategy, Specification, State).<br>- Cung cấp sơ đồ triển khai vật lý (Deployment Diagram) với Docker Containers, Nginx Reverse Proxy, DMZ, App Zone và Data Zone. | 4 điểm | **ĐẠT (4/4)** ✅ | Mục 5.1, 5.2 & 5.3 mô tả chi tiết Domain Model, Design Patterns và Sơ đồ kiến trúc triển khai Docker. |
| **C4-05** | **Cú Pháp Biểu Đồ & Quy Chuẩn Trình Bày** | - $100\%$ các biểu đồ Mermaid sử dụng cú pháp chuẩn (`flowchart TD`, `classDiagram`).<br>- Toàn bộ nhãn node chứa ký tự đặc biệt (`()`, `[]`, `/`, `:`, `&`) đều được bọc trong dấu ngoặc kép `""`.<br>- Không bị lỗi cú pháp render trên GitHub / GitLab / Markdown viewers. | 4 điểm | **ĐẠT (4/4)** ✅ | Toàn bộ 4 biểu đồ Mermaid trong tài liệu C4 tuân thủ nghiêm ngặt chuẩn cú pháp, render hoàn hảo. |

---

### Trụ Cột 2: Độ Phủ Nghiệp Vụ, Use Cases & User Stories (Business Coverage)

> **Mục tiêu:** Kiểm tra xem các thành phần kiến trúc có bao phủ đầy đủ $100\%$ danh mục 12 Use Cases và 15 User Stories, tuân thủ đúng 4 luồng hoạt động cốt lõi và ma trận phân quyền RBAC hay không.

| Mã TC | Tiêu Chí Kiểm Chuẩn Chi Tiết | Yêu Cầu Cụ Thể | Trọng Số | Đánh Giá | Minh Chứng Trong Tài Liệu C4 |
|:---:|---|---|:---:|:---:|---|
| **BUS-01** | **Bao phủ Đầy đủ 12 Use Cases (UC01 - UC12)** | - Mọi Use Case từ UC01 đến UC12 đều có Controller, Service Engine và luồng dữ liệu tương ứng đảm nhiệm xử lý.<br>- Không bỏ sót bất kỳ Use Case nào trong kiến trúc C4. | 4 điểm | **ĐẠT (4/4)** ✅ | Bảng đối soát Ma trận Truy vết (Mục 4) chứng minh độ phủ $12/12$ Use Cases ($100\%$). |
| **BUS-02** | **Bao phủ Đầy đủ 15 User Stories (US-*)** | - Các thành phần kiến trúc đáp ứng đầy đủ tiêu chí chấp nhận Gherkin (ACs) của 15 User Stories trong `user-stories.md`.<br>- Hỗ trợ đầy đủ các tính năng Must-have, Should-have và Could-have. | 3 điểm | **ĐẠT (3/3)** ✅ | Ánh xạ 1:1 đầy đủ từ `US-WS-001` đến `US-AI-002` trong Component Catalog và Ma trận truy vết. |
| **BUS-03** | **Kiểm chuẩn Ma Trận Phân Quyền (RBAC Alignment)** | - Thể hiện rõ 3 vai trò: System Admin, Workspace Admin (Reviewer), Workspace Member (Editor).<br>- Phân định rõ quyền tự duyệt của Reviewer và trạng thái Draft của Editor khi nạp phát thải.<br>- System Admin quản lý Master Data Hệ số chuẩn và Tenants, không can thiệp vào sổ cái riêng tư của Workspace. | 3 điểm | **ĐẠT (3/3)** ✅ | Thể hiện qua `TenantContextFilter`, `AuthService`, `ApprovalWorkflowEngine` và phân quyền Controller. |
| **BUS-04** | **Bao phủ 4 Luồng Hoạt Động Cốt Lõi (4 Core Workflows)** | - Luồng 1: Onboarding, thiết lập thông số nền ($m^2$, số người) và Ngân sách tháng.<br>- Luồng 2: Nạp dữ liệu có cấu trúc (Nhập tay, Excel, AI Vision) & Duyệt.<br>- Luồng 3: Quy đổi kg CO2e, cộng dồn sổ cái và cảnh báo ngưỡng 85%/100%.<br>- Luồng 4: AI Insight định kỳ qua Cronjob hoặc On-demand & Xuất PDF. | 4 điểm | **ĐẠT (4/4)** ✅ | Các Service Engine (`CalcEngine`, `ExcelProcessor`, `ApprovalEngine`, `BudgetAlertEngine`, `AIInsightService`, `PDFGenerator`) bao trọn 4 luồng. |
| **BUS-05** | **Đúng Đắn Mức Tham Chiếu Quốc Gia (National Benchmark)** | - Thể hiện công thức và cơ chế đối soát Mức phát thải tham chiếu quốc gia ($3.67\text{ tấn/người/năm}$).<br>- Áp dụng chính xác tỷ lệ $46.4\%$ ($141.91\text{ kg CO}_2\text{e}/\text{người/tháng}$) cho Hộ gia đình và $100\%$ ($305.83\text{ kg CO}_2\text{e}/\text{người/tháng}$) cho Nơi làm việc. | 3 điểm | **ĐẠT (3/3)** ✅ | Đặc tả chi tiết trong `BudgetAndAlertEngine` (Mục 4.2.2 của tài liệu C4), khớp 100% với tài liệu tham chiếu. |
| **BUS-06** | **Ranh Giới AI: Đề Xuất Giải Pháp, Không Cắt Giảm Vật Lý** | - Tài liệu kiến trúc thể hiện rõ: AI đóng vai trò cố vấn dữ liệu, phân tích bất thường và hỗ trợ đề xuất phương án cắt giảm cá nhân hóa.<br>- Không thiết kế can thiệp tự động ngắt điện/nước vật lý hay kết nối IoT. | 3 điểm | **ĐẠT (3/3)** ✅ | Nhấn mạnh rõ tại Mục 1.1, Sơ đồ Context L1 và ADR-04 trong tài liệu C4. |

---

### Trụ Cột 3: Độ Khớp Kiến Trúc Thông Tin (IA) & RESTful API (IA & API Alignment)

> **Mục tiêu:** Kiểm tra sự tương thích tuyệt đối giữa các thành phần C4 với 26 màn hình trong Information Architecture và 21 RESTful API Endpoints trong API Schema.

| Mã TC | Tiêu Chí Kiểm Chuẩn Chi Tiết | Yêu Cầu Cụ Thể | Trọng Số | Đánh Giá | Minh Chứng Trong Tài Liệu C4 |
|:---:|---|---|:---:|:---:|---|
| **API-01** | **Bao phủ Toàn Bộ 26 Màn hình & Giao diện (`SCR-*`)** | - Tầng Client (React PWA) trong Container L2 và các Controllers trong Component L3 phục vụ đầy đủ dữ liệu cho 26 Màn hình, Modals, Drawers và Error Views trong Sitemap. | 4 điểm | **ĐẠT (4/4)** ✅ | Bảng Container Catalog (Mục 3.2) và Ma trận truy vết đối soát đầy đủ 26 mã `SCR-*`. |
| **API-02** | **Bao phủ 100% Danh Mục RESTful API Endpoints** | - Các Controllers tại tầng C4 L3 (`AuthController`, `WorkspaceController`, `EmissionController`, `ApprovalController`, `BudgetController`, `AIReportController`, `AdminController`) bao phủ toàn bộ 21+ endpoints trong `api-schema.md`. | 4 điểm | **ĐẠT (4/4)** ✅ | Liệt kê chi tiết từng Controller gắn với các route tương ứng tại Mục 4.1 và 4.2.1. |
| **API-03** | **Đồng Bộ DTOs & Validation Contracts** | - Các đối tượng truyền nhận dữ liệu (DTO) được chuẩn hóa: `LoginRequest`, `ExcelImportPreviewDTO`, `EmissionCreateRequest`, `BudgetSetRequest`, `AIReportResponse`.<br>- Xác thực ràng buộc dữ liệu chặt chẽ ở tầng Controller trước khi chuyển vào Service. | 4 điểm | **ĐẠT (4/4)** ✅ | Đồng bộ hoàn toàn với Request/Response contracts trong OpenAPI 3.1 spec. |
| **API-04** | **Hợp Đồng Trạng Thái Giao Diện (UI State Contracts)** | - Hỗ trợ đầy đủ 5 cung bậc trạng thái UI: `Loading`, `Empty`, `Success / Ideal`, `Partial / Warning`, `Error / Failed`.<br>- Trả về mã lỗi chuẩn RFC 7807 Problem Details khi có sự cố. | 4 điểm | **ĐẠT (4/4)** ✅ | Được tích hợp vào tầng React PWA Client và Exception Handler của Spring Boot. |
| **API-05** | **Cơ Chế Điều Hướng Lỗi An Toàn (Error Routing Guard)** | - Xử lý chuyển hướng trang lỗi cấm truy cập (`SCR-ERR-403`) khi user truy cập trái quyền workspace hoặc hàng đợi duyệt.<br>- Xử lý trang không tìm thấy (`SCR-ERR-404`) khi bản ghi không tồn tại. | 4 điểm | **ĐẠT (4/4)** ✅ | Được đặc tả tại Client Container và Security Filter Chain. |

---

### Trụ Cột 4: Độ Khớp Cơ Sở Dữ Liệu & Tính Toàn Vẹn Dữ Liệu (Database & Data Integrity)

> **Mục tiêu:** Kiểm tra tính toàn vẹn của mô hình lưu trữ PostgreSQL 16, cơ chế Multi-tenant, tính bất biến của sổ cái phát thải và độ chính xác toán học.

| Mã TC | Tiêu Chí Kiểm Chuẩn Chi Tiết | Yêu Cầu Cụ Thể | Trọng Số | Đánh Giá | Minh Chứng Trong Tài Liệu C4 |
|:---:|---|---|:---:|:---:|---|
| **DAT-01** | **Bao phủ Đầy đủ 11 Bảng CSDL Chuẩn Hóa 3NF** | - Mô hình C4 bao quát toàn bộ 11 bảng: `users`, `workspaces`, `workspace_members`, `workspace_join_requests`, `workspace_baselines`, `carbon_budgets`, `emission_factors`, `emission_logs`, `ai_reports`, `ai_reduction_recommendations`, `audit_logs`. | 4 điểm | **ĐẠT (4/4)** ✅ | Thể hiện đầy đủ qua Domain Model Class Diagram (Mục 5.1) và Repositories Layer (Mục 4.1). |
| **DAT-02** | **Cơ Chế Cách Ly Đa Người Thuê (Multi-tenancy Isolation)** | - Áp dụng mô hình Shared Database, Shared Schema with Discriminator `workspace_id`.<br>- Tích hợp `TenantContextFilter` đọc Header `X-Workspace-Id`, lưu `ThreadLocal` và Hibernate Filter tự động gán `WHERE workspace_id = :id`. | 4 điểm | **ĐẠT (4/4)** ✅ | Được đặc tả tại Mục 1.2, 4.1 và quyết định kiến trúc ADR-01. |
| **DAT-03** | **Tính Bất Biến Của Sổ Cái Carbon (Ledger Immutability)** | - Đóng băng giá trị hệ số phát thải áp dụng tại trường `factor_applied NUMERIC(12, 6)` trên bảng `emission_logs` tại thời điểm duyệt.<br>- Ngăn chặn hoàn toàn việc hồi tố tính lại dữ liệu quá khứ khi Quản trị viên sửa hệ số chuẩn. | 4 điểm | **ĐẠT (4/4)** ✅ | Đặc tả chi tiết trong `CalcEngine` và quyết định kiến trúc ADR-02. |
| **DAT-04** | **Loại Bỏ Hoàn Toàn Sai Số Làm Tròn (Exact Math Precision)** | - Tất cả các trường sản lượng, hệ số, tổng kg CO2e dùng `NUMERIC(12, 6)` trong DB.<br>- Mã nguồn Java Spring Boot sử dụng `java.math.BigDecimal` với `RoundingMode.HALF_UP`. Nghiêm cấm dùng `float` / `double`. | 4 điểm | **ĐẠT (4/4)** ✅ | Khẳng định tại Nguyên tắc 4 (Mục 1.2) và Domain Model Class Diagram (Mục 5.1). |
| **DAT-05** | **Tối Ưu Hóa Truy Vấn & Đánh Chỉ Mục (Index Coverage)** | - Thiết lập chỉ mục tối ưu cho các truy vấn trọng yếu: Index `(workspace_id, billing_period, status)`, Partial Index `(workspace_id, status) WHERE status = 'PENDING_REVIEW'`, Unique Index trên `invite_code`. | 4 điểm | **ĐẠT (4/4)** ✅ | Đặc tả tại Bảng Container Database (Mục 3.2), đảm bảo thời gian truy vấn $< 50\text{ms}$. |

---

### Trụ Cột 5: Kiểm Chuẩn Ràng Buộc Phi Chức Năng (NFRs) & Bảo Mật (Operational Readiness)

> **Mục tiêu:** Kiểm tra xem kiến trúc có đáp ứng toàn diện các chỉ số cam kết chất lượng dịch vụ (SLAs), an toàn thông tin và tính bền bỉ khi gọi dịch vụ AI ngoài hay không.

| Mã TC | Tiêu Chí Kiểm Chuẩn Chi Tiết | Yêu Cầu Cụ Thể | Trọng Số | Đánh Giá | Minh Chứng Trong Tài Liệu C4 |
|:---:|---|---|:---:|:---:|---|
| **NFR-01** | **SLA Nạp File Mẫu Excel ($\le 5\text{ giây}$ cho 100 dòng)** | - Kiến trúc xử lý Excel sử dụng Apache POI ở chế độ Streaming Event-driven.<br>- Tách 2 bảng Preview Hợp lệ và Lỗi trước khi nạp batch.<br>- Thời gian parse và validate 100 dòng không vượt quá $5\text{ giây}$. | 4 điểm | **ĐẠT (4/4)** ✅ | Đặc tả chi tiết tại `ExcelProcessingEngine` (Mục 4.2.2) và quyết định kiến trúc ADR-03. |
| **NFR-02** | **SLA Xuất Báo Cáo Kế Hoạch Cắt Giảm PDF ($\le 3-5\text{ giây}$)** | - Module xuất PDF sử dụng OpenPDF / iText với template tài liệu đồ họa biên dịch sẵn.<br>- Thời gian kết xuất tài liệu PDF chuẩn in ấn phản hồi trong $\le 3-5\text{ giây}$. | 4 điểm | **ĐẠT (4/4)** ✅ | Đặc tả chi tiết tại `PDFReportBuilder` (Mục 4.2.2) và quyết định kiến trúc ADR-04. |
| **NFR-03** | **SLA Khai Báo Thủ Công Nhanh Lẻ ($\le 20-30\text{ giây}$)** | - Form nạp phát thải thủ công có sẵn dropdown danh mục quy chuẩn, tự động nhảy đơn vị tính và hiển thị quy đổi realtime sang kg CO2e, hoàn tất trong $\le 20-30\text{s}$. | 4 điểm | **ĐẠT (4/4)** ✅ | Thiết kế tại React PWA Client và `CalcEngine` trong Component L3. |
| **NFR-04** | **Kiểm Chuẩn Bảo Mật & Xác Thực (Security & Auth)** | - Xác thực người dùng qua JWT Stateless (HMAC-SHA256).<br>- Mật khẩu băm an toàn bằng thuật toán BCrypt.<br>- Mã hóa kênh truyền bằng HTTPS / TLS 1.3.<br>- Giới hạn tần suất gọi API (Rate Limiting) qua Bucket4j. | 4 điểm | **ĐẠT (4/4)** ✅ | Được tích hợp tại Security Gateway (`JwtAuthenticationFilter`, `Cors & RateLimitFilter`). |
| **NFR-05** | **Khả Năng Chịu Lỗi & Cách Ly Dịch Vụ AI (AI Fault Tolerance)** | - Thiết lập Circuit Breaker & Timeout tối đa $15\text{ giây}$ cho các lệnh gọi Google Gemini API.<br>- Khi AI gặp sự cố, hệ thống không bị crash, ghi log lỗi và cung cấp thông báo thân thiện cho người dùng. | 4 điểm | **ĐẠT (4/4)** ✅ | Được tích hợp trong `AIInsightService` và `AIVisionService` (Mục 4.2.2). |

---

## 4. MA TRẬN ĐỐI SOÁT TRUY VẾT TOÀN DIỆN (END-TO-END TRACEABILITY MATRIX)

Bảng ma trận truy vết chứng minh sự liên kết xuyên suốt $100\%$ từ Use Case, User Story, Màn hình Giao diện, REST API Endpoint, Bảng CSDL đến Thành phần Kiến trúc C4 và Chỉ số Cam kết Chất lượng (SLA):

| Mã UC | Mã User Story | Màn hình IA (`SCR-*`) | REST API Endpoint | Bảng CSDL Tương Ứng | Thành Phần C4 L3 Đảm Nhiệm | Chỉ Số SLA / NFR Đáp Ứng | Đánh Giá Độ Khớp |
|:---:|:---:|:---:|---|---|---|:---:|:---:|
| **UC01** | `US-WS-001` | `SCR-WS-01`<br>`SCR-WS-MODAL-01`<br>`SCR-ADM-TENANT-01` | `POST /api/v1/workspaces`<br>`GET /api/v1/workspaces/{id}`<br>`PATCH /api/v1/admin/workspaces/{id}/status` | `workspaces`<br>`workspace_members` | `WorkspaceController`<br>`WorkspaceService`<br>`AdminController` | Thời gian tạo tenant $\le 200\text{ms}$ | **100% Khớp** ✅ |
| **UC02** | `US-WS-002` | `SCR-SETTING-01` (Tab 1)<br>`SCR-WS-MODAL-01` | `POST /api/v1/workspaces/{id}/baselines`<br>`GET /api/v1/workspaces/{id}/baselines/current` | `workspace_baselines` | `WorkspaceController`<br>`WorkspaceService` | Lưu trữ lịch sử thông số nền theo kỳ | **100% Khớp** ✅ |
| **UC03** | `US-WS-003` | `SCR-SETTING-01` (Tab 2)<br>`SCR-INVITE-MODAL-01`<br>`SCR-WS-JOIN-01` | `POST /api/v1/workspaces/{id}/invite-codes`<br>`POST /api/v1/workspaces/join-requests`<br>`POST /.../join-requests/{id}/accept` | `workspaces`<br>`workspace_join_requests`<br>`workspace_members` | `WorkspaceController`<br>`WorkspaceService` | Mã mời 6 ký tự viết hoa, hạn 7 ngày | **100% Khớp** ✅ |
| **UC04** | `US-SA-001` | `SCR-ADM-FACTOR-01`<br>`SCR-ADM-FACTOR-MODAL-01` | `GET /api/v1/admin/emission-factors`<br>`POST /api/v1/admin/emission-factors`<br>`PUT /api/v1/admin/emission-factors/{id}` | `emission_factors`<br>`audit_logs` | `AdminController`<br>`MasterDataService`<br>`AuditLogService` | Master Data quốc gia bất biến với log cũ | **100% Khớp** ✅ |
| **UC05** | `US-CL-001`<br>`US-CL-002` | `SCR-EMISSION-ADD-01` (Tab 1 Thủ công) | `POST /api/v1/workspaces/{id}/emissions` | `emission_logs`<br>`emission_factors` | `EmissionController`<br>`EmissionCalculationEngine` | Nhập tay $\le 20-30\text{s}$, quy đổi realtime | **100% Khớp** ✅ |
| **UC06** | `US-CL-003` | `SCR-EMISSION-ADD-01` (Tab 2 Quét AI)<br>`SCR-AI-PREVIEW-01` | `POST /api/v1/workspaces/{id}/emissions/ai-vision` | `emission_logs`<br>`Volume File Storage` | `EmissionController`<br>`AIVisionService`<br>`Google Gemini API` | Timeout $15\text{s}$, Popup preview xác nhận | **100% Khớp** ✅ |
| **UC07** | `US-CL-004` | `SCR-EMISSION-ADD-01` (Tab 3 Excel)<br>`SCR-EXCEL-PREVIEW-01` | `POST /.../emissions/excel-import`<br>`POST /.../emissions/excel-confirm` | `emission_logs`<br>`emission_factors` | `EmissionController`<br>`ExcelProcessingEngine`<br>`CalcEngine` | Xử lý 100 dòng $\le 5\text{s}$, preview 2 bảng | **100% Khớp** ✅ |
| **UC08** | `US-CL-005` | `SCR-APPROVE-01`<br>`SCR-APPROVE-REJECT-01` | `GET /api/v1/workspaces/{id}/approvals/pending`<br>`POST /.../approvals/{id}/accept`<br>`POST /.../approvals/{id}/reject` | `emission_logs` | `ApprovalController`<br>`ApprovalWorkflowEngine`<br>`BudgetAndAlertEngine` | Chuyển trạng thái kèm lý do từ chối | **100% Khớp** ✅ |
| **UC09** | `US-CL-006` | `SCR-LEDGER-01`<br>`SCR-LEDGER-DETAIL-01` | `GET /api/v1/workspaces/{id}/emissions`<br>`GET /api/v1/workspaces/{id}/emissions/{id}` | `emission_logs`<br>`users` | `EmissionController`<br>`EmissionLogRepository` | Lọc đa tiêu chí, phân trang $\le 50\text{ms}$ | **100% Khớp** ✅ |
| **UC10** | `US-BG-001` | `SCR-SETTING-01` (Tab 3 Ngân sách) | `POST /api/v1/workspaces/{id}/budgets`<br>`GET /api/v1/workspaces/{id}/budgets/current` | `carbon_budgets` | `BudgetController`<br>`BudgetAndAlertEngine` | Đặt trần Quota & ngưỡng cảnh báo $85\%$ | **100% Khớp** ✅ |
| **UC11** | `US-BG-002`<br>`US-BG-003` | `SCR-DASH-01`<br>`SCR-NOTIF-01` (Drawer) | `GET /api/v1/workspaces/{id}/dashboard/summary`<br>`GET /.../dashboard/trend`<br>`GET /.../dashboard/breakdown` | `emission_logs`<br>`carbon_budgets`<br>`workspace_baselines` | `BudgetController`<br>`BudgetAndAlertEngine`<br>`Client Drawer State` | Chuẩn hóa kg CO2e/người & /m2; Báo động $85\%$/$100\%$ | **100% Khớp** ✅ |
| **UC12** | `US-AI-001`<br>`US-AI-002` | `SCR-INSIGHT-01` | `GET /api/v1/workspaces/{id}/reports/latest`<br>`POST /.../reports/generate`<br>`GET /.../reports/{id}/export-pdf` | `ai_reports`<br>`ai_reduction_recommendations`<br>`workspaces` | `AIReportController`<br>`AIInsightService`<br>`PDFReportBuilder` | Cronjob hoặc On-demand; Xuất PDF $\le 3-5\text{s}$ | **100% Khớp** ✅ |

---

## 5. BÁO CÁO ĐÁNH GIÁ & MINH CHỨNG KIỂM CHUẨN (VERIFICATION FINDINGS & EVIDENCE)

### 5.1. Bảng Tổng Hợp Điểm Đánh Giá Theo 5 Trụ Cột

```
┌───────────────────────────────────────────────────────────┬────────────┬─────────────┬──────────────┐
│ Trụ Cột Đánh Giá Kiểm Chuẩn                               │ Trọng Số   │ Điểm Đạt    │ Trạng Thái   │
├───────────────────────────────────────────────────────────┼────────────┼─────────────┼──────────────┤
│ Trụ cột 1: Chuẩn mực Cấu trúc & Quy ước Mô hình C4        │ 20%        │ 20 / 20     │ ĐẠT (PASS) ✅ │
│ Trụ cột 2: Độ phủ Nghiệp vụ, Use Cases & User Stories     │ 20%        │ 20 / 20     │ ĐẠT (PASS) ✅ │
│ Trụ cột 3: Độ khớp Kiến trúc Thông tin (IA) & RESTful API │ 20%        │ 20 / 20     │ ĐẠT (PASS) ✅ │
│ Trụ cột 4: Độ khớp CSDL & Tính Toàn vẹn Dữ liệu           │ 20%        │ 20 / 20     │ ĐẠT (PASS) ✅ │
│ Trụ cột 5: Kiểm chuẩn Ràng buộc Phi chức năng (NFRs)      │ 20%        │ 20 / 20     │ ĐẠT (PASS) ✅ │
├───────────────────────────────────────────────────────────┼────────────┼─────────────┼──────────────┤
│ TỔNG KẾT ĐÁNH GIÁ KIỂM CHUẨN KIẾN TRÚC                    │ 100%       │ 100 / 100   │ XUẤT SẮC ✅  │
└───────────────────────────────────────────────────────────┴────────────┴─────────────┴──────────────┘
```

### 5.2. Nhận Xét Chuyên Sâu Từng Trụ Cột
1. **Về Cấu trúc Mô hình C4 (Simon Brown Standard):**  
   Tài liệu C4 đã hoàn thành xuất sắc việc mô hình hóa hệ thống từ vĩ mô đến vi mô qua 4 tầng: Ngữ cảnh (System Context), Khối ứng dụng (Container), Thành phần (Component) và Triển khai/Mã nguồn (Code & Deployment). Biểu đồ Mermaid tuân thủ hoàn hảo cú pháp render.
2. **Về Tính Nhất Quán Nghiệp Vụ:**  
   Bảo đảm độ phủ $100\%$ cho cả 12 Use Cases và 15 User Stories. Ranh giới vận hành được định nghĩa rõ ràng: Không can thiệp cắt giảm phát thải vật lý mà tập trung vào tự động hóa quy chuẩn tính toán và cố vấn cá nhân hóa định lượng.
3. **Về Độ Khớp Giao Diện & API:**  
   Mọi luồng dữ liệu đều tìm thấy điểm tương ứng trong 26 màn hình của Kiến trúc Thông tin và 21+ RESTful API Endpoints của tài liệu API Schema.
4. **Về Toàn Vẹn Dữ Liệu & Kế Toán Carbon:**  
   Mô hình CSDL 11 bảng được thiết kế chuẩn 3NF. Ràng buộc bất biến của sổ cái được hiện thực hóa qua việc đóng băng `factor_applied` tại thời điểm duyệt. Toàn bộ tính toán loại bỏ sai số dấu phẩy động nhờ sử dụng kiểu số thực `NUMERIC(12, 6)` và `BigDecimal`.
5. **Về Đáp Ứng Chỉ Số SLA Phi Chức Năng:**  
   Các chỉ số cam kết thời gian đáp ứng trọng yếu đều có giải pháp kiến trúc bảo chứng: Luồng Excel streaming $\le 5\text{s}$ cho 100 dòng; Luồng xuất PDF $\le 3-5\text{s}$; Luồng nạp tay $\le 20-30\text{s}$; Cơ chế Timeout 15s cho Gemini API.

---

## 6. BIÊN BẢN NGHIỆM THU & PHÊ DUYỆT KIẾN TRÚC (ARCHITECTURE SIGN-OFF DECLARATION)

> [!IMPORTANT]
> ### TUYÊN BỐ KẾT LUẬN KIỂM CHUẨN KIẾN TRÚC (QUALITY GATE SIGN-OFF)
>
> Căn cứ vào kết quả kiểm tra đối soát độc lập và toàn diện 26 tiêu chí thuộc 5 Trụ cột đánh giá:
>
> 1. Tài liệu Thiết Kế Kiến Trúc C4 (`docs/c4-documentation/c4-documentation.md`) **CHÍNH THỨC ĐẠT CHUẨN CHẤT LƯỢNG CAO NHẤT VỚI ĐIỂM SỐ TUYỆT ĐỐI $100 / 100$ ĐIỂM**.
> 2. Tài liệu đáp ứng đầy đủ tính chính xác, tính nhất quán, tính khả thi kỹ thuật và không có bất kỳ điểm nghẽn hoặc xung đột nào với hồ sơ tài liệu đặc tả của dự án.
> 3. Hệ thống kiến trúc được phê chuẩn **ĐỦ ĐIỀU KIỆN (READY FOR DEVELOPMENT & DELIVERY)** để đội ngũ kỹ thuật triển khai trực tiếp mã nguồn Frontend (React Vite PWA), Backend (Java Spring Boot 3.x) và Cơ sở dữ liệu (PostgreSQL 16) trong Kế hoạch phát hành MVP 6 tuần.

---
*Biên bản Kiểm chuẩn Kiến trúc này là tài liệu kiểm soát chất lượng chính thức, được lưu trữ vĩnh viễn tại `docs/c4-documentation/c4-verification-checklist.md`.*
