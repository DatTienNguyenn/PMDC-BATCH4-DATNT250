import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useLedger } from '../../context/LedgerContext';
import { UserCheck, Bell, Shield, Leaf, Check } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, workspaceRole } = useAuth();
  const { activeWorkspace } = useWorkspace();
  const { logs } = useLedger();

  const [notif85, setNotif85] = useState(true);
  const [notif100, setNotif100] = useState(true);
  const [notifApproval, setNotifApproval] = useState(true);
  const [saved, setSaved] = useState(false);

  // My personal contributions
  const myLogs = logs.filter((l) => l.userId === currentUser?.id);
  const myApprovedLogs = myLogs.filter((l) => l.status === 'APPROVED');
  const myTotalCo2e = myApprovedLogs.reduce((sum, l) => sum + l.co2e, 0);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-6 font-sans">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Hồ sơ Cá nhân & Cài đặt (SCR-PROFILE-01)
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Quản lý thông tin tài khoản, tỷ trọng đóng góp dấu chân carbon và tùy chọn thông báo
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={currentUser?.avatarUrl}
          alt={currentUser?.name}
          className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-500/20 shadow-md"
        />

        <div className="flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">{currentUser?.name}</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#00A76F] w-fit mx-auto sm:mx-0">
              {workspaceRole === 'REVIEWER' ? 'Trưởng nhóm (Reviewer)' : 'Thành viên (Editor)'}
            </span>
          </div>

          <div className="text-xs text-gray-500 font-mono">{currentUser?.email}</div>
          <div className="text-xs text-gray-600">
            Không gian hiện tại: <strong className="text-gray-900">{activeWorkspace.name}</strong>
          </div>
        </div>
      </div>

      {/* Personal Contribution Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Đóng góp Phát thải của bạn
          </span>
          <div className="text-3xl font-extrabold text-[#00A76F]">
            {myTotalCo2e.toFixed(1)} <span className="text-xs text-gray-500 font-normal">kg CO2e</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2">
            Chiếm {Math.round((myTotalCo2e / (activeWorkspace.currentEmissions || 1)) * 100)}% tổng lượng phát thải của không gian
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Hoạt động đã ghi nhận
          </span>
          <div className="text-3xl font-extrabold text-gray-900">
            {myApprovedLogs.length} <span className="text-xs text-gray-500 font-normal">bản ghi</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2">
            {myLogs.filter((l) => l.status === 'DRAFT').length} bản ghi đang chờ duyệt
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
            Xếp hạng lối sống xanh
          </span>
          <div className="text-3xl font-extrabold text-emerald-600 flex items-center gap-1">
            <Leaf className="w-6 h-6 text-[#00A76F]" />
            <span>Hạng A</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-2">
            Đạt chuẩn tiêu thụ tiết kiệm năng lượng
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="w-5 h-5 text-[#00A76F]" />
          <h3 className="text-base font-bold text-gray-900">Cài đặt Thông báo Cảnh báo</h3>
        </div>

        <div className="space-y-3 divide-y divide-gray-100 text-xs">
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="font-bold text-gray-900">Thông báo Cảnh báo Ngưỡng 85%</div>
              <div className="text-gray-500 mt-0.5">
                Nhận thông báo ngay khi tổng phát thải không gian đạt mức 85% hạn ngạch
              </div>
            </div>
            <input
              type="checkbox"
              checked={notif85}
              onChange={(e) => setNotif85(e.target.checked)}
              className="w-4 h-4 text-[#00A76F] rounded focus:ring-[#00A76F]"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <div className="font-bold text-gray-900">Thông báo Báo động Vượt trần 100%</div>
              <div className="text-gray-500 mt-0.5">
                Nhận cảnh báo đỏ khẩn cấp khi không gian vượt quá ngân sách cam kết
              </div>
            </div>
            <input
              type="checkbox"
              checked={notif100}
              onChange={(e) => setNotif100(e.target.checked)}
              className="w-4 h-4 text-[#00A76F] rounded focus:ring-[#00A76F]"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <div className="font-bold text-gray-900">Thông báo Trạng thái Phê duyệt Sổ cái</div>
              <div className="text-gray-500 mt-0.5">
                Nhận thông báo khi yêu cầu nạp phát thải của bạn được chấp thuận hoặc từ chối
              </div>
            </div>
            <input
              type="checkbox"
              checked={notifApproval}
              onChange={(e) => setNotifApproval(e.target.checked)}
              className="w-4 h-4 text-[#00A76F] rounded focus:ring-[#00A76F]"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Lưu cài đặt thông báo</span>
          </button>
          {saved && (
            <span className="text-xs font-semibold text-[#00A76F] animate-in fade-in">
              ✓ Đã lưu cài đặt!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
