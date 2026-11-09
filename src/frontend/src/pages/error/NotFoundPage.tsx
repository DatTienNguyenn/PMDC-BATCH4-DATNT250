import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col justify-center items-center p-6 text-center font-sans">
      <div className="w-20 h-20 bg-gray-100 text-gray-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
        <FileQuestion className="w-10 h-10" />
      </div>

      <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full mb-3">
        Lỗi 404 • Không tìm thấy trang (SCR-ERR-404)
      </span>

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Trang Không Tồn Tại
      </h1>

      <p className="text-sm text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
        Đường dẫn bạn truy cập có thể đã bị di chuyển, xóa bỏ hoặc ID không gian làm việc không tồn tại trong hệ thống.
      </p>

      <div className="flex items-center gap-3">
        <Link
          to="/workspaces"
          className="px-5 py-2.5 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về danh sách Không gian làm việc</span>
        </Link>
      </div>
    </div>
  );
};
