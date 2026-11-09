# 📂 CarbonLedger Source Code (`/src`)

Thư mục lưu trữ toàn bộ mã nguồn của dự án **Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ (Personal & Micro-Office Carbon Ledger)**.

## 🏗️ Cấu trúc Phân hệ

```
src/
├── frontend/             # Ứng dụng Frontend Web & PWA (React 18 + Vite + TypeScript + TailwindCSS)
└── backend/              # Ứng dụng Backend API Core (Java 21 + Spring Boot 3.x - Sẽ khởi tạo sau)
```

### 1. Phân hệ Frontend (`/src/frontend`)
- **Tech Stack:** React 18, Vite, TypeScript, TailwindCSS, Lucide Icons, Recharts.
- **Phong cách Thiết kế:** Stitch UI v2 (Ultraminimal MUI Minimal style, tone màu Trắng sáng `#FFFFFF` / `#f7f9ff` & Xanh ngọc lục bảo `#00A76F`).
- **Màn hình triển khai:** Đầy đủ 25 màn hình và modals (`SCR-AUTH-01`, `SCR-DASH-01`, `SCR-LEDGER-01`, `SCR-APPROVE-01`, `SCR-INSIGHT-01`, `SCR-SETTING-01`, `SCR-ADM-DASH-01`, `SCR-ERR-403`, etc.).
- **Tầng dữ liệu:** Mock Data phong phú, mô phỏng hoàn chỉnh cả 3 vai trò:
  - **Trưởng nhóm (Reviewer):** Nguyễn Văn An
  - **Thành viên (Editor):** Trần Thị Bình
  - **Quản trị hệ thống (System Admin):** Vũ Quản Trị
- **Khởi chạy Frontend:**
  ```bash
  # Từ thư mục gốc dự án:
  npm run dev

  # Hoặc từ thư mục /src/frontend:
  cd src/frontend && npm run dev
  ```

### 2. Phân hệ Backend (`/src/backend`)
- *Kế hoạch triển khai sau:* Java 21, Spring Boot 3.x, Spring Security + JWT, Spring Data JPA, PostgreSQL 16.
