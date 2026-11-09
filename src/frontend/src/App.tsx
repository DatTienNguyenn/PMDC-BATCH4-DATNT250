import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { muiTheme } from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { WorkspaceProvider } from './context/WorkspaceContext';
import { LedgerProvider } from './context/LedgerContext';

// Layouts
import { AppLayout } from './layouts/AppLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Workspace Pages
import { WorkspaceListPage } from './pages/workspace/WorkspaceListPage';
import { JoinWorkspacePage } from './pages/workspace/JoinWorkspacePage';
import { DashboardPage } from './pages/workspace/DashboardPage';
import { LedgerPage } from './pages/workspace/LedgerPage';
import { ApprovalQueuePage } from './pages/workspace/ApprovalQueuePage';
import { AIInsightsPage } from './pages/workspace/AIInsightsPage';
import { SettingsPage } from './pages/workspace/SettingsPage';
import { ProfilePage } from './pages/workspace/ProfilePage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminFactorsPage } from './pages/admin/AdminFactorsPage';
import { AdminTenantsPage } from './pages/admin/AdminTenantsPage';

// Error Pages
import { ForbiddenPage } from './pages/error/ForbiddenPage';
import { NotFoundPage } from './pages/error/NotFoundPage';

export function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <WorkspaceProvider>
            <LedgerProvider>
              <Routes>
                {/* Default Redirect */}
                <Route path="/" element={<Navigate to="/workspace/ws-01/dashboard" replace />} />

                {/* Auth Routes */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<LoginPage />} />
                <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

                {/* Workspace Selection & Join */}
                <Route path="/workspaces" element={<WorkspaceListPage />} />
                <Route path="/workspaces/join" element={<JoinWorkspacePage />} />

                {/* Core Workspace App with Navigation Layout */}
                <Route element={<AppLayout />}>
                  <Route path="/workspace/:id/dashboard" element={<DashboardPage />} />
                  <Route path="/workspace/:id/ledger" element={<Navigate to="approved" replace />} />
                  <Route path="/workspace/:id/ledger/:status" element={<LedgerPage />} />
                  <Route path="/workspace/:id/approvals" element={<ApprovalQueuePage />} />
                  <Route path="/workspace/:id/insights" element={<AIInsightsPage />} />
                  <Route path="/workspace/:id/settings" element={<SettingsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>

                {/* System Admin Backoffice Layout */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/admin/emission-factors" element={<AdminFactorsPage />} />
                  <Route path="/admin/workspaces" element={<AdminTenantsPage />} />
                </Route>

                {/* Error Views */}
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </LedgerProvider>
          </WorkspaceProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
