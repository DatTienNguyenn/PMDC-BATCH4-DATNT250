import React, { useState } from 'react';
import { useLedger } from '../../context/LedgerContext';
import { StandardEmissionFactor } from '../../types';
import { FactorModal } from '../../components/modals/FactorModal';
import { Plus, Edit2, Search, Calculator, ShieldCheck } from 'lucide-react';

export const AdminFactorsPage: React.FC = () => {
  const { factors } = useLedger();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [factorToEdit, setFactorToEdit] = useState<StandardEmissionFactor | null>(null);

  const filteredFactors = factors.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.source.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setFactorToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (f: StandardEmissionFactor) => {
    setFactorToEdit(f);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      <FactorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        factorToEdit={factorToEdit}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Quản lý Hệ số Phát thải Quy chuẩn (SCR-ADM-FACTOR-01)
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Dữ liệu hệ số phát thải chuẩn quốc gia dùng làm căn cứ tự động quy đổi kg CO2e
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-xs transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm Hệ số mới</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên hệ số, nguồn công bố..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00A76F]/20 focus:outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl font-medium text-gray-700 focus:outline-none w-full md:w-auto"
        >
          <option value="ALL">Tất cả danh mục</option>
          <option value="ELECTRICITY">Điện năng (Electricity)</option>
          <option value="TRANSPORT">Di chuyển (Transport)</option>
          <option value="GAS">Khí gas (LPG)</option>
          <option value="WATER">Nước sạch (Water)</option>
          <option value="WASTE">Rác sinh hoạt (Waste)</option>
          <option value="FUGITIVE">Rò rỉ môi chất (Fugitive)</option>
        </select>
      </div>

      {/* Factors Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Tên Hoạt động & Danh mục</th>
                <th className="py-3 px-4">Hệ số Chuẩn (kg CO2e)</th>
                <th className="py-3 px-4">Đơn vị</th>
                <th className="py-3 px-4">Nguồn Quy chuẩn</th>
                <th className="py-3 px-4">Cập nhật</th>
                <th className="py-3 px-4 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredFactors.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50/80">
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{f.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono uppercase">
                      {f.category}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-base text-[#00A76F]">
                    {f.factor}
                  </td>
                  <td className="py-3 px-4 text-gray-600 font-semibold">{f.unit}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px]">
                      {f.source}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 font-mono">{f.updatedAt}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleOpenEdit(f)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-[#00A76F] hover:bg-emerald-50 transition-colors"
                      title="Chỉnh sửa hệ số"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
