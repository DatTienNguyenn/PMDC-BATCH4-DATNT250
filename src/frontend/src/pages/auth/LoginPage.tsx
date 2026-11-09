import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../mock/mockData';
import { User } from '../../types';
import { Shield, UserCheck, ArrowRight, Lock, Mail, CheckCircle2, Building2, User as UserIcon } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('admin.workspace@carbonledger.vn');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const matchedUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!matchedUser) {
      setErrorMessage(
        'Email không khớp với các tài khoản mock. Vui lòng chọn 1 trong 3 tài khoản mẫu bên dưới.'
      );
      return;
    }

    login(matchedUser);
    navigate(matchedUser.defaultPath);
  };

  const handleDirectLogin = (user: User) => {
    login(user);
    navigate(user.defaultPath);
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Brand */}
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#00A76F] flex items-center justify-center text-white shadow-sm shadow-[#00A76F]/25">
            <span className="material-symbols-outlined text-[24px]">eco</span>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            CarbonLedger
          </span>
        </div>
        <p className="text-center text-xs text-gray-500 max-w-md mx-auto mb-6">
          Hệ thống Quản trị & Phân tích Dấu chân Carbon cho Gia đình & Văn phòng nhỏ
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl space-y-6">
        {/* SECTION 1: MOCK ACCOUNT CARDS CHO 3 ROLES (ƯU TIÊN LỰA CHỌN TRỰC TIẾP) */}
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Chọn Tài khoản Đăng nhập theo Vai trò (Mock Accounts)
              </h2>
              <p className="text-xs text-gray-500">
                Mỗi vai trò có phân quyền RBAC và giao diện màn hình độc lập hoàn toàn
              </p>
            </div>
            <span className="text-[11px] font-semibold text-[#00A76F] bg-emerald-50 px-2.5 py-1 rounded-full">
              3 Roles Chuẩn
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_USERS.map((user) => {
              const isWsAdmin = user.workspaceRole === 'REVIEWER';
              const isEditor = user.workspaceRole === 'EDITOR';
              const isSysAdmin = user.globalRole === 'SYSTEM_ADMIN';

              return (
                <div
                  key={user.id}
                  className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between hover:shadow-md ${
                    isWsAdmin
                      ? 'border-emerald-200 bg-emerald-50/30'
                      : isEditor
                      ? 'border-blue-200 bg-blue-50/30'
                      : 'border-purple-200 bg-purple-50/30'
                  }`}
                >
                  <div>
                    {/* Header: Avatar & Role */}
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-11 h-11 rounded-full object-cover border border-white shadow-xs"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-gray-900 truncate">
                          {user.name}
                        </div>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold mt-0.5 ${
                            isWsAdmin
                              ? 'bg-emerald-100 text-[#00A76F]'
                              : isEditor
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {user.roleBadge}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-gray-600 mb-2 truncate">
                      {user.email}
                    </div>

                    <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-3">
                      {user.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDirectLogin(user)}
                    className={`w-full py-2 px-3 text-xs font-bold rounded-xl text-white transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                      isWsAdmin
                        ? 'bg-[#00A76F] hover:bg-[#00925f]'
                        : isEditor
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                  >
                    <span>Vào với vai trò này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: FORM ĐĂNG NHẬP TRUYỀN THỐNG BẰNG EMAIL/MẬT KHẨU */}
        <div className="bg-white py-6 px-6 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100">
          <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Đăng nhập bằng Email
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Đăng ký tài khoản mới
            </button>
          </div>

          {errorMessage && (
            <div className="p-3 mb-4 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleCustomLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Địa chỉ Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin.workspace@carbonledger.vn"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Mật khẩu (mặc định: password123)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all"
            >
              {activeTab === 'login' ? 'Đăng nhập vào Hệ thống' : 'Tạo tài khoản mới'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
