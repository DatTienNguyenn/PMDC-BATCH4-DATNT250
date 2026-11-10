import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  activityName?: string;
}

export const RejectReasonModal: React.FC<RejectReasonModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  activityName,
}) => {
  const [selectedPreset, setSelectedPreset] = useState('Số liệu tiêu thụ vượt định mức thực tế');
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const presets = [
    'Số liệu tiêu thụ vượt định mức thực tế',
    'Bản ghi bị trùng lặp với hoạt động trước đó',
    'Thiếu hóa đơn/chứng từ đối chiếu hợp lệ',
    'Hoạt động không thuộc phạm vi sinh hoạt chung',
  ];

  const handleConfirm = () => {
    const finalReason = customNote.trim()
      ? `${selectedPreset} - Ghi chú: ${customNote.trim()}`
      : selectedPreset;
    onConfirm(finalReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">
                Từ chối Yêu cầu Phát thải (SCR-APPROVE-REJECT-01)
              </h3>
              <p className="text-xs text-gray-500 truncate max-w-[240px]">
                Hoạt động: {activityName || 'Bản ghi phát thải'}
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

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-2">
              Chọn lý do từ chối mẫu
            </label>
            <div className="space-y-2">
              {presets.map((preset, index) => (
                <label
                  key={index}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedPreset === preset
                      ? 'bg-red-50/60 border-red-300 text-red-900 font-semibold'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="reject-preset"
                    checked={selectedPreset === preset}
                    onChange={() => setSelectedPreset(preset)}
                    className="mt-0.5 text-red-600 focus:ring-red-500"
                  />
                  <span>{preset}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Ghi chú bổ sung cho Thành viên
            </label>
            <textarea
              rows={3}
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Nhập hướng dẫn để thành viên sửa đổi hoặc khai báo lại..."
              className="w-full px-3 py-2 text-xs border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition-all"
            >
              Xác nhận Từ chối
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
