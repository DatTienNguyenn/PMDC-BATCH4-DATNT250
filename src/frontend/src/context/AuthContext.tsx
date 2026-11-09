import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, WorkspaceRole } from '../types';
import { MOCK_USERS } from '../mock/mockData';

interface AuthContextType {
  currentUser: User | null;
  workspaceRole: WorkspaceRole;
  isSysAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
  switchUser: (userId: string, role?: WorkspaceRole) => void;
  setWorkspaceRole: (role: WorkspaceRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Reviewer An
  const [currentUser, setCurrentUser] = useState<User | null>(MOCK_USERS[0]);
  const [workspaceRole, setWorkspaceRole] = useState<WorkspaceRole>('REVIEWER');

  useEffect(() => {
    if (currentUser?.globalRole === 'SYSTEM_ADMIN') {
      setWorkspaceRole('REVIEWER');
    }
  }, [currentUser]);

  const login = (user: User) => {
    setCurrentUser(user);
    if (user.id === 'user-02') {
      setWorkspaceRole('EDITOR');
    } else {
      setWorkspaceRole('REVIEWER');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (userId: string, targetRole?: WorkspaceRole) => {
    const found = MOCK_USERS.find((u) => u.id === userId);
    if (found) {
      setCurrentUser(found);
      if (targetRole) {
        setWorkspaceRole(targetRole);
      } else if (found.id === 'user-02') {
        setWorkspaceRole('EDITOR');
      } else {
        setWorkspaceRole('REVIEWER');
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        workspaceRole,
        isSysAdmin: currentUser?.globalRole === 'SYSTEM_ADMIN',
        login,
        logout,
        switchUser,
        setWorkspaceRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
