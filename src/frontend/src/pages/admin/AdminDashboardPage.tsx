import React from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useLedger } from '../../context/LedgerContext';
import { Building2, Users, CloudRain, Cpu, TrendingUp, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const { workspaces } = useWorkspace();
  const { factors } = useLedger();

  const totalTenants = workspaces.length;
  const totalUsers = workspaces.reduce((sum, w) => sum + w.memberCount, 0);
  const totalEmissions = workspaces.reduce((sum, w) => sum + w.currentEmissions, 0);

  return (
    <div className="space-y-8 font-sans">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Dashboard Quản trị Hệ thống (SCR-ADM-DASH-01)
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
            Light Theme v2
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          Giám sát tập trung toàn bộ không gian làm việc (Tenants), tài nguyên AI và định mức quốc gia
        </p>
      </div>

      {/* 4 Admin KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tổng số Workspace (Tenants)
            </span>
            <Building2 className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">{totalTenants}</div>
          <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
            100% tài khoản hoạt động bình thường
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Người dùng hoạt động
            </span>
            <Users className="w-5 h-5 text-[#00A76F]" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">{totalUsers}</div>
          <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
            Phân bổ trên 2 workspace
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tổng Phát thải Toàn hệ thống
            </span>
            <CloudRain className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {totalEmissions.toLocaleString('vi-VN')}{' '}
            <span className="text-xs font-normal text-gray-500">kg CO2e</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
            Tháng 11/2026 lũy kế
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tiêu thụ Tài nguyên AI (Tokens)
            </span>
            <Cpu className="w-5 h-5 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">142,850</div>
          <div className="text-[11px] text-gray-400 mt-3 pt-2 border-t border-gray-100">
            Gemini 1.5 Flash (Vision & Reasoning)
          </div>
        </div>
      </div>

      {/* Quick Access to Admin Functions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Factor Management Quick Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900">Hệ số Phát thải Quy chuẩn</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#00A76F]">
                {factors.length} hệ số
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Quản lý các định mức quy chuẩn quốc gia theo công bố mới nhất từ EVN, Bộ TN&MT, IPCC và GHG Protocol.
            </p>
          </div>

          <Link
            to="/admin/emission-factors"
            className="w-full py-2.5 px-4 text-xs font-bold text-center text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs transition-all"
          >
            Quản lý Danh mục Hệ số &rarr;
          </Link>
        </div>

        {/* Tenant Management Quick Card */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900">Quản lý Workspace Tenants</h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                {workspaces.length} không gian
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Theo dõi tình trạng hoạt động, khóa/mở khóa không gian vi phạm chính sách và hỗ trợ người dùng.
            </p>
          </div>

          <Link
            to="/admin/workspaces"
            className="w-full py-2.5 px-4 text-xs font-bold text-center text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-all"
          >
            Xem Danh sách Workspace &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
