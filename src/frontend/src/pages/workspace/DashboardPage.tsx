import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useLedger } from '../../context/LedgerContext';
import ReactApexChart from 'react-apexcharts';
const Chart = ReactApexChart as any;
import { ApexOptions } from 'apexcharts';
import {
  Chip,
  Button,
  Tooltip as MuiTooltip,
} from '@mui/material';
import {
  ArrowDown,
  TrendingUp,
  Users,
  ShieldCheck,
  AlertTriangle,
  Info,
  ChevronDown,
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

  // ==========================================
  // APEX CHARTS CONFIGURATIONS (Vite + React-ApexCharts)
  // ==========================================

  // 1. Workspace Emission Trend (Area Chart)
  const trendCategories = ['Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'];
  const trendSeriesWorkspace = [
    {
      name: 'Phát thải Không gian',
      data: [110.5, 125.0, 118.2, 98.4, 97.2, 85.4],
    },
  ];

  const trendOptionsWorkspace: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      fontFamily: '"Public Sans", sans-serif',
    },
    colors: ['#00A76F'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 95, 100],
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2.5,
    },
    xaxis: {
      categories: trendCategories,
      labels: { style: { colors: '#9ca3af', fontSize: '11px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#9ca3af', fontSize: '11px' },
        formatter: (val) => `${val} kg`,
      },
    },
    tooltip: {
      theme: 'light',
      y: { formatter: (val) => `${val} kg CO2e` },
    },
    dataLabels: { enabled: false },
    grid: {
      strokeDashArray: 3,
      borderColor: '#f1f5f9',
    },
  };

  // 2. Personal Member Trend (Area Chart)
  const trendSeriesPersonal = [
    {
      name: 'Phát thải Cá nhân',
      data: [34.0, 38.5, 32.0, 29.5, 31.0, 28.4],
    },
  ];

  const trendOptionsPersonal: ApexOptions = {
    ...trendOptionsWorkspace,
    colors: ['#2563eb'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 95, 100],
      },
    },
  };

  // 3. Workspace Category Breakdown (Donut Chart)
  const donutSeriesWorkspace = [46.94, 12.71, 11.93, 9.09, 4.74];
  const donutLabelsWorkspace = ['Điện lưới EVN', 'Xăng xe máy', 'Khí gas LPG', 'Rác sinh hoạt', 'Nước sạch'];
  const donutColorsWorkspace = ['#00A76F', '#2563eb', '#f59e0b', '#8b5cf6', '#06b6d4'];

  const donutOptionsWorkspace: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: '"Public Sans", sans-serif',
    },
    colors: donutColorsWorkspace,
    labels: donutLabelsWorkspace,
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Tổng phát thải',
              fontSize: '11px',
              color: '#64748b',
              formatter: () => '85.4 kg',
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'light',
      y: { formatter: (val) => `${val} kg CO2e` },
    },
  };

  // 4. Personal Category Breakdown (Donut Chart)
  const donutSeriesPersonal = [12.71, 11.93, 8.67];
  const donutLabelsPersonal = ['Xăng xe máy Lead', 'Khí gas LPG nấu ăn', 'Sạc xe điện VinFast'];
  const donutColorsPersonal = ['#2563eb', '#f59e0b', '#00A76F'];

  const donutOptionsPersonal: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: '"Public Sans", sans-serif',
    },
    colors: donutColorsPersonal,
    labels: donutLabelsPersonal,
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Cá nhân nạp',
              fontSize: '11px',
              color: '#64748b',
              formatter: () => '33.3 kg',
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'light',
      y: { formatter: (val) => `${val} kg CO2e` },
    },
  };

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
                <span className="font-bold">Dashboard Phân tích Cá nhân:</span>{' '}
                Theo quy chuẩn phân quyền, Thành viên chỉ theo dõi chỉ số phát thải cá nhân và các hoạt động do bạn nạp vào hệ thống.
              </div>
            </div>
            <Link
              to={`/workspace/${activeWorkspace.id}/ledger/pending`}
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
                Gia đình gồm 4 nhân khẩu (Bình quân 25% / người)
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
                  to={`/workspace/${activeWorkspace.id}/ledger/pending`}
                  className="font-semibold text-[#00A76F] hover:underline"
                >
                  Xem hàng chờ &rarr;
                </Link>
              </div>
            </div>
          </section>

          {/* Member Analytics Charts with React ApexCharts */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    Xu hướng tiêu dùng cá nhân (6 tháng)
                  </h2>
                  <p className="text-xs text-gray-500">Phát thải qua React ApexCharts (kg CO2e)</p>
                </div>
              </div>
              <div className="w-full pt-1">
                <Chart
                  options={trendOptionsPersonal}
                  series={trendSeriesPersonal}
                  type="area"
                  height={260}
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Cơ cấu tiêu dùng của bạn</h2>
                <p className="text-xs text-gray-500">Phân bố nguồn phát thải cá nhân</p>
              </div>
              <div className="w-full flex justify-center py-2">
                <Chart
                  options={donutOptionsPersonal}
                  series={donutSeriesPersonal}
                  type="donut"
                  height={220}
                />
              </div>
              <div className="space-y-1.5 text-xs pt-3 border-t border-gray-100">
                {donutLabelsPersonal.map((label, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: donutColorsPersonal[i] }} />
                      <span className="text-gray-600">{label}</span>
                    </div>
                    <span className="font-bold text-gray-900">{donutSeriesPersonal[i]} kg</span>
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
                  Hoạt động được ghi nhận gần đây
                </h2>
                <p className="text-xs text-gray-500">
                  Theo dõi trạng thái duyệt của Trưởng nhóm cho từng bản ghi của bạn
                </p>
              </div>
              <Link
                to={`/workspace/${activeWorkspace.id}/ledger/approved`}
                className="text-xs font-semibold text-[#00A76F] hover:underline"
              >
                Xem tất cả trong Sổ cái &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-4 text-center">Ngày</th>
                    <th className="py-2.5 px-4 text-left">Hoạt động</th>
                    <th className="py-2.5 px-4 text-center">Sản lượng</th>
                    <th className="py-2.5 px-4 text-center">Phát thải (kg CO2e)</th>
                    <th className="py-2.5 px-4 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {memberLogs.map((log) => {
                    const isApproved = log.status === 'APPROVED';
                    const isDraft = log.status === 'DRAFT';

                    return (
                      <tr key={log.id} className="hover:bg-gray-50/80">
                        <td className="py-2.5 px-4 font-mono text-gray-600 text-center">{log.date}</td>
                        <td className="py-2.5 px-4 text-gray-900 font-semibold text-left">
                          {log.activityName}
                        </td>
                        <td className="py-2.5 px-4 text-gray-600 text-center">
                          {log.quantity} {log.unit}
                        </td>
                        <td className="py-2.5 px-4 text-center font-bold text-[#00A76F]">
                          {log.co2e.toFixed(2)} kg
                        </td>
                        <td className="py-2.5 px-4 text-center">
                          {isApproved ? (
                            <Chip
                              label="Đã duyệt"
                              size="small"
                              color="success"
                              variant="outlined"
                              sx={{ fontWeight: 700, fontSize: '10px' }}
                            />
                          ) : isDraft ? (
                            <Chip
                              label="Chờ duyệt"
                              size="small"
                              color="warning"
                              variant="outlined"
                              sx={{ fontWeight: 700, fontSize: '10px' }}
                            />
                          ) : (
                            <Chip
                              label="Từ chối"
                              size="small"
                              color="error"
                              variant="outlined"
                              sx={{ fontWeight: 700, fontSize: '10px' }}
                            />
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
              <Chip
                label="Mức Cảnh Báo Sớm"
                size="small"
                color="warning"
                sx={{ fontWeight: 700 }}
              />
            </div>
          )}

          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Dashboard Tổng quan Không gian
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

          {/* Analytics Charts Grid using React ApexCharts */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-base font-bold text-gray-900">Xu hướng phát thải Không gian</h2>
                  <p className="text-xs text-gray-500">6 tháng gần nhất qua React ApexCharts (kg CO2e)</p>
                </div>
                <div className="text-xs font-semibold text-[#00A76F] flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Xu hướng giảm đều
                </div>
              </div>

              <div className="w-full pt-1">
                <Chart
                  options={trendOptionsWorkspace}
                  series={trendSeriesWorkspace}
                  type="area"
                  height={260}
                />
              </div>
            </div>

            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-900">Cơ cấu phát thải theo danh mục</h2>
                <p className="text-xs text-gray-500">Tỷ trọng toàn Không gian làm việc</p>
              </div>

              <div className="w-full flex justify-center py-2">
                <Chart
                  options={donutOptionsWorkspace}
                  series={donutSeriesWorkspace}
                  type="donut"
                  height={220}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-gray-100">
                {donutLabelsWorkspace.map((label, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: donutColorsWorkspace[i] }} />
                    <span className="text-gray-600 truncate">{label}:</span>
                    <span className="font-bold text-gray-900 ml-auto">{donutSeriesWorkspace[i]} kg</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recent Approved Activities Table (Title completely without English; Centered numbers, left-aligned names/activities, no reviewer column) */}
          <section className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">
                  Hoạt động được ghi nhận gần đây
                </h2>
                <p className="text-xs text-gray-500">
                  Bản ghi chính thức đã đối chiếu và ghi vào sổ cái
                </p>
              </div>
              <Link
                to={`/workspace/${activeWorkspace.id}/ledger/approved`}
                className="text-xs font-semibold text-[#00A76F] hover:underline"
              >
                Mở toàn bộ Sổ cái &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-4 text-center">Ngày</th>
                    <th className="py-2.5 px-4 text-left">Người nạp</th>
                    <th className="py-2.5 px-4 text-left">Hoạt động</th>
                    <th className="py-2.5 px-4 text-center">Sản lượng</th>
                    <th className="py-2.5 px-4 text-center">Phát thải (kg CO2e)</th>
                    <th className="py-2.5 px-4 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {recentApprovedLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/80">
                      <td className="py-2.5 px-4 font-mono text-gray-600 text-center">{log.date}</td>
                      <td className="py-2.5 px-4 text-gray-800 font-semibold text-left">
                        {log.userName}
                      </td>
                      <td className="py-2.5 px-4 text-gray-900 text-left">{log.activityName}</td>
                      <td className="py-2.5 px-4 text-gray-600 text-center">
                        {log.quantity} {log.unit}
                      </td>
                      <td className="py-2.5 px-4 text-center font-bold text-[#00A76F]">
                        {log.co2e.toFixed(2)} kg
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <Chip
                          label="Đã ghi sổ"
                          size="small"
                          color="success"
                          variant="outlined"
                          sx={{ fontWeight: 700, fontSize: '10px' }}
                        />
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
