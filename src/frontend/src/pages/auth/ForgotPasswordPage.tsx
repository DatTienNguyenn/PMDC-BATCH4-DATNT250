import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#00A76F] flex items-center justify-center text-white shadow-sm shadow-[#00A76F]/25">
            <span className="material-symbols-outlined text-[24px]">eco</span>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            CarbonLedger
          </span>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-200/50 rounded-3xl border border-gray-100 sm:px-10">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quên & Đặt lại Mật khẩu</h2>
            <p className="text-xs text-gray-500 mt-1">
              Nhập email đã đăng ký để nhận liên kết khôi phục tài khoản
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-[#00A76F] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Kiểm tra Hộp thư của bạn</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến{' '}
                <span className="font-semibold text-gray-900">{email}</span>. Vui lòng kiểm tra cả hòm thư rác (Spam).
              </p>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00A76F] hover:underline pt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại Đăng nhập
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    placeholder="name@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all"
              >
                Gửi liên kết Khôi phục
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/auth/login"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Quay lại Đăng nhập
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
