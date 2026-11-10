import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLedger } from '../../context/LedgerContext';
import { useAuth } from '../../context/AuthContext';
import { EmissionLog, EmissionStatus } from '../../types';
import { AddEmissionModal } from '../../components/modals/AddEmissionModal';
import { AIVisionPreviewModal } from '../../components/modals/AIVisionPreviewModal';
import { ExcelPreviewModal } from '../../components/modals/ExcelPreviewModal';
import { LedgerDetailModal } from '../../components/modals/LedgerDetailModal';
import { RejectReasonModal } from '../../components/modals/RejectReasonModal';

// MUI Components
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  Badge,
  InputAdornment,
  Alert,
  Tooltip,
} from '@mui/material';

import {
  Plus,
  Download,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Check,
  X,
  Eye,
  Info,
} from 'lucide-react';

export const LedgerPage: React.FC = () => {
  const { id: workspaceId, status: urlStatus } = useParams<{ id: string; status?: string }>();
  const navigate = useNavigate();
  const { logs, approveLog, rejectLog } = useLedger();
  const { workspaceRole, currentUser } = useAuth();

  const isReviewer = workspaceRole === 'REVIEWER';

  // Normalize current subpage: 'pending' | 'approved' | 'rejected'
  const validSubpages = ['pending', 'approved', 'rejected'] as const;
  type SubpageType = (typeof validSubpages)[number];

  const currentSubpage: SubpageType =
    urlStatus && validSubpages.includes(urlStatus as SubpageType)
      ? (urlStatus as SubpageType)
      : 'approved';

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAIPreviewOpen, setIsAIPreviewOpen] = useState(false);
  const [isExcelPreviewOpen, setIsExcelPreviewOpen] = useState(false);
  const [selectedLogForDetail, setSelectedLogForDetail] = useState<EmissionLog | null>(null);
  const [logToReject, setLogToReject] = useState<EmissionLog | null>(null);

  // Counts for each tab
  const pendingCount = logs.filter((l) => l.status === 'DRAFT').length;
  const approvedCount = logs.filter((l) => l.status === 'APPROVED').length;
  const rejectedCount = logs.filter((l) => l.status === 'REJECTED').length;

  // Map subpage to EmissionStatus
  const statusFilterMap: Record<SubpageType, EmissionStatus> = {
    pending: 'DRAFT',
    approved: 'APPROVED',
    rejected: 'REJECTED',
  };

  const activeEmissionStatus = statusFilterMap[currentSubpage];

  // Tab switch handler
  const handleTabChange = (_event: React.SyntheticEvent, newValue: SubpageType) => {
    navigate(`/workspace/${workspaceId || 'ws-01'}/ledger/${newValue}`);
  };

  // Filter logs based on current subpage status, search query, and category
  const filteredLogs = logs.filter((log) => {
    const matchesStatus = log.status === activeEmissionStatus;

    const matchesSearch =
      log.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.notes?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || log.category === selectedCategory;

    return matchesStatus && matchesSearch && matchesCategory;
  });

  const totalFilteredCo2e = filteredLogs.reduce((sum, l) => sum + l.co2e, 0);

  // Subpage title & subtitle descriptions
  const subpageMeta: Record<
    SubpageType,
    { title: string; subtitle: string; alertText?: string; alertSeverity?: 'info' | 'warning' | 'error' }
  > = {
    pending: {
      title: 'Sổ cái - Đang chờ duyệt',
      subtitle: 'Các bản ghi phát thải đang đợi Trưởng nhóm hoặc Kiểm duyệt viên thẩm định',
      alertText:
        'Lưu ý: Các giao dịch đang chờ duyệt chưa được cộng dồn vào ngân sách phát thải chính thức của Không gian.',
      alertSeverity: 'warning',
    },
    approved: {
      title: 'Sổ cái - Đã duyệt',
      subtitle: 'Nhật ký phát thải chính thức đã được phê duyệt và ghi sổ bất biến',
      alertText: undefined,
    },
    rejected: {
      title: 'Sổ cái - Đã từ chối',
      subtitle: 'Các yêu cầu phát thải không hợp lệ hoặc đã bị trả về kèm lý do đối chiếu',
      alertText:
        'Thành viên có thể xem lý do từ chối để chỉnh sửa chứng từ hoặc khai báo lại sản lượng chính xác.',
      alertSeverity: 'error',
    },
  };

  // CSV Export handler
  const handleExportCSV = () => {
    const headers = [
      'Mã giao dịch',
      'Ngày',
      'Người nạp',
      'Danh mục',
      'Hoạt động',
      'Sản lượng',
      'Đơn vị',
      'Hệ số',
      'kg CO2e',
      'Trạng thái',
      'Nguồn',
    ];
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
    link.setAttribute(
      'download',
      `carbon_ledger_${currentSubpage}_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Reviewer quick approval
  const handleQuickApprove = (log: EmissionLog, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Bạn có chắc chắn muốn duyệt hoạt động "${log.activityName}"?`)) {
      approveLog(log.id);
    }
  };

  // Reviewer quick reject trigger
  const handleOpenRejectModal = (log: EmissionLog, e: React.MouseEvent) => {
    e.stopPropagation();
    setLogToReject(log);
  };

  const handleConfirmReject = (reason: string) => {
    if (logToReject) {
      rejectLog(logToReject.id, reason);
      setLogToReject(null);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
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

      <RejectReasonModal
        isOpen={!!logToReject}
        onClose={() => setLogToReject(null)}
        onConfirm={handleConfirmReject}
        activityName={logToReject?.activityName}
      />

      {/* Page Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#121c27', letterSpacing: '-0.02em' }}>
            {subpageMeta[currentSubpage].title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#637381', mt: 0.5 }}>
            {subpageMeta[currentSubpage].subtitle}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleExportCSV}
            startIcon={<Download size={16} />}
            sx={{
              borderColor: '#e2e8f0',
              color: '#334155',
              bgcolor: '#ffffff',
              fontWeight: 700,
              fontSize: '0.8125rem',
              '&:hover': {
                bgcolor: '#f8fafc',
                borderColor: '#cbd5e1',
              },
            }}
          >
            Xuất Excel
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => setIsAddModalOpen(true)}
            startIcon={<Plus size={16} />}
            sx={{
              bgcolor: '#00A76F',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.8125rem',
              boxShadow: '0 4px 12px rgba(0, 167, 111, 0.24)',
              '&:hover': {
                bgcolor: '#008f5d',
              },
            }}
          >
            Nạp phát thải
          </Button>
        </Box>
      </Box>

      {/* Navigation Subpage Tabs using MUI Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: '#e2e8f0', bgcolor: 'transparent' }}>
        <Tabs
          value={currentSubpage}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            minHeight: 48,
            '& .MuiTab-root': {
              minHeight: 48,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.875rem',
              mr: 2,
              color: '#637381',
              '&.Mui-selected': {
                color: '#00A76F',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#00A76F',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          <Tab
            value="pending"
            label={
              <Badge
                badgeContent={pendingCount}
                color="warning"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -14,
                    top: 2,
                    fontSize: '10px',
                    fontWeight: 800,
                    height: 18,
                    minWidth: 18,
                  },
                }}
              >
                Đang chờ duyệt
              </Badge>
            }
          />
          <Tab
            value="approved"
            label={
              <Badge
                badgeContent={approvedCount}
                color="success"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -14,
                    top: 2,
                    fontSize: '10px',
                    fontWeight: 800,
                    height: 18,
                    minWidth: 18,
                  },
                }}
              >
                Đã duyệt
              </Badge>
            }
          />
          <Tab
            value="rejected"
            label={
              <Badge
                badgeContent={rejectedCount}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    right: -14,
                    top: 2,
                    fontSize: '10px',
                    fontWeight: 800,
                    height: 18,
                    minWidth: 18,
                  },
                }}
              >
                Đã từ chối
              </Badge>
            }
          />
        </Tabs>
      </Box>

      {/* Alert banner if applicable */}
      {subpageMeta[currentSubpage].alertText && (
        <Alert
          severity={subpageMeta[currentSubpage].alertSeverity}
          sx={{
            borderRadius: 3,
            fontSize: '0.8125rem',
            fontWeight: 500,
            border: '1px solid',
            borderColor:
              currentSubpage === 'pending'
                ? 'rgba(245, 158, 11, 0.3)'
                : 'rgba(239, 68, 68, 0.3)',
          }}
        >
          {subpageMeta[currentSubpage].alertText}
        </Alert>
      )}

      {/* Filter and Search Bar using MUI Components */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          bgcolor: '#ffffff',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
        }}
      >
        {/* Search Input */}
        <TextField
          size="small"
          placeholder="Tìm theo hoạt động, người nạp..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={16} color="#94a3b8" />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            width: { xs: '100%', md: 320 },
            '& .MuiOutlinedInput-root': {
              borderRadius: 2.5,
              fontSize: '0.8125rem',
              bgcolor: '#f8fafc',
            },
          }}
        />

        {/* Category Select Filter */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="category-filter-label" sx={{ fontSize: '0.8125rem' }}>
            Danh mục hoạt động
          </InputLabel>
          <Select
            labelId="category-filter-label"
            value={selectedCategory}
            label="Danh mục hoạt động"
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              borderRadius: 2.5,
              fontSize: '0.8125rem',
              bgcolor: '#f8fafc',
            }}
          >
            <MenuItem value="ALL">Tất cả danh mục</MenuItem>
            <MenuItem value="ELECTRICITY">Điện năng (Phạm vi 2)</MenuItem>
            <MenuItem value="TRANSPORT">Di chuyển & Vận chuyển (Phạm vi 1 & 3)</MenuItem>
            <MenuItem value="GAS">Khí gas đốt trực tiếp (Phạm vi 1)</MenuItem>
            <MenuItem value="WATER">Nước sạch tiêu thụ (Phạm vi 3)</MenuItem>
            <MenuItem value="WASTE">Rác thải sinh hoạt (Phạm vi 3)</MenuItem>
            <MenuItem value="FUGITIVE">Rò rỉ môi chất lạnh (Phạm vi 1)</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Main Table using MUI Table Components */}
      {/* Table Alignment: Centered numbers, left-aligned names/activities, no reviewer column */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 3,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          bgcolor: '#ffffff',
        }}
      >
        <Table sx={{ minWidth: 720 }} size="small">
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Ngày
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Người nạp
              </TableCell>
              <TableCell align="left" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Hoạt động & Danh mục
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Sản lượng
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Hệ số
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Phát thải (kg CO2e)
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Nguồn
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Trạng thái
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, fontSize: '0.75rem', color: '#64748b', py: 1.5 }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center" sx={{ py: 8 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <FileSpreadsheet size={36} color="#cbd5e1" />
                    <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                      Không có bản ghi phát thải nào trong mục này
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filteredLogs.map((log) => {
                const isApproved = log.status === 'APPROVED';
                const isDraft = log.status === 'DRAFT';
                const isRejected = log.status === 'REJECTED';

                return (
                  <TableRow
                    key={log.id}
                    hover
                    onClick={() => setSelectedLogForDetail(log)}
                    sx={{
                      cursor: 'pointer',
                      transition: 'background-color 0.15s',
                      '&:hover': { bgcolor: 'rgba(0, 167, 111, 0.04)' },
                    }}
                  >
                    {/* Ngày: căn giữa */}
                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: 'monospace',
                        fontSize: '0.8125rem',
                        color: '#475569',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {log.date}
                    </TableCell>

                    {/* Người nạp: căn trái */}
                    <TableCell align="left" sx={{ whiteSpace: 'nowrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <img
                          src={
                            log.userAvatar ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                          }
                          alt=""
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: '#1e293b', fontSize: '0.8125rem' }}
                        >
                          {log.userName}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* Hoạt động & Danh mục: căn trái */}
                    <TableCell align="left">
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: '#0f172a', fontSize: '0.8125rem' }}
                      >
                        {log.activityName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontSize: '0.6875rem',
                          fontFamily: 'monospace',
                          color: '#94a3b8',
                          textTransform: 'uppercase',
                        }}
                      >
                        {log.category}
                      </Typography>
                    </TableCell>

                    {/* Sản lượng: căn giữa */}
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '0.8125rem',
                        color: '#334155',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {log.quantity} {log.unit}
                    </TableCell>

                    {/* Hệ số: căn giữa */}
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '0.8125rem',
                        color: '#64748b',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {log.factorApplied}
                    </TableCell>

                    {/* Phát thải: căn giữa */}
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 800,
                        color: '#00A76F',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {log.co2e.toFixed(2)} kg
                    </TableCell>

                    {/* Nguồn: căn giữa */}
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                      <Chip
                        label={
                          log.source === 'MANUAL'
                            ? 'Thủ công'
                            : log.source === 'EXCEL'
                            ? 'Excel'
                            : 'AI OCR'
                        }
                        size="small"
                        sx={{
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          bgcolor: '#f1f5f9',
                          color: '#475569',
                          height: 22,
                        }}
                      />
                    </TableCell>

                    {/* Trạng thái: căn giữa */}
                    <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                      {isApproved && (
                        <Chip
                          icon={<CheckCircle2 size={13} color="#00A76F" />}
                          label="Đã duyệt"
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            bgcolor: '#e8f7f0',
                            color: '#00A76F',
                            border: '1px solid rgba(0, 167, 111, 0.25)',
                            height: 24,
                          }}
                        />
                      )}
                      {isDraft && (
                        <Chip
                          icon={<Clock size={13} color="#d97706" />}
                          label="Chờ duyệt"
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            bgcolor: '#fef3c7',
                            color: '#b45309',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                            height: 24,
                          }}
                        />
                      )}
                      {isRejected && (
                        <Chip
                          icon={<AlertCircle size={13} color="#dc2626" />}
                          label="Từ chối"
                          size="small"
                          sx={{
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            bgcolor: '#fee2e2',
                            color: '#b91c1c',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            height: 24,
                          }}
                        />
                      )}
                    </TableCell>

                    {/* Thao tác: căn giữa */}
                    <TableCell
                      align="center"
                      onClick={(e) => e.stopPropagation()}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Tooltip title="Xem chi tiết bản ghi">
                          <Button
                            size="small"
                            variant="text"
                            onClick={() => setSelectedLogForDetail(log)}
                            sx={{
                              minWidth: 32,
                              p: 0.5,
                              color: '#64748b',
                              '&:hover': { color: '#00A76F', bgcolor: 'rgba(0, 167, 111, 0.08)' },
                            }}
                          >
                            <Eye size={16} />
                          </Button>
                        </Tooltip>

                        {/* Quick Action for Reviewer on Pending Tab */}
                        {isReviewer && currentSubpage === 'pending' && (
                          <>
                            <Tooltip title="Duyệt bản ghi">
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                onClick={(e) => handleQuickApprove(log, e)}
                                sx={{
                                  minWidth: 28,
                                  width: 28,
                                  height: 28,
                                  p: 0,
                                  bgcolor: '#00A76F',
                                  '&:hover': { bgcolor: '#008f5d' },
                                }}
                              >
                                <Check size={14} />
                              </Button>
                            </Tooltip>

                            <Tooltip title="Từ chối bản ghi">
                              <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={(e) => handleOpenRejectModal(log, e)}
                                sx={{
                                  minWidth: 28,
                                  width: 28,
                                  height: 28,
                                  p: 0,
                                  borderColor: '#fca5a5',
                                  color: '#dc2626',
                                  '&:hover': {
                                    bgcolor: '#fee2e2',
                                    borderColor: '#ef4444',
                                  },
                                }}
                              >
                                <X size={14} />
                              </Button>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* Table Summary Footer */}
        <Box
          sx={{
            p: 2,
            bgcolor: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1.5,
            fontSize: '0.8125rem',
            color: '#64748b',
          }}
        >
          <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#64748b' }}>
            Hiển thị{' '}
            <strong style={{ color: '#0f172a' }}>{filteredLogs.length}</strong> bản ghi{' '}
            {currentSubpage === 'pending'
              ? 'đang chờ duyệt'
              : currentSubpage === 'approved'
              ? 'đã duyệt'
              : 'đã từ chối'}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#64748b' }}>
            Tổng phát thải đợt lọc này:{' '}
            <strong style={{ color: '#00A76F', fontSize: '0.9375rem' }}>
              ≈ {totalFilteredCo2e.toFixed(2)} kg CO2e
            </strong>
          </Typography>
        </Box>
      </TableContainer>
    </Box>
  );
};
