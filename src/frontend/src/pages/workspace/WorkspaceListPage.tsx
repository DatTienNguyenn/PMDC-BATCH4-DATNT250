import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useAuth } from '../../context/AuthContext';
import { CreateWorkspaceModal } from '../../components/modals/CreateWorkspaceModal';
import { Building2, Home, Plus, KeyRound, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

export const WorkspaceListPage: React.FC = () => {
  const { workspaces, activeWorkspace, setActiveWorkspaceId } = useWorkspace();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSelectWorkspace = (id: string) => {
    setActiveWorkspaceId(id);
    navigate(`/workspace/${id}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9ff] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg bg-[#00A76F] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px]">eco</span>
              </div>
              <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Không gian làm việc của bạn (SCR-WS-01)
              </h1>
            </div>
            <p className="text-xs text-gray-500">
              Chọn không gian để theo dõi dấu chân carbon hoặc khởi tạo tổ chức mới
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/workspaces/join"
              className="px-4 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#00A76F]" />
              <span>Gia nhập bằng mã</span>
            </Link>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm shadow-[#00A76F]/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Tạo Không gian mới</span>
            </button>
          </div>
        </div>

        {/* Workspaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workspaces.map((ws) => {
            const isSelected = ws.id === activeWorkspace.id;
            const isHousehold = ws.type === 'HOUSEHOLD';
            const progress = Math.min(
              100,
              Math.round((ws.currentEmissions / ws.monthlyTarget) * 100)
            );
            const isWarning = progress >= 85;

            return (
              <div
                key={ws.id}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#00A76F] shadow-lg ring-1 ring-[#00A76F]/30'
                    : 'border-gray-200 shadow-xs hover:border-gray-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-[#00A76F] text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Đang chọn
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#00A76F]">
                      {isHousehold ? (
                        <Home className="w-6 h-6 text-[#00A76F]" />
                      ) : (
                        <Building2 className="w-6 h-6 text-[#00A76F]" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{ws.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                        <span>{isHousehold ? 'Hộ gia đình' : 'Văn phòng nhỏ'}</span>
                        <span>•</span>
                        <span>{ws.memberCount} thành viên</span>
                        <span>•</span>
                        <span>{ws.floorArea} m²</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar & KPI */}
                  <div className="space-y-1.5 mb-6 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 font-medium">Phát thải tháng này:</span>
                      <span className="font-bold text-gray-900">
                        {ws.currentEmissions} / {ws.monthlyTarget} kg CO2e
                      </span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isWarning ? 'bg-amber-500' : 'bg-[#00A76F]'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[11px] pt-1">
                      <span
                        className={`font-semibold ${
                          isWarning ? 'text-amber-700' : 'text-[#00A76F]'
                        }`}
                      >
                        {progress}% hạn ngạch {isWarning && '(Cảnh báo > 85%)'}
                      </span>
                      <span className="font-mono text-gray-400">Mã: {ws.inviteCode}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="text-xs text-gray-400">
                    Chủ sở hữu: <span className="font-semibold text-gray-700">Nguyễn Văn An</span>
                  </div>

                  <button
                    onClick={() => handleSelectWorkspace(ws.id)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Vào Không gian</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
