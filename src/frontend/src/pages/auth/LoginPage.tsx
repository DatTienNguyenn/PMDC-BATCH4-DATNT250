import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../mock/mockData';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [currentMode, setCurrentMode] = useState<'login' | 'register'>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim().toLowerCase();

    // Check against mock accounts
    let matchedUser = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === trimmedEmail ||
        (trimmedEmail.includes('admin.workspace') && u.workspaceRole === 'REVIEWER') ||
        (trimmedEmail.includes('an.nguyen') && u.workspaceRole === 'REVIEWER') ||
        (trimmedEmail.includes('member') && u.workspaceRole === 'EDITOR') ||
        (trimmedEmail.includes('binh.tran') && u.workspaceRole === 'EDITOR') ||
        (trimmedEmail.includes('sysadmin') && u.globalRole === 'SYSTEM_ADMIN') ||
        (trimmedEmail.includes('admin@') && u.globalRole === 'SYSTEM_ADMIN')
    );

    if (!matchedUser) {
      if (currentMode === 'register') {
        // Register new user mock
        matchedUser = {
          id: `user-${Date.now()}`,
          name: fullName || 'Thành viên mới',
          email: trimmedEmail,
          globalRole: 'USER',
          workspaceRole: 'EDITOR',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          roleBadge: 'Workspace Member (Editor)',
          description: 'Thành viên mới đăng ký tài khoản.',
          defaultPath: '/workspaces',
        };
      } else {
        setErrorMessage('Tài khoản hoặc mật khẩu không chính xác.');
        return;
      }
    }

    login(matchedUser);
    navigate(matchedUser.defaultPath);
  };

  const handleGoogleLogin = () => {
    // 1-Click Google sign in as primary workspace admin
    const defaultUser = MOCK_USERS[0];
    login(defaultUser);
    navigate(defaultUser.defaultPath);
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row font-sans selection:bg-[#00A76F] selection:text-white">
      {/* LEFT PANEL: Sustainable Eco-Branding & Abstract Carbon Graphic (40% on Desktop - Stitch UI v2 SCR-AUTH-01) */}
      <div className="relative w-full lg:w-[40%] bg-[#00A76F] min-h-[420px] lg:min-h-screen flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white overflow-hidden select-none">
        {/* Ambient Subtle Shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-black/10 blur-3xl pointer-events-none" />

        {/* Top Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#00A76F] shadow-sm">
            <span
              className="material-symbols-outlined text-[28px] text-[#00A76F]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">CarbonLedger</span>
        </div>

        {/* Center Content: App Purpose Statement & Minimal Geometric Metric Graphic */}
        <div className="relative z-10 my-auto py-8 flex flex-col items-start max-w-lg">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-3 leading-snug">
              Theo dõi & Quản lý Phát thải
            </h2>
            <p className="text-sm lg:text-base text-white/90 leading-relaxed">
              Hệ thống tính toán phát thải khí nhà kính cho hộ gia đình và văn phòng nhỏ, cung cấp
              dashboard phân tích tổng quan và đề xuất lộ trình giảm phát thải định lượng.
            </p>
          </div>

          {/* Minimal Clean Carbon Metric Graphic (Stitch UI v2 Telemetry) */}
          <div className="w-full flex items-center justify-center py-4">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full border border-white/20 animate-pulse"
                style={{ animationDuration: '4s' }}
              />
              <div className="absolute inset-3 rounded-full border border-dashed border-white/30" />
              <div className="absolute inset-8 rounded-full border border-white/20 backdrop-blur-sm" />
              <div className="relative z-10 w-24 h-24 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex flex-col items-center justify-center p-2.5 text-center shadow-lg">
                <span
                  className="material-symbols-outlined text-white text-2xl mb-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  nest_eco_leaf
                </span>
                <span className="text-[10px] text-white/90 uppercase tracking-widest font-semibold">
                  Net-Zero
                </span>
                <span className="text-lg font-bold text-white leading-none mt-1">84.2%</span>
              </div>
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span className="text-[11px] font-semibold text-white">Scope 1 & 2</span>
              </div>
              <div className="absolute bottom-1 right-2 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-white text-xs">trending_down</span>
                <span className="text-[11px] font-semibold text-white">-18.4% YoY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Small Copyright */}
        <div className="relative z-10 pt-4 flex items-center justify-between border-t border-white/20">
          <p className="text-xs text-white/80 font-medium">© 2026 CarbonLedger v2.4</p>
          <span className="text-xs text-white/60">Bảo mật & Minh bạch</span>
        </div>
      </div>

      {/* RIGHT PANEL: Clean Modular Authentication Form (60% on Desktop - Consistent with SCR-AUTH-01) */}
      <div className="w-full lg:w-[60%] min-h-screen bg-white flex items-center justify-center p-6 sm:p-10 md:p-16 lg:p-16">
        <div className="w-full max-w-md mx-auto">
          {/* Segmented Tab Pill Switcher */}
          <div className="bg-[#eef4ff] p-1 rounded-xl flex items-center mb-8 border border-gray-200/50">
            <button
              onClick={() => {
                setCurrentMode('login');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all cursor-pointer text-center ${
                currentMode === 'login'
                  ? 'text-white bg-[#00A76F] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Đăng nhập
            </button>
            <button
              onClick={() => {
                setCurrentMode('register');
                setErrorMessage('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all cursor-pointer text-center ${
                currentMode === 'register'
                  ? 'text-white bg-[#00A76F] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              type="button"
            >
              Đăng ký
            </button>
          </div>

          {/* Heading: Large bold heading 'Đăng nhập', strictly no subtitle */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {currentMode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản mới'}
            </h1>
          </div>

          {/* Social Action: Google Sign In (Placed ABOVE form per v2 design) */}
          <button
            onClick={handleGoogleLogin}
            className="w-full h-12 py-3 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold text-sm rounded-xl flex items-center justify-center gap-3 transition-colors duration-150 cursor-pointer shadow-xs"
            type="button"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span className="font-medium">Đăng nhập với Google</span>
          </button>

          {/* Divider with 'hoặc' */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-gray-500 font-medium">hoặc</span>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200 animate-in fade-in">
              {errorMessage}
            </div>
          )}

          {/* Primary Credentials Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name Field (Hidden in Login Mode, shown in Register Mode) */}
            {currentMode === 'register' && (
              <div className="space-y-1.5 animate-in fade-in">
                <label className="text-xs font-semibold text-gray-800 block" htmlFor="full-name">
                  Họ và tên
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <span className="material-symbols-outlined text-[20px]">person</span>
                  </div>
                  <input
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 transition-all outline-none"
                    id="full-name"
                    placeholder="Nguyễn Văn An"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-800 block" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 transition-all outline-none"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-800 block" htmlFor="password">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  className="w-full h-12 pl-11 pr-11 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 text-sm focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 transition-all outline-none"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label="Hiện/ẩn mật khẩu"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            {currentMode === 'login' && (
              <div className="flex items-center justify-end pt-0.5">
                <Link
                  className="text-xs text-[#00A76F] hover:text-[#008f5f] transition-colors font-medium"
                  to="/auth/forgot-password"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            )}

            {/* Primary CTA Button */}
            <div className="pt-2">
              <button
                className="w-full h-12 py-3 bg-[#00A76F] hover:bg-[#00925f] text-white font-semibold text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                type="submit"
              >
                <span>{currentMode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Bottom Toggle Text */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              <span>{currentMode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}</span>
              <button
                className="ml-1 font-semibold text-sm text-[#00A76F] hover:text-[#00925f] transition-colors cursor-pointer inline-flex items-center"
                onClick={() => {
                  setCurrentMode(currentMode === 'login' ? 'register' : 'login');
                  setErrorMessage('');
                }}
                type="button"
              >
                {currentMode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
