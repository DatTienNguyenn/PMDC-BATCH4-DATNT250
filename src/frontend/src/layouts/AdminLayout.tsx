import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, LayoutDashboard, Calculator, Building, ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="bg-[#f7f9ff] text-[#121c27] antialiased min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 w-full flex justify-between items-center px-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 select-none">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-600/20">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-lg tracking-tight">
                CarbonLedger
              </span>
              <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-widest -mt-1">
                Admin Console
              </span>
            </div>
          </Link>

          <div className="h-4 w-[1px] bg-gray-300" />
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
            System Administrator
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/workspace/ws-01/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-[#00A76F] transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại Ứng dụng
          </Link>

          <div className="flex items-center gap-2">
            <img
              src={currentUser?.avatarUrl}
              alt="Admin"
              className="w-8 h-8 rounded-full border border-purple-300 object-cover"
            />
            <span className="text-sm font-semibold text-gray-800">{currentUser?.name}</span>
          </div>
        </div>
      </header>

      {/* Body Shell */}
      <div className="flex pt-16 min-h-[calc(100vh-4rem)] w-full">
        {/* Admin Left Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-60 flex flex-col py-6 px-3 bg-white border-r border-gray-200 select-none z-30">
          <nav className="space-y-1.5 flex-1">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#00A76F] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Quản trị</span>
            </NavLink>

            <NavLink
              to="/admin/emission-factors"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#00A76F] text-white font-semibold shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <Calculator className="w-4 h-4" />
              <span>Hệ số Quy chuẩn</span>
            </NavLink>

            <NavLink
              to="/admin/workspaces"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#00A76F] text-white font-semibold shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <Building className="w-4 h-4" />
              <span>Workspace Tenants</span>
            </NavLink>
          </nav>

          <div className="px-3 pt-4 border-t border-gray-200 text-xs text-gray-400">
            <div>Chính sách bảo mật EVN / IPCC</div>
            <div className="text-[11px] text-[#00A76F] font-semibold mt-1">Light Theme v2</div>
          </div>
        </aside>

        <main className="ml-60 flex-1 p-8 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
