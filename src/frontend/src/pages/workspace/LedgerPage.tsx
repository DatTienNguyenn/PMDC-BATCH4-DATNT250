import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { useAuth } from '../../context/AuthContext';
import { EmissionLog, EmissionStatus, EmissionCategory } from '../../types';
import { AddEmissionModal } from '../../components/modals/AddEmissionModal';
import { AIVisionPreviewModal } from '../../components/modals/AIVisionPreviewModal';
import { ExcelPreviewModal } from '../../components/modals/ExcelPreviewModal';
import { LedgerDetailModal } from '../../components/modals/LedgerDetailModal';
import {
  Plus,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Camera,
  Layers,
} from 'lucide-react';

export const LedgerPage: React.FC = () => {
  const { logs } = useLedger();
  const { workspaceRole } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAIPreviewOpen, setIsAIPreviewOpen] = useState(false);
  const [isExcelPreviewOpen, setIsExcelPreviewOpen] = useState(false);
  const [selectedLogForDetail, setSelectedLogForDetail] = useState<EmissionLog | null>(null);

  // Filter logic
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.notes?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === 'ALL' || log.status === selectedStatus;

    const matchesCategory =
      selectedCategory === 'ALL' || log.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalFilteredCo2e = filteredLogs
    .filter((l) => l.status === 'APPROVED')
    .reduce((sum, l) => sum + l.co2e, 0);

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = ['Mã', 'Ngày', 'Người nạp', 'Danh mục', 'Hoạt động', 'Sản lượng', 'Đơn vị', 'Hệ số', 'kg CO2e', 'Trạng thái', 'Nguồn'];
    const rows = filteredLogs.map((l) => [
      l.id,
      l.date,
      l.userName,
      l.category,
      `"${l.activityName}"`,
      l.quantity,
      l.unit,
      l.factorApplied,
      l.co2e,
      l.status,
      l.source,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `carbon_ledger_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Modals */}
      <AddEmissionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onOpenAIPreview={() => setIsAIPreviewOpen(true)}
        onOpenExcelPreview={() => setIsExcelPreviewOpen(true)}
      />

      <AIVisionPreviewModal
        isOpen={isAIPreviewOpen}
        onClose={() => setIsAIPreviewOpen(false)}
      />

      <ExcelPreviewModal
        isOpen={isExcelPreviewOpen}
        onClose={() => setIsExcelPreviewOpen(false)}
      />

      <LedgerDetailModal
        isOpen={!!selectedLogForDetail}
        onClose={() => setSelectedLogForDetail(null)}
        log={selectedLogForDetail}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Sổ cái Phát thải (SCR-LEDGER-01)
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Nhật ký bất biến ghi nhận mọi giao dịch và sản lượng tiêu thụ năng lượng
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            title="Xuất bảng kê phát thải ra file Excel / CSV"
          >
            <Download className="w-3.5 h-3.5 text-gray-500" />
            <span>Xuất Excel</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm shadow-[#00A76F]/20 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Nạp phát thải</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo hoạt động, người ghi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:outline-none"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none"
          >
            <option value="ALL">Tất cả trạng thái</option>
            <option value="APPROVED">Đã duyệt (Ghi sổ)</option>
            <option value="DRAFT">Chờ duyệt (Draft)</option>
            <option value="REJECTED">Bị từ chối</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none"
          >
            <option value="ALL">Tất cả danh mục</option>
            <option value="ELECTRICITY">Điện năng</option>
            <option value="TRANSPORT">Di chuyển</option>
            <option value="GAS">Khí gas</option>
            <option value="WATER">Nước sạch</option>
            <option value="WASTE">Rác sinh hoạt</option>
            <option value="FUGITIVE">Rò rỉ môi chất</option>
          </select>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/90 text-gray-500 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Ngày</th>
                <th className="py-3 px-4">Người ghi</th>
                <th className="py-3 px-4">Hoạt động & Danh mục</th>
                <th className="py-3 px-4">Sản lượng</th>
                <th className="py-3 px-4">Hệ số</th>
                <th className="py-3 px-4 text-right">Phát thải (kg CO2e)</th>
                <th className="py-3 px-4 text-center">Nguồn</th>
                <th className="py-3 px-4 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    <span className="material-symbols-outlined text-4xl mb-1 text-gray-300">
                      receipt_long
                    </span>
                    <p className="text-sm">Không tìm thấy bản ghi phát thải nào phù hợp</p>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const isApproved = log.status === 'APPROVED';
                  const isDraft = log.status === 'DRAFT';
                  const isRejected = log.status === 'REJECTED';

                  return (
                    <tr
                      key={log.id}
                      onClick={() => setSelectedLogForDetail(log)}
                      className="hover:bg-emerald-50/30 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-gray-600 whitespace-nowrap">
                        {log.date}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              log.userAvatar ||
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                            }
                            alt=""
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-gray-800">{log.userName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">{log.activityName}</div>
                        <div className="text-[10px] text-gray-400 font-mono uppercase">
                          {log.category}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-700 whitespace-nowrap">
                        {log.quantity} {log.unit}
                      </td>
                      <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                        {log.factorApplied}
                      </td>
                      <td className="py-3 px-4 text-right font-extrabold text-[#00A76F] whitespace-nowrap text-sm">
                        {log.co2e.toFixed(2)} kg
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-gray-100 text-gray-600">
                          {log.source === 'MANUAL'
                            ? 'Tay'
                            : log.source === 'EXCEL'
                            ? 'Excel'
                            : 'AI'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        {isApproved && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-[#00A76F]">
                            <CheckCircle2 className="w-3 h-3" />
                            Đã duyệt
                          </span>
                        )}
                        {isDraft && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                            <Clock className="w-3 h-3" />
                            Chờ duyệt
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-700">
                            <AlertCircle className="w-3 h-3" />
                            Từ chối
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Statistics */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <div>
            Hiển thị <span className="font-bold text-gray-800">{filteredLogs.length}</span> bản ghi
          </div>
          <div>
            Tổng phát thải đã ghi sổ đợt lọc này:{' '}
            <span className="font-extrabold text-base text-[#00A76F]">
              ≈ {totalFilteredCo2e.toFixed(2)} kg CO2e
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
