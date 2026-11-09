import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useLedger } from '../../context/LedgerContext';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  ArrowDown,
  TrendingUp,
  Users,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  Info,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { workspaceRole, currentUser } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const { logs } = useLedger();

  const [selectedYear, setSelectedYear] = useState('2026');

  const isReviewer = workspaceRole === 'REVIEWER';

  // National reference benchmarks:
  // Household: 155.25 kg CO2e/person/month
  // Workplace: 305.83 kg CO2e/person/month
  const nationalBenchmark =
    activeWorkspace.type === 'HOUSEHOLD' ? 155.25 : 305.83;

  const currentEmissions = activeWorkspace.currentEmissions;
  const target = activeWorkspace.monthlyTarget;
  const budgetRatio = Math.round((currentEmissions / target) * 100);
  const perPersonEmissions = Number(
    (currentEmissions / activeWorkspace.memberCount).toFixed(1)
  );

  const is85Warning = budgetRatio >= 85 && budgetRatio < 100;
  const is100Danger = budgetRatio >= 100;

  // Monthly Trend Chart Data
  const trendData = [
    { month: 'Tháng 6', emissions: 110.5 },
    { month: 'Tháng 7', emissions: 125.0 },
    { month: 'Tháng 8', emissions: 118.2 },
    { month: 'Tháng 9', emissions: 98.4 },
    { month: 'Tháng 10', emissions: 97.2 },
    { month: 'Tháng 11', emissions: 85.4 },
  ];

  // Category Breakdown Data
  const categoryData = [
    { name: 'Điện lưới EVN', value: 46.94, color: '#00A76F' },
    { name: 'Xăng xe máy', value: 12.71, color: '#2563eb' },
    { name: 'Khí gas LPG', value: 11.93, color: '#f59e0b' },
    { name: 'Rác sinh hoạt', value: 9.09, color: '#8b5cf6' },
    { name: 'Nước sạch', value: 4.74, color: '#06b6d4' },
  ];

  // Recent approved activities (v2 spec requirement)
  const recentApprovedLogs = logs
    .filter((l) => l.status === 'APPROVED')
    .slice(0, 5);

  return (
    <div className="space-y-8 font-sans">
      {/* Editor Notice if logged in as Member */}
      {!isReviewer && (
        <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-blue-900">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div>
            <span className="font-bold">Chế độ xem Thành viên (Editor - {currentUser?.name}):</span>{' '}
            Bạn đang xem bảng phân tích hoạt động theo ma trận RBAC. Chức năng kiểm duyệt sổ cái và cài đặt hạn ngạch được kiểm soát bởi Trưởng nhóm.
          </div>
        </div>
      )}

      {/* 85% Budget Warning Alert Banner */}
      {is85Warning && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="font-bold">CẢNH BÁO TIẾN ĐỘ NGÂN SÁCH (≥ 85%):</span> Không gian đã tiêu thụ {currentEmissions} / {target} kg CO2e ({budgetRatio}%). Vui lòng tiết giảm tiêu thụ điện và nhiên liệu!
            </div>
          </div>
          <span className="font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">
            Mức Báo Động Vàng
          </span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Giám sát thời gian thực chỉ số phát thải & đối sánh hạn ngạch
          </p>
        </div>

        {/* Year Selector (SCR-DASH-01 v2) */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              aria-label="Chọn năm"
              className="appearance-none bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-1.5 pr-8 text-xs font-semibold text-gray-800 cursor-pointer shadow-xs focus:ring-2 focus:ring-[#00A76F]/20 focus:outline-none transition-all"
            >
              <option value="2026">Năm 2026</option>
              <option value="2025">Năm 2025</option>
              <option value="2024">Năm 2024</option>
            </select>
            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 3 Core KPI Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: Total Emissions */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tổng phát thải tháng
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00A76F]/10 text-[#00A76F]">
              <ArrowDown className="w-3.5 h-3.5" />
              -12% so với tháng trước
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
              {currentEmissions}
            </span>
            <span className="text-xs font-semibold text-gray-500">kg CO2e</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span>Kỳ theo dõi: Tháng 11/{selectedYear}</span>
            <span className="font-semibold text-gray-600">Đã chốt sổ: 5 hoạt động</span>
          </div>
        </div>

        {/* KPI 2: Budget Used */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Ngân sách tháng
              </span>
              <span className="text-xs font-semibold text-gray-600">
                {currentEmissions} / {target} kg
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span
                className={`text-4xl font-extrabold tracking-tight leading-none ${
                  is100Danger
                    ? 'text-red-600'
                    : is85Warning
                    ? 'text-amber-600'
                    : 'text-gray-900'
                }`}
              >
                {budgetRatio}%
              </span>
            </div>
          </div>

          <div className="mt-4 pt-1">
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  is100Danger
                    ? 'bg-red-500'
                    : is85Warning
                    ? 'bg-amber-500'
                    : 'bg-[#00A76F]'
                }`}
                style={{ width: `${Math.min(100, budgetRatio)}%` }}
              />
            </div>
            <div className="text-[11px] text-gray-400 mt-2 flex justify-between">
              <span>Ngưỡng cảnh báo: 85%</span>
              <span className="font-semibold text-[#00A76F]">Còn lại: {(target - currentEmissions).toFixed(1)} kg</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Per Person & Benchmark */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Bình quân đầu người
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
              <Users className="w-3.5 h-3.5 text-gray-500" />
              {activeWorkspace.memberCount} thành viên
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
              {perPersonEmissions}
            </span>
            <span className="text-xs font-semibold text-gray-500">kg CO2e/người</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span>Chuẩn quốc gia ({activeWorkspace.type === 'HOUSEHOLD' ? 'Gia đình 50.8%' : 'Văn phòng 100%'}):</span>
            <span className="font-bold text-[#00A76F]">{nationalBenchmark} kg</span>
          </div>
        </div>
      </section>

      {/* National Reference Benchmark Banner Card */}
      <section className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-200/70 rounded-2xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#00A76F] text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-[#00A76F]/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Đạt Chuẩn Xanh Quốc Gia (National Reference Benchmark)
            </h3>
            <p className="text-xs text-gray-600 mt-0.5">
              Mức tiêu thụ bình quân <span className="font-bold text-[#00A76F]">{perPersonEmissions} kg CO2e/người/tháng</span> thấp hơn trần chuẩn quốc gia ({nationalBenchmark} kg CO2e) tới 86%.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-gray-400 block text-[11px]">Cường độ phát thải / m²:</span>
            <span className="font-bold text-gray-800">
              {(currentEmissions / activeWorkspace.floorArea).toFixed(2)} kg CO2e/m²
            </span>
          </div>
        </div>
      </section>

      {/* 2 Analytics Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card A: Emission Trend (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Xu hướng phát thải</h2>
              <p className="text-xs text-gray-500">6 tháng gần nhất (kg CO2e)</p>
            </div>
            <div className="text-xs font-semibold text-[#00A76F] flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Xu hướng giảm đều
            </div>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A76F" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#00A76F" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: number) => [`${val} kg CO2e`, 'Phát thải']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="emissions"
                  stroke="#00A76F"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorEmerald)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card B: Category Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">Cơ cấu phát thải</h2>
              <p className="text-xs text-gray-500">Tỷ trọng theo danh mục nguồn</p>
            </div>
          </div>

          <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val} kg CO2e`, 'Phát thải']}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-gray-100">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-gray-600 truncate">{cat.name}:</span>
                <span className="font-bold text-gray-900 ml-auto">{cat.value} kg</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Card C: Recent Approved Activities (v2 spec requirement) */}
      <section className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Hoạt động vừa được phê duyệt gần đây (Recent Approved Activities)
            </h2>
            <p className="text-xs text-gray-500">
              Các bản ghi chính thức được ghi nhận vào sổ cái sau khi đối chiếu
            </p>
          </div>
          <span className="text-xs text-gray-400">Hiển thị 5 bản ghi mới nhất</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="py-2.5 px-3">Ngày</th>
                <th className="py-2.5 px-3">Người ghi</th>
                <th className="py-2.5 px-3">Hoạt động</th>
                <th className="py-2.5 px-3">Sản lượng</th>
                <th className="py-2.5 px-3 text-right">Phát thải (kg CO2e)</th>
                <th className="py-2.5 px-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {recentApprovedLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50/80">
                  <td className="py-2.5 px-3 font-mono text-gray-600">{log.date}</td>
                  <td className="py-2.5 px-3 text-gray-800 font-semibold">{log.userName}</td>
                  <td className="py-2.5 px-3 text-gray-900">{log.activityName}</td>
                  <td className="py-2.5 px-3 text-gray-600">
                    {log.quantity} {log.unit}
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-[#00A76F]">
                    {log.co2e.toFixed(2)} kg
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#00A76F]">
                      Đã ghi sổ
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
