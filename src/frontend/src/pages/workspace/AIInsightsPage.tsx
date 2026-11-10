import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { MOCK_AI_REPORT } from '../../mock/mockData';
import {
  Sparkles,
  Download,
  Calendar,
  CheckCircle2,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bike,
  Droplets,
  RotateCcw,
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const AIInsightsPage: React.FC = () => {
  const { workspaceRole } = useAuth();
  const { activeWorkspace } = useWorkspace();

  const [report, setReport] = useState(MOCK_AI_REPORT);
  const [isExporting, setIsExporting] = useState(false);

  // RBAC Guard: Member (Editor) cannot access AI Insights report per spec
  if (workspaceRole !== 'REVIEWER') {
    return <Navigate to="/403" replace />;
  }

  const handleToggleApply = (quickWinId: string) => {
    setReport((prev) => ({
      ...prev,
      quickWins: prev.quickWins.map((qw) =>
        qw.id === quickWinId ? { ...qw, applied: !qw.applied } : qw
      ),
    }));
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 500);
  };

  return (
    <div className="space-y-8 font-sans print:p-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Báo cáo AI & Lộ trình Giảm phát thải (SCR-INSIGHT-01)
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              Gemini 1.5 Flash
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Phân tích chuyên sâu từ dữ liệu tiêu thụ thực tế kèm khuyến nghị định lượng cá nhân hóa
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm shadow-[#00A76F]/20 transition-all flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Đang chuẩn bị...' : 'Xuất Kế hoạch ra PDF'}</span>
        </button>
      </div>

      {/* Main AI Summary Box */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00A76F] to-emerald-400 text-white flex items-center justify-center shadow-sm shadow-[#00A76F]/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Nhận định Cốt lõi của AI • {report.month}
            </h2>
            <div className="text-xs text-gray-400">
              Không gian: {activeWorkspace.name} • Tạo lúc: 06:00 AM (Spring Scheduler Job)
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed max-w-3xl mb-6">
          {report.summary}
        </p>

        {/* 3 Key Findings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          {report.keyFindings.map((kf, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/70 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="material-symbols-outlined text-[20px] text-[#00A76F]">
                    {kf.icon}
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      kf.impact.startsWith('-')
                        ? 'bg-emerald-100 text-[#00A76F]'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {kf.impact}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-gray-900 mb-1">{kf.title}</h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">{kf.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Quick Wins Actions Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Hành động Cắt giảm Nhanh (Quick Wins)
          </h2>
          <p className="text-xs text-gray-500">
            Các giải pháp khả thi với chi phí 0đ giúp giảm phát thải định lượng ngay trong tháng tới
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.quickWins.map((qw) => (
            <div
              key={qw.id}
              className={`bg-white rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                qw.applied
                  ? 'border-emerald-300 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Mức độ khả thi cao
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-[#00A76F]">
                    -{qw.reductionKg.toFixed(2)} kg CO2e
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-2">{qw.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-4">{qw.desc}</p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  {qw.applied ? '✓ Đang áp dụng' : 'Chưa áp dụng'}
                </span>

                <button
                  onClick={() => handleToggleApply(qw.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                    qw.applied
                      ? 'bg-emerald-100 text-[#00A76F] hover:bg-emerald-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-[#00A76F] hover:text-white'
                  }`}
                >
                  {qw.applied ? 'Đã áp dụng ✓' : 'Cam kết thực hiện'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: 3-Month Reduction Roadmap */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Lộ trình Cắt giảm 3 Tháng Tới (Reduction Roadmap)
          </h2>
          <p className="text-xs text-gray-500">
            Hạn ngạch mục tiêu định lượng từng giai đoạn hướng tới mục tiêu phát thải ròng tối thiểu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {report.roadmap.map((phase, i) => {
            const isCurrent = phase.status === 'in_progress';

            return (
              <div
                key={i}
                className={`p-5 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'border-[#00A76F] bg-emerald-50/20 shadow-xs'
                    : 'border-gray-200 bg-gray-50/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#00A76F] font-mono">
                    {phase.phase}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCurrent
                        ? 'bg-emerald-100 text-[#00A76F]'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {isCurrent ? 'Đang thực hiện' : 'Kế hoạch'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-gray-900 mb-1">{phase.title}</h3>
                <div className="text-xs text-gray-600 mb-4">
                  Mục tiêu trần: <strong className="text-gray-900">{phase.targetKg} kg CO2e</strong>{' '}
                  ({phase.targetReduction})
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Tiến độ thực thi:</span>
                    <span className="font-bold text-gray-800">{phase.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00A76F] rounded-full transition-all duration-500"
                      style={{ width: `${phase.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
