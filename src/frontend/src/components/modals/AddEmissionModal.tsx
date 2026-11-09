import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLedger } from '../../context/LedgerContext';
import { EmissionCategory } from '../../types';
import { X, Upload, Sparkles, FileSpreadsheet, Check, Camera } from 'lucide-react';

interface AddEmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAIPreview?: () => void;
  onOpenExcelPreview?: () => void;
}

export const AddEmissionModal: React.FC<AddEmissionModalProps> = ({
  isOpen,
  onClose,
  onOpenAIPreview,
  onOpenExcelPreview,
}) => {
  const { workspaceRole } = useAuth();
  const { factors, addEmissionLog } = useLedger();

  const [activeTab, setActiveTab] = useState<'manual' | 'ai' | 'excel'>('manual');

  // Manual Form State
  const [selectedFactorId, setSelectedFactorId] = useState(factors[0]?.id || '');
  const [activityName, setActivityName] = useState('');
  const [quantity, setQuantity] = useState<number>(10);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const selectedFactor = factors.find((f) => f.id === selectedFactorId) || factors[0];
  const calculatedCo2e = Number(((quantity || 0) * (selectedFactor?.factor || 0)).toFixed(2));
  const isReviewer = workspaceRole === 'REVIEWER';

  const handleSubmitManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityName.trim()) return;

    addEmissionLog({
      category: selectedFactor.category,
      activityName,
      quantity,
      unit: selectedFactor.unit,
      factorApplied: selectedFactor.factor,
      date,
      source: 'MANUAL',
      notes,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Khai báo Phát thải Mới</h3>
            <p className="text-xs text-gray-500">
              Ghi nhận hoạt động tiêu thụ năng lượng và quy đổi dấu chân carbon
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tabs Ingestion (Stitch UI v2 Style) */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-6 pt-2">
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 transition-all ${
              activeTab === 'manual'
                ? 'border-[#00A76F] text-[#00A76F] bg-white rounded-t-lg'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>Thủ công [Chính]</span>
          </button>

          <button
            onClick={() => setActiveTab('excel')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 transition-all ${
              activeTab === 'excel'
                ? 'border-[#00A76F] text-[#00A76F] bg-white rounded-t-lg'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Nạp Excel [Chính]</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 py-3 px-4 font-semibold text-sm border-b-2 transition-all ${
              activeTab === 'ai'
                ? 'border-[#00A76F] text-[#00A76F] bg-white rounded-t-lg'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Quét AI Vision [Phụ]</span>
          </button>
        </div>

        {/* Content Tabs */}
        <div className="p-6">
          {activeTab === 'manual' && (
            <form onSubmit={handleSubmitManual} className="space-y-4">
              {/* Category / Factor */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Loại hoạt động & Hệ số quy chuẩn
                </label>
                <select
                  value={selectedFactorId}
                  onChange={(e) => setSelectedFactorId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none transition-all"
                >
                  {factors.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.factor} kg CO2e/{f.unit})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-gray-400 mt-1">
                  Nguồn quy chuẩn: {selectedFactor?.source}
                </div>
              </div>

              {/* Activity Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Tên hoạt động / Mô tả
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đổ xăng xe máy đi làm, Hóa đơn điện..."
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none transition-all"
                />
              </div>

              {/* Quantity & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Sản lượng tiêu thụ ({selectedFactor?.unit})
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Ngày phát sinh
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Ghi chú (Tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Ghi chú thêm về chuyến đi hoặc thiết bị..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none transition-all"
                />
              </div>

              {/* Live Calculation Box (Ultraminimal v2: single ≈ symbol, no duplicate = ≈) */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#00A76F] uppercase tracking-wide">
                    Tác động Carbon ước tính
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {quantity} {selectedFactor?.unit} × {selectedFactor?.factor} kg CO2e
                  </div>
                </div>
                <div className="text-xl font-bold text-[#00A76F]">
                  ≈ {calculatedCo2e.toLocaleString('vi-VN')} kg CO2e
                </div>
              </div>

              {/* Status Note */}
              <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
                {isReviewer ? (
                  <span className="text-emerald-700 font-medium">
                    ✓ Bạn đang là Trưởng nhóm: Bản ghi sẽ được tự động ghi sổ cái Approved ngay lập tức.
                  </span>
                ) : (
                  <span className="text-amber-700 font-medium">
                    ⓘ Bạn đang là Thành viên: Bản ghi sẽ tạo ở trạng thái Chờ duyệt (Pending Review) để Trưởng nhóm kiểm tra.
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all"
                >
                  {isReviewer ? 'Ghi sổ cái ngay' : 'Gửi yêu cầu duyệt'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'excel' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-800 leading-relaxed">
                <div className="font-bold mb-1 flex items-center gap-1.5 text-blue-900">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  Quy trình Nạp hàng loạt bằng Excel:
                </div>
                Tải file mẫu Excel chuẩn do hệ thống cung cấp, điền thông tin các hoạt động và tải lên để hệ thống tự động bóc tách và đối chiếu.
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[#00A76F] transition-colors cursor-pointer bg-gray-50/50">
                <FileSpreadsheet className="w-12 h-12 text-[#00A76F] mx-auto mb-3" />
                <h4 className="text-sm font-bold text-gray-900">Kéo thả file Excel tại đây</h4>
                <p className="text-xs text-gray-500 mt-1 mb-4">
                  Hỗ trợ định dạng .xlsx hoặc .csv dung lượng tối đa 10MB
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenExcelPreview?.();
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] rounded-xl shadow-sm hover:bg-[#00925f] transition-all"
                >
                  Chọn file mẫu Demo & Mở Preview
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2">
                <a
                  href="#download-template"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Đang tải file mẫu emission_import_template.xlsx...');
                  }}
                  className="text-[#00A76F] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>⬇ Tải file mẫu chuẩn Excel (.xlsx)</span>
                </a>
                <span className="text-gray-400">Tốc độ phân tích &le; 5s cho 100 dòng</span>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-900 leading-relaxed">
                <div className="font-bold mb-1 flex items-center gap-1.5 text-purple-950">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  Luồng AI Vision (Ưu tiên sau cùng):
                </div>
                Chụp hoặc tải ảnh hóa đơn điện, nước, hóa đơn cây xăng hoặc chỉ số công tơ. Mô hình Multimodal AI sẽ tự động nhận dạng số liệu để bạn kiểm chứng.
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-purple-500 transition-colors cursor-pointer bg-gray-50/50">
                <Camera className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-gray-900">Chụp ảnh hoặc tải hóa đơn</h4>
                <p className="text-xs text-gray-500 mt-1 mb-4">
                  Hỗ trợ định dạng JPG, PNG dung lượng &le; 5MB
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAIPreview?.();
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-purple-600 rounded-xl shadow-sm hover:bg-purple-700 transition-all flex items-center gap-1.5 mx-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Quét thử Hóa đơn EVN Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
