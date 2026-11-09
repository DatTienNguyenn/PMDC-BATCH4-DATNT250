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
  AlertTriangle,
  Info,
  ChevronDown,
  UserCheck,
  Plus,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

  // Workspace-wide trend data
  const trendDataWorkspace = [
    { month: 'Tháng 6', emissions: 110.5 },
    { month: 'Tháng 7', emissions: 125.0 },
    { month: 'Tháng 8', emissions: 118.2 },
    { month: 'Tháng 9', emissions: 98.4 },
    { month: 'Tháng 10', emissions: 97.2 },
    { month: 'Tháng 11', emissions: 85.4 },
  ];

  // Personal Member trend data (for Editor - Trần Thị Bình)
  const trendDataPersonal = [
    { month: 'Tháng 6', emissions: 34.0 },
    { month: 'Tháng 7', emissions: 38.5 },
    { month: 'Tháng 8', emissions: 32.0 },
    { month: 'Tháng 9', emissions: 29.5 },
    { month: 'Tháng 10', emissions: 31.0 },
    { month: 'Tháng 11', emissions: 28.4 },
  ];

  // Workspace Category Breakdown
  const categoryDataWorkspace = [
    { name: 'Điện lưới EVN', value: 46.94, color: '#00A76F' },
    { name: 'Xăng xe máy', value: 12.71, color: '#2563eb' },
    { name: 'Khí gas LPG', value: 11.93, color: '#f59e0b' },
    { name: 'Rác sinh hoạt', value: 9.09, color: '#8b5cf6' },
    { name: 'Nước sạch', value: 4.74, color: '#06b6d4' },
  ];

  // Personal Category Breakdown (for Editor)
  const categoryDataPersonal = [
    { name: 'Xăng xe máy Lead', value: 12.71, color: '#2563eb' },
    { name: 'Khí gas LPG nấu ăn', value: 11.93, color: '#f59e0b' },
    { name: 'Sạc xe điện VinFast', value: 8.67, color: '#00A76F' },
  ];

  // Filter logs for Editor vs Reviewer
  const memberLogs = logs.filter(
    (l) => l.userId === currentUser?.id || l.userName.includes(currentUser?.name || '')
  );

  const recentApprovedLogs = logs
    .filter((l) => l.status === 'APPROVED')
    .slice(0, 5);

  const memberTotalCo2e = memberLogs
    .filter((l) => l.status === 'APPROVED')
    .reduce((sum, l) => sum + l.co2e, 0);

  const memberPendingCount = memberLogs.filter((l) => l.status === 'DRAFT').length;

  return (
    <div className="space-y-8 font-sans">
      {/* ========================================================= */}
      {/* 1. VIEW DÀNH RIÊNG CHO THÀNH VIÊN (WORKSPACE MEMBER / EDITOR) */}
      {/* ========================================================= */}
      {!isReviewer && (
        <>
          {/* Member Banner info */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <span className="font-bold">Dashboard Phân tích Cá nhân (Member Dashboard):</span>{' '}
                Theo quy chuẩn ma trận RBAC, Thành viên chỉ theo dõi chỉ số phát thải cá nhân và các hoạt động do bạn nạp vào hệ thống.
              </div>
            </div>
            <Link
              to={`/workspace/${activeWorkspace.id}/ledger`}
              className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1 flex-shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nạp phát thải mới</span>
            </Link>
          </div>

          {/* Member Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Phân tích Cá nhân • {currentUser?.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Theo dõi dấu chân carbon từ các sinh hoạt hàng ngày của riêng bạn
              </p>
            </div>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                aria-label="Chọn năm"
                className="appearance-none bg-white border border-gray-200 hover:border-gray-300 rounded-xl px-4 py-1.5 pr-8 text-xs font-semibold text-gray-800 cursor-pointer shadow-xs focus:ring-2 focus:ring-[#00A76F]/20 focus:outline-none"
              >
                <option value="2026">Năm 2026</option>
                <option value="2025">Năm 2025</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 3 Member KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Phát thải cá nhân đã duyệt
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00A76F]/10 text-[#00A76F]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Đã ghi sổ cái
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none">
                  {memberTotalCo2e.toFixed(1)}
                </span>
                <span className="text-xs font-semibold text-gray-500">kg CO2e</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span>Trưởng nhóm: Nguyễn Văn An</span>
                <span className="font-semibold text-emerald-600">Đã kiểm duyệt</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Tỷ trọng đóng góp vào gia đình
                </span>
                <span className="text-xs font-semibold text-gray-600">
                  {memberTotalCo2e.toFixed(1)} / {currentEmissions} kg
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-blue-600 tracking-tight leading-none">
                  {Math.round((memberTotalCo2e / (currentEmissions || 1)) * 100)}%
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-gray-100 text-[11px] text-gray-400">
                Gia đình gồm 4 nhân khẩu (Trung bình 25% / người)
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Hoạt động đang chờ duyệt
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                  <Clock className="w-3.5 h-3.5" />
                  Trạng thái Draft
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-amber-600 tracking-tight leading-none">
                  {memberPendingCount}
                </span>
                <span className="text-xs font-semibold text-gray-500">hoạt động</span>
              </div>
              <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                <span>Đang đợi Trưởng nhóm phê duyệt</span>
                <Link
                  to={`/workspace/${activeWorkspace.id}/ledger`}
                  className="font-semibold text-[#00A76F] hover:underline"
                >
                  Xem sổ cái &rarr;
                </Link>
              </div>
            </div>
          </section>

          {/* Member Analytics Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Xu hướng tiêu dùng cá nhân (6 tháng)
                  </h2>
                  <p className="text-xs text-gray-500">Số liệu phát thải do bạn tạo ra (kg CO2e)</p>
                </div>
              </div>
              <div className="w-full h-64 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendDataPersonal} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
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
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="emissions"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorBlue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Cơ cấu tiêu dùng của bạn</h2>
                <p className="text-xs text-gray-500">Phân bố nguồn phát thải cá nhân</p>
              </div>
              <div className="w-full h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDataPersonal}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryDataPersonal.map((entry, index) => (
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
              <div className="space-y-1 text-xs pt-3 border-t border-gray-100">
                {categoryDataPersonal.map((cat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-gray-600">{cat.name}</span>
                    </div>
                    <span className="font-bold text-gray-900">{cat.value} kg</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Member's Own Activities Table */}
          <section className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Hoạt động do bạn đã khai báo gần đây
                </h2>
                <p className="text-xs text-gray-500">
                  Theo dõi trạng thái duyệt của Trưởng nhóm cho từng bản ghi của bạn
                </p>
              </div>
              <Link
                to={`/workspace/${activeWorkspace.id}/ledger`}
                className="text-xs font-semibold text-[#00A76F] hover:underline"
              >
                Xem tất cả trong Sổ cái &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Ngày</th>
                    <th className="py-2.5 px-3">Hoạt động</th>
                    <th className="py-2.5 px-3">Sản lượng</th>
                    <th className="py-2.5 px-3 text-right">Quy đổi kg CO2e</th>
                    <th className="py-2.5 px-3 text-center">Người duyệt</th>
                    <th className="py-2.5 px-3 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {memberLogs.map((log) => {
                    const isApproved = log.status === 'APPROVED';
                    const isDraft = log.status === 'DRAFT';

                    return (
                      <tr key={log.id} className="hover:bg-gray-50/80">
                        <td className="py-2.5 px-3 font-mono text-gray-600">{log.date}</td>
                        <td className="py-2.5 px-3 text-gray-900 font-semibold">
                          {log.activityName}
                        </td>
                        <td className="py-2.5 px-3 text-gray-600">
                          {log.quantity} {log.unit}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-[#00A76F]">
                          {log.co2e.toFixed(2)} kg
                        </td>
                        <td className="py-2.5 px-3 text-center text-gray-700">
                          {log.reviewerName ? (
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                              {log.reviewerName}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Đang chờ duyệt</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {isApproved ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#00A76F]">
                              Đã duyệt
                            </span>
                          ) : isDraft ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                              Chờ duyệt
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                              Từ chối
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ========================================================= */}
      {/* 2. VIEW DÀNH CHO TRƯỞNG NHÓM (WORKSPACE ADMIN / REVIEWER) */}
      {/* ========================================================= */}
      {isReviewer && (
        <>
          {/* 85% Budget Warning Alert Banner */}
          {is85Warning && (
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <span className="font-bold">CẢNH BÁO TIẾN ĐỘ NGÂN SÁCH (≥ 85%):</span> Không gian đã tiêu thụ {currentEmissions} / {target} kg CO2e ({budgetRatio}%). Vui lòng cân nhắc cắt giảm tiêu thụ năng lượng!
                </div>
              </div>
              <span className="font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg">
                Mức Cảnh Báo Sớm
              </span>
            </div>
          )}

          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Dashboard Tổng quan Workspace
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Quyền Trưởng nhóm (Reviewer) • Giám sát hạn ngạch, thành viên và dòng hoạt động phát thải
              </p>
            </div>

            {/* Year Selector */}
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
                <span className="font-semibold text-gray-600">5 hoạt động đã chốt sổ</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-gray-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ngân sách cam kết
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

          {/* Analytics Charts Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Xu hướng phát thải Không gian</h2>
                  <p className="text-xs text-gray-500">6 tháng gần nhất (kg CO2e)</p>
                </div>
                <div className="text-xs font-semibold text-[#00A76F] flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Xu hướng giảm đều
                </div>
              </div>

              <div className="w-full h-64 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendDataWorkspace} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Cơ cấu phát thải theo danh mục</h2>
                <p className="text-xs text-gray-500">Tỷ trọng toàn Không gian làm việc</p>
              </div>

              <div className="w-full h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDataWorkspace}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryDataWorkspace.map((entry, index) => (
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
                {categoryDataWorkspace.map((cat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                    <span className="text-gray-600 truncate">{cat.name}:</span>
                    <span className="font-bold text-gray-900 ml-auto">{cat.value} kg</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Approved Activities Table (With Reviewer details) */}
          <section className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Hoạt động vừa được phê duyệt gần đây (Recent Approved Activities)
                </h2>
                <p className="text-xs text-gray-500">
                  Bản ghi chính thức kèm thông tin định danh thành viên kiểm duyệt
                </p>
              </div>
              <Link
                to={`/workspace/${activeWorkspace.id}/ledger`}
                className="text-xs font-semibold text-[#00A76F] hover:underline"
              >
                Mở toàn bộ Sổ cái &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Ngày</th>
                    <th className="py-2.5 px-3">Người nạp</th>
                    <th className="py-2.5 px-3">Hoạt động</th>
                    <th className="py-2.5 px-3">Sản lượng</th>
                    <th className="py-2.5 px-3 text-right">Phát thải (kg CO2e)</th>
                    <th className="py-2.5 px-3 text-center">Người phê duyệt</th>
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
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          {log.reviewerName || 'Nguyễn Văn An'}
                        </span>
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
        </>
      )}
    </div>
  );
};
