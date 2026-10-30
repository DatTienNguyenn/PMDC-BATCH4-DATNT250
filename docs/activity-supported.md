# DANH MỤC CÁC HOẠT ĐỘNG PHÁT THẢI ĐƯỢC HỖ TRỢ & HỆ SỐ PHÁT THẢI QUY CHUẨN
## (Supported Activities & Standard Emission Factors Specification)
### Dự án: Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình/Văn phòng nhỏ (Personal & Micro-Office Carbon Ledger)

> **Căn cứ tài liệu kỹ thuật & nghiệp vụ:**
> - [spec.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250/spec.md): Mục 4 - Mô hình Dữ liệu và Công thức Tính toán Dấu chân Carbon
> - [docs/user-stories.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250/docs/user-stories.md): `US-CL-001` (Nạp thủ công), `US-CL-002` (Quy đổi kg CO2e tự động), `US-SA-001` (Quản lý hệ số quy chuẩn của System Admin)
> - [docs/MVP.md](file:///home/datnguyen-nuoa/PMDC-BATCH4-DATNT250/docs/MVP.md): Danh mục phân bổ Sprint 1 và Cấu trúc cơ sở dữ liệu `standard_emission_factors`
>
> **Tiêu chuẩn kiểm kê khí nhà kính tuân thủ:**
> - **GHG Protocol Corporate Accounting and Reporting Standard** (WRI / WBCSD)
> - **GHG Protocol Scope 2 Guidance** & **Corporate Value Chain (Scope 3) Standard**
> - **ISO 14064-1:2018** (Quy chuẩn kỹ thuật định lượng và báo cáo phát thải khí nhà kính cấp tổ chức)

---

## 📌 1. TỔNG QUAN & MỤC TIÊU TÀI LIỆU (PURPOSE & SCOPE)

Trong mô hình kiểm kê phát thải khí nhà kính dành cho **Hộ gia đình** và **Văn phòng nhỏ**, việc xác định chính xác danh mục hoạt động phát sinh phát thải và áp dụng đúng hệ số phát thải quy chuẩn (Emission Factor - EF) đóng vai trò quyết định đến độ tin cậy và giá trị pháp lý/kiểm toán của sổ cái carbon.

Tài liệu này được lập ra nhằm:
1. **Chuẩn hóa danh mục hoạt động:** Định nghĩa chính xác 8 hoạt động phát sinh carbon cốt lõi mà hệ thống hỗ trợ ghi nhận qua 3 kênh: Nhập thủ công sinh hoạt (`US-CL-001`), Quét hóa đơn/vé điện tử/công tơ AI OCR (`US-CL-003`) và Import bảng tính Excel (`US-CL-005`). Bao gồm toàn diện từ sinh hoạt gia đình, vận hành văn phòng đến du lịch/công tác hàng không.
2. **Quy định đơn vị tính đầu vào (Input Units):** Đồng bộ hóa đơn vị đo lường trực quan với người dùng ($kWh, kg, Lít, km, m^3, \text{hành khách-km}$) và bảng quy đổi cho các đơn vị đóng gói thương mại (Bình gas 12kg, Ram giấy A4, Chặng bay khứ hồi).
3. **Phân loại Scope nghiêm ngặt:** Phân định rõ ràng ranh giới Scope 1 (Trực tiếp), Scope 2 (Gián tiếp qua điện mua ngoài) và Scope 3 (Chuỗi giá trị: rác thải, nước sạch, vật tư, di chuyển cá nhân và du lịch/công tác hàng không).
4. **Cung cấp cơ sở pháp lý & khoa học trích dẫn:** Minh bạch hóa nguồn gốc các Hệ số phát thải khuyến nghị từ các cơ quan thẩm quyền quốc gia (**Bộ TN&MT Việt Nam**) và các tổ chức khí hậu quốc tế hàng đầu (**IPCC, ICAO, UK DEFRA/DESNZ, US EPA, IEA**).
5. **Cấu hình dữ liệu nền tảng cho Engine tính toán:** Thiết lập bộ thông số mặc định (Default Baseline Factors) cho bảng cơ sở dữ liệu `standard_emission_factors` phục vụ công thức quy đổi tự động:
   $$\text{Lượng phát thải } (\text{kg CO}_2\text{e}) = \text{Sản lượng tiêu thụ (Activity Data)} \times \text{Hệ số phát thải (Emission Factor)}$$

---

## 🌐 2. TỔNG QUAN PHÂN LOẠI THEO CHUẨN GHG PROTOCOL

```mermaid
flowchart TD
    subgraph Boundary["Ranh giới Hoạt động Gia đình & Văn phòng nhỏ"]
        direction TB

        subgraph S1["Scope 1: Phát thải trực tiếp (Direct Emissions)"]
            F1["Đốt gas LPG nấu ăn (kg)"]
            F2["Dầu Diesel chạy máy phát điện (Lít)"]
            F3["Phương tiện sở hữu trực tiếp (km/Lít)"]
        end

        subgraph S2["Scope 2: Phát thải gián tiếp từ năng lượng (Energy Indirect)"]
            E1["Sử dụng điện lưới quốc gia EVN (kWh)"]
        end

        subgraph S3["Scope 3: Phát thải gián tiếp khác trong chuỗi giá trị (Other Indirect)"]
            W1["Rác sinh hoạt chôn lấp (kg) - Cat 5"]
            W2["Tiêu thụ và xử lý nước sạch (m³) - Cat 1 & 5"]
            W3["Tiêu thụ giấy in văn phòng (kg) - Cat 1"]
            M1["Di chuyển cá nhân xe máy/ô tô (km) - Cat 7"]
            T1["Du lịch & Công tác bằng máy bay (p.km) - Cat 6"]
        end
    end

    S1 --> Ledger["Engine Tính toán & Ghi Sổ cái Carbon (kg CO2e)"]
    S2 --> Ledger
    S3 --> Ledger
```

- **Scope 1 (Phát thải trực tiếp):** Bắt nguồn từ các hoạt động đốt cháy nhiên liệu tại chỗ thuộc quyền sở hữu hoặc kiểm soát trực tiếp của hộ gia đình/văn phòng nhỏ (bếp gas nấu nướng, máy phát điện dự phòng khi mất điện, phương tiện thuộc sở hữu văn phòng).
- **Scope 2 (Phát thải năng lượng gián tiếp):** Phát thải sinh ra từ quá trình sản xuất điện năng mà hộ gia đình hoặc văn phòng tiêu thụ từ lưới điện quốc gia (EVN).
- **Scope 3 (Phát thải gián tiếp khác):** Các phát thải xảy ra trong chuỗi giá trị ngược dòng (Upstream) hoặc xuôi dòng (Downstream), bao gồm cung cấp và xử lý nước sạch, xử lý chôn lấp rác thải sinh hoạt, khai thác sản xuất giấy in văn phòng, phương tiện di chuyển cá nhân của thành viên/nhân viên đi làm (Commuting), và các chuyến bay du lịch/công tác đường dài (Business Travel & Tourism).

---

## 📊 3. BẢNG TỔNG HỢP CÁC HOẠT ĐỘNG ĐƯỢC HỖ TRỢ (MASTER ACTIVITY MATRIX)

Bảng tổng hợp dưới đây đặc tả đầy đủ 8 hoạt động hỗ trợ trong hệ thống, bao gồm mã định danh hệ thống, đơn vị đo, phân loại Scope, nguồn trích dẫn và hệ số quy đổi mặc định:

| STT | Nhóm hoạt động | Hoạt động chi tiết | Mã danh mục (Category Code) | Đơn vị tính (Input Unit) | Phân loại Scope | Nguồn hệ số phát thải (EF) khuyến nghị | Hệ số phát thải mặc định (Default EF) | Khí nhà kính quy đổi |
|:---:|---|---|:---:|:---:|:---:|---|:---:|:---:|
| **1** | **Điện năng** | Sử dụng điện lưới | `ELEC_GRID` | **kWh** | **Scope 2** | **Bộ TN&MT Việt Nam** / **US EPA** / **IEA** | **`0.7221`** $\text{kg CO}_2\text{e/kWh}$ | $\text{CO}_2, \text{CH}_4, \text{N}_2\text{O}$ |
| **2** | **Nhiên liệu** | Đốt gas (LPG) nấu ăn | `FUEL_LPG` | **kg** | **Scope 1** | **IPCC Guidelines** / **UK DEFRA** | **`2.9830`** $\text{kg CO}_2\text{e/kg}$ | $\text{CO}_2, \text{CH}_4, \text{N}_2\text{O}$ |
| **3** | **Nhiên liệu** | Dầu Diesel chạy máy phát | `FUEL_DIESEL` | **Lít** | **Scope 1** | **IPCC Guidelines** / **UK DEFRA** | **`2.6870`** $\text{kg CO}_2\text{e/Lít}$ | $\text{CO}_2, \text{CH}_4, \text{N}_2\text{O}$ |
| **4** | **Di chuyển** | Xe máy / Ô tô cá nhân | `MOBILITY` | **km** hoặc **Lít** | **Scope 1 & 3** | **UK DEFRA** / **US EPA** / **IPCC** | Xe máy: **`0.0650`** $\text{kg/km}$<br>Ô tô xăng: **`0.1920`** $\text{kg/km}$<br>Xăng RON95: **`2.3100`** $\text{kg/Lít}$ | $\text{CO}_2, \text{CH}_4, \text{N}_2\text{O}$ |
| **5** | **Rác thải** | Rác sinh hoạt chôn lấp | `WASTE_LANDFILL` | **kg** | **Scope 3** | **US EPA (WARM)** / **UK DEFRA** | **`0.4500`** $\text{kg CO}_2\text{e/kg}$ | $\text{CH}_4, \text{CO}_2$ |
| **6** | **Nước** | Tiêu thụ và xử lý nước | `WATER_SUPPLY_TREAT` | **$m^3$** | **Scope 3** | **UK DEFRA** / **US EPA** | **`0.3440`** $\text{kg CO}_2\text{e/}m^3$ | $\text{CO}_2, \text{CH}_4$ |
| **7** | **Vật tư** | Tiêu thụ giấy in | `OFFICE_PAPER` | **kg** | **Scope 3** | **UK DEFRA** / **US EPA** | **`1.2500`** $\text{kg CO}_2\text{e/kg}$ | $\text{CO}_2$ |
| **8** | **Du lịch & Đi lại** | Di chuyển bằng máy bay | `TRAVEL_FLIGHT` | **p.km** hoặc **Chặng bay** | **Scope 3 (Cat 6)** & Cá nhân | **ICAO** / **UK DEFRA** / **US EPA** | Cự ly ngắn (<3700km): **`0.1535`** $\text{kg/p.km}$<br>Nội địa (<500km): **`0.2458`** $\text{kg/p.km}$<br>Cự ly dài (>3700km): **`0.1930`** $\text{kg/p.km}$ | $\text{CO}_2, \text{CH}_4, \text{N}_2\text{O}$ + RF |

---

## 🔬 4. CHI TIẾT TỪNG NHÓM HOẠT ĐỘNG & CĂN CỨ TRÍCH DẪN NGUỒN HỆ SỐ

### 4.1. Nhóm Điện năng: Sử dụng điện lưới quốc gia (`ELEC_GRID`)

- **Đặc tả hoạt động:** Điện năng thương phẩm được tiêu thụ tại địa điểm của hộ gia đình hoặc văn phòng nhỏ lấy từ lưới điện xoay chiều hạ thế qua công tơ đo đếm của Tập đoàn Điện lực Việt Nam (EVN).
- **Phân loại Scope:** **Scope 2** (Phát thải gián tiếp từ sản xuất năng lượng mua ngoài) theo *GHG Protocol Scope 2 Guidance*.
- **Đơn vị đo lường:**
  - Đơn vị chuẩn: Kilowatt-giờ (**kWh**).
  - Kênh nạp dữ liệu: Nhập số đo công tơ/hóa đơn tiền điện (Thủ công), Quét ảnh hóa đơn EVN / công tơ cơ/điện tử bằng AI Vision (`US-CL-003`), hoặc Import Excel (`US-CL-005`).
- **Nguồn trích dẫn hệ số phát thải khuyến nghị:**
  1. **Bộ Tài nguyên và Môi trường Việt Nam (Cục Biến đổi khí hậu):**
     - *Văn bản trích dẫn:* Công văn số **263/BĐKH-TTBĐKH** ngày 12/04/2022 của Cục Biến đổi khí hậu - Bộ Tài nguyên và Môi trường về việc công bố Hệ số phát thải của lưới điện Việt Nam; Quyết định số **2626/QĐ-BTNMT** ngày 10/10/2022 về Danh mục hệ số phát thải phục vụ kiểm kê khí nhà kính.
     - *Giá trị công bố:* **$0.7221\text{ kg CO}_2/\text{kWh}$** (tương đương $0.7221\text{ tCO}_2/\text{MWh}$). Đây là hệ số chuẩn quốc gia được áp dụng mặc định cho toàn bộ người dùng tại Việt Nam.
  2. **US EPA (Cơ quan Bảo vệ Môi trường Hoa Kỳ):**
     - *Văn bản trích dẫn:* **EPA eGRID** (Emissions & Generation Resource Integrated Database) và **EPA GHG Emission Factors Hub** (Bảng *Electricity: US National Average*).
     - *Phạm vi áp dụng:* Dự phòng cho trường hợp Workspace đặt cấu hình vị trí tại khu vực Bắc Mỹ hoặc so sánh đối chuẩn quốc tế ($\approx 0.370 - 0.410\text{ kg CO}_2\text{e/kWh}$).
  3. **IEA (Cơ quan Năng lượng Quốc tế):**
     - *Tài liệu trích dẫn:* **IEA Emission Factors Database** (Báo cáo thường niên về *CO2 Emissions from Fuel Combustion*). Cung cấp ma trận hệ số lưới điện cho hơn 150 quốc gia.
- **Công thức tính toán:**
  $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Điện tiêu thụ (kWh)} \times 0.7221$$

---

### 4.2. Nhóm Nhiên liệu: Đốt gas (LPG) nấu ăn (`FUEL_LPG`)

- **Đặc tả hoạt động:** Tiêu thụ Khí dầu mỏ hóa lỏng (LPG - thành phần chính gồm Propane $\text{C}_3\text{H}_8$ và Butane $\text{C}_4\text{H}_{10}$) phục vụ bếp nấu sinh hoạt gia đình, căn-tin văn phòng hoặc bình gas mini.
- **Phân loại Scope:** **Scope 1** (Phát thải trực tiếp từ đốt cháy nhiên liệu cố định - Stationary Combustion).
- **Đơn vị đo lường:**
  - Đơn vị chuẩn: Kilogram (**kg**).
  - Đơn vị phụ hỗ trợ quy đổi: Bình gas gia dụng tiêu chuẩn $12\text{ kg}$ ($1\text{ bình} = 12\text{ kg} \rightarrow 35.796\text{ kg CO}_2\text{e}$); bình mini $0.22\text{ kg}$.
- **Nguồn trích dẫn hệ số phát thải khuyến nghị:**
  1. **IPCC (Ban Liên chính phủ về Biến đổi Khí hậu):**
     - *Tài liệu trích dẫn:* **2006 IPCC Guidelines for National Greenhouse Gas Inventories**, Volume 2: Energy, Chapter 2 (Stationary Combustion), Bảng 2.2 và Bảng 2.3.
     - *Hệ số cơ sở:* Nhiệt trị ròng (NCV) của LPG là $47.3\text{ TJ/Gg}$, hệ số phát thải mặc định là $63,100\text{ kg CO}_2/\text{TJ}$ cộng với phát thải $\text{CH}_4$ và $\text{N}_2\text{O}$, tương đương $\approx 2.98 - 3.00\text{ kg CO}_2\text{e/kg LPG}$.
  2. **UK DEFRA / DESNZ (Vương quốc Anh):**
     - *Tài liệu trích dẫn:* **UK Government GHG Conversion Factors for Company Reporting** (Ban hành bởi Department for Environment, Food & Rural Affairs và Department for Energy Security and Net Zero). Bảng *Fuel properties - Gaseous fuels*.
     - *Giá trị công bố:* **$2.9830\text{ kg CO}_2\text{e/kg LPG}$** (tính gộp $\text{CO}_2, \text{CH}_4, \text{N}_2\text{O}$ theo thế năng làm nóng toàn cầu GWP AR5).
- **Công thức tính toán:**
  $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Khối lượng gas (kg)} \times 2.9830$$

---

### 4.3. Nhóm Nhiên liệu: Dầu Diesel chạy máy phát điện (`FUEL_DIESEL`)

- **Đặc tả hoạt động:** Tiêu thụ dầu DO (Diesel Oil - hàm lượng lưu huỳnh 0.05%S hoặc 0.001%S) dùng để chạy máy phát điện dự phòng tại văn phòng nhỏ hoặc tổ dân phố khi xảy ra sự cố gián đoạn nguồn điện lưới.
- **Phân loại Scope:** **Scope 1** (Phát thải trực tiếp từ thiết bị đốt cố định).
- **Đơn vị đo lường:**
  - Đơn vị chuẩn: **Lít** (hoặc quy đổi từ kg theo khối lượng riêng trung bình $\approx 0.84\text{ kg/Lít}$).
- **Nguồn trích dẫn hệ số phát thải khuyến nghị:**
  1. **IPCC (Intergovernmental Panel on Climate Change):**
     - *Tài liệu trích dẫn:* **2006 IPCC Guidelines**, Volume 2: Energy, Chapter 2 (Stationary Combustion - Gas/Diesel Oil).
     - *Giá trị cơ sở:* Hệ số phát thải nhiệt mặc định là $74,100\text{ kg CO}_2/\text{TJ}$, quy đổi theo tỷ trọng dầu diesel thương phẩm đạt xấp xỉ $2.68\text{ - }2.70\text{ kg CO}_2\text{e/Lít}$.
  2. **UK DEFRA / DESNZ:**
     - *Tài liệu trích dẫn:* **UK GHG Conversion Factors for Company Reporting**, Bảng *Liquid fuels: Gas oil / 100% mineral diesel*.
     - *Giá trị công bố:* **$2.6870\text{ kg CO}_2\text{e/Lít}$** (bao gồm Direct GHG: $\text{CO}_2 = 2.658\text{ kg}$, $\text{CH}_4 = 0.001\text{ kg}$, $\text{N}_2\text{O} = 0.028\text{ kg CO}_2\text{e}$).
  3. **US EPA:**
     - *Tài liệu trích dẫn:* **EPA GHG Emission Factors Hub**, Bảng *Stationary Combustion - Distillate Fuel Oil No. 2*. Hệ số $10.21\text{ kg CO}_2/\text{gallon} \approx 2.696\text{ kg CO}_2/\text{Lít}$.
- **Công thức tính toán:**
  $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Thể tích dầu tiêu thụ (Lít)} \times 2.6870$$

---

### 4.4. Nhóm Di chuyển: Xe máy / Ô tô cá nhân (`MOBILITY`)

- **Đặc tả hoạt động:** Di chuyển của thành viên gia đình hoặc lộ trình đi lại hàng ngày giữa nơi ở và văn phòng của nhân viên (Employee Commuting), cũng như đi công tác lẻ bằng phương tiện đường bộ.
- **Phân loại Scope:**
  - **Scope 1:** Nếu phương tiện thuộc quyền sở hữu đứng tên văn phòng/công ty và công ty trực tiếp thanh toán tiền nhiên liệu.
  - **Scope 3 (Category 7: Employee Commuting / Category 6: Business Travel):** Áp dụng cho phương tiện thuộc sở hữu cá nhân của thành viên/nhân viên dùng để đi làm hoặc công việc chung của văn phòng. (Đối với Workspace Hộ gia đình, được tính chung vào dấu chân sinh hoạt tổng thể).
- **Đơn vị đo lường:**
  - Phương pháp 1 (Theo quãng đường): Kilomet (**km**).
  - Phương pháp 2 (Theo lượng nhiên liệu mua): **Lít** (Xăng RON95 / E5 / Diesel).
- **Nguồn trích dẫn hệ số phát thải khuyến nghị:**
  1. **UK DEFRA / DESNZ:**
     - *Tài liệu trích dẫn:* **UK GHG Conversion Factors**, Bảng *Passenger vehicles* & Bảng *Fuel: Petrol*.
     - *Giá trị công bố:*
       - Xe máy trung bình (<125cc phổ biến tại Việt Nam): **$0.0650\text{ kg CO}_2\text{e/km}$**.
       - Xe máy phân khối lớn (>125cc - 500cc): **$0.1030\text{ kg CO}_2\text{e/km}$**.
       - Xe ô tô con chạy xăng trung bình (Average petrol car): **$0.1920\text{ kg CO}_2\text{e/km}$**.
       - Nhiên liệu xăng tiêu thụ: **$2.3100\text{ kg CO}_2\text{e/Lít}$** (Xăng 100% khoáng) hoặc **$2.1600\text{ kg CO}_2\text{e/Lít}$** (Xăng sinh học E5 Ron92).
  2. **US EPA:**
     - *Tài liệu trích dẫn:* **EPA GHG Emission Factors Hub**, Bảng *Mobile Combustion - Passenger Cars and Light-Duty Trucks*.
     - *Giá trị công bố:* Ô tô con cá nhân trung bình $\approx 0.192\text{ kg CO}_2/\text{km}$ ($0.34\text{ kg CO}_2/\text{dặm}$).
  3. **IPCC:**
     - *Tài liệu trích dẫn:* **2006 IPCC Guidelines**, Volume 2: Energy, Chapter 3 (Mobile Combustion - Road Transportation).
- **Công thức tính toán:**
  - *Tính theo quãng đường:*
    $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Quãng đường (km)} \times EF_{\text{loại xe}} (\text{kg CO}_2\text{e/km})$$
  - *Tính theo nhiên liệu đổ:*
    $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Lượng xăng (Lít)} \times 2.3100$$

---

### 4.5. Nhóm Rác thải: Rác sinh hoạt chôn lấp (`WASTE_LANDFILL`)

- **Đặc tả hoạt động:** Lượng rác thải rắn sinh hoạt hỗn hợp (Municipal Solid Waste - MSW) phát sinh từ sinh hoạt của hộ gia đình và hoạt động văn phòng (bao gồm bao bì, thực phẩm thừa, chất thải hữu cơ không phân loại) được xe thu gom chuyển về các bãi chôn lấp tập trung.
- **Cơ chế phát thải:** Quá trình phân hủy kỵ khí của các hợp chất hữu cơ trong điều kiện thiếu oxy tại bãi chôn lấp sinh ra khí nhà kính nguy hại là Khí Methane ($\text{CH}_4$, có thế năng làm nóng toàn cầu GWP cao gấp 28 lần $\text{CO}_2$ theo IPCC AR5).
- **Phân loại Scope:** **Scope 3 (Category 5: Waste Generated in Operations)** theo *GHG Protocol Corporate Value Chain Standard*.
- **Đơn vị đo lường:** Kilogram (**kg**).
- **Nguồn trích dẫn hệ số phát thải khuyến nghị:**
  1. **US EPA (Cơ quan Bảo vệ Môi trường Hoa Kỳ):**
     - *Tài liệu trích dẫn:* **US EPA WARM (Waste Reduction Model)** và **EPA GHG Emission Factors Hub**, Bảng *Waste: Landfilled Mixed Municipal Solid Waste (MSW)*.
     - *Giá trị khuyến nghị:* **$0.4500\text{ kg CO}_2\text{e/kg rác sinh hoạt}$** (áp dụng cho mô hình bãi chôn lấp hỗn hợp có hệ thống thu gom khí gas bán phần hoặc không thu gom phổ biến ở các nước đang phát triển).
  2. **UK DEFRA / DESNZ:**
     - *Tài liệu trích dẫn:* **UK GHG Conversion Factors**, Bảng *Waste disposal: Commercial and industrial waste / Household residual waste to landfill*.
     - *Giá trị công bố:* Dao động từ $0.446\text{ - }0.587\text{ kg CO}_2\text{e/kg}$ rác thải chôn lấp.
  3. **IPCC Guidelines:**
     - *Tài liệu trích dẫn:* **2006 IPCC Guidelines for National GHG Inventories**, Volume 5: Waste, Chapter 3 (Solid Waste Disposal).
- **Công thức tính toán:**
  $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Khối lượng rác (kg)} \times 0.4500$$

---

### 4.6. Nhóm Nước: Tiêu thụ và xử lý nước sạch (`WATER_SUPPLY_TREAT`)

- **Đặc tả hoạt động:** Khối lượng nước sạch sử dụng từ hệ thống cấp nước sinh hoạt/đô thị (Tổng công ty Cấp nước Sawaco / Viwaco / Nước ngầm xử lý). Bao gồm năng lượng tiêu thụ tại nhà máy nước để bơm hút xử lý hóa chất sạch, truyền tải qua đường ống, và công đoạn thu gom xử lý nước thải sinh hoạt sau sử dụng.
- **Phân loại Scope:** **Scope 3 (Category 1: Purchased Goods and Services & Category 5: Waste generated in operations)** theo *GHG Protocol*.
- **Đơn vị đo lường:** Mét khối (**$m^3$**).
  - Kênh nạp: Quét hóa đơn tiền nước bằng AI Vision (`US-CL-003`) hoặc nhập thủ công số mét khối trên đồng hồ đo nước.
- **Nguồn trích dẫn hệ số phát thải khuyến nghị:**
  1. **UK DEFRA / DESNZ:**
     - *Tài liệu trích dẫn:* **UK GHG Conversion Factors for Company Reporting**, Bảng *Water supply and Water treatment*.
     - *Chi tiết phân rã hệ số:*
       - Cung cấp nước sạch (Water supply): $0.149\text{ kg CO}_2\text{e/}m^3$.
       - Thu gom & Xử lý nước thải (Water treatment): $0.272\text{ kg CO}_2\text{e/}m^3$.
       - Tổng phát thải vòng đời nước cấp & thoát: $0.149 + 0.272 \approx 0.421\text{ kg CO}_2\text{e/}m^3$.
     - *Giá trị chuẩn lựa chọn mặc định trong dự án:* **`0.3440` $\text{kg CO}_2\text{e/}m^3$** (tính toán dựa trên mức độ xử lý nước sạch trung bình đô thị Việt Nam kết hợp chỉ số điện năng tiêu hao).
  2. **US EPA:**
     - *Tài liệu trích dẫn:* **EPA Energy and Carbon Footprint of Water Supply and Wastewater Facilities**. Báo cáo chỉ ra tiêu hao năng lượng điện trung bình từ $0.5 - 1.2\text{ kWh/}m^3$ nước xử lý.
- **Công thức tính toán:**
  $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Lượng nước tiêu thụ } (m^3) \times 0.3440$$

---

### 4.7. Nhóm Vật tư: Tiêu thụ giấy in văn phòng (`OFFICE_PAPER`)

- **Đặc tả hoạt động:** Tiêu thụ giấy in trắng khổ A4/A3 phục vụ in ấn tài liệu, hợp đồng, photocopy tại văn phòng nhỏ hoặc làm việc tại gia đình.
- **Cơ chế phát thải:** Phát thải vòng đời từ thượng nguồn (Cradle-to-Gate), bao gồm khai thác gỗ, vận chuyển nguyên liệu, tẩy trắng bột giấy bằng hóa chất và vận hành máy nghiền giấy công nghiệp.
- **Phân loại Scope:** **Scope 3 (Category 1: Purchased Goods and Services)** theo *GHG Protocol*.
- **Đơn vị đo lường:**
  - Đơn vị chuẩn: Kilogram (**kg**).
  - Đơn vị phụ trực quan: **Ram (Ream) giấy A4** (Quy cách 500 tờ/ram):
    - *Giấy A4 định lượng 70 gsm (g/$m^2$):* 1 tờ $A4 = 0.21 \times 0.297\text{ m} = 0.06237\text{ m}^2$. Trọng lượng 1 tờ $= 4.366\text{ g}$. Trọng lượng 1 ram (500 tờ) $\approx \mathbf{2.18\text{ kg}}$.
    - *Giấy A4 định lượng 80 gsm:* Trọng lượng 1 tờ $= 4.99\text{ g}$. Trọng lượng 1 ram (500 tờ) $\approx \mathbf{2.49\text{ kg}}$.
- **Nguồn trích dẫn hệ số phát thải khuyến nghị:**
  1. **UK DEFRA / DESNZ:**
     - *Tài liệu trích dẫn:* **UK GHG Conversion Factors**, Bảng *Material use: Paper and board*.
     - *Chi tiết phân loại bột giấy:*
       - Giấy từ bột gỗ nguyên sinh (Virgin pulp): **$1.2500\text{ kg CO}_2\text{e/kg}$**.
       - Giấy văn phòng tái chế (Closed loop recycled paper): **$0.9190\text{ kg CO}_2\text{e/kg}$**.
     - *Giá trị chuẩn lựa chọn mặc định trong dự án:* **`1.2500` $\text{kg CO}_2\text{e/kg}$** (đáp ứng nguyên tắc Thận trọng - Conservativeness trong kiểm kê phát thải khi chưa rõ tỷ lệ bột giấy tái chế).
  2. **US EPA (WARM Model):**
     - *Tài liệu trích dẫn:* **US EPA Waste Reduction Model - Office Paper Documentation**. Phát thải vòng đời sản xuất giấy văn phòng dao động $1.11 - 1.30\text{ kg CO}_2\text{e/kg}$.
- **Công thức tính toán:**
  - *Tính theo khối lượng:*
    $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Khối lượng giấy (kg)} \times 1.2500$$
  - *Tính theo số ram giấy A4 (định lượng 70 gsm):*
    $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Số ram} \times 2.18\text{ kg} \times 1.2500 = \text{Số ram} \times 2.725\text{ kg CO}_2\text{e}$$

---

### 4.8. Nhóm Du lịch & Đi lại: Di chuyển bằng máy bay (`TRAVEL_FLIGHT`)

- **Đặc tả hoạt động:** Hoạt động di chuyển bằng đường hàng không thương mại phục vụ các chuyến đi du lịch nghỉ dưỡng gia đình, về quê dịp lễ tết, hoặc các chuyến đi công tác xa (Business Trip), tham dự hội thảo, du lịch tập thể (Team building/Retreat) của văn phòng nhỏ.
- **Phân loại Scope:**
  - **Scope 3 (Category 6: Business Travel):** Áp dụng cho văn phòng nhỏ khi công ty thanh toán vé máy bay cho nhân viên đi công tác hoặc tổ chức kỳ nghỉ/du lịch thường niên.
  - **Dấu chân Carbon Du lịch Cá nhân / Hộ gia đình:** Áp dụng cho Workspace Hộ gia đình. (Hàng không là nguồn phát thải tập trung có quy mô đột biến: chỉ 1 chuyến du lịch khứ hồi bằng máy bay có thể tạo ra lượng phát thải bằng cả 3 - 6 tháng tiêu thụ điện sinh hoạt của cả gia đình).
- **Đơn vị đo lường:**
  - Đơn vị cơ sở: **Hành khách-kilomet (p.km - passenger.km)**.
  - Đơn vị tiện ích theo nghiệp vụ: **Chặng bay (Lượt bay / Tuyến bay)**. Người dùng chỉ cần chọn sân bay khởi hành - sân bay đến và số lượng vé, hệ thống tự động ánh xạ cự ly đại viên (Great Circle Distance - GCD) cộng bù hao phí không lưu $8\%$ (theo tiêu chuẩn ICAO).
- **Cơ chế phát thải & Hiệu ứng Bức xạ Tầng cao (Radiative Forcing - RF):**
  - Động cơ máy bay phản lực đốt dầu Jet-A1 xả khí thải ở độ cao hành trình 9,000 - 12,000 m (tầng đối lưu trên và bình lưu dưới).
  - Ngoài $\text{CO}_2$, khí xả còn sinh ra hơi nước $\text{H}_2\text{O}$ ngưng tụ tạo thành các vệt khói trắng (contrails) và kích thích hình thành mây ti nhân tạo (cirrus clouds) giữ nhiệt, cùng khí $\text{NO}_x$ làm thay đổi cân bằng ozone tầng đối lưu.
  - Theo nghiên cứu của **IPCC** và hướng dẫn của **UK DEFRA**, tổng tác động làm ấm khí hậu (Radiative Forcing) thực tế cao gấp **$1.7\text{ - }1.9$ lần** so với việc chỉ tính riêng khí $\text{CO}_2$. Do đó, hệ thống mặc định áp dụng bộ hệ số chuẩn **"With RF"** để bảo đảm tính trung thực và toàn diện của dấu chân sinh thái.
- **Nguồn trích dẫn hệ số phát thải khuyến nghị:**
  1. **ICAO (Tổ chức Hàng không Dân dụng Quốc tế - Liên Hợp Quốc):**
     - *Tài liệu trích dẫn:* **ICAO Carbon Emissions Calculator (ICEC) Methodology**. Phương pháp luận chuẩn hóa toàn cầu về phân bổ nhiên liệu bay theo tải trọng hành khách và hàng hóa khoang bụng (belly freight).
  2. **UK DEFRA / DESNZ:**
     - *Tài liệu trích dẫn:* **UK Government GHG Conversion Factors for Company Reporting**, Bảng *Business travel - air*.
     - *Chi tiết phân loại cự ly bay (Hạng phổ thông - Economy, đã bao gồm Radiative Forcing):*
       - *Chuyến bay nội địa cự ly ngắn (< 500 km):* **`0.2458` $\text{kg CO}_2\text{e/p.km}$** (suất tiêu hao trên mỗi km lớn do giai đoạn cất cánh/hạ cánh chiếm tỷ trọng cao).
       - *Chuyến bay cự ly ngắn (Short-haul, 500 - 3,700 km):* **`0.1535` $\text{kg CO}_2\text{e/p.km}$** (áp dụng cho các chuyến bay trục Bắc - Nam tại Việt Nam và Đông Nam Á).
       - *Chuyến bay cự ly dài (Long-haul, > 3,700 km):* **`0.1930` $\text{kg CO}_2\text{e/p.km}$** (các tuyến liên lục địa đi châu Âu, Mỹ, Úc).
  3. **US EPA:**
     - *Tài liệu trích dẫn:* **EPA GHG Emission Factors Hub**, Bảng *Scope 3 Category 6: Business Travel - Commercial Air Travel*.
- **Hệ số nhân theo Hạng vé (Cabin Class Multiplier):**
  - Hạng Phổ thông (Economy Class): $\times \mathbf{1.0}$
  - Hạng Phổ thông đặc biệt (Premium Economy): $\times \mathbf{1.6}$
  - Hạng Thương gia (Business Class): $\times \mathbf{2.9}$ (Short-haul) / $\times \mathbf{3.0}$ (Long-haul)
  - Hạng Nhất (First Class): $\times \mathbf{4.0}$
- **Bảng tra cứu quy đổi nhanh các chặng du lịch phổ biến tại Việt Nam (Route Lookup Matrix):**

| Tuyến bay (Origin ⇄ Destination) | Khoảng cách 1 chiều | Loại chặng | Phát thải Khứ hồi / Hành khách (Hạng Phổ thông) | Tương đương điện sinh hoạt |
|---|:---:|:---:|:---:|:---:|
| **Hà Nội (HAN) ⇄ TP. Hồ Chí Minh (SGN)** | $\approx 1,160\text{ km}$ | Short-haul | $2,320\text{ km} \times 0.1535 = \mathbf{356.1\text{ kg CO}_2\text{e}}$ | $\approx 493\text{ kWh}$ điện |
| **Hà Nội (HAN) ⇄ Đà Nẵng (DAD)** | $\approx 630\text{ km}$ | Short-haul | $1,260\text{ km} \times 0.1535 = \mathbf{193.4\text{ kg CO}_2\text{e}}$ | $\approx 268\text{ kWh}$ điện |
| **TP. Hồ Chí Minh (SGN) ⇄ Phú Quốc (PQC)** | $\approx 300\text{ km}$ | Nội địa ngắn | $600\text{ km} \times 0.2458 = \mathbf{147.5\text{ kg CO}_2\text{e}}$ | $\approx 204\text{ kWh}$ điện |
| **Hà Nội / TP.HCM ⇄ Bangkok (BKK)** | $\approx 1,300\text{ km}$ | Quốc tế ngắn | $2,600\text{ km} \times 0.1535 = \mathbf{399.1\text{ kg CO}_2\text{e}}$ | $\approx 553\text{ kWh}$ điện |
| **Hà Nội / TP.HCM ⇄ Tokyo / Seoul** | $\approx 3,600\text{ km}$ | Quốc tế ngắn | $7,200\text{ km} \times 0.1535 = \mathbf{1,105.2\text{ kg CO}_2\text{e}}$ | $\approx 1.53\text{ MWh}$ điện |

- **Công thức tính toán:**
  $$\text{Phát thải } (\text{kg CO}_2\text{e}) = \text{Số hành khách} \times \text{Khoảng cách (km)} \times EF_{\text{cự ly}} \times \text{Hệ số hạng vé}$$

---

## 🗄️ 5. THIẾT KẾ CƠ SỞ DỮ LIỆU & CHIẾN LƯỢC SNAPSHOT (DATA SCHEMA ALIGNMENT)

Để đảm bảo tính toàn vẹn và không làm sai lệch báo cáo lịch sử khi System Admin điều chỉnh hệ số phát thải theo chu kỳ năm (`US-SA-001`), cơ sở dữ liệu PostgreSQL thực hiện lưu trữ theo **Chiến lược Snapshot (Snapshot Pattern)**:

```mermaid
erDiagram
    STANDARD_EMISSION_FACTORS ||--o{ EMISSION_LOGS : "áp dụng snapshot vào"
    
    STANDARD_EMISSION_FACTORS {
        bigint id PK
        varchar category_code "ELEC_GRID, FUEL_LPG, v.v."
        varchar activity_name "Điện sinh hoạt, Gas LPG, v.v."
        varchar unit "kWh, kg, Lít, km, m3"
        decimal emission_factor "Giá trị EF hiện hành"
        varchar scope "SCOPE_1, SCOPE_2, SCOPE_3"
        varchar source_reference "Bộ TN&MT, DEFRA, EPA"
        int reference_year "Năm công bố (2022, 2024)"
        boolean is_active "Trạng thái áp dụng"
        timestamp updated_at "Thời điểm cập nhật gần nhất"
    }

    EMISSION_LOGS {
        uuid id PK
        uuid workspace_id FK
        varchar category_code
        decimal activity_amount "Sản lượng tiêu thụ (Input)"
        varchar activity_unit "kWh, kg, v.v."
        decimal applied_emission_factor "Snapshot hệ số tại thời điểm duyệt"
        decimal calculated_co2e "Kết quả = amount * applied_factor"
        varchar scope "Snapshot Scope"
        varchar status "DRAFT, APPROVED, REJECTED"
        date transaction_date "Ngày phát sinh hoạt động"
    }
```

### Nguyên tắc bất biến dữ liệu (Data Immutability Principle):
1. **Bảng `standard_emission_factors`:** Chỉ chứa giá trị hiện hành và tham chiếu nguồn. Khi System Admin cập nhật hệ số mới (ví dụ cập nhật điện EVN từ $0.7221$ lên $0.7500$ theo `US-SA-001`), hệ thống ghi nhận thời gian hiệu lực và chỉ áp dụng cho các bản ghi tạo mới kể từ thời điểm đó.
2. **Bảng `emission_logs`:** Mỗi giao dịch khi được Trưởng nhóm (Reviewer) phê duyệt ghi sổ (`US-CL-002`) sẽ sao chép giá trị hệ số tại thời điểm đó vào cột `applied_emission_factor`. Nhờ vậy, khi hệ số quốc gia thay đổi trong tương lai, tổng phát thải và báo cáo của các tháng trong quá khứ hoàn toàn không bị thay đổi sai lệch.

---

## 🔄 6. QUY TRÌNH QUẢN LÝ VÒNG ĐỜI HỆ SỐ PHÁT THẢI (LIFECYCLE WORKFLOW)

```mermaid
sequenceDiagram
    autonumber
    actor Admin as System Admin
    participant UI as Cổng Admin (React)
    participant API as Backend (Spring Boot)
    participant DB as Database (PostgreSQL)
    actor User as Thành viên (Editor)

    Note over Admin, DB: Quy trình Cập nhật Hệ số Quy chuẩn (US-SA-001)
    Admin->>UI: Mở màn hình "Quản lý Hệ số Quy chuẩn"
    UI->>API: GET /api/v1/admin/emission-factors
    API->>DB: Query standard_emission_factors
    DB-->>UI: Trả về danh sách 8 hoạt động
    Admin->>UI: Thay đổi EF Điện EVN = 0.7500 kèm Số hiệu văn bản mới
    UI->>API: PUT /api/v1/admin/emission-factors/ELEC_GRID {factor: 0.7500, ref: "Báo cáo EVN 2026"}
    API->>DB: UPDATE standard_emission_factors SET factor = 0.7500, updated_at = NOW()
    API-->>UI: Cập nhật thành công

    Note over User, DB: Áp dụng vào Giao dịch mới (US-CL-001 & US-CL-002)
    User->>UI: Nhập 100 kWh điện sinh hoạt (Draft)
    UI->>API: POST /api/v1/workspaces/{id}/emission-logs
    API->>DB: Đọc hệ số mới nhất (0.7500)
    API->>API: Tính toán: 100 * 0.7500 = 75.00 kg CO2e
    API->>DB: Lưu bản ghi với applied_emission_factor = 0.7500
    API-->>User: Ghi nhận thành công 75.00 kg CO2e
```

---

## 📚 7. DANH MỤC TÀI LIỆU THAM KHẢO CHÍNH THỨC (OFFICIAL CITATIONS)

1. **Bộ Tài nguyên và Môi trường Việt Nam (MONRE):**
   - Quyết định số 2626/QĐ-BTNMT ngày 10/10/2022 về việc ban hành danh mục hệ số phát thải phục vụ kiểm kê khí nhà kính cấp lĩnh vực.
   - Công văn số 263/BĐKH-TTBĐKH ngày 12/04/2022 của Cục Biến đổi khí hậu về việc công bố Hệ số phát thải của lưới điện Việt Nam năm 2020 ($0.7221\text{ tCO}_2/\text{MWh}$).
2. **IPCC (Intergovernmental Panel on Climate Change):**
   - *2006 IPCC Guidelines for National Greenhouse Gas Inventories* (Volume 2: Energy, Volume 5: Waste). [Truy cập: ipcc-nggip.iges.or.jp](https://www.ipcc-nggip.iges.or.jp/public/2006gl/)
   - *2019 Refinement to the 2006 IPCC Guidelines for National Greenhouse Gas Inventories*.
3. **UK DEFRA / DESNZ (Vương quốc Anh):**
   - *UK Government GHG Conversion Factors for Company Reporting (2022 - 2024)*. Cung cấp bộ hệ số chuyển đổi toàn diện cho nhiên liệu, điện, nước thải, chất thải và vật liệu tiêu hao. [Truy cập: gov.uk/government/collections/government-conversion-factors-for-company-reporting](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting)
4. **US EPA (Cơ quan Bảo vệ Môi trường Hoa Kỳ):**
   - *GHG Emission Factors Hub (March 2024)*. [Truy cập: epa.gov/climateleadership/ghg-emission-factors-hub](https://www.epa.gov/climateleadership/ghg-emission-factors-hub)
   - *EPA WARM (Waste Reduction Model)* - Quản trị và tính toán giảm thiểu phát thải vòng đời rác thải rắn.
   - *EPA eGRID (Emissions & Generation Resource Integrated Database)* - Cơ sở dữ liệu lưới điện Hoa Kỳ.
5. **GHG Protocol (WRI & WBCSD):**
   - *A Corporate Accounting and Reporting Standard (Revised Edition)*.
   - *GHG Protocol Scope 2 Guidance (Amendment to the Corporate Standard)*.
   - *Corporate Value Chain (Scope 3) Accounting and Reporting Standard*.
6. **IEA (International Energy Agency):**
   - *IEA Emissions Factors Database (2023 Edition)* - Báo cáo thường niên về phát thải $\text{CO}_2$ từ đốt nhiên liệu hóa thạch và sản xuất điện năng.
7. **ICAO (Tổ chức Hàng không Dân dụng Quốc tế - International Civil Aviation Organization):**
   - *ICAO Carbon Emissions Calculator (ICEC) Methodology (Version 12/2023)* - Phương pháp luận chuẩn hóa của Liên Hợp Quốc về phân bổ phát thải khí nhà kính cho hành khách thương mại đường hàng không. [Truy cập: icao.int/environmental-protection/CarbonOffset](https://www.icao.int/environmental-protection/CarbonOffset/Pages/default.aspx)
8. **IATA (Hiệp hội Vận tải Hàng không Quốc tế):**
   - *IATA Recommended Practice 1726 - Passenger CO2 Calculation Methodology* & Sáng kiến *IATA CO2 Connect*.
   - Khuyến nghị tính toán phát thải kết hợp hệ số bức xạ tầng cao (Radiative Forcing Index) và tải trọng hạng ghế.
