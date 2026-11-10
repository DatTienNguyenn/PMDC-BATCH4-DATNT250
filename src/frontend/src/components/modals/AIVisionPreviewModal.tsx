import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { useAuth } from '../../context/AuthContext';
import { X, Check, Sparkles, FileText } from 'lucide-react';

interface AIVisionPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIVisionPreviewModal: React.FC<AIVisionPreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addEmissionLog } = useLedger();
  const { workspaceRole } = useAuth();

  const [activityType, setActivityType] = useState('Điện sinh hoạt EVN');
  const [quantity, setQuantity] = useState(58.85);
  const [unit, setUnit] = useState('kWh');
  const [date, setDate] = useState('2026-11-08');
  const [notes, setNotes] = useState('Trích xuất từ Hóa đơn Điện tử EVN số HĐ: 2609-8812');

  if (!isOpen) return null;

  // 58.85 kWh * 0.7221 = 42.50 kg CO2e
  const co2e = Number((quantity * 0.7221).toFixed(2));
  const isReviewer = workspaceRole === 'REVIEWER';

  const handleSave = () => {
    addEmissionLog({
      category: 'ELECTRICITY',
      activityName: activityType,
      quantity,
      unit,
      factorApplied: 0.7221,
      date,
      source: 'AI_VISION',
      notes,
      receiptUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop&q=80',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Kiểm chứng Dữ liệu AI Vision (SCR-AI-PREVIEW-01)
              </h3>
              <p className="text-xs text-gray-500">
                Đối chiếu hình ảnh hóa đơn gốc với các trường thông tin bóc tách
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2 Columns: Vector Preview on left, Form on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {/* Left Column: Elegant Vector Receipt */}
          <div className="p-6 bg-gray-50 flex flex-col justify-between">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center justify-between">
              <span>Hóa đơn gốc</span>
              <span className="text-[11px] text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded">
                Ảnh minh họa
              </span>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-xs border border-gray-200 space-y-3 font-mono text-xs">
              <div className="text-center pb-2 border-b border-dashed border-gray-300">
                <div className="font-bold text-sm text-gray-900">EVN HÀ NỘI</div>
                <div className="text-[10px] text-gray-400">TỔNG CÔNG TY ĐIỆN LỰC MIỀN BẮC</div>
              </div>

              <div className="space-y-1 text-gray-600 text-[11px]">
                <div className="flex justify-between">
                  <span>Khách hàng:</span>
                  <span className="font-semibold text-gray-900">NGUYEN VAN AN</span>
                </div>
                <div className="flex justify-between">
                  <span>Kỳ hóa đơn:</span>
                  <span>10/2026</span>
                </div>
                <div className="flex justify-between">
                  <span>Chỉ số mới:</span>
                  <span>14,520 kWh</span>
                </div>
                <div className="flex justify-between">
                  <span>Chỉ số cũ:</span>
                  <span>14,461.15 kWh</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-bold border-t border-gray-100 pt-1">
                  <span>Điện năng tiêu thụ:</span>
                  <span>58.85 kWh</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-gray-50 text-[10px] text-gray-500 text-center">
                Mã trích xuất OCR: #EVN-202611-00821
              </div>
            </div>

            <div className="mt-4 text-[11px] text-gray-400 text-center">
              Gemini 1.5 Flash Vision Multimodal Model
            </div>
          </div>

          {/* Right Column: Editable Fields */}
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Loại hoạt động
              </label>
              {/* Plain text dropdown per v2 spec */}
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              >
                <option value="Điện sinh hoạt EVN">Điện sinh hoạt EVN (Lưới điện quốc gia)</option>
                <option value="Xăng xe máy Ron 95">Xăng xe máy Ron 95</option>
                <option value="Nước sinh hoạt đô thị">Nước sinh hoạt đô thị</option>
                <option value="Khí gas LPG đun nấu">Khí gas LPG đun nấu</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Sản lượng ({unit})
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none font-semibold text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Ngày hóa đơn
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Ghi chú đối chiếu
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              />
            </div>

            {/* Ultraminimal v2 Estimated Carbon: ONLY estimated value ≈ 42.50 kg CO2e, NO confidence % badge */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#00A76F] uppercase tracking-wide">
                  Tác động Carbon ước tính
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  58.85 kWh × 0.7221 kg CO2e/kWh
                </div>
              </div>
              <div className="text-xl font-bold text-[#00A76F]">
                ≈ {co2e.toFixed(2)} kg CO2e
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 text-sm font-semibold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{isReviewer ? 'Xác nhận & Ghi sổ cái' : 'Gửi yêu cầu duyệt'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
