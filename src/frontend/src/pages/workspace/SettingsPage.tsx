import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { InviteModal } from '../../components/modals/InviteModal';
import {
  Sliders,
  Users,
  Target,
  KeyRound,
  Check,
  X,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Building2,
  Trash2,
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { workspaceRole } = useAuth();
  const {
    activeWorkspace,
    members,
    joinRequests,
    updateBaseline,
    updateBudget,
    approveJoinRequest,
    rejectJoinRequest,
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState<'baseline' | 'budget' | 'members'>('baseline');

  // Baseline tab state
  const [floorArea, setFloorArea] = useState(activeWorkspace.floorArea);
  const [memberCount, setMemberCount] = useState(activeWorkspace.memberCount);
  const [baselineSaved, setBaselineSaved] = useState(false);

  // Budget tab state
  const [monthlyTarget, setMonthlyTarget] = useState(activeWorkspace.monthlyTarget);
  const [budgetSaved, setBudgetSaved] = useState(false);

  // Invite Modal state
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // RBAC Guard
  if (workspaceRole !== 'REVIEWER') {
    return <Navigate to="/403" replace />;
  }

  const handleSaveBaseline = (e: React.FormEvent) => {
    e.preventDefault();
    updateBaseline(floorArea, memberCount);
    setBaselineSaved(true);
    setTimeout(() => setBaselineSaved(false), 2500);
  };

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    updateBudget(monthlyTarget);
    setBudgetSaved(true);
    setTimeout(() => setBudgetSaved(false), 2500);
  };

  // National reference benchmarks
  const benchmarkPerPerson =
    activeWorkspace.type === 'HOUSEHOLD' ? 155.25 : 305.83;
  const suggestedTarget = Math.round(memberCount * benchmarkPerPerson);

  const pendingJoinRequests = joinRequests.filter((r) => r.status === 'PENDING');

  return (
    <div className="space-y-6 font-sans">
      <InviteModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Cài đặt Không gian làm việc (SCR-SETTING-01)
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Quản lý thông số nền tảng, hạn ngạch ngân sách và thành viên gia đình / văn phòng
        </p>
      </div>

      {/* 3 Tabs Header (Stitch UI v2 Minimal Style) */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-2xl px-6 pt-3 shadow-xs">
        <button
          onClick={() => setActiveTab('baseline')}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-all ${
            activeTab === 'baseline'
              ? 'border-[#00A76F] text-[#00A76F]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Thông số Nền tảng (m², Người)</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-all ${
            activeTab === 'budget'
              ? 'border-[#00A76F] text-[#00A76F]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Ngân sách & Ngưỡng 85%</span>
        </button>

        <button
          onClick={() => setActiveTab('members')}
          className={`flex items-center gap-2 py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 transition-all ${
            activeTab === 'members'
              ? 'border-[#00A76F] text-[#00A76F]'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Quản lý Thành viên</span>
          {pendingJoinRequests.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
              {pendingJoinRequests.length}
            </span>
          )}
        </button>
      </div>

      {/* Tab 1: Baseline Setup */}
      {activeTab === 'baseline' && (
        <div className="bg-white rounded-b-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
          <form onSubmit={handleSaveBaseline} className="max-w-xl space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Diện tích mặt sàn sinh hoạt / làm việc (m²)
              </label>
              <input
                type="number"
                min="10"
                required
                value={floorArea}
                onChange={(e) => setFloorArea(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              />
              <div className="text-[11px] text-gray-400 mt-1">
                Dùng để tính chỉ số phát thải chuẩn hóa: kg CO2e / m²
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Số nhân khẩu / thành viên thường trú
              </label>
              <input
                type="number"
                min="1"
                required
                value={memberCount}
                onChange={(e) => setMemberCount(parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              />
              <div className="text-[11px] text-gray-400 mt-1">
                Dùng để tính chỉ số phát thải bình quân: kg CO2e / người
              </div>
            </div>

            {/* Calculated KPI Preview Card */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2 text-xs">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#00A76F]" />
                Mức phát thải Tham chiếu Quốc gia tương ứng:
              </div>
              <div className="text-gray-700">
                • {activeWorkspace.type === 'HOUSEHOLD' ? 'Hộ gia đình (50.8% cơ cấu):' : 'Văn phòng (100% cơ cấu):'}{' '}
                <strong className="text-[#00A76F]">{benchmarkPerPerson} kg CO2e/người/tháng</strong>
              </div>
              <div className="text-gray-700">
                • Tổng trần tham chiếu cho {memberCount} thành viên:{' '}
                <strong className="text-gray-900">{suggestedTarget} kg CO2e/tháng</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Lưu thông số nền</span>
              </button>
              {baselineSaved && (
                <span className="text-xs font-semibold text-[#00A76F] animate-in fade-in">
                  ✓ Đã lưu thành công!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Monthly Budget & 85% Warning */}
      {activeTab === 'budget' && (
        <div className="bg-white rounded-b-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-6">
          <form onSubmit={handleSaveBudget} className="max-w-xl space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700 uppercase">
                  Hạn ngạch Ngân sách Phát thải Tháng (kg CO2e)
                </label>
                <button
                  type="button"
                  onClick={() => setMonthlyTarget(suggestedTarget)}
                  className="text-[11px] text-[#00A76F] font-semibold hover:underline"
                >
                  Gợi ý chuẩn: {suggestedTarget} kg
                </button>
              </div>
              <input
                type="number"
                min="1"
                required
                value={monthlyTarget}
                onChange={(e) => setMonthlyTarget(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none font-bold text-gray-900"
              />
            </div>

            {/* Threshold rules illustration */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
              <div className="font-bold text-gray-900">
                Cơ chế Động cơ Cảnh báo Ngưỡng Tự động:
              </div>
              <div className="space-y-1.5 text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A76F]" />
                  <span>
                    Dưới 85% (&lt; {(monthlyTarget * 0.85).toFixed(1)} kg): Trạng thái An toàn Xanh
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>
                    Từ 85% đến 99% (≥ {(monthlyTarget * 0.85).toFixed(1)} kg): Bắn Notification cảnh báo sớm đến{' '}
                    <strong>toàn thể thành viên</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span>
                    Từ 100% trở lên (≥ {monthlyTarget} kg): Báo động VƯỢT TRẦN ngân sách
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Cập nhật Ngân sách</span>
              </button>
              {budgetSaved && (
                <span className="text-xs font-semibold text-[#00A76F] animate-in fade-in">
                  ✓ Đã lưu ngân sách mới!
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Member Management & Pending Join Requests */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-b-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-8">
          {/* Header with Invite Code CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <div>
              <h3 className="text-base font-bold text-gray-900">Mã Mời Gia Nhập</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                Mã hiện tại:{' '}
                <span className="font-mono font-extrabold text-base text-[#00A76F]">
                  {activeWorkspace.inviteCode}
                </span>
              </p>
            </div>
            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <KeyRound className="w-4 h-4" />
              <span>Xem & Chia sẻ Mã mời</span>
            </button>
          </div>

          {/* Pending Join Requests Queue */}
          {pendingJoinRequests.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span>Yêu cầu gia nhập đang chờ duyệt</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  {pendingJoinRequests.length} đơn
                </span>
              </h4>

              <div className="space-y-2">
                {pendingJoinRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="font-bold text-gray-900 text-sm">{req.userName}</div>
                      <div className="text-xs text-gray-500 font-mono">{req.userEmail}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">
                        Ngày xin gia nhập: {new Date(req.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          rejectJoinRequest(req.id, 'Trưởng nhóm từ chối yêu cầu.')
                        }
                        className="px-3 py-1.5 text-xs font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Từ chối
                      </button>
                      <button
                        onClick={() => approveJoinRequest(req.id)}
                        className="px-3 py-1.5 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-lg shadow-xs transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Chấp thuận
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Members Table */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">
              Danh sách Thành viên Chính thức ({members.length} người)
            </h4>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 text-gray-600 uppercase font-semibold border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Thành viên</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Vai trò</th>
                    <th className="py-2.5 px-3 text-right">Phát thải tháng</th>
                    <th className="py-2.5 px-3 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {members.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50/80">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              m.avatarUrl ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                            }
                            alt=""
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <span className="font-bold text-gray-900">{m.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-gray-500 font-mono">{m.email}</td>
                      <td className="py-2.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            m.role === 'REVIEWER'
                              ? 'bg-emerald-100 text-[#00A76F]'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {m.role === 'REVIEWER' ? 'Trưởng nhóm' : 'Thành viên'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-gray-900">
                        {m.monthlyEmissions} kg CO2e
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {m.role !== 'REVIEWER' ? (
                          <button
                            onClick={() => alert(`Quản lý thành viên ${m.name}`)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            title="Xóa thành viên khỏi Workspace"
                          >
                            <Trash2 className="w-3.5 h-3.5 mx-auto" />
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-400">Chủ sở hữu</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
