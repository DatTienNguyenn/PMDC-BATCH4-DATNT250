# 🌿 CarbonLedger - MUI Minimal UI Design System & Screen Mockups (Decluttered Edition)

> **Dự án:** Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ (Personal & Micro-Office Carbon Ledger)  
> **Nền tảng Thiết kế:** Google Stitch (AI-Driven Design Platform)  
> **Stitch Project ID:** `2234879253181793294`  
> **Stitch Project Name:** `CarbonLedger - MUI Minimal UI (Green Theme)`  
> **Phong cách UI/UX:** MUI Minimal UI ([minimals.cc](https://minimals.cc))  
> **Tone màu chủ đạo:** Trắng sáng (`#FFFFFF` / `#F9FAFB`) & Xanh ngọc lục bảo Emerald Green (`#00A76F`)  
> **Nhánh Git Worktree:** `design/stitch-minimal-ui`  
> **Căn cứ nghiệp vụ:** [docs/information-architecture/information-architecture.md](../../docs/information-architecture/information-architecture.md), [docs/PRD.md](../../docs/PRD.md), [docs/user-stories.md](../../docs/user-stories.md)

---

## 🎨 1. NGUYÊN TẮC TINH GIẢN & TỐI ƯU HÓA THỊ GIÁC (DECLUTTERING PHILOSOPHY)

Nhằm giải quyết vấn đề màn hình bị rối và chứa nhiều thông tin phụ không cần thiết, toàn bộ các view đã được tinh giản sâu sắc theo đúng chuẩn **MUI Minimal UI**:

1. **Tối đa hóa Khoảng thở (Whitespace):**
   - Loại bỏ các khối thẻ tóm tắt trùng lặp, câu văn hướng dẫn rườm rà, nhãn độ tin cậy và các câu cam kết pháp lý dài dòng.
   - Thẻ hiển thị (Cards) dùng nền trắng tinh khôi (`#FFFFFF`), viền siêu mỏng `1px border-slate-100`, góc bo tròn lớn `rounded-2xl` (16px) và đổ bóng mờ êm dịu (`shadow-sm`).
2. **Làm nổi bật Thông tin Trọng tâm (Executive Clarity):**
   - Các con số KPI phát thải hiển thị với kích thước lớn, sắc nét (VD: `85.4 kg CO2e`, `15 km → 1.55 kg CO2e`).
   - Sử dụng một huy hiệu màu duy nhất có ngữ nghĩa rõ ràng (Xanh: Đã duyệt, Vàng: Chờ duyệt, Đỏ: Bị từ chối).
3. **Bảng & Danh sách Thoáng đãng:**
   - Tăng độ cao hàng (`py-4` / `py-4.5`), loại bỏ các chip nguồn nạp rườm rà (AI Vision, Excel, Nhập tay) và mã hoá đơn vụn vặt bên dưới tên hoạt động.

---

## 🖥️ 2. DANH MỤC MÀN HÌNH ĐÃ TINH GIẢN TRÊN GOOGLE STITCH

| Screen ID | Tên Màn hình / Modal | Phân hệ (Module) | Đường dẫn Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---|:---|:---|:---:|
| **SCR-DASH-01** | Dashboard Trung tâm & Giám sát Ngân sách | Workspace App Shell | `/workspace/[id]/dashboard` | `877760c8e7314338a9c1c3133a0a1a06` | [Ảnh](screens/SCR-DASH-01.png) • [HTML](html/SCR-DASH-01.html) |
| **SCR-LEDGER-01** | Sổ cái Phát thải & Xuất Excel | Core Ledger | `/workspace/[id]/ledger` | `76b6de1ea913424ebe65010c17b6afc9` | [Ảnh](screens/SCR-LEDGER-01.png) • [HTML](html/SCR-LEDGER-01.html) |
| **SCR-EMISSION-ADD-01** | Modal Thêm Phát thải Đa phương thức | Ingestion Flow | `/workspace/[id]/ledger?action=add` | `c37cc7c8665648dfbb46f84c5746428d` | [Ảnh](screens/SCR-EMISSION-ADD-01.png) • [HTML](html/SCR-EMISSION-ADD-01.html) |
| **SCR-APPROVE-01** | Hàng đợi Kiểm duyệt Sổ cái | Reviewer Workflow | `/workspace/[id]/approvals` | `298735b938bd4c4fb11d6a447db82319` | [Ảnh](screens/SCR-APPROVE-01.png) • [HTML](html/SCR-APPROVE-01.html) |
| **SCR-INSIGHT-01** | Báo cáo AI Insight & Lộ trình Cắt giảm | Intelligence & ESG | `/workspace/[id]/insights` | `a2d3a8a0fe1447939446b67aa444b7ba` | [Ảnh](screens/SCR-INSIGHT-01.png) • [HTML](html/SCR-INSIGHT-01.html) |
| **SCR-SETTING-01** | Cài đặt Workspace, Ngân sách & Thành viên | Administration | `/workspace/[id]/settings` | `9df1636a4def41b39522e5036c77683a` | [Ảnh](screens/SCR-SETTING-01.png) • [HTML](html/SCR-SETTING-01.html) |
| **SCR-WS-01** | Chọn Không gian làm việc (Switcher) | Workspace Onboarding | `/workspaces` | `d6d4a127ce9e40e5a08cff8299f3d201` | [Ảnh](screens/SCR-WS-01.png) • [HTML](html/SCR-WS-01.html) |
| **SCR-AUTH-01** | Đăng nhập & Đăng ký (Split View) | Auth & Onboarding | `/auth/login`<br>`/auth/register` | `746ec6a57a6341cf87ac1ef353ea2211` | [Ảnh](screens/SCR-AUTH-01.png) • [HTML](html/SCR-AUTH-01.html) |

---

## 🚀 3. HƯỚNG DẪN XEM VÀ MỞ NGUYÊN MẪU HTML

Toàn bộ các file HTML đều là nguyên mẫu độc lập (standalone prototypes) có thể mở trực tiếp trên trình duyệt:

```bash
# Di chuyển vào thư mục chứa mã nguồn giao diện HTML
cd design/stitch-ui/html

# Mở Dashboard tinh gọn
google-chrome SCR-DASH-01.html
# Hoặc khởi chạy local server:
python3 -m http.server 3000
```
Truy cập `http://localhost:3000` để trải nghiệm trực tiếp toàn bộ 8 giao diện đã tinh giản.
