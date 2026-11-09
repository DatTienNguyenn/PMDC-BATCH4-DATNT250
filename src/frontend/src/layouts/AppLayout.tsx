import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { useLedger } from '../context/LedgerContext';
import { NotificationDrawer } from '../components/NotificationDrawer';
import {
  Bell,
  LogOut,
  ChevronDown,
  Building2,
  Plus,
  UserCheck,
  Shield,
  Layers,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { currentUser, workspaceRole, switchUser, logout } = useAuth();
  const { activeWorkspace, workspaces, setActiveWorkspaceId, unreadNotifsCount } =
    useWorkspace();
  const { pendingLogsCount } = useLedger();
  const location = useLocation();
  const navigate = useNavigate();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isWsMenuOpen, setIsWsMenuOpen] = useState(false);

  // Derive page name from route
  const getPageTitle = () => {
    if (location.pathname.includes('/dashboard')) return 'Dashboard';
    if (location.pathname.includes('/ledger')) return 'Sổ cái';
    if (location.pathname.includes('/approvals')) return 'Hàng đợi kiểm duyệt';
    if (location.pathname.includes('/insights')) return 'Báo cáo & Lộ trình';
    if (location.pathname.includes('/settings')) return 'Cài đặt';
    if (location.pathname.includes('/profile')) return 'Hồ sơ cá nhân';
    return 'Tổng quan';
  };

  const isReviewer = workspaceRole === 'REVIEWER';

  return (
    <div className="bg-[#f7f9ff] text-[#121c27] antialiased min-h-screen flex flex-col font-sans">
      {/* Top Notification Drawer */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

      {/* TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 w-full flex justify-between items-center px-6 bg-white border-b border-gray-200 shadow-sm">
        {/* Brand & Breadcrumbs */}
        <div className="flex items-center gap-4 select-none">
          <Link
            to={`/workspace/${activeWorkspace.id}/dashboard`}
            className="flex items-center gap-2 tracking-tight group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#00A76F] flex items-center justify-center text-white shadow-sm shadow-[#00A76F]/20">
              <span className="material-symbols-outlined text-[20px] text-white">eco</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight group-hover:text-[#00A76F] transition-colors">
              CarbonLedger
            </span>
          </Link>

          <div className="h-4 w-[1px] bg-gray-300" />

          {/* Breadcrumb Context */}
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
            <div className="relative">
              <button
                onClick={() => setIsWsMenuOpen(!isWsMenuOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-[#00A76F] font-semibold transition-colors"
              >
                <span>{activeWorkspace.name}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Workspace Switcher Popover */}
              {isWsMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Không gian làm việc
                  </div>
                  {workspaces.map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => {
                        setActiveWorkspaceId(ws.id);
                        setIsWsMenuOpen(false);
                        navigate(`/workspace/${ws.id}/dashboard`);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                        ws.id === activeWorkspace.id
                          ? 'text-[#00A76F] font-semibold bg-emerald-50/50'
                          : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Building2 className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{ws.name}</span>
                      </div>
                      {ws.id === activeWorkspace.id && (
                        <span className="w-2 h-2 rounded-full bg-[#00A76F]" />
                      )}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 my-1" />
                  <Link
                    to="/workspaces"
                    onClick={() => setIsWsMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    <Layers className="w-4 h-4" />
                    Quản lý không gian
                  </Link>
                </div>
              )}
            </div>

            <span className="text-gray-300 text-xs">/</span>
            <span className="text-[#00A76F] font-semibold">{getPageTitle()}</span>
          </div>
        </div>

        {/* Trailing Actions: Demo Role Switcher, Notifications & User Avatar */}
        <div className="flex items-center gap-4">
          {/* Quick Role Tester Pill (High-value feature for pair-programming & evaluating specs!) */}
          <div className="hidden md:flex items-center gap-1.5 bg-gray-100/90 rounded-full p-1 border border-gray-200 text-xs">
            <span className="px-2 font-medium text-gray-500">Vai trò:</span>
            <button
              onClick={() => switchUser('user-01', 'REVIEWER')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                workspaceRole === 'REVIEWER' && currentUser?.id === 'user-01'
                  ? 'bg-[#00A76F] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Chuyển sang Trưởng nhóm: Xem toàn bộ Dashboard, Sổ cái, Phê duyệt, Báo cáo & Cài đặt"
            >
              Reviewer (An)
            </button>
            <button
              onClick={() => switchUser('user-02', 'EDITOR')}
              className={`px-2.5 py-1 rounded-full font-semibold transition-all ${
                workspaceRole === 'EDITOR'
                  ? 'bg-[#00A76F] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Chuyển sang Thành viên: Nạp nháp phát thải, xem phân tích cá nhân, ẩn menu phê duyệt/cài đặt"
            >
              Editor (Bình)
            </button>
            <button
              onClick={() => {
                switchUser('admin-01');
                navigate('/admin/dashboard');
              }}
              className="px-2.5 py-1 rounded-full font-semibold text-gray-600 hover:text-gray-900 flex items-center gap-1"
              title="Vào Cổng Quản trị Hệ thống System Admin"
            >
              <Shield className="w-3 h-3 text-purple-600" />
              SysAdmin
            </button>
          </div>

          {/* Notifications Button */}
          <button
            onClick={() => setIsNotifOpen(true)}
            aria-label="Notifications"
            className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-[#00A76F] transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-white" />
            )}
          </button>

          {/* User Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-9 h-9 rounded-full ring-2 ring-emerald-500/30 overflow-hidden cursor-pointer select-none bg-gray-100 flex items-center justify-center focus:outline-none"
            >
              <img
                src={currentUser?.avatarUrl}
                alt={currentUser?.name}
                className="w-full h-full object-cover"
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="text-sm font-bold text-gray-900 truncate">
                    {currentUser?.name}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{currentUser?.email}</div>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#00A76F]">
                      {workspaceRole === 'REVIEWER' ? 'Trưởng nhóm (Reviewer)' : 'Thành viên (Editor)'}
                    </span>
                  </div>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <UserCheck className="w-4 h-4 text-gray-400" />
                  Hồ sơ cá nhân
                </Link>

                {currentUser?.globalRole === 'SYSTEM_ADMIN' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 transition-colors"
                  >
                    <Shield className="w-4 h-4 text-purple-600" />
                    Cổng Quản trị Admin
                  </Link>
                )}

                <div className="border-t border-gray-100 my-1" />

                <button
                  onClick={() => {
                    logout();
                    setIsUserMenuOpen(false);
                    navigate('/auth/login');
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* BODY WRAPPER */}
      <div className="flex pt-16 min-h-[calc(100vh-4rem)] w-full">
        {/* LEFT SIDEBAR (Stitch UI v2 Minimal SideNavBar) */}
        <aside className="fixed left-0 top-16 bottom-0 w-56 flex flex-col py-6 px-3 bg-white border-r border-gray-200 select-none z-30">
          <nav className="space-y-1.5 flex-1">
            {/* 1. Tổng quan */}
            <NavLink
              to={`/workspace/${activeWorkspace.id}/dashboard`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#00A76F] text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                dashboard
              </span>
              <span>Tổng quan</span>
            </NavLink>

            {/* 2. Sổ cái */}
            <NavLink
              to={`/workspace/${activeWorkspace.id}/ledger`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#00A76F] text-white font-semibold shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              <span>Sổ cái</span>
            </NavLink>

            {/* 3. Phê duyệt (Reviewer Only) */}
            {isReviewer ? (
              <NavLink
                to={`/workspace/${activeWorkspace.id}/approvals`}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#00A76F] text-white font-semibold shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                  <span>Phê duyệt</span>
                </div>
                {pendingLogsCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {pendingLogsCount} chờ
                  </span>
                )}
              </NavLink>
            ) : (
              <div
                className="flex items-center justify-between px-3 py-2 rounded-xl text-gray-300 text-sm cursor-not-allowed select-none"
                title="Chức năng chỉ dành cho Trưởng nhóm (Reviewer)"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-gray-300">
                    verified
                  </span>
                  <span>Phê duyệt</span>
                </div>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              </div>
            )}

            {/* 4. Báo cáo & Lộ trình (Reviewer Only per RBAC) */}
            {isReviewer ? (
              <NavLink
                to={`/workspace/${activeWorkspace.id}/insights`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#00A76F] text-white font-semibold shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">insights</span>
                <span>Báo cáo & Lộ trình</span>
              </NavLink>
            ) : (
              <div
                className="flex items-center justify-between px-3 py-2 rounded-xl text-gray-300 text-sm cursor-not-allowed select-none"
                title="Báo cáo phát thải và khuyến nghị xanh chỉ dành cho Trưởng nhóm (Reviewer)"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-gray-300">
                    insights
                  </span>
                  <span>Báo cáo AI</span>
                </div>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              </div>
            )}

            {/* 5. Cài đặt (Reviewer Only per RBAC) */}
            {isReviewer ? (
              <NavLink
                to={`/workspace/${activeWorkspace.id}/settings`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-[#00A76F] text-white font-semibold shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`
                }
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
                <span>Cài đặt</span>
              </NavLink>
            ) : (
              <div
                className="flex items-center justify-between px-3 py-2 rounded-xl text-gray-300 text-sm cursor-not-allowed select-none"
                title="Cài đặt Workspace chỉ dành cho Trưởng nhóm (Reviewer)"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px] text-gray-300">
                    settings
                  </span>
                  <span>Cài đặt</span>
                </div>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              </div>
            )}
          </nav>

          {/* Sidebar Footer: Version & Status */}
          <div className="px-3 pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono">v2.4.0</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00A76F] animate-pulse" />
              <span className="text-[11px] text-gray-500 font-medium">Sẵn sàng</span>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT CANVAS */}
        <main className="ml-56 flex-1 p-6 md:p-8 max-w-7xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
