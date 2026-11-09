import React, { useState } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Building2, Home, Lock, Unlock, Eye, Plus } from 'lucide-react';
import { CreateWorkspaceModal } from '../../components/modals/CreateWorkspaceModal';

export const AdminTenantsPage: React.FC = () => {
  const { workspaces } = useWorkspace();
  const [tenantList, setTenantList] = useState(workspaces);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const toggleStatus = (id: string) => {
    setTenantList((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status: w.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE' }
          : w
      )
    );
  };

  return (
    <div className="space-y-6 font-sans">
      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Quản lý Workspace Tenants (SCR-ADM-TENANT-01)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Quản lý các không gian làm việc đa người thuê (Multi-tenant) trên toàn hệ thống
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Khởi tạo Tenant mới</span>
        </button>
      </div>

      {/* Tenants Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Tên Workspace</th>
                <th className="py-3 px-4">Loại hình</th>
                <th className="py-3 px-4">Mã Mời</th>
                <th className="py-3 px-4">Thành viên</th>
                <th className="py-3 px-4">Diện tích</th>
                <th className="py-3 px-4 text-right">Phát thải tháng</th>
                <th className="py-3 px-4 text-center">Trạng thái</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {tenantList.map((w) => {
                const isActive = w.status === 'ACTIVE';

                return (
                  <tr key={w.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        {w.type === 'HOUSEHOLD' ? (
                          <Home className="w-4 h-4 text-[#00A76F]" />
                        ) : (
                          <Building2 className="w-4 h-4 text-[#00A76F]" />
                        )}
                        <span>{w.name}</span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {w.id}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {w.type === 'HOUSEHOLD' ? 'Hộ gia đình' : 'Văn phòng nhỏ'}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-gray-800">
                      {w.inviteCode}
                    </td>
                    <td className="py-3 px-4 text-gray-700">{w.memberCount} người</td>
                    <td className="py-3 px-4 text-gray-700">{w.floorArea} m²</td>
                    <td className="py-3 px-4 text-right font-extrabold text-[#00A76F]">
                      {w.currentEmissions} / {w.monthlyTarget} kg
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-emerald-100 text-[#00A76F]'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {isActive ? 'Hoạt động' : 'Tạm khóa'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleStatus(w.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isActive
                            ? 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                            : 'text-gray-400 hover:text-[#00A76F] hover:bg-emerald-50'
                        }`}
                        title={isActive ? 'Khóa Workspace này' : 'Mở khóa Workspace'}
                      >
                        {isActive ? (
                          <Lock className="w-4 h-4" />
                        ) : (
                          <Unlock className="w-4 h-4 text-[#00A76F]" />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
