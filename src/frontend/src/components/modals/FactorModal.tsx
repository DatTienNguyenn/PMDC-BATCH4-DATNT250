import React, { useState } from 'react';
import { StandardEmissionFactor, EmissionCategory } from '../../types';
import { useLedger } from '../../context/LedgerContext';
import { X, Check } from 'lucide-react';

interface FactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  factorToEdit?: StandardEmissionFactor | null;
}

export const FactorModal: React.FC<FactorModalProps> = ({
  isOpen,
  onClose,
  factorToEdit,
}) => {
  const { addFactor, updateFactor } = useLedger();

  const [category, setCategory] = useState<EmissionCategory>(
    factorToEdit?.category || 'ELECTRICITY'
  );
  const [name, setName] = useState(factorToEdit?.name || '');
  const [factor, setFactor] = useState<number>(factorToEdit?.factor || 0.7221);
  const [unit, setUnit] = useState(factorToEdit?.unit || 'kWh');
  const [source, setSource] = useState(
    factorToEdit?.source || 'Bộ TN&MT / EVN 2024'
  );
  const [description, setDescription] = useState(
    factorToEdit?.description || ''
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (factorToEdit) {
      updateFactor(factorToEdit.id, factor, name);
    } else {
      addFactor({
        category,
        name,
        factor,
        unit,
        source,
        description,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-lg overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              {factorToEdit ? 'Chỉnh sửa Hệ số Quy chuẩn' : 'Thêm Hệ số Phát thải Mới'} (SCR-ADM-FACTOR-MODAL-01)
            </h3>
            <p className="text-xs text-gray-500">
              Cập nhật giá trị quy chuẩn phát thải quốc gia (EVN, IPCC, GHG Protocol)
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
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Phân loại Danh mục
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EmissionCategory)}
              className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
            >
              <option value="ELECTRICITY">Điện năng (Electricity)</option>
              <option value="TRANSPORT">Di chuyển & Nhiên liệu (Transport)</option>
              <option value="GAS">Khí gas sinh hoạt (LPG Gas)</option>
              <option value="WATER">Cấp thoát nước (Water)</option>
              <option value="WASTE">Rác thải sinh hoạt (Waste)</option>
              <option value="FUGITIVE">Rò rỉ môi chất lạnh (Fugitive Refrigerant)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Tên Hoạt động / Định mức
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Hệ số quy đổi (kg CO2e)
              </label>
              <input
                type="number"
                step="0.0001"
                min="0.0001"
                required
                value={factor}
                onChange={(e) => setFactor(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none font-bold text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                Đơn vị tính
              </label>
              <input
                type="text"
                required
                placeholder="kWh, Lít, kg, m³..."
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Nguồn công bố / Căn cứ pháp lý
            </label>
            <input
              type="text"
              required
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
              Mô tả chi tiết
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:border-[#00A76F] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
            Quy tắc toàn vẹn: Hệ số mới chỉ áp dụng cho các bản ghi tạo sau thời điểm này, không làm sai lệch số liệu lịch sử đã chốt sổ.
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
              type="submit"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Lưu hệ số</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
