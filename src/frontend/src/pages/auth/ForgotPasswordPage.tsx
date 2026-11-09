import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row font-sans selection:bg-[#00A76F] selection:text-white">
      {/* LEFT PANEL: 40% Width on Desktop (SCR-AUTH-02) */}
      <section className="lg:w-[40%] w-full bg-[#00A76F] relative flex flex-col justify-between p-8 sm:p-12 lg:p-14 text-white overflow-hidden min-h-[420px] lg:min-h-screen select-none">
        {/* Ambient Overlays */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-black/10 blur-2xl pointer-events-none" />

        {/* Top Header & Brand Identity */}
        <header className="relative z-10 flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-sm">
              <span
                className="material-symbols-outlined text-white text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                eco
              </span>
            </div>
            <span className="text-2xl tracking-tight font-extrabold text-white">CarbonLedger</span>
          </div>
          <p className="text-white/80 text-sm pl-[52px]">Theo dõi và quản lý dấu chân carbon</p>
        </header>

        {/* Center: Telemetry Orbit */}
        <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border border-white/20 border-dashed animate-[spin_60s_linear_infinite]" />
            {/* Mid Ring */}
            <div className="absolute inset-6 rounded-full border border-white/30" />
            {/* Badge 1 */}
            <div className="absolute -top-3 bg-white/95 backdrop-blur-md text-[#006c46] text-xs font-semibold px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white">
              <span className="material-symbols-outlined text-sm">hub</span>
              <span>Phạm vi 1 & 2</span>
            </div>
            {/* Badge 2 */}
            <div className="absolute bottom-6 -left-4 bg-white/95 backdrop-blur-md text-[#006c46] text-xs font-semibold px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-white">
              <span
                className="material-symbols-outlined text-sm text-[#00A76F]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                energy_savings_leaf
              </span>
              <span>Mục tiêu Net-Zero</span>
            </div>
            {/* Central Core */}
            <div className="w-36 h-36 rounded-full bg-white/10 backdrop-blur-lg border border-white/30 flex flex-col items-center justify-center p-4 text-center shadow-inner relative">
              <div className="text-[11px] uppercase font-semibold tracking-wider text-white/80">
                Xu hướng phát thải
              </div>
              <div className="text-3xl text-white font-extrabold my-0.5 tracking-tight">-18.4%</div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-100 bg-white/20 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-xs">trending_down</span>
                <span>Theo năm</span>
              </div>
            </div>
          </div>
          <p className="mt-8 text-center text-white/80 text-xs max-w-xs leading-relaxed">
            Hệ thống đo lường và theo dõi phát thải chuẩn hóa cho gia đình và văn phòng
          </p>
        </div>

        {/* Bottom Meta */}
        <footer className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-white/70 text-xs">
          <span>Minh bạch phát thải carbon</span>
          <span className="font-medium text-white/90 px-2 py-0.5 bg-white/10 rounded">v2.4</span>
        </footer>
      </section>

      {/* RIGHT PANEL: 60% Width, White Canvas (SCR-AUTH-02) */}
      <section className="lg:w-[60%] w-full bg-white min-h-screen flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md mx-auto flex flex-col">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-semibold transition-colors duration-150 group"
              to="/auth/login"
            >
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
              <span>Quay lại</span>
            </Link>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quên mật khẩu</h1>
            <p className="text-sm text-gray-500 mt-2">
              Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu.
            </p>
          </div>

          {/* Reset Request Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input Group */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800" htmlFor="email">
                Địa chỉ email
              </label>
              <div className="relative rounded-lg shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <input
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 text-sm focus:border-[#00A76F] focus:ring-2 focus:ring-[#00A76F]/20 transition-all outline-none"
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

            {/* Dynamic Status Confirmation Notification */}
            {submitted && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-800 text-xs animate-in fade-in">
                <span
                  className="material-symbols-outlined text-[#00A76F] text-lg shrink-0 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <div>
                  <p className="font-bold text-emerald-900 text-sm">Đã gửi liên kết hướng dẫn</p>
                  <p className="text-emerald-700 mt-0.5">
                    Vui lòng kiểm tra hộp thư đến của bạn ({email}) để xem hướng dẫn và liên kết đặt
                    lại mật khẩu an toàn.
                  </p>
                </div>
              </div>
            )}

            {/* Primary Submit Button */}
            <button
              className="w-full mt-6 py-3 px-4 rounded-xl bg-[#00A76F] hover:bg-[#00925f] text-white text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00A76F]/30"
              type="submit"
            >
              <span>Gửi liên kết đặt lại mật khẩu</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>

            {/* Back to Login Navigation Footer */}
            <div className="pt-4 text-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium"
                to="/auth/login"
              >
                <span>Quay lại Đăng nhập</span>
              </Link>
            </div>
          </form>

          {/* Compliance & Security Microcopy */}
          <div className="mt-14 pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Mã hóa bảo mật 256-bit</span>
            </div>
            <span>Tuân thủ chuẩn GHG Protocol</span>
          </div>
        </div>
      </section>
    </main>
  );
};
