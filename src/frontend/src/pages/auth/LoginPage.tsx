import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../mock/mockData';
import { Shield, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = MOCK_USERS.find((u) => u.email === email) || MOCK_USERS[0];
    login(user);
    navigate('/workspaces');
  };

  const handleQuickLogin = (index: number) => {
    const user = MOCK_USERS[index];
    login(user);
    if (user.globalRole === 'SYSTEM_ADMIN') {
      navigate('/admin/dashboard');
    } else {
      navigate('/workspaces');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand */}
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#00A76F] flex items-center justify-center text-white shadow-sm shadow-[#00A76F]/25">
            <span className="material-symbols-outlined text-[24px]">eco</span>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            CarbonLedger
          </span>
        </div>
        <p className="text-center text-xs text-gray-500 max-w-xs mx-auto">
          Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình & Văn phòng nhỏ
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
          {/* Tab Switcher (Stitch UI v2 SCR-AUTH-01) */}
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Đăng ký tài khoản
            </button>
          </div>

          {/* Google 1-Click CTA (Placed immediately below tabs per v2 spec) */}
          <button
            onClick={() => handleQuickLogin(0)}
            type="button"
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-xl shadow-xs bg-white text-xs font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Tiếp tục với Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 font-semibold">hoặc email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase">
                  Mật khẩu
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-[#00A76F] font-semibold hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm shadow-[#00A76F]/20 transition-all mt-2"
            >
              {activeTab === 'login' ? 'Đăng nhập vào Hệ thống' : 'Đăng ký tài khoản mới'}
            </button>
          </form>

          {/* Quick Demo Accounts Helper (Very convenient for reviewing the 3 roles!) */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center mb-3">
              Tài khoản Demo Trực tiếp (1 chạm)
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                onClick={() => handleQuickLogin(0)}
                className="p-2 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 transition-all text-[#00A76F] font-semibold"
              >
                <UserCheck className="w-4 h-4 mx-auto mb-1 text-[#00A76F]" />
                <span>Reviewer</span>
                <span className="block text-[10px] text-gray-400 font-normal">An</span>
              </button>

              <button
                onClick={() => handleQuickLogin(1)}
                className="p-2 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 transition-all text-blue-700 font-semibold"
              >
                <UserCheck className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                <span>Editor</span>
                <span className="block text-[10px] text-gray-400 font-normal">Bình</span>
              </button>

              <button
                onClick={() => handleQuickLogin(2)}
                className="p-2 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/60 transition-all text-purple-700 font-semibold"
              >
                <Shield className="w-4 h-4 mx-auto mb-1 text-purple-600" />
                <span>SysAdmin</span>
                <span className="block text-[10px] text-gray-400 font-normal">Vũ</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
