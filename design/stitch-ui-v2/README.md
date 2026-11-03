# 🌿 CarbonLedger - MUI Minimal UI v2 Design System (Ultraminimal Edition)

> **Dự án:** Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ (Personal & Micro-Office Carbon Ledger)  
> **Nền tảng Thiết kế:** Google Stitch (AI-Driven Design Platform)  
> **Stitch Project ID:** `343766210999719489`  
> **Stitch Project Name:** `CarbonLedger - MUI Minimal UI v2 (Ultraminimal)`  
> **Stitch Design System ID:** `assets/adb2152baacf46bea992ab34b31e384f`  
> **Phong cách UI/UX:** MUI Minimal UI ([minimals.cc](https://minimals.cc))  
> **Tone màu chủ đạo:** Trắng sáng (`#FFFFFF` / `#F9FAFB`) & Xanh ngọc lục bảo Emerald Green (`#00A76F`)  
> **Nhánh Git Worktree:** `design/stitch-minimal-ui-v2`  
> **Căn cứ nghiệp vụ:** [docs/09-information-architecture.md](../../docs/09-information-architecture.md), [docs/01-PRD.md](../../docs/01-PRD.md), [docs/04-user-stories.md](../../docs/04-user-stories.md)

---

## 🎨 1. NGUYÊN TẮC THIẾT KẾ V2 (ULTRAMINIMAL & REFINED)

Phiên bản UI v2 được tinh chỉnh sâu sắc theo các phản hồi nghiệp vụ mới nhất:

1. **Đồng nhất Theme toàn diện (Consistent Light Theme across Workspace & Admin):**
   * Các màn hình System Admin chuyển sang đồng bộ theme sáng (`#FFFFFF` / `#F9FAFB`) với sidebar trắng viền mỏng và điểm nhấn Emerald Green (`#00A76F`), hoàn toàn loại bỏ sidebar màu than chì tối.
   * **Loại bỏ phân hệ Audit Log:** Theo tinh thần tối giản thông tin, phân hệ Audit Log và mục menu tương ứng đã được loại bỏ khỏi giao diện System Admin.

2. **Top Navigation Bar tinh gọn có Breadcrumb ngữ cảnh:**
   * Bên trái: Logo chiếc lá CarbonLedger + **Breadcrumb** nhận biết không gian làm việc hiện tại (VD: `Gia Đình Xanh / Dashboard`, `Gia Đình Xanh / Hàng đợi kiểm duyệt`).
   * Bên phải: Nút chuông thông báo (Bell icon) + Avatar tài khoản.
   * Loại bỏ các dropdown rườm rà, mã mời thừa thãi và nút nạp phát thải trùng lặp trên top nav.

3. **Cải tiến Luồng Đăng nhập & Xác thực (`SCR-AUTH-01`):**
   * Đưa tùy chọn **Đăng nhập / Đăng ký một chạm bằng Google** lên vị trí ưu tiên cao, ngay bên dưới tab chuyển đổi [Đăng nhập / Đăng ký].
   * Loại bỏ hoàn toàn card review người dùng, checkbox ghi nhớ đăng nhập và các khẩu hiệu tiếp thị không cần thiết.

4. **Tối giản Modal Kiểm chứng AI (`SCR-AI-PREVIEW-01`):**
   * Khung hóa đơn bên trái chỉ hiển thị hình ảnh minh họa vector trang nhã thay vì tạo nguyên một hóa đơn giả chi tiết.
   * Dropdown Loại hoạt động hiển thị dạng text thuần, loại bỏ icon electric (tia sét).
   * Khung Tác động Carbon ước tính: **Chỉ giữ lại chỉ số phát thải ước tính** (`≈ 42.50 kg CO2e`), loại bỏ hoàn toàn phần trăm độ tin cậy (`% confident`).

5. **Nâng cấp Dashboard Trung tâm (`SCR-DASH-01`):**
   * Bổ sung **Hộp chọn Năm (Year Selector)** ngay trong thẻ Biểu đồ Xu hướng phát thải (VD: `Năm 2026 [▼]`).
   * Bổ sung **Bảng danh sách các hoạt động vừa được duyệt gần đây** (Recent Approved Activities) vào phía dưới biểu đồ để người dùng nắm bắt dòng sự kiện mà không cần chuyển trang.

---

## 🖥️ 2. DANH MỤC 25 MÀN HÌNH CHUẨN HÓA V2

### Khối 1: Xác thực & Khởi tạo Không gian làm việc (Auth & Onboarding)

| Screen ID | Tên Màn hình / Modal | Presentation | Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---:|:---|:---:|:---:|
| **SCR-AUTH-01** | Đăng nhập & Đăng ký (Google CTA ưu tiên) | Full Page | `/auth/login`<br>`/auth/register` | `4771af4d4ed94fd287d206b6552289b4` | [Ảnh](screens/SCR-AUTH-01.png) • [HTML](html/SCR-AUTH-01.html) |
| **SCR-AUTH-02** | Quên & Đặt lại Mật khẩu | Full Page | `/auth/forgot-password` | `684ae3c9b2c74afc82dbf8d491bd583a` | [Ảnh](screens/SCR-AUTH-02.png) • [HTML](html/SCR-AUTH-02.html) |
| **SCR-WS-01** | Chọn Không gian làm việc (Switcher) | Full Page | `/workspaces` | `f55ba06ee41249f4b4d4f06265c2f9eb` | [Ảnh](screens/SCR-WS-01.png) • [HTML](html/SCR-WS-01.html) |
| **SCR-WS-MODAL-01** | Modal Khởi tạo Workspace mới | Modal | `/workspaces?modal=create` | `290a60528eb04155a29426b82156f317` | [Ảnh](screens/SCR-WS-MODAL-01.png) • [HTML](html/SCR-WS-MODAL-01.html) |
| **SCR-WS-JOIN-01** | Gia nhập Không gian làm việc bằng mã | Full Page | `/workspaces/join` | `22d6ce3ab0ae4f2d88c47c653288d627` | [Ảnh](screens/SCR-WS-JOIN-01.png) • [HTML](html/SCR-WS-JOIN-01.html) |

### Khối 2: Không gian làm việc Người dùng (Workspace App Shell & Ledger)

| Screen ID | Tên Màn hình / Modal | Presentation | Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---:|:---|:---:|:---:|
| **SCR-DASH-01** | Dashboard Trung tâm, Bộ chọn Năm & Hoạt động duyệt | Full Page | `/workspace/[id]/dashboard` | `1dca330964a14b5cbd0c0b71ce831efa` | [Ảnh](screens/SCR-DASH-01.png) • [HTML](html/SCR-DASH-01.html) |
| **SCR-LEDGER-01** | Sổ cái Phát thải & Xuất Excel | Full Page | `/workspace/[id]/ledger` | `05b823683de84cbfa60a486fa231cd7e` | [Ảnh](screens/SCR-LEDGER-01.png) • [HTML](html/SCR-LEDGER-01.html) |
| **SCR-LEDGER-DETAIL-01** | Modal Xem Chi tiết Bản ghi & Vết duyệt | Modal | `/workspace/[id]/ledger?logId=[id]` | `b083b61eb86143c9a39bb6ae5af0b356` | [Ảnh](screens/SCR-LEDGER-DETAIL-01.png) • [HTML](html/SCR-LEDGER-DETAIL-01.html) |
| **SCR-EMISSION-ADD-01** | Modal Thêm Phát thải Đa kênh (3 Tabs) | Modal | `/workspace/[id]/ledger?action=add` | `7dcf3782bad94cf99ecd5c7eeea3fe98` | [Ảnh](screens/SCR-EMISSION-ADD-01.png) • [HTML](html/SCR-EMISSION-ADD-01.html) |
| **SCR-AI-PREVIEW-01** | Modal Kiểm chứng Dữ liệu AI Vision (Minimal Card) | Modal | `/workspace/[id]/ledger?action=ai-preview` | `96238bcd0d6c4e9cbaff658886a04c4e` | [Ảnh](screens/SCR-AI-PREVIEW-01.png) • [HTML](html/SCR-AI-PREVIEW-01.html) |
| **SCR-EXCEL-PREVIEW-01** | Modal Xem trước & Xác thực Nạp File Excel | Modal | `/workspace/[id]/ledger?action=excel-preview` | `aa51c4fc76e140aca8c162ba55a1179a` | [Ảnh](screens/SCR-EXCEL-PREVIEW-01.png) • [HTML](html/SCR-EXCEL-PREVIEW-01.html) |
| **SCR-APPROVE-01** | Hàng đợi Kiểm duyệt Sổ cái (Có Breadcrumb) | Full Page | `/workspace/[id]/approvals` | `eef4a8270bd6424eb82f804b177a42df` | [Ảnh](screens/SCR-APPROVE-01.png) • [HTML](html/SCR-APPROVE-01.html) |
| **SCR-APPROVE-REJECT-01** | Modal Nhập Lý do Từ chối Phát thải | Modal | `/workspace/[id]/approvals?reject=[id]` | `beb015a912234cdcbfc8c9e99905367d` | [Ảnh](screens/SCR-APPROVE-REJECT-01.png) • [HTML](html/SCR-APPROVE-REJECT-01.html) |
| **SCR-INSIGHT-01** | Báo cáo AI Insight & Lộ trình Cắt giảm | Full Page | `/workspace/[id]/insights` | `2f1db39a09d0461784ee22159e017d86` | [Ảnh](screens/SCR-INSIGHT-01.png) • [HTML](html/SCR-INSIGHT-01.html) |
| **SCR-SETTING-01** | Cài đặt Workspace (Thông số nền, Ngân sách, Thành viên) | Full Page | `/workspace/[id]/settings` | `cf93c51782714b909e9a344cb4d94807` | [Ảnh](screens/SCR-SETTING-01.png) • [HTML](html/SCR-SETTING-01.html) |
| **SCR-INVITE-MODAL-01** | Modal Tạo & Quản lý Mã mời Gia nhập | Modal | `/workspace/[id]/settings?modal=invite` | `2028e6fbc92d43a880e4857fd92da18b` | [Ảnh](screens/SCR-INVITE-MODAL-01.png) • [HTML](html/SCR-INVITE-MODAL-01.html) |
| **SCR-JOIN-REJECT-01** | Modal Từ chối Đơn xin Gia nhập | Modal | `/workspace/[id]/settings?rejectJoin=[id]` | `2cefb1810c984f1a8e76264598582f0e` | [Ảnh](screens/SCR-JOIN-REJECT-01.png) • [HTML](html/SCR-JOIN-REJECT-01.html) |
| **SCR-PROFILE-01** | Hồ sơ Cá nhân & Đóng góp | Full Page | `/profile` | `37afd7252d59429b9ec99e1d4060c201` | [Ảnh](screens/SCR-PROFILE-01.png) • [HTML](html/SCR-PROFILE-01.html) |
| **SCR-NOTIF-01** | Trung tâm Thông báo Drawer | Drawer | `/workspace/[id]/notifications` | `355adb28f0254cd5858f27f04e896779` | [Ảnh](screens/SCR-NOTIF-01.png) • [HTML](html/SCR-NOTIF-01.html) |

### Khối 3: Cổng Quản trị Hệ thống (System Admin Console - Light Theme)

| Screen ID | Tên Màn hình / Modal | Presentation | Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---:|:---|:---:|:---:|
| **SCR-ADM-DASH-01** | Dashboard Quản trị Hệ thống (Theme sáng) | Full Page | `/admin/dashboard` | `1e661de64a26480393e1d29a044c4c90` | [Ảnh](screens/SCR-ADM-DASH-01.png) • [HTML](html/SCR-ADM-DASH-01.html) |
| **SCR-ADM-FACTOR-01** | Quản lý Dữ liệu Hệ số Quy chuẩn (Theme sáng) | Full Page | `/admin/emission-factors` | `1451f9ad96eb4ae19300259479717473` | [Ảnh](screens/SCR-ADM-FACTOR-01.png) • [HTML](html/SCR-ADM-FACTOR-01.html) |
| **SCR-ADM-FACTOR-MODAL-01** | Modal Thêm/Sửa Hệ số Phát thải | Modal | `/admin/emission-factors?action=edit` | `2f1e9562dd244b73b84edc5322077bf9` | [Ảnh](screens/SCR-ADM-FACTOR-MODAL-01.png) • [HTML](html/SCR-ADM-FACTOR-MODAL-01.html) |
| **SCR-ADM-TENANT-01** | Quản lý Danh sách Workspace Tenants (Theme sáng) | Full Page | `/admin/workspaces` | `d58d794325b34ccbbcff08dcf5209e11` | [Ảnh](screens/SCR-ADM-TENANT-01.png) • [HTML](html/SCR-ADM-TENANT-01.html) |

### Khối 4: Màn hình Sự cố & Điều hướng Lỗi (System Error Pages)

| Screen ID | Tên Màn hình / Modal | Presentation | Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---:|:---|:---:|:---:|
| **SCR-ERR-403** | Màn hình Từ chối Quyền (403 Forbidden) | Full Page | `/403` | `d9afb1b2271d466695c33c2043faa1a8` | [Ảnh](screens/SCR-ERR-403.png) • [HTML](html/SCR-ERR-403.html) |
| **SCR-ERR-404** | Màn hình Không tìm thấy Trang (404 Not Found) | Full Page | `/404` | `29cc2adaa21144b99c3055ae86dac23d` | [Ảnh](screens/SCR-ERR-404.png) • [HTML](html/SCR-ERR-404.html) |

---

## 🚀 3. HƯỚNG DẪN XEM NGUYÊN MẪU HTML

```bash
# Di chuyển vào thư mục chứa nguyên mẫu HTML v2
cd /home/datnguyen-nuoa/PMDC-BATCH4-DATNT250-design-stitch-ui-v2/design/stitch-ui-v2/html

# Khởi chạy máy chủ cục bộ nhanh
python3 -m http.server 3001
```

Mở trình duyệt truy cập: `http://localhost:3001`
- `SCR-DASH-01.html`: Dashboard với breadcrumb, bộ chọn năm và bảng hoạt động đã duyệt
- `SCR-APPROVE-01.html`: Hàng đợi duyệt có breadcrumb ngữ cảnh
- `SCR-AUTH-01.html`: Form đăng nhập với nút Google đưa lên ưu tiên hàng đầu
- `SCR-AI-PREVIEW-01.html`: Modal kiểm chứng AI tinh giản (chỉ estimated emission, không icon electric)
- `SCR-ADM-DASH-01.html`: Cổng quản trị Admin theme sáng đồng nhất (đã bỏ Audit Log)
