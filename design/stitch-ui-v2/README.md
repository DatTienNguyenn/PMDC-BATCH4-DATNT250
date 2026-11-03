# 🌿 CarbonLedger - MUI Minimal UI v2 Design (Ultraminimal Edition)

> **Dự án:** Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ (Personal & Micro-Office Carbon Ledger)  
> **Nền tảng Thiết kế:** Google Stitch (AI-Driven Design Platform)  
> **Stitch Project ID:** `343766210999719489`  
> **Stitch Project Name:** `CarbonLedger - MUI Minimal UI v2 (Ultraminimal)`  
> **Phong cách UI/UX:** MUI Minimal UI ([minimals.cc](https://minimals.cc))  
> **Tone màu chủ đạo:** Trắng sáng (`#FFFFFF` / `#F9FAFB`) & Xanh ngọc lục bảo Emerald Green (`#00A76F`)  
> **Nhánh Git Worktree:** `design/stitch-minimal-ui-v2`  
> **Căn cứ nghiệp vụ:** [docs/09-information-architecture.md](../../docs/09-information-architecture.md), [docs/01-PRD.md](../../docs/01-PRD.md), [docs/04-user-stories.md](../../docs/04-user-stories.md)

---

## 🎨 1. NGUYÊN TẮC THIẾT KẾ V2 (ULTRAMINIMAL PHILOSOPHY)

Phiên bản v2 tiến thêm một bước so với v1 trong việc tối giản triệt để, áp dụng nguyên tắc **"Chỉ hiển thị thông tin tối thiểu đủ để định nghĩa view"**:

### Nguyên tắc cốt lõi v2:

1. **Top Nav Bar siêu đơn giản:**
   - Chỉ hiển thị: `[Logo: leaf icon + 'CarbonLedger']` bên trái, `[Bell icon] + [Avatar]` bên phải.
   - Loại bỏ hoàn toàn: breadcrumbs, workspace name, workspace dropdown, search bar, extra info.

2. **Thông tin tối thiểu theo định nghĩa view:**
   - Mỗi view chỉ hiển thị đúng và đủ thông tin để định nghĩa chức năng của view đó theo docs.
   - Không subtitle trừ khi thực sự cần thiết (hầu hết views chỉ cần h1 page title).

3. **Kế thừa design system v1:**
   - Cùng color theme: White + Emerald Green `#00A76F`
   - Cùng font: Public Sans
   - Cùng card style: `rounded-2xl`, `border-gray-100`, `shadow-sm`
   - Cùng design system ID Stitch: `assets/adb2152baacf46bea992ab34b31e384f`

---

## 🖥️ 2. DANH MỤC MÀN HÌNH V2

| Screen ID | Tên Màn hình | Phân hệ | Route | Stitch Screen ID | Files |
|:---|:---|:---|:---|:---|:---:|
| **SCR-DASH-01** | Dashboard | Workspace App Shell | `/workspace/[id]/dashboard` | `7d5729320607474f83c9b7d667a92388` | [PNG](screens/SCR-DASH-01.png) • [HTML](html/SCR-DASH-01.html) |
| **SCR-LEDGER-01** | Emission Ledger | Core Ledger | `/workspace/[id]/ledger` | `05b823683de84cbfa60a486fa231cd7e` | [PNG](screens/SCR-LEDGER-01.png) • [HTML](html/SCR-LEDGER-01.html) |
| **SCR-EMISSION-ADD-01** | Add Emission Modal | Ingestion Flow | `/workspace/[id]/ledger?action=add` | `7dcf3782bad94cf99ecd5c7eeea3fe98` | [PNG](screens/SCR-EMISSION-ADD-01.png) • [HTML](html/SCR-EMISSION-ADD-01.html) |
| **SCR-APPROVE-01** | Approval Queue | Reviewer Workflow | `/workspace/[id]/approvals` | `dfe8d855b545448db760ef442225a337` | [PNG](screens/SCR-APPROVE-01.png) • [HTML](html/SCR-APPROVE-01.html) |
| **SCR-INSIGHT-01** | AI Insights & Plan | Intelligence & ESG | `/workspace/[id]/insights` | `2f1db39a09d0461784ee22159e017d86` | [PNG](screens/SCR-INSIGHT-01.png) • [HTML](html/SCR-INSIGHT-01.html) |
| **SCR-SETTING-01** | Settings | Administration | `/workspace/[id]/settings` | `cf93c51782714b909e9a344cb4d94807` | [PNG](screens/SCR-SETTING-01.png) • [HTML](html/SCR-SETTING-01.html) |
| **SCR-AUTH-01** | Login & Register | Auth & Onboarding | `/auth/login` • `/auth/register` | `dbc64b212f8f4cd69036820ed230b8d5` | [PNG](screens/SCR-AUTH-01.png) • [HTML](html/SCR-AUTH-01.html) |
| **SCR-WS-01** | Workspace Switcher | Workspace Onboarding | `/workspaces` | `f55ba06ee41249f4b4d4f06265c2f9eb` | [PNG](screens/SCR-WS-01.png) • [HTML](html/SCR-WS-01.html) |

---

## 🔄 3. SO SÁNH V1 vs V2

| Thành phần | V1 (Decluttered) | V2 (Ultraminimal) |
|:---|:---|:---|
| **Top Nav Bar** | Logo + Workspace name + breadcrumb + search | Logo + Bell + Avatar (chỉ 3 elements) |
| **Page Subtitle** | Có ở một số screens | Loại bỏ hoàn toàn |
| **KPI Cards** | 4-6 cards với nhiều sub-info | 3 cards cốt lõi, số liệu lớn nổi bật |
| **Charts** | Line + Donut + nhiều labels | Minimal labels, clean SVG charts |
| **Table columns** | 6-8 cột | 5 cột cốt lõi |
| **Status badges** | Text + color | Color pill only |
| **AI Labels** | Có nhãn "AI Vision", "AI Insight" | Loại bỏ hoàn toàn |

---

## 🚀 4. HƯỚNG DẪN XEM NGUYÊN MẪU HTML

```bash
cd design/stitch-ui-v2/html
python3 -m http.server 3001
```

Truy cập `http://localhost:3001` để xem toàn bộ giao diện v2.
