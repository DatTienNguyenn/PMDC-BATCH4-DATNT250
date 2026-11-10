import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { WorkspaceType } from '../../types';
import { X, Building2, Home, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWorkspaceModal: React.FC<CreateWorkspaceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { createWorkspace } = useWorkspace();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [type, setType] = useState<WorkspaceType>('HOUSEHOLD');
  const [floorArea, setFloorArea] = useState<number>(90);
  const [memberCount, setMemberCount] = useState<number>(4);
  const [monthlyTarget, setMonthlyTarget] = useState<number>(150);

  if (!isOpen) return null;

  // National reference benchmarks:
  // Household: 155.25 kg CO2e/person/month
  // Workplace: 305.83 kg CO2e/person/month
  const benchmarkPerPerson = type === 'HOUSEHOLD' ? 155.25 : 305.83;
  const suggestedTarget = Math.round(memberCount * benchmarkPerPerson);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const ws = createWorkspace({
      name,
      type,
      floorArea,
      memberCount,
      monthlyTarget,
    });

    onClose();
    navigate(`/workspace/${ws.id}/dashboard`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Khởi tạo Không gian Mới (SCR-WS-MODAL-01)
            </h3>
            <p className="text-xs text-gray-500">
              Thiết lập thông số nền tảng và hạn ngạch phát thải cho tổ chức
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Workspace Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Tên Không gian làm việc
            </label>
            <input
              type="text"
              required
              placeholder="Ví dụ: Gia Đình An Khang, Văn Phòng Studio 10..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
            />
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1.5">
              Loại hình Không gian
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setType('HOUSEHOLD');
                  setMonthlyTarget(Math.round(memberCount * 155.25));
                }}
                className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  type === 'HOUSEHOLD'
                    ? 'border-[#00A76F] bg-emerald-50/50 text-[#00A76F] font-bold'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5 mt-0.5 text-[#00A76F]" />
                <div>
                  <div className="text-xs font-bold text-gray-900">Hộ gia đình</div>
                  <div className="text-[11px] text-gray-500">Chuẩn 155.25 kg/người/tháng</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setType('SMALL_OFFICE');
                  setMonthlyTarget(Math.round(memberCount * 305.83));
                }}
                className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  type === 'SMALL_OFFICE'
                    ? 'border-[#00A76F] bg-emerald-50/50 text-[#00A76F] font-bold'
                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Building2 className="w-5 h-5 mt-0.5 text-[#00A76F]" />
                <div>
                  <div className="text-xs font-bold text-gray-900">Văn phòng nhỏ</div>
                  <div className="text-[11px] text-gray-500">Chuẩn 305.83 kg/người/tháng</div>
                </div>
              </button>
            </div>
          </div>

          {/* Baseline Parameters: m2 and members */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Diện tích mặt sàn (m²)
              </label>
              <input
                type="number"
                min="10"
                required
                value={floorArea}
                onChange={(e) => setFloorArea(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Số thành viên (người)
              </label>
              <input
                type="number"
                min="1"
                required
                value={memberCount}
                onChange={(e) => {
                  const m = parseInt(e.target.value) || 1;
                  setMemberCount(m);
                  setMonthlyTarget(Math.round(m * benchmarkPerPerson));
                }}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              />
            </div>
          </div>

          {/* Monthly Budget Target */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase">
                Ngân sách trần tháng (kg CO2e)
              </label>
              <button
                type="button"
                onClick={() => setMonthlyTarget(suggestedTarget)}
                className="text-[11px] text-[#00A76F] font-semibold hover:underline"
              >
                Dùng gợi ý chuẩn ({suggestedTarget} kg)
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
            <div className="text-[11px] text-gray-400 mt-1">
              Hệ thống sẽ gửi thông báo cảnh báo sớm khi lượng phát thải đạt ngưỡng 85% hạn ngạch này.
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Khởi tạo Không gian</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
