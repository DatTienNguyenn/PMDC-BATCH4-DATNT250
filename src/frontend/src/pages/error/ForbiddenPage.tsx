import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Users } from 'lucide-react';

export const ForbiddenPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7f9ff] flex flex-col justify-center items-center p-6 text-center font-sans">
      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
        <ShieldAlert className="w-10 h-10" />
      </div>

      <span className="text-xs font-mono font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full mb-3">
        Lỗi 403 • Quyền truy cập bị từ chối (SCR-ERR-403)
      </span>

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Khu vực Quản trị Bị giới hạn
      </h1>

      <p className="text-sm text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
        Tài khoản hiện tại của bạn không có đủ thẩm quyền để truy cập vào màn hình này (chức năng yêu cầu quyền Trưởng nhóm Reviewer hoặc System Admin theo ma trận RBAC).
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/workspace/ws-01/dashboard"
          className="px-5 py-2.5 text-xs font-bold text-white bg-[#00A76F] hover:bg-[#00925f] rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Dashboard của bạn</span>
        </Link>

        <Link
          to="/auth/login"
          className="px-5 py-2.5 text-xs font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl shadow-xs transition-all flex items-center gap-2"
        >
          <Users className="w-4 h-4 text-[#00A76F]" />
          <span>Đăng nhập vai trò khác</span>
        </Link>
      </div>
    </div>
  );
};
