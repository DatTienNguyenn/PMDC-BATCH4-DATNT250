# BỘ TIÊU CHÍ NGHIỆM THU CHI TIẾT (ACCEPTANCE CRITERIA - GHERKIN SYNTAX)
## Dự án: Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ (Personal & Micro-Office Carbon Ledger)

> **Phương pháp chuẩn hóa:** **Gherkin Syntax (Given - When - Then - And)**  
> **Bộ kịch bản bao phủ:** Happy Path, Edge Cases, Negative Paths  
> **Căn cứ tài liệu:** [spec.md](../spec.md), [01-PRD.md](01-PRD.md), [02-MVP.md](02-MVP.md), [03-use-cases.md](03-use-cases.md), [04-user-stories.md](04-user-stories.md)  
> **Phiên bản:** 3.0 (Bao phủ 100% 15 User Stories từ Sprint 1 đến Sprint 3)  

---

## MỤC LỤC & MA TRẬN TIÊU CHÍ NGHIỆM THU

| Mã US | Tên User Story | Kịch bản Happy Path | Kịch bản Edge Cases | Kịch bản Negative | Tổng kịch bản |
|:---|:---|:---:|:---:|:---:|:---:|
| [**US-WS-001**](#us-ws-001-khởi-tạo--cấu-hình-không-gian-làm-việc-workspace) | Khởi tạo Workspace | AC1, AC4 | AC2 | AC3 | 4 ACs |
| [**US-WS-002**](#us-ws-002-khai-báo-thông-số-nền-workspace-m2-số-người) | Khai báo thông số nền | AC1 | AC2 | AC3 | 3 ACs |
| [**US-WS-003**](#us-ws-003-mời-thành-viên--phê-duyệt-yêu-cầu-gia-nhập-workspace-join-approval-flow) | Mời & Phê duyệt thành viên | AC1, AC2, AC3 | AC5 | AC4 | 5 ACs |
| [**US-BG-001**](#us-bg-001-thiết-lập-ngân-sách-tháng--ngưỡng-cảnh-báo-sớm-85) | Thiết lập Ngân sách tháng & Ngưỡng 85% | AC1, AC4 | - | AC2, AC3 | 4 ACs |
| [**US-CL-001**](#us-cl-001-khai-báo-phát-thải-thủ-công-cho-sinh-hoạt-lẻ-ở-trạng-thái-draft) | Khai báo phát thải thủ công (Draft) | AC1 | AC2 | AC3 | 3 ACs |
| [**US-CL-002**](#us-cl-002-tự-động-quy-đổi-mức-tiêu-thụ-ra-chỉ-số-kg-co2e) | Tự động quy đổi mức tiêu thụ ra kg CO2e | AC1 | AC2 | AC3 | 3 ACs |
| [**US-CL-003**](#us-cl-003-quét-hóa-đơn--công-tơ-bằng-ai-vision-popup-xem-trước--xác-nhận) | Quét hóa đơn / công tơ bằng AI Vision | AC1 | AC2 | AC3 | 3 ACs |
| [**US-CL-004**](#us-cl-004-nạp-dữ-liệu-qua-file-mẫu-excel-preview--import) | Nạp qua file mẫu Excel (Preview & Import) | AC1 | AC2 | AC3 | 3 ACs |
| [**US-CL-005**](#us-cl-005-kiểm-duyệt--phê-duyệt-accept--reject-request-phát-thải) | Kiểm duyệt & Phê duyệt (Reviewer) | AC1, AC2 | - | AC3 | 3 ACs |
| [**US-CL-006**](#us-cl-006-tra-cứu-lịch-sử-sổ-cái-và-trạng-thái-phê-duyệt) | Tra cứu lịch sử & trạng thái phê duyệt | AC1, AC2 | AC3 | - | 3 ACs |
| [**US-BG-002**](#us-bg-002-theo-dõi-tiến-độ-tiêu-thụ--chỉ-số-chuẩn-hóa-trên-dashboard) | Theo dõi Dashboard & Chỉ số chuẩn hóa | AC1 | AC2, AC3 | - | 3 ACs |
| [**US-BG-003**](#us-bg-003-bắn-notification-cảnh-báo-ngưỡng-85-đến-toàn-bộ-thành-viên) | Bắn Notification cảnh báo ngưỡng 85% | AC1, AC2, AC4 | AC3 | - | 4 ACs |
| [**US-AI-001**](#us-ai-001-ai-insight-linh-hoạt-cấu-hình-lịch-tự-động-hoặc-kích-hoạt-bằng-tay--kế-hoạch-cắt-giảm-cá-nhân-hóa) | AI Insight linh hoạt & Kế hoạch cắt giảm | AC1, AC2, AC3, AC5 | - | AC4 | 5 ACs |
| [**US-AI-002**](#us-ai-002-xuất-báo-cáo-phân-tích--kế-hoạch-cắt-giảm-ra-file-pdf) | Xuất Báo cáo & Kế hoạch ra PDF | AC1 | AC2 | AC3 | 3 ACs |
| [**US-SA-001**](#us-sa-001-quản-lý--cập-nhật-hệ-số-phát-thải-quy-chuẩn) | Quản lý Hệ số Quy chuẩn (System Admin) | AC1 | AC2 | AC3 | 3 ACs |
| **Tổng cộng** | **15 User Stories** | **24 ACs** | **12 ACs** | **15 ACs** | **51 Kịch bản ACs** |

---

# CHI TIẾT TIÊU CHÍ NGHIỆM THU THEO TỪNG USER STORY

## PHẦN 1: LUỒNG KHỞI TẠO & LẬP KẾ HOẠCH (ONBOARDING & BUDGETING)

---

### US-WS-001: Khởi tạo & Cấu hình Không gian làm việc (Workspace)

**Mô tả Story:**  
**As a** Trưởng nhóm gia đình, Quản lý văn phòng nhỏ hoặc Quản trị viên Hệ thống (System Admin)  
**I want to** khởi tạo và cấu hình một Không gian làm việc (Workspace) mới với tên đại diện và loại hình (Hộ gia đình hoặc Văn phòng nhỏ)  
**So that** tôi có một môi trường dữ liệu độc lập để làm Trưởng nhóm (Reviewer) hoặc phục vụ System Admin quản trị, phân bổ tenant và giám sát sổ cái phát thải

**Tham chiếu User Story:** [US-WS-001](04-user-stories.md#us-ws-001)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Tạo Không gian làm việc thành công - Happy path**
- **Given** người dùng đã đăng nhập hệ thống và đang ở trang "Khởi tạo Không gian làm việc"
- **When** người dùng nhập tên Workspace hợp lệ (từ 3 đến 50 ký tự, ví dụ: "Gia đình Nguyễn An"), chọn loại hình "Hộ gia đình" và nhấn nút "Tiếp tục"
- **Then** hệ thống tạo Workspace mới trong cơ sở dữ liệu trong vòng 2 giây
- **And** tự động gán vai trò `Reviewer (Workspace Admin)` cho người dùng hiện tại
- **And** tự động chuyển hướng người dùng đến bước tiếp theo: "Khai báo Thông số nền Workspace (US-WS-002)".

**AC2: Trùng tên Workspace với workspace cũ của cùng tài khoản - Edge case**
- **Given** người dùng đã có một Workspace tên "Văn phòng TechHub"
- **When** người dùng tiếp tục tạo một Workspace mới cũng đặt tên là "Văn phòng TechHub"
- **Then** hệ thống vẫn cho phép tạo thành công và cấp phát UUID định danh duy nhất riêng biệt
- **And** hiển thị cảnh báo nhẹ: "Bạn đã có một không gian làm việc cùng tên. Vui lòng phân biệt bằng mã định danh hoặc đổi tên để tránh nhầm lẫn".

**AC3: Nhập tên Workspace rỗng hoặc vượt quá độ dài - Negative path**
- **Given** người dùng đang ở giao diện khởi tạo Workspace
- **When** người dùng để trống tên (hoặc chỉ nhập khoảng trắng) hoặc nhập chuỗi ký tự dài hơn 50 ký tự và nhấn "Tiếp tục"
- **Then** hệ thống ngăn chặn việc tạo dữ liệu
- **And** hiển thị thông báo lỗi cụ thể tại ô nhập: "Tên Không gian làm việc phải chứa từ 3 đến 50 ký tự"
- **And** giữ nguyên loại hình người dùng đã chọn trước đó.

**AC4: Quản trị viên Hệ thống (System Admin) khởi tạo & cấu hình Workspace thành công**
- **Given** người dùng đăng nhập với quyền `System Admin`
- **When** System Admin chọn chức năng khởi tạo Workspace từ Modal hoặc Cổng Quản trị Hệ thống (`/admin/workspaces`), nhập tên và loại hình hợp lệ và nhấn "Tạo Workspace"
- **Then** hệ thống tạo Workspace mới thành công trong cơ sở dữ liệu
- **And** ghi nhận quyền quản trị Workspace cho System Admin và cho phép cấu hình phân bổ người dùng hoặc chỉ định Reviewer.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Bảng `workspaces`, `workspace_members`.
- **Assumptions**: Tối đa 3 Workspaces cho mỗi tài khoản trong giai đoạn 6 tuần MVP.
- **Open Questions**: Không có.

---

### US-WS-002: Khai báo thông số nền Workspace ($m^2$, số người)

**Mô tả Story:**  
**As a** Trưởng nhóm gia đình hoặc Quản lý văn phòng (Reviewer)  
**I want to** khai báo số lượng thành viên và diện tích mặt sàn sử dụng ($m^2$) của hộ gia đình hoặc văn phòng  
**So that** hệ thống có dữ liệu cơ sở để tự động tính toán các chỉ số cường độ phát thải chuẩn hóa ($\text{CO}_2\text{e}/\text{người}$ và $\text{CO}_2\text{e}/m^2$) giúp so sánh hiệu quả sử dụng năng lượng

**Tham chiếu User Story:** [US-WS-002](04-user-stories.md#us-ws-002)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Khai báo thông số nền thành công - Happy path**
- **Given** Trưởng nhóm đang ở màn hình "Khai báo Thông số nền Workspace"
- **When** Trưởng nhóm nhập số lượng thành viên là `4` người, diện tích mặt sàn là `85.5` $m^2$ và nhấn "Lưu thông số"
- **Then** hệ thống lưu các thông số này vào cấu hình Workspace trong vòng 1 giây
- **And** hiển thị thông báo: "Cập nhật thông số nền thành công"
- **And** tự động tính toán Mức phát thải Tham chiếu chuẩn quốc gia ($4 \times 141.93 = 567.72\text{ kg CO}_2\text{e/tháng}$ cho Hộ gia đình - $46,4\%$ cơ cấu phát thải, hoặc $4 \times 305.83 = 1,223.32\text{ kg CO}_2\text{e/tháng}$ cho Văn phòng - $100\%$ theo [docs/emission-reference-benchmark.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250/docs/emission-reference-benchmark.md))
- **And** tự động kích hoạt công thức tính chỉ số chuẩn hóa trên Dashboard.

**AC2: Cập nhật thông số nền khi có sự thay đổi quy mô - Edge case**
- **Given** văn phòng tăng số lượng nhân sự từ 10 người lên 15 người
- **When** Trưởng nhóm vào mục Cài đặt và chỉnh sửa số người thành `15`
- **Then** hệ thống lưu giá trị mới `15` người
- **And** tự động tính toán lại chỉ số $\text{kg CO}_2\text{e}/\text{người}$ cho tháng hiện tại trên Dashboard mà không làm thay đổi tổng lượng phát thải tuyệt đối.

**AC3: Nhập số người hoặc diện tích không hợp lệ - Negative path**
- **Given** Trưởng nhóm đang ở màn hình khai báo thông số nền
- **When** Trưởng nhóm nhập số lượng thành viên `<= 0` hoặc diện tích `<= 0` (hoặc nhập ký tự chữ)
- **Then** hệ thống chặn lưu dữ liệu
- **And** hiển thị thông báo lỗi cụ thể: "Số lượng thành viên phải là số nguyên lớn hơn 0 và diện tích phải là số dương hợp lệ".

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Bảng `workspace_baselines` gồm các cột: `workspace_id`, `member_count`, `floor_area_m2`, `updated_at`.
- **Assumptions**: Cho phép Trưởng nhóm chỉnh sửa lại các thông số này bất kỳ lúc nào trong phần Cài đặt Workspace.
- **Open Questions**: Không có.

---

### US-WS-003: Mời thành viên & Phê duyệt yêu cầu gia nhập Workspace (Join Approval Flow)

**Mô tả Story:**  
**As a** Trưởng nhóm (Reviewer) của một Workspace và Người dùng muốn tham gia (User)  
**I want to** hệ thống cung cấp mã mời (Invite Code) để người dùng gửi Yêu cầu gia nhập (Join Request) và Reviewer xem xét phê duyệt (Accept/Reject)  
**So that** việc thêm thành viên vào Workspace được kiểm soát an toàn, ngăn chặn việc người lạ tùy tiện hoặc chủ đích truy cập trái phép vào sổ cái của gia đình/văn phòng

**Tham chiếu User Story:** [US-WS-003](04-user-stories.md#us-ws-003)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Người dùng gửi Yêu cầu gia nhập bằng mã mời hợp lệ - Happy path**
- **Given** Trưởng nhóm đã tạo mã mời hợp lệ gồm 6 ký tự (ví dụ: `CARB26`) có thời hạn 7 ngày
- **And** người dùng B đã đăng nhập tài khoản và chưa thuộc Workspace này
- **When** người dùng B nhập mã `CARB26` tại màn hình "Tham gia Workspace" và bấm "Gửi yêu cầu tham gia"
- **Then** hệ thống tạo một bản ghi trong bảng `workspace_join_requests` ở trạng thái `PENDING`
- **And** hiển thị thông báo: "Yêu cầu tham gia Workspace [Tên Workspace] đã được gửi thành công. Vui lòng chờ Trưởng nhóm phê duyệt"
- **And** người dùng B chưa thể truy cập vào Dashboard và dữ liệu của Workspace này.

**AC2: Trưởng nhóm (Reviewer) Phê duyệt (Accept) yêu cầu gia nhập - Happy path**
- **Given** Trưởng nhóm mở mục "Quản lý Thành viên / Yêu cầu gia nhập" và thấy yêu cầu của người dùng B đang ở trạng thái `PENDING`
- **When** Trưởng nhóm nhấn nút "Chấp thuận (Accept)"
- **Then** hệ thống cập nhật trạng thái yêu cầu sang `APPROVED`
- **And** tự động thêm người dùng B vào bảng `workspace_members` với vai trò `EDITOR`
- **And** người dùng B có thể truy cập vào Workspace và bắt đầu nạp hoạt động phát thải ở trạng thái Draft.

**AC3: Trưởng nhóm (Reviewer) Từ chối (Reject) yêu cầu gia nhập - Happy path**
- **Given** Trưởng nhóm phát hiện yêu cầu gia nhập từ một tài khoản không rõ danh tính
- **When** Trưởng nhóm nhấn nút "Từ chối (Reject)" kèm lý do
- **Then** hệ thống cập nhật trạng thái yêu cầu sang `REJECTED`
- **And** không thêm người dùng này vào bảng `workspace_members`
- **And** người dùng này hoàn toàn bị từ chối truy cập vào Workspace.

**AC4: Mã mời đã quá hạn hiệu lực hoặc không tồn tại - Negative path**
- **Given** mã mời đã được tạo quá 7 ngày trước đó hoặc nhập mã không tồn tại (ví dụ: `INVALID`)
- **When** người dùng nhập mã để tham gia
- **Then** hệ thống từ chối tạo yêu cầu gia nhập
- **And** hiển thị thông báo lỗi: "Mã mời không tồn tại hoặc đã hết hạn sử dụng. Vui lòng kiểm tra lại".

**AC5: Người dùng đã có yêu cầu PENDING hoặc đã là thành viên - Edge case**
- **Given** người dùng B đã gửi yêu cầu gia nhập đang ở trạng thái `PENDING` (hoặc đã là thành viên)
- **When** người dùng B cố tình nhập lại mã mời để gửi yêu cầu một lần nữa
- **Then** hệ thống chặn hành động và hiển thị cảnh báo: "Bạn đã có một yêu cầu tham gia đang chờ duyệt (hoặc đã là thành viên) tại Không gian làm việc này".

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Bảng `workspace_join_requests`, bảng `workspace_members`, bảng `workspaces`.
- **Assumptions**: Tối đa 20 thành viên cho mỗi Workspace trong phạm vi Micro-Office.
- **Open Questions**: Không có.

---

### US-BG-001: Thiết lập Ngân sách tháng & Ngưỡng cảnh báo sớm 85%

**Mô tả Story:**  
**As a** Trưởng nhóm gia đình hoặc Quản lý văn phòng (Reviewer)  
**I want to** thiết lập trần phát thải tối đa (Carbon Budget Target) cho cả Workspace vào đầu tháng và kích hoạt ngưỡng cảnh báo sớm ở mức 85%  
**So that** cả gia đình/văn phòng có một mục tiêu định lượng trần cụ thể để kiểm soát và cam kết bảo vệ môi trường

**Tham chiếu User Story:** [US-BG-001](04-user-stories.md#us-bg-001)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Thiết lập ngân sách tháng thành công - Happy path**
- **Given** người dùng là Trưởng nhóm (Reviewer) đang ở màn hình "Cài đặt Ngân sách Carbon"
- **When** Reviewer chọn tháng "10/2026", nhập trần phát thải mục tiêu là `300` kg CO2e và nhấn "Lưu ngân sách"
- **Then** hệ thống lưu thành công giá trị 300 kg CO2e cho tháng 10/2026 của Workspace
- **And** tự động tính toán và hiển thị mốc cảnh báo sớm 85%: `255.00 kg CO2e` (300 * 0.85 = 255)
- **And** hiển thị thông báo: "Thiết lập ngân sách phát thải tháng 10/2026 thành công (Ngưỡng cảnh báo sớm: 255 kg CO2e)".

**AC2: Thành viên (Editor) cố tình truy cập chức năng thiết lập ngân sách - Negative path**
- **Given** người dùng đăng nhập với vai trò `Editor`
- **When** Editor cố tình truy cập trang cấu hình ngân sách hoặc gửi API cập nhật
- **Then** hệ thống chặn hành động và trả về mã lỗi 403 Forbidden
- **And** hiển thị thông báo: "Chỉ Trưởng nhóm (Reviewer) mới có quyền thiết lập ngân sách phát thải của Workspace".

**AC3: Nhập ngân sách là số âm hoặc bằng 0 - Negative path**
- **Given** Reviewer đang ở form nhập ngân sách
- **When** Reviewer nhập giá trị `-100` hoặc `0` và bấm Lưu
- **Then** hệ thống không lưu dữ liệu
- **And** hiển thị thông báo lỗi: "Ngân sách phát thải phải là số nguyên dương lớn hơn 0".

**AC4: Gợi ý hạn ngạch ngân sách thông minh dựa trên Mức tham chiếu Quốc gia - Happy path**
- **Given** Workspace loại Hộ gia đình có 4 thành viên (Mức tham chiếu quốc gia: $4 \times 141.93 = 567.72\text{ kg CO}_2\text{e/tháng}$ theo [docs/emission-reference-benchmark.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250/docs/emission-reference-benchmark.md))
- **When** Reviewer mở form "Cài đặt Ngân sách Carbon" cho tháng mới
- **Then** hệ thống hiển thị gợi ý thông minh 3 mức định lượng: Mục tiêu Xanh (511 kg CO2e ~ giảm 10%), Mục tiêu Chuẩn (568 kg CO2e), Mục tiêu Linh hoạt (624 kg CO2e)
- **And** cho phép Reviewer bấm chọn nhanh mức gợi ý hoặc tự điều chỉnh số thủ công.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Bảng `carbon_budgets`.
- **Assumptions**: Tự động kế thừa hạn ngạch của tháng trước nếu tháng mới chưa được cài đặt thủ công.
- **Open Questions**: Không có.

---

## PHẦN 2: LUỒNG NẠP DỮ LIỆU SỔ CÁI ĐA KÊNH & PHÊ DUYỆT (DATA INGESTION & APPROVAL)

---

### US-CL-001: Khai báo phát thải thủ công cho sinh hoạt lẻ ở trạng thái Draft

**Mô tả Story:**  
**As a** Thành viên gia đình hoặc Nhân viên văn phòng (Editor)  
**I want to** nhập thông tin định lượng cho các hoạt động sinh hoạt lẻ (xe máy xăng 110cc, ô tô, gas LPG, điện lẻ) qua biểu mẫu thủ công để lưu ở trạng thái Draft / Chờ duyệt  
**So that** Trưởng nhóm (Reviewer) có thể kiểm tra và phê duyệt trước khi chính thức ghi vào sổ cái chung của cả nhà/văn phòng

**Tham chiếu User Story:** [US-CL-001](04-user-stories.md#us-cl-001)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Thành viên (Editor) khai báo di chuyển xe máy xăng 110cc thành công - Happy path**
- **Given** người dùng là Thành viên (Editor) đang ở form "Khai báo phát thải thủ công"
- **When** người dùng chọn danh mục "Di chuyển cá nhân", phương tiện "Xe máy xăng 110cc", nhập quãng đường `15` km, ngày phát sinh hôm nay, ghi chú "Đi làm hàng ngày" và bấm "Gửi yêu cầu phê duyệt"
- **Then** hệ thống tạo bản ghi mới với trạng thái `Pending Review (Draft)`
- **And** gắn người tạo là ID của Editor và trạng thái duyệt `Chờ duyệt`
- **And** tổng phát thải của Workspace trên Dashboard chưa bị cộng thêm số phát thải này
- **And** hiển thị thông báo: "Yêu cầu khai báo (15 km xe máy xăng) đã được gửi. Vui lòng chờ Trưởng nhóm phê duyệt".

**AC2: Trưởng nhóm (Reviewer) tự khai báo phát thải - Edge case (Tự động duyệt)**
- **Given** người dùng là Trưởng nhóm (Reviewer) thực hiện khai báo thủ công
- **When** Reviewer điền thông tin hợp lệ và nhấn "Lưu bản ghi"
- **Then** hệ thống tự động gán trạng thái `Approved` ngay lập tức
- **And** số kg CO2e được cộng trực tiếp vào tổng phát thải của Workspace trong tháng.

**AC3: Nhập số lượng tiêu thụ âm, bằng 0 hoặc ngày tương lai - Negative path**
- **Given** Editor đang ở form khai báo
- **When** Editor nhập sản lượng `-15` (hoặc `0`) hoặc chọn ngày phát sinh lớn hơn ngày hiện tại
- **Then** hệ thống chặn gửi yêu cầu
- **And** hiển thị thông báo lỗi cụ thể tại ô nhập: "Sản lượng tiêu thụ phải là số dương lớn hơn 0" hoặc "Ngày phát sinh không được vượt quá ngày hiện tại"
- **And** giữ nguyên các dữ liệu đã nhập khác trên form.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Bảng `emission_logs` với cột `status` (`pending_review`, `approved`, `rejected`).
- **Assumptions**: Hỗ trợ 4 nhóm danh mục vi mô: Di chuyển, Điện, Nước, Nấu nướng Gas.
- **Open Questions**: Không có.

---

### US-CL-002: Tự động quy đổi mức tiêu thụ ra chỉ số kg CO2e

**Mô tả Story:**  
**As a** Thành viên (Editor) hoặc Trưởng nhóm (Reviewer) đang nhập số liệu phát thải  
**I want to** hệ thống tự động tính toán tức thì lượng phát thải quy đổi chuẩn (kg CO2e) dựa trên hệ số quy chuẩn của danh mục  
**So that** tôi biết trước tác động môi trường cụ thể của hoạt động đó trước khi gửi yêu cầu phê duyệt

**Tham chiếu User Story:** [US-CL-002](04-user-stories.md#us-cl-002)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Hiển thị ngay chỉ số quy đổi kg CO2e khi nhập số lượng điện - Happy path**
- **Given** hệ số phát thải quy chuẩn của danh mục Điện sinh hoạt là `0.7221` kg CO2e/kWh
- **When** người dùng gõ vào ô sản lượng tiêu thụ giá trị `250` kWh
- **Then** hệ thống tự động tính toán và hiển thị tại ô "Phát thải ước tính": `180.53 kg CO2e` (250 * 0.7221 = 180.525 -> làm tròn 180.53) trong vòng dưới 300ms
- **And** không làm giật hay khóa giao diện nhập liệu của người dùng.

**AC2: Tính toán với số lượng tiêu thụ có phần thập phân - Edge case**
- **Given** danh mục Gas LPG có hệ số chuẩn là `2.9830` kg CO2e/kg
- **When** người dùng nhập `0.75` kg gas
- **Then** hệ thống tính toán và hiển thị: `2.24 kg CO2e` (0.75 * 2.9830 = 2.23725 -> làm tròn 2.24).

**AC3: Nhập ký tự không phải số vào ô sản lượng - Negative path**
- **Given** người dùng đang ở ô nhập sản lượng
- **When** người dùng gõ ký tự chữ cái (ví dụ: `abc` hoặc ký tự đặc biệt `%#@`)
- **Then** ô xem trước phát thải hiển thị `0.00 kg CO2e`
- **And** hệ thống hiển thị thông báo nhắc nhở: "Vui lòng chỉ nhập ký tự số".

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Sử dụng hàm làm tròn số học (Half-up) 2 chữ số thập phân.
- **Assumptions**: Lưu lại snapshot hệ số tại thời điểm ghi nhận để không bị ảnh hưởng khi System Admin cập nhật hệ số sau này.
- **Open Questions**: Không có.

---

### US-CL-003: Quét hóa đơn / công tơ bằng AI Vision (Popup xem trước & xác nhận)

**Mô tả Story:**  
**As a** Thành viên (Editor) hoặc Trưởng nhóm (Reviewer) sử dụng ứng dụng Web trên điện thoại (PWA)  
**I want to** chụp ảnh hóa đơn tiền điện/nước hoặc ảnh chụp mặt công tơ thực tế để Multimodal AI bóc tách thông tin và hiển thị popup xem trước  
**So that** tôi chỉ cần kiểm tra lại và nhấn "Xác nhận", loại bỏ hoàn toàn thao tác gõ tay phức tạp và tránh nhầm lẫn chỉ số

**Tham chiếu User Story:** [US-CL-003](04-user-stories.md#us-cl-003)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: AI bóc tách hóa đơn điện EVN và hiển thị Popup xác nhận - Happy path**
- **Given** người dùng mở tính năng "Quét hóa đơn / công tơ bằng AI" trên trình duyệt điện thoại
- **When** người dùng tải lên ảnh chụp hóa đơn tiền điện EVN hợp lệ (JPG/PNG, < 5MB) và nhấn "Bóc tách dữ liệu"
- **Then** Backend gọi Multimodal AI API và nhận diện thành công kết quả JSON trong vòng dưới 8 giây
- **And** Frontend hiển thị Popup xem trước (Preview Modal) chứa các trường dữ liệu:
  - Loại dịch vụ: `Điện sinh hoạt`
  - Sản lượng tiêu thụ: `285` (Đơn vị: `kWh`)
  - Kỳ thanh toán / Ngày: Tháng/Năm trên hóa đơn
  - Tổng số tiền: `650.000` VND
- **And** khi người dùng kiểm tra thấy đúng và nhấn nút "Lưu", hệ thống ghi nhận bản ghi (Editor -> Draft; Reviewer -> Approved).

**AC2: AI quét ảnh chụp mặt công tơ điện cơ/điện tử - Edge case**
- **Given** người dùng chụp ảnh mặt công tơ điện thoại tại nhà
- **When** người dùng tải ảnh lên tính năng quét AI
- **Then** AI nhận diện đúng chỉ số hiển thị trên mặt công tơ (ví dụ: `04520` kWh)
- **And** hiển thị trên Popup xem trước kèm gợi ý: "Chỉ số hiện tại: 4520 kWh. Vui lòng nhập chỉ số kỳ trước (nếu có) để tính lượng tiêu thụ".

**AC3: Tải ảnh không phải hóa đơn hoặc file quá dung lượng 5MB - Negative path**
- **Given** người dùng đang ở giao diện quét AI
- **When** người dùng tải lên một hình ảnh không chứa hóa đơn/công tơ (ảnh phong cảnh, ảnh selfie) hoặc file vượt quá dung lượng 5MB
- **Then** hệ thống từ chối xử lý và không lưu bản ghi rác
- **And** hiển thị thông báo lỗi rõ ràng: "Không nhận diện được thông tin hóa đơn hoặc mặt công tơ hợp lệ. Vui lòng chụp lại rõ nét hoặc nhập dữ liệu thủ công".

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: API Key Gemini/Claude, thư viện resize ảnh client-side trước khi upload.
- **Assumptions**: Popup xem trước cho phép người dùng click vào từng ô để sửa lại số nếu AI nhận dạng nhầm một chữ số.
- **Open Questions**: Không có.

---

### US-CL-004: Nạp dữ liệu qua file mẫu Excel (Preview & Import)

**Mô tả Story:**  
**As a** Thành viên (Editor) hoặc Trưởng nhóm (Reviewer) có nhiều dữ liệu phát thải cần ghi nhận  
**I want to** tải về file mẫu Excel của phần mềm, điền dữ liệu hàng loạt và upload lên để hệ thống tự động ánh xạ (map) các trường và hiển thị bảng preview xác nhận trước khi lưu  
**So that** tôi có thể số hóa toàn bộ dữ liệu phát thải của nhiều tuần hoặc nhiều tháng nhanh chóng trong một lần thao tác duy nhất

**Tham chiếu User Story:** [US-CL-004](04-user-stories.md#us-cl-004)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Nạp thành công file Excel mẫu hợp lệ qua màn hình Preview - Happy path**
- **Given** người dùng tải về file mẫu Excel `carbon_ledger_template.xlsx` gồm các cột chuẩn: `Ngày phát sinh`, `Danh mục`, `Phân loại cụ thể`, `Sản lượng tiêu thụ`, `Đơn vị`, `Ghi chú`
- **And** người dùng đã điền 100 dòng hoạt động phát thải hợp lệ
- **When** người dùng upload file lên hệ thống
- **Then** hệ thống đọc file, tự động ánh xạ các cột và hiển thị Bảng Xem trước (Import Preview Table) trong vòng không quá 5 giây
- **And** hiển thị thông tin tóm tắt: "100/100 dòng hợp lệ sẵn sàng nạp. Tổng phát thải ước tính: 1,450.20 kg CO2e"
- **And** khi người dùng nhấn nút "Xác nhận Lưu", hệ thống lưu hàng loạt các bản ghi vào hệ thống (Editor -> Draft; Reviewer -> Approved).

**AC2: File Excel chứa một số dòng bị sai định dạng - Edge case**
- **Given** file Excel có 8 dòng hợp lệ và 2 dòng bị sai (1 dòng sản lượng âm `-10`, 1 dòng để trống ngày)
- **When** người dùng upload file lên
- **Then** Bảng Xem trước hiển thị rõ ràng: 8 dòng màu xanh (Hợp lệ) và 2 dòng màu đỏ (Lỗi định dạng kèm lý do cụ thể tại cột lỗi)
- **And** cung cấp tùy chọn: "Bỏ qua 2 dòng lỗi và chỉ nạp 8 dòng hợp lệ" hoặc "Hủy để tải file sửa lại".

**AC3: Upload file sai cấu trúc cột hoặc không phải file Excel - Negative path**
- **Given** người dùng upload một file Excel ngẫu nhiên không có cấu trúc cột theo template mẫu của phần mềm
- **When** hệ thống phân tích cấu trúc file
- **Then** hệ thống từ chối nạp dữ liệu
- **And** hiển thị thông báo lỗi: "File không đúng cấu trúc mẫu quy định. Vui lòng nhấn nút 'Tải file mẫu' để sử dụng mẫu chuẩn của phần mềm"
- **And** không có bản ghi nào được ghi vào cơ sở dữ liệu.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Endpoint `/api/ledger/import-excel`, thư viện phân tích bảng tính.
- **Assumptions**: Bản ghi import từ Editor sẽ ở trạng thái `pending_review` (hàng loạt) chờ Reviewer phê duyệt.
- **Open Questions**: Không có.

---

### US-CL-005: Kiểm duyệt & phê duyệt (Accept / Reject) request phát thải

**Mô tả Story:**  
**As a** Trưởng nhóm gia đình hoặc Quản lý văn phòng (Reviewer)  
**I want to** xem danh sách các yêu cầu khai báo phát thải (từ thủ công, quét AI hoặc import Excel) đang ở trạng thái Chờ duyệt (Draft) và đưa ra quyết định Phê duyệt (Accept) hoặc Từ chối (Reject kèm lý do)  
**So that** tôi đảm bảo tính chính xác, trung thực của các số liệu tiêu thụ trước khi ghi chính thức vào sổ cái và tính vào ngân sách của tập thể

**Tham chiếu User Story:** [US-CL-005](04-user-stories.md#us-cl-005)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Trưởng nhóm (Reviewer) phê duyệt (Accept) yêu cầu phát thải - Happy path**
- **Given** có một request của Thành viên B khai báo `250` kWh điện (tương đương `180.53` kg CO2e) đang ở trạng thái `Pending Review`
- **When** Reviewer bấm vào xem chi tiết request và nhấn nút "Phê duyệt (Accept)"
- **Then** hệ thống cập nhật trạng thái bản ghi thành `Approved` trong vòng 1 giây
- **And** tự động cộng thêm `180.53` kg CO2e vào bảng `emission_logs` của Workspace trong tháng
- **And** kích hoạt kiểm tra ngưỡng cảnh báo ngân sách
- **And** gửi thông báo tới Thành viên B: "Yêu cầu khai báo điện sinh hoạt (250 kWh) của bạn đã được Trưởng nhóm phê duyệt"
- **And** bản ghi biến mất khỏi hàng đợi chờ duyệt.

**AC2: Trưởng nhóm (Reviewer) từ chối (Reject) yêu cầu phát thải - Happy path / Exception**
- **Given** có một request di chuyển 200 km bằng xe máy bị nghi ngờ nhập sai số
- **When** Reviewer nhấn nút "Từ chối (Reject)", nhập lý do: "Số km không khớp với lịch trình thực tế" và ấn xác nhận
- **Then** hệ thống chuyển trạng thái bản ghi thành `Rejected`
- **And** lưu lý do từ chối vào bản ghi
- **And** không cộng dồn số kg CO2e của bản ghi này vào tổng phát thải của Workspace
- **And** gửi thông báo kèm lý do từ chối tới Thành viên đã tạo yêu cầu.

**AC3: Người dùng có vai trò Editor cố tình thực hiện thao tác duyệt - Negative path**
- **Given** người dùng đăng nhập với vai trò `Editor`
- **When** người dùng cố tình gửi request duyệt hoặc từ chối thông qua API
- **Then** hệ thống từ chối yêu cầu và trả về lỗi 403 Forbidden
- **And** hiển thị thông báo lỗi: "Chỉ Trưởng nhóm (Reviewer) mới có quyền phê duyệt hoặc từ chối yêu cầu phát thải"
- **And** trạng thái bản ghi được giữ nguyên là `Pending Review`.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Bảng `emission_logs`, cột `reviewed_by`, `reviewed_at`, `rejection_reason`.
- **Assumptions**: Editor có quyền xem lý do từ chối và tạo một yêu cầu mới đã điều chỉnh.
- **Open Questions**: Không có.

---

### US-CL-006: Tra cứu lịch sử sổ cái và trạng thái phê duyệt

**Mô tả Story:**  
**As a** Thành viên (Editor) hoặc Trưởng nhóm (Reviewer)  
**I want to** xem danh sách các giao dịch phát thải trong Workspace và lọc theo trạng thái duyệt (`Đã duyệt`, `Chờ duyệt`, `Từ chối`), nguồn nạp (Thủ công / Quét AI / Excel) và danh mục  
**So that** tôi nắm rõ tình trạng các hoạt động đã được ghi sổ và theo dõi tiến độ xử lý các request của mình

**Tham chiếu User Story:** [US-CL-006](04-user-stories.md#us-cl-006)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Editor xem danh sách yêu cầu đang chờ duyệt của mình - Happy path**
- **Given** Editor đã gửi 3 yêu cầu phát thải (2 yêu cầu đang `Chờ duyệt`, 1 yêu cầu đã `Đã duyệt`)
- **When** Editor vào mục "Lịch sử khai báo" và chọn tab "Chờ duyệt"
- **Then** hệ thống hiển thị chính xác 2 bản ghi đang chờ duyệt với huy hiệu màu vàng `Chờ duyệt`
- **And** hiển thị ngày gửi, nguồn nạp (Thủ công / AI / Excel), số lượng tiêu thụ và số kg CO2e tạm tính.

**AC2: Reviewer lọc toàn bộ giao dịch chính thức đã ghi sổ trong tháng - Happy path**
- **Given** Reviewer đang xem Sổ cái chung của Workspace trong tháng 10/2026
- **When** Reviewer chọn bộ lọc trạng thái "Đã duyệt"
- **Then** hệ thống chỉ hiển thị các bản ghi đã có trạng thái `Approved`
- **And** hiển thị tổng số kg CO2e lũy kế chính thức ở đầu bảng danh sách.

**AC3: Xem chi tiết lý do của yêu cầu bị từ chối - Edge case**
- **Given** có một bản ghi của Editor bị Reviewer từ chối
- **When** Editor chọn xem chi tiết bản ghi có huy hiệu đỏ `Từ chối`
- **Then** hệ thống hiển thị thông tin chi tiết kèm mục "Lý do từ chối: [Nội dung Reviewer đã nhập]"
- **And** hiển thị nút hành động: "Tạo lại yêu cầu mới từ bản ghi này" để giúp thành viên chỉnh sửa nhanh.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Index trên `(workspace_id, status, created_at)`.
- **Assumptions**: Hỗ trợ phân trang 20 bản ghi mỗi trang.
- **Open Questions**: Không có.

---

## PHẦN 3: LUỒNG XỬ LÝ SỔ CÁI, GIÁM SÁT DASHBOARD & CẢNH BÁO (LEDGER PROCESSING, DASHBOARD & ALERT)

---

### US-BG-002: Theo dõi tiến độ tiêu thụ & chỉ số chuẩn hóa trên Dashboard

**Mô tả Story:**  
**As a** Thành viên (Editor) hoặc Trưởng nhóm (Reviewer)  
**I want to** xem thanh tiến độ (Progress Bar) % phát thải so với Target ngân sách cùng các chỉ số chuẩn hóa ($\text{CO}_2\text{e}/\text{người}$ và $\text{CO}_2\text{e}/m^2$) trên Dashboard  
**So that** tôi và các thành viên khác luôn nắm bắt được mức độ tiêu thụ thực tế theo quy mô của gia đình/văn phòng tại mọi thời điểm trong tháng

**Tham chiếu User Story:** [US-BG-002](04-user-stories.md#us-bg-002)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Hiển thị tiến độ ngân sách và chỉ số chuẩn hóa chính xác - Happy path**
- **Given** Workspace có Target tháng là `300` kg CO2e, đã khai báo thông số nền: `4` người và `80` $m^2$
- **And** tổng các giao dịch `Approved` lũy kế đến hiện tại là `150` kg CO2e
- **When** người dùng (cả Reviewer và Editor) truy cập Dashboard
- **Then** thanh tiến độ hiển thị ở mức `50%` (150 / 300 = 50%) với thanh trạng thái màu Xanh lá
- **And** hệ thống hiển thị chính xác các chỉ số chuẩn hóa:
  - Chỉ số theo nhân khẩu: `37.50 kg CO2e/người` (150 / 4 = 37.5)
  - Chỉ số theo diện tích: `1.88 kg CO2e/m²` (150 / 80 = 1.875 -> làm tròn 1.88)
- **And** hiển thị rõ ràng: "Đã tiêu thụ: 150.00 / 300.00 kg CO2e" và "Còn lại: 150.00 kg CO2e".

**AC2: Workspace chưa có phát sinh giao dịch nào trong tháng - Edge case**
- **Given** tháng mới bắt đầu và chưa có giao dịch nào được ghi nhận
- **When** người dùng mở Dashboard
- **Then** thanh tiến độ hiển thị ở mức `0%`, các chỉ số chuẩn hóa hiển thị `0.00 kg CO2e`
- **And** hiển thị thông điệp tích cực: "Chưa có phát sinh phát thải trong tháng. Hãy tiếp tục duy trì lối sống xanh!".

**AC3: Hiển thị tối ưu trên thiết bị di động (Mobile-First PWA) - Edge case**
- **Given** người dùng mở Dashboard trên trình duyệt smartphone
- **When** trang tải xong
- **Then** thanh tiến độ, các thẻ chỉ số chuẩn hóa hiển thị gọn gàng, không bị tràn màn hình ngang
- **And** thời gian phản hồi kết xuất dữ liệu không vượt quá 1.5 giây.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Truy vấn chỉ tính `WHERE status = 'approved' AND month = ... AND year = ...`.
- **Assumptions**: Tự động làm mới số liệu khi có giao dịch mới được duyệt.
- **Open Questions**: Không có.

---

### US-BG-003: Bắn Notification cảnh báo ngưỡng 85% đến TOÀN BỘ thành viên

**Mô tả Story:**  
**As a** Thành viên (Editor) hoặc Trưởng nhóm (Reviewer) trong Workspace  
**I want to** hệ thống tự động bắn Notification cảnh báo ngay lập tức khi tổng phát thải của Workspace chạm mốc 85% hoặc vượt 100% ngân sách  
**So that** toàn bộ các thành viên trong gia đình/văn phòng đều nhận được cảnh báo sớm để cùng nhau chung tay tiết kiệm điện, nước và giảm sử dụng nhiên liệu

**Tham chiếu User Story:** [US-BG-003](04-user-stories.md#us-bg-003)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Tự động bắn Notification cảnh báo đến TOÀN BỘ thành viên khi chạm ngưỡng 85% - Happy path**
- **Given** Workspace có Carbon Budget tháng là 300 kg CO2e (ngưỡng 85% là 255 kg CO2e) và hiện đã phát thải 240 kg CO2e
- **When** Reviewer vừa phê duyệt thêm một giao dịch điện 25 kWh (18.05 kg CO2e) nâng tổng phát thải lên `258.05` kg CO2e (đạt 86% ngân sách)
- **Then** hệ thống ngay lập tức tạo bản ghi thông báo và bắn Notification đến **toàn bộ tài khoản thành viên (cả Reviewer và tất cả Editor)** của Workspace trong vòng dưới 2 giây
- **And** nội dung thông báo hiển thị: "⚠️ Cảnh báo sớm: Workspace [Tên] đã sử dụng 86% ngân sách carbon tháng 10 (258.05 / 300 kg CO2e). Hãy cùng nhau tiết kiệm năng lượng!"
- **And** thanh tiến độ trên Dashboard của mọi thành viên tự động đổi sang màu Vàng cam (Warning).

**AC2: Bắn Notification báo động Đỏ khi vượt trần 100% ngân sách - Happy path**
- **Given** tổng phát thải của Workspace chạm mốc `305` kg CO2e (vượt quá ngân sách 300 kg CO2e)
- **When** giao dịch vượt trần được ghi nhận
- **Then** hệ thống tự động bắn Notification báo động khẩn cấp tới tất cả thành viên: "🚨 Báo động vượt trần: Workspace [Tên] đã vượt 100% ngân sách carbon tháng này (305 / 300 kg CO2e)! Xem ngay gợi ý AI để cắt giảm."
- **And** thanh tiến độ trên Dashboard chuyển sang màu Đỏ đậm (Danger).

**AC3: Tránh bắn thông báo lặp lại liên tục trong cùng một ngưỡng - Edge case**
- **Given** hệ thống đã bắn Notification cảnh báo ngưỡng 85% khi đạt 258 kg CO2e
- **When** có thêm một giao dịch nhỏ phát sinh đưa tổng phát thải lên 260 kg CO2e (vẫn nằm trong khoảng từ 85% đến dưới 100%)
- **Then** hệ thống không bắn lại notification cảnh báo 85% lần thứ hai để tránh gây phiền hà (spam notification)
- **And** chỉ bắn notification mới khi chạm ngưỡng kế tiếp (ngưỡng 100%).

**AC4: Kích hoạt cảnh báo dị biệt Mức tham chiếu Quốc gia (National Benchmark Anomaly Alert) - Happy path**
- **Given** Workspace loại Hộ gia đình có mức tham chiếu là $141.93\text{ kg CO}_2\text{e/người/tháng}$ ($46,4\%$ ranh giới phát thải theo [docs/emission-reference-benchmark.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250/docs/emission-reference-benchmark.md))
- **When** lượng phát thải bình quân đầu người thực tế tích lũy vượt mức $141.93\text{ kg CO}_2\text{e}$ (hoặc Run-rate dự báo giữa tháng vượt quá $120\%$ mức tham chiếu)
- **Then** hệ thống tự động hiển thị huy hiệu Cảnh báo Dị biệt (Anomaly Warning Badge) trên Dashboard
- **And** gửi Notification khuyến cáo các thành viên rà soát các danh mục phát thải trọng yếu (Điện sinh hoạt, Phương tiện cá nhân) để kịp thời tiết giảm trước khi hết tháng.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Tỷ lệ `total_co2e_kg / target_co2e_kg` từ API Dashboard (`carbon_budgets` & `emission_logs`). Không phụ thuộc bảng lưu trữ `notifications` vì frontend tự động tính toán real-time để hiển thị.
- **Assumptions**: Người dùng có thể xem cảnh báo trực tiếp trên Banner Dashboard và Popup Drawer thông báo tính toán động.
- **Open Questions**: Không có.

---

## PHẦN 4: LUỒNG PHÂN TÍCH & GỢI Ý HÀNH ĐỘNG BẰNG AI (AI INSIGHT & REPORTING)

---

### US-AI-001: AI Insight linh hoạt (Cấu hình lịch tự động hoặc kích hoạt bằng tay) & Kế hoạch cắt giảm cá nhân hóa

**Mô tả Story:**  
**As a** Trưởng nhóm gia đình hoặc Quản lý văn phòng (Reviewer)  
**I want to** có quyền tự cấu hình lịch chạy tác vụ tự động (hàng tuần, hàng tháng hoặc tắt) vào thời điểm tùy chọn, đồng thời có thể bấm nút "Sinh báo cáo ngay" bất kỳ lúc nào để AI gom nhóm dữ liệu tiêu thụ và đề xuất Kế hoạch cắt giảm cá nhân hóa có số liệu định lượng  
**So that** tôi chủ động kiểm soát thời điểm nhận báo cáo, biết chính xác nhóm phát thải đột biến và có giải pháp thực tế cụ thể (ví dụ: đi tàu điện Cát Linh - Hà Đông) để cắt giảm kg CO2e trong kỳ tới

**Tham chiếu User Story:** [US-AI-001](04-user-stories.md#us-ai-001)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Cronjob tự động phân tích và sinh Kế hoạch cắt giảm định lượng theo lịch cấu hình - Happy path**
- **Given** Reviewer đã cấu hình lịch báo cáo tự động là `MONTHLY` vào ngày cuối tháng lúc 23:59, Workspace có dữ liệu tiêu thụ với tổng phát thải 320 kg CO2e (trong đó Xe máy xăng tăng 40% so với tháng trước)
- **When** tác vụ Cronjob được kích hoạt tự động theo đúng lịch đã cấu hình
- **Then** hệ thống gom nhóm dữ liệu (Điện chiếm bao nhiêu %, Xăng xe chiếm bao nhiêu %, Nước chiếm bao nhiêu %) và đẩy vào LLM Prompt
- **And** LLM phân tích và trả về báo cáo Kế hoạch cắt giảm mang tính cá nhân hóa trong vòng dưới 15 giây với nội dung định lượng cụ thể:
  - *Phát hiện bất thường:* "Tháng này lượng phát thải từ việc sử dụng xe máy cá nhân tăng đột biến 40% (chiếm 45% tổng phát thải)."
  - *Khuyến nghị hành động cá nhân hóa:* "Nếu 2 thành viên chuyển sang dùng tàu điện trên cao Cát Linh - Hà Đông 3 ngày/tuần, gia đình có thể cắt giảm 18 kg CO2e vào tháng sau."
- **And** báo cáo được lưu vào bảng `ai_reports` và hiển thị trên Dashboard chính của Reviewer.

**AC2: Reviewer chủ động bấm nút "Sinh báo cáo ngay" (On-demand) bất kỳ lúc nào - Alternative path**
- **Given** Reviewer đã tắt tự động (`DISABLED`) hoặc chưa đến lịch hẹn nhưng muốn xem ngay phân tích số liệu tích lũy đến hiện tại
- **When** Reviewer bấm nút "Sinh báo cáo ngay" trên giao diện Báo cáo AI
- **Then** hệ thống thực thi tác vụ phân tích tức thời theo số liệu lũy kế đến hiện tại
- **And** hiển thị báo cáo AI hoàn chỉnh trên màn hình mà không cần chờ đến lịch cronjob tự động.

**AC3: Reviewer cấu hình lịch tự động sinh báo cáo trong Workspace Settings - Setup path**
- **Given** Reviewer truy cập trang Cài đặt Workspace (Workspace Settings) -> mục Cấu hình Báo cáo AI
- **When** Reviewer tùy chọn:
  - Tần suất: `DISABLED` (Tắt) / `WEEKLY` (Hàng tuần) / `MONTHLY` (Hàng tháng)
  - Chọn thứ trong tuần (1-7) nếu chọn Weekly, hoặc chọn ngày trong tháng (1-31 hoặc Cuối tháng) nếu chọn Monthly
  - Chọn giờ chạy trong ngày (mặc định 23:59:00)
  - Nhấn "Lưu cấu hình"
- **Then** hệ thống cập nhật các trường `ai_report_frequency`, `ai_report_day_of_week`, `ai_report_day_of_month`, `ai_report_time` trong bảng `workspaces` và lên lịch chạy chính xác theo cấu hình mới.

**AC4: Lỗi gián đoạn kết nối hoặc timeout API AI (> 15 giây) - Negative path**
- **Given** dịch vụ API LLM bên ngoài bị quá tải hoặc mất mạng
- **When** tác vụ AI đang thực thi (tự động hoặc kích hoạt bằng tay)
- **Then** hệ thống hủy yêu cầu an toàn (graceful timeout)
- **And** ghi nhận nhật ký lỗi và hiển thị thông báo thân thiện: "Dịch vụ AI đang bận hoặc gián đoạn kết nối. Hệ thống sẽ tự động thử lại vào chu kỳ tiếp theo"
- **And** không làm gián đoạn các tính năng khác trên hệ thống.

**AC5: Reviewer thiết lập mục tiêu cắt giảm dài hạn và nhận Lộ trình Cắt giảm Theo Từng Tháng từ AI - Reduction Roadmap path**
- **Given** Reviewer đang ở màn hình Báo cáo AI & Kế hoạch Cắt giảm (`SCR-INSIGHT-01`), Workspace có dữ liệu cơ sở tháng gần nhất phát thải 348.50 kg CO2e
- **When** Reviewer nhập mục tiêu muốn giảm `15%` trong tầm nhìn `3 tháng` và bấm "AI Sinh Lộ trình Cắt giảm"
- **Then** hệ thống gọi LLM phân tích cơ cấu tiêu thụ và trả về Lộ trình Cắt giảm Theo Từng Tháng (Month-by-Month Reduction Roadmap) trong vòng dưới 10 giây
- **And** lộ trình phân bổ mốc giảm cụ thể qua từng tháng:
  - *Tháng 1 (Mục tiêu 331.08 kg - Giảm 5%):* Hành động chuyển 2 ngày đi xe máy sang tàu điện Cát Linh - Hà Đông (-12.00 kg CO2e), tắt bình nóng lạnh khi không dùng (-5.42 kg CO2e)
  - *Tháng 2 (Mục tiêu 313.65 kg - Giảm lũy kế 10%):* Hành động đặt điều hòa 26°C kết hợp quạt thay vì 22°C (-13.50 kg CO2e), đi bộ quãng đường ngắn (-4.00 kg CO2e)
  - *Tháng 3 (Mục tiêu 296.23 kg - Giảm lũy kế 15%):* Hành động tối ưu hóa nấu ăn bếp từ/áp suất (-10.50 kg CO2e), phân loại rác tái chế (-6.85 kg CO2e)
- **And** kế hoạch được lưu vào bảng `emission_reduction_plans` và hiển thị trực quan dạng Timeline trên giao diện để theo dõi đối chiếu thực tế.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Bảng `ai_reports`, cron task scheduler (node-cron hoặc PostgreSQL pg_cron).
- **Assumptions**: Lưu lại kết quả để Reviewer có thể xem lại bất kỳ lúc nào mà không cần gọi API AI tốn kém chi phí.
- **Open Questions**: Không có.

---

### US-AI-002: Xuất Báo cáo Phân tích & Kế hoạch cắt giảm ra file PDF

**Mô tả Story:**  
**As a** Trưởng nhóm gia đình hoặc Quản lý văn phòng (Reviewer)  
**I want to** xuất toàn bộ Báo cáo phân tích phát thải và Kế hoạch cắt giảm do AI tạo ra thành một file PDF có định dạng chuẩn in ấn đẹp mắt  
**So that** tôi có thể lưu trữ hồ sơ, in ra dán tại bảng tin văn phòng hoặc chia sẻ vào nhóm Zalo/Telegram của gia đình để mọi người cùng đọc

**Tham chiếu User Story:** [US-AI-002](04-user-stories.md#us-ai-002)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: Xuất file PDF Báo cáo phát thải thành công - Happy path**
- **Given** Reviewer đang xem Báo cáo phân tích tháng 10/2026 trên Dashboard
- **When** Reviewer nhấn nút "Xuất Báo cáo PDF"
- **Then** hệ thống kết xuất file PDF chuẩn in ấn trong vòng dưới 3 giây và tự động kích hoạt tải xuống trình duyệt
- **And** file PDF có tên định dạng: `Bao_cao_Carbon_[Ten_Workspace]_10_2026.pdf`
- **And** nội dung PDF chứa đầy đủ:
  - Tên Workspace, Kỳ báo cáo, Thông số nền (Số người, Diện tích $m^2$)
  - Tổng lượng phát thải (kg CO2e) và các chỉ số chuẩn hóa ($\text{kg CO}_2\text{e}/\text{người}$, $\text{kg CO}_2\text{e}/m^2$)
  - Biểu đồ phân bổ cơ cấu tỷ trọng (Điện, Nước, Di chuyển, Nấu nướng)
  - Toàn văn phân tích nguyên nhân bất thường và Kế hoạch cắt giảm cá nhân hóa từ AI.

**AC2: Workspace chưa có báo cáo AI nào được sinh ra - Edge case**
- **Given** tháng hiện tại chưa có dữ liệu báo cáo AI
- **When** Reviewer nhấn "Xuất Báo cáo PDF"
- **Then** hệ thống hiển thị thông báo nhắc nhở: "Chưa có nội dung phân tích AI cho kỳ này. Vui lòng bấm 'Kích hoạt Phân tích AI ngay' trước khi xuất file PDF"
- **And** không tải về file PDF rỗng.

**AC3: Xử lý lỗi kết xuất file PDF phía máy chủ - Negative path**
- **Given** máy chủ bị quá tải bộ nhớ khi đang render file PDF
- **When** tiến trình xuất PDF gặp lỗi 500
- **Then** hệ thống bắt lỗi an toàn và hiển thị thông báo: "Tạm thời chưa thể kết xuất file PDF. Vui lòng thử lại sau giây lát"
- **And** giữ nguyên màn hình giao diện báo cáo hiện tại.

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Module PDF Generator phía backend hoặc thư viện client-side rendering.
- **Assumptions**: Định dạng trang A4 tiêu chuẩn (dọc).
- **Open Questions**: Không có.

---

## PHẦN 5: MODULE QUẢN TRỊ HỆ THỐNG (SYSTEM ADMINISTRATION)

---

### US-SA-001: Quản lý & Cập nhật Hệ số phát thải quy chuẩn

**Mô tả Story:**  
**As a** Quản trị viên Hệ thống (System Admin)  
**I want to** cấu hình và cập nhật giá trị các Hệ số phát thải chuẩn (Standard Emission Factors) của quốc gia (lưới điện EVN, xăng xe máy, xăng ô tô, gas LPG, nước sạch)  
**So that** toàn bộ các Workspace trên hệ thống luôn tính toán dấu chân carbon chính xác theo quy chuẩn nhà nước mới nhất khi có sự thay đổi

**Tham chiếu User Story:** [US-SA-001](04-user-stories.md#us-sa-001)

#### Tiêu chí Nghiệm thu (Gherkin Syntax)

**AC1: System Admin cập nhật hệ số phát thải lưới điện EVN thành công - Happy path**
- **Given** người dùng đã đăng nhập với vai trò `System Admin` và đang ở trang "Quản lý Hệ số Quy chuẩn"
- **When** System Admin chọn danh mục "Điện sinh hoạt", cập nhật hệ số từ `0.7221` thành `0.7500` kg CO2e/kWh kèm ghi chú "Cập nhật theo Báo cáo EVN 2026" và nhấn "Lưu thay đổi"
- **Then** hệ thống lưu hệ số mới `0.7500` vào cơ sở dữ liệu kèm thời gian cập nhật
- **And** hiển thị thông báo: "Cập nhật hệ số phát thải quy chuẩn thành công"
- **And** tất cả các bản ghi phát thải điện sinh hoạt được tạo mới trên toàn hệ thống từ thời điểm này sẽ tự động tính theo hệ số `0.7500`.

**AC2: Giữ nguyên tính toàn vẹn của các bản ghi phát thải cũ - Edge case**
- **Given** hệ thống đã có hàng nghìn giao dịch điện sinh hoạt đã ghi sổ với hệ số cũ `0.7221`
- **When** System Admin cập nhật hệ số mới `0.7500`
- **Then** hệ thống không cập nhật lại giá trị kg CO2e của các giao dịch trong quá khứ
- **And** đảm bảo dữ liệu lịch sử không bị xáo trộn hay làm thay đổi báo cáo các tháng trước.

**AC3: Người dùng thông thường cố tình truy cập khu vực Quản trị Hệ thống - Negative path**
- **Given** người dùng đăng nhập với vai trò `Trưởng nhóm (Reviewer)` hoặc `Thành viên (Editor)`
- **When** người dùng cố tình truy cập vào URL quản trị hệ số quy chuẩn của System Admin
- **Then** hệ thống chặn yêu cầu và trả về lỗi 403 Forbidden
- **And** hiển thị thông báo: "Bạn không có quyền truy cập vào khu vực Quản trị Hệ thống".

#### Ghi chú & Ràng buộc Kỹ thuật

- **Dependencies**: Middleware xác thực quyền System Admin.
- **Assumptions**: Bảng hệ số mặc định:
  - Điện sinh hoạt: `0.7221` kg CO2e/kWh
  - Nước sạch: `0.3440` kg CO2e/m3
  - Xăng xe máy: `0.0650` kg CO2e/km
  - Xe ô tô xăng: `0.1920` kg CO2e/km
  - Gas LPG: `2.9830` kg CO2e/kg
- **Open Questions**: Không có.

---

## 📋 TIÊU CHUẨN ĐÁNH GIÁ SẴN SÀNG & HOÀN THÀNH (DOR & DOD)

### 1. Definition of Ready (DoR) cho Tiêu chí Nghiệm thu
- [x] Mỗi User Story có tối thiểu 3 kịch bản Acceptance Criteria: Happy Path, Edge Case, Negative Path.
- [x] Định dạng chuẩn Gherkin (`Given - When - Then - And`) rõ ràng, không nhập nhằng.
- [x] Dữ liệu đầu vào và trạng thái mong đợi có định lượng số liệu rõ ràng (thời gian phản hồi $\le 20-30\text{s}$, $\le 5\text{s}$, $\le 3-5\text{s}$; ngưỡng cảnh báo $85\%$, $100\%$).

### 2. Definition of Done (DoD) khi Nghiệm thu Tính năng
- [x] Mã nguồn vượt qua 100% các kịch bản kiểm thử tự động (Unit Test, Integration Test) tương ứng với các ACs.
- [x] Đã kiểm thử thủ công và xác nhận thành công toàn bộ luồng ngoại lệ (Edge Cases) và xử lý lỗi (Negative Paths).
- [x] Giao diện người dùng thể hiện chính xác các thông điệp cảnh báo/thông báo thành công theo từng kịch bản AC.

---

*Tài liệu Tiêu chí Nghiệm thu này đồng bộ 100% với [spec.md](../spec.md), [01-PRD.md](01-PRD.md), [02-MVP.md](02-MVP.md), [03-use-cases.md](03-use-cases.md) và [04-user-stories.md](04-user-stories.md).*
