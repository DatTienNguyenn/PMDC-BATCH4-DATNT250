import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWorkspace } from '../../context/WorkspaceContext';
import { ArrowLeft, KeyRound, Building2, CheckCircle2, ShieldAlert } from 'lucide-react';

export const JoinWorkspacePage: React.FC = () => {
  const { workspaces } = useWorkspace();
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Match against mock codes (e.g. GRN888 or OFF999)
  const matchedWs = workspaces.find(
    (w) => w.inviteCode.toLowerCase() === code.trim().toLowerCase()
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length === 6) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#00A76F] flex items-center justify-center text-white">
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
            <h2 className="text-xl font-bold text-gray-900">
              Gia nhập Không gian làm việc (SCR-WS-JOIN-01)
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Nhập mã mời 6 ký tự do Trưởng nhóm (Reviewer) cung cấp
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Yêu cầu Gia nhập Đã được Gửi!
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Yêu cầu của bạn đang ở trạng thái{' '}
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  Chờ duyệt (Pending Review)
                </span>
                . Trưởng nhóm sẽ nhận được thông báo để chấp thuận yêu cầu này.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigate('/workspaces')}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#00A76F] rounded-xl hover:bg-[#00925f] transition-all"
                >
                  Quay lại Danh sách Không gian
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Mã mời 6 ký tự
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="VD: GRN888"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full pl-9 pr-3 py-2 text-base font-mono font-bold tracking-widest border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
                  />
                  <KeyRound className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <div className="text-[11px] text-gray-400 mt-1">
                  Mã mẫu trong hệ thống: <span className="font-mono text-[#00A76F] font-bold">GRN888</span> hoặc <span className="font-mono text-[#00A76F] font-bold">OFF999</span>
                </div>
              </div>

              {/* Instant Match Preview */}
              {matchedWs && (
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center gap-3 animate-in fade-in">
                  <Building2 className="w-6 h-6 text-[#00A76F] flex-shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-gray-900">{matchedWs.name}</div>
                    <div className="text-gray-500">
                      Chủ sở hữu: Nguyễn Văn An • {matchedWs.memberCount} thành viên
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={code.length !== 6}
                className="w-full py-2.5 px-4 text-sm font-bold text-white bg-[#00A76F] hover:bg-[#00925f] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl shadow-sm transition-all"
              >
                Gửi Yêu cầu Tham gia
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/workspaces"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Quay lại Không gian của bạn
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
