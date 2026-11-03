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

## 🎨 1. NGUYÊN TẮC THIẾT KẾ V2 (ULTRAMINIMAL PHILOSOPHY)

Phiên bản UI v2 tối giản triệt để dựa trên 4 yêu cầu cốt lõi của người dùng:

1. **Tiếp tục dùng theme MUI Minimal (minimals.cc):**
   - Giữ nguyên bộ màu nhận diện của v1: Trắng sáng (`#FFFFFF` / `#F9FAFB`), Emerald Green (`#00A76F`), chữ Slate Dark (`#212B36`).
   - Font chữ: **Public Sans** toàn diện.
   - Thẻ hiển thị: Bo góc lớn (`rounded-2xl`), viền mảnh (`border-gray-100`), bóng mờ nhẹ (`shadow-sm`).

2. **Mỗi view chỉ hiển thị thông tin tối thiểu cần thiết:**
   - Chỉ giữ đúng và đủ các trường, chỉ số, thao tác phục vụ định nghĩa chức năng của từng màn hình trong tài liệu nghiệp vụ ([docs/09-information-architecture.md](../../docs/09-information-architecture.md)).
   - Loại bỏ các khối text giải thích rườm rà, nhãn độ tin cậy AI, câu cam kết pháp lý không cần thiết.

3. **Chỉ giữ lại subtitle khi thực sự cần thiết:**
   - 100% tiêu đề trang sử dụng `h1` ngắn gọn, loại bỏ các dòng mô tả phụ dài dòng dưới tiêu đề.

4. **Thanh Top Nav siêu đơn giản (Ultra-minimal):**
   - Bên trái: Chỉ gồm Logo icon chiếc lá + tên ứng dụng `CarbonLedger`.
   - Bên phải: Chỉ gồm Nút chuông thông báo (Bell icon) + Avatar tài khoản.
   - Loại bỏ hoàn toàn: Thanh tìm kiếm toàn cục, breadcrumbs lặp lại, dropdown chọn workspace trên top nav bar.

---

## 🖥️ 2. MASTER SCREEN CATALOG V2 (ĐẦY ĐỦ 26/26 MÀN HÌNH CHUẨN HÓA)

Toàn bộ **26 màn hình & modal** định nghĩa trong Kiến trúc Thông tin hệ thống đã được sinh trên Google Stitch v2, lưu trữ đồng bộ cả ảnh chụp (`.png`) và mã nguồn nguyên mẫu độc lập (`.html`):

### Khối 1: Xác thực & Khởi tạo Không gian làm việc (Auth & Onboarding)

| Screen ID | Tên Màn hình / Modal | Presentation | Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---:|:---|:---:|:---:|
| **SCR-AUTH-01** | Đăng nhập & Đăng ký (Split View) | Full Page | `/auth/login`<br>`/auth/register` | `9ef8659b4d9748dfa5587515713daafe` | [Ảnh](screens/SCR-AUTH-01.png) • [HTML](html/SCR-AUTH-01.html) |
| **SCR-AUTH-02** | Quên & Đặt lại Mật khẩu | Full Page | `/auth/forgot-password` | `684ae3c9b2c74afc82dbf8d491bd583a` | [Ảnh](screens/SCR-AUTH-02.png) • [HTML](html/SCR-AUTH-02.html) |
| **SCR-WS-01** | Chọn Không gian làm việc (Switcher) | Full Page | `/workspaces` | `f55ba06ee41249f4b4d4f06265c2f9eb` | [Ảnh](screens/SCR-WS-01.png) • [HTML](html/SCR-WS-01.html) |
| **SCR-WS-MODAL-01** | Modal Khởi tạo Workspace mới | Modal | `/workspaces?modal=create` | `290a60528eb04155a29426b82156f317` | [Ảnh](screens/SCR-WS-MODAL-01.png) • [HTML](html/SCR-WS-MODAL-01.html) |
| **SCR-WS-JOIN-01** | Gia nhập Không gian làm việc bằng mã | Full Page | `/workspaces/join` | `22d6ce3ab0ae4f2d88c47c653288d627` | [Ảnh](screens/SCR-WS-JOIN-01.png) • [HTML](html/SCR-WS-JOIN-01.html) |

### Khối 2: Không gian làm việc Người dùng (Workspace App Shell & Ledger)

| Screen ID | Tên Màn hình / Modal | Presentation | Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---:|:---|:---:|:---:|
| **SCR-DASH-01** | Dashboard Trung tâm & Giám sát Ngân sách | Full Page | `/workspace/[id]/dashboard` | `7ca260961a064a948720a0604454788e` | [Ảnh](screens/SCR-DASH-01.png) • [HTML](html/SCR-DASH-01.html) |
| **SCR-LEDGER-01** | Sổ cái Phát thải & Xuất Excel | Full Page | `/workspace/[id]/ledger` | `05b823683de84cbfa60a486fa231cd7e` | [Ảnh](screens/SCR-LEDGER-01.png) • [HTML](html/SCR-LEDGER-01.html) |
| **SCR-LEDGER-DETAIL-01** | Modal Xem Chi tiết Bản ghi & Vết duyệt | Modal | `/workspace/[id]/ledger?logId=[id]` | `b083b61eb86143c9a39bb6ae5af0b356` | [Ảnh](screens/SCR-LEDGER-DETAIL-01.png) • [HTML](html/SCR-LEDGER-DETAIL-01.html) |
| **SCR-EMISSION-ADD-01** | Modal Thêm Phát thải Đa kênh (3 Tabs) | Modal | `/workspace/[id]/ledger?action=add` | `7dcf3782bad94cf99ecd5c7eeea3fe98` | [Ảnh](screens/SCR-EMISSION-ADD-01.png) • [HTML](html/SCR-EMISSION-ADD-01.html) |
| **SCR-AI-PREVIEW-01** | Modal Kiểm chứng Dữ liệu AI Vision | Modal | `/workspace/[id]/ledger?action=ai-preview` | `f05faa4bf8864247bb89afe61480f41d` | [Ảnh](screens/SCR-AI-PREVIEW-01.png) • [HTML](html/SCR-AI-PREVIEW-01.html) |
| **SCR-EXCEL-PREVIEW-01** | Modal Xem trước & Xác thực Nạp File Excel | Modal | `/workspace/[id]/ledger?action=excel-preview` | `aa51c4fc76e140aca8c162ba55a1179a` | [Ảnh](screens/SCR-EXCEL-PREVIEW-01.png) • [HTML](html/SCR-EXCEL-PREVIEW-01.html) |
| **SCR-APPROVE-01** | Hàng đợi Kiểm duyệt Sổ cái | Full Page | `/workspace/[id]/approvals` | `4c1debb05c284c47a733506c3dc8c4cc` | [Ảnh](screens/SCR-APPROVE-01.png) • [HTML](html/SCR-APPROVE-01.html) |
| **SCR-APPROVE-REJECT-01** | Modal Nhập Lý do Từ chối Phát thải | Modal | `/workspace/[id]/approvals?reject=[id]` | `beb015a912234cdcbfc8c9e99905367d` | [Ảnh](screens/SCR-APPROVE-REJECT-01.png) • [HTML](html/SCR-APPROVE-REJECT-01.html) |
| **SCR-INSIGHT-01** | Báo cáo AI Insight & Lộ trình Cắt giảm | Full Page | `/workspace/[id]/insights` | `2f1db39a09d0461784ee22159e017d86` | [Ảnh](screens/SCR-INSIGHT-01.png) • [HTML](html/SCR-INSIGHT-01.html) |
| **SCR-SETTING-01** | Cài đặt Workspace (Thông số nền, Ngân sách, Thành viên) | Full Page | `/workspace/[id]/settings` | `cf93c51782714b909e9a344cb4d94807` | [Ảnh](screens/SCR-SETTING-01.png) • [HTML](html/SCR-SETTING-01.html) |
| **SCR-INVITE-MODAL-01** | Modal Tạo & Quản lý Mã mời Gia nhập | Modal | `/workspace/[id]/settings?modal=invite` | `2028e6fbc92d43a880e4857fd92da18b` | [Ảnh](screens/SCR-INVITE-MODAL-01.png) • [HTML](html/SCR-INVITE-MODAL-01.html) |
| **SCR-JOIN-REJECT-01** | Modal Từ chối Đơn xin Gia nhập | Modal | `/workspace/[id]/settings?rejectJoin=[id]` | `2cefb1810c984f1a8e76264598582f0e` | [Ảnh](screens/SCR-JOIN-REJECT-01.png) • [HTML](html/SCR-JOIN-REJECT-01.html) |
| **SCR-PROFILE-01** | Hồ sơ Cá nhân & Đóng góp | Full Page | `/profile` | `37afd7252d59429b9ec99e1d4060c201` | [Ảnh](screens/SCR-PROFILE-01.png) • [HTML](html/SCR-PROFILE-01.html) |
| **SCR-NOTIF-01** | Trung tâm Thông báo Drawer | Drawer | `/workspace/[id]/notifications` | `355adb28f0254cd5858f27f04e896779` | [Ảnh](screens/SCR-NOTIF-01.png) • [HTML](html/SCR-NOTIF-01.html) |

### Khối 3: Cổng Quản trị Hệ thống (System Admin Console)

| Screen ID | Tên Màn hình / Modal | Presentation | Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---:|:---|:---:|:---:|
| **SCR-ADM-DASH-01** | Dashboard Quản trị Hệ thống | Full Page | `/admin/dashboard` | `84bf8c590b6f4a97bde6c1026a894cbc` | [Ảnh](screens/SCR-ADM-DASH-01.png) • [HTML](html/SCR-ADM-DASH-01.html) |
| **SCR-ADM-FACTOR-01** | Quản lý Dữ liệu Hệ số Quy chuẩn | Full Page | `/admin/emission-factors` | `4f2d6a98572742bfb119703764895f6a` | [Ảnh](screens/SCR-ADM-FACTOR-01.png) • [HTML](html/SCR-ADM-FACTOR-01.html) |
| **SCR-ADM-FACTOR-MODAL-01** | Modal Thêm/Sửa Hệ số Phát thải | Modal | `/admin/emission-factors?action=edit` | `d779300c3a7c4e81a4b3e81a653a2711` | [Ảnh](screens/SCR-ADM-FACTOR-MODAL-01.png) • [HTML](html/SCR-ADM-FACTOR-MODAL-01.html) |
| **SCR-ADM-TENANT-01** | Quản lý Danh sách Workspace Tenants | Full Page | `/admin/workspaces` | `d430a2d1557d450794d9e8ce723479b3` | [Ảnh](screens/SCR-ADM-TENANT-01.png) • [HTML](html/SCR-ADM-TENANT-01.html) |
| **SCR-ADM-AUDIT-01** | Cấu hình Tham số AI & Audit Logs | Full Page | `/admin/settings` | `cc91cd0e14604431aa3d7852e03b0e8c` | [Ảnh](screens/SCR-ADM-AUDIT-01.png) • [HTML](html/SCR-ADM-AUDIT-01.html) |

### Khối 4: Màn hình Sự cố & Điều hướng Lỗi (System Error Pages)

| Screen ID | Tên Màn hình / Modal | Presentation | Route | Stitch Screen ID | File Ảnh & HTML |
|:---|:---|:---:|:---|:---:|:---:|
| **SCR-ERR-403** | Màn hình Từ chối Quyền (403 Forbidden) | Full Page | `/403` | `d9afb1b2271d466695c33c2043faa1a8` | [Ảnh](screens/SCR-ERR-403.png) • [HTML](html/SCR-ERR-403.html) |
| **SCR-ERR-404** | Màn hình Không tìm thấy Trang (404 Not Found) | Full Page | `/404` | `29cc2adaa21144b99c3055ae86dac23d` | [Ảnh](screens/SCR-ERR-404.png) • [HTML](html/SCR-ERR-404.html) |

---

## 🔄 3. BẢNG ĐỐI CHIẾU THIẾT KẾ: V1 vs V2

| Tiêu chí | UI Phiên bản 1 (v1) | UI Phiên bản 2 (v2 - Ultraminimal) |
|:---|:---|:---|
| **Top Navigation Bar** | Phức tạp: Logo + Selector Workspace + Breadcrumbs + Thanh tìm kiếm + Thông báo + Avatar | Tối giản tuyệt đối: Logo `[Leaf + CarbonLedger]` bên trái, `[Bell + Avatar]` bên phải. |
| **Tiêu đề Trang (Titles & Subtitles)** | Có tiêu đề lớn kèm câu mô tả nghiệp vụ (subtitle) dưới mỗi trang | Chỉ sử dụng `h1` ngắn gọn (`Dashboard`, `Ledger`, `Approvals`...). Loại bỏ subtitle rườm rà. |
| **Mức độ thông tin hiển thị** | Hiển thị nhiều widget, thẻ tóm tắt bổ trợ, chip nguồn dữ liệu (AI, Excel, Manual) | Tối giản: Chỉ giữ các trường và chỉ số cốt lõi nhất định nghĩa màn hình theo tài liệu IA. |
| **Hàng đợi kiểm duyệt** | Có nhiều số liệu thống kê phụ, bộ lọc nhiều tầng | Chỉ gồm 3 chỉ số tóm tắt + Bảng duyệt nhanh với nút [Duyệt ✓] và [Từ chối ✗]. |
| **Modal kiểm chứng AI** | Kèm nhiều huy hiệu confidence score, cảnh báo pháp lý | Giao diện 2 cột tinh gọn: Hóa đơn bên trái, Form đối chiếu bên phải. |
| **Giao diện Quản trị (Admin)** | Dùng chung shell với người dùng thường | Sidebar than chì tối màu (`#1C252E`), huy hiệu `System Admin` rõ ràng. |
| **Theme & Color System** | Public Sans, White (`#FFFFFF`) & Emerald Green (`#00A76F`) | Tiếp tục kế thừa 100% theme MUI Minimal chuẩn từ minimals.cc. |

---

## 🚀 4. HƯỚNG DẪN XEM NGUYÊN MẪU HTML

Toàn bộ các file HTML là nguyên mẫu độc lập (standalone prototypes) có thể xem trực tiếp qua trình duyệt hoặc khởi chạy local server:

```bash
# Di chuyển vào thư mục chứa nguyên mẫu HTML v2
cd design/stitch-ui-v2/html

# Khởi chạy máy chủ cục bộ nhanh
python3 -m http.server 3001
```

Mở trình duyệt truy cập: `http://localhost:3001`
- `SCR-DASH-01.html`: Dashboard siêu tinh gọn
- `SCR-LEDGER-01.html`: Sổ cái phát thải
- `SCR-APPROVE-01.html`: Hàng đợi duyệt
- `SCR-ADM-DASH-01.html`: Cổng quản trị Admin
