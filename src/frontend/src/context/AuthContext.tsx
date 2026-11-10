import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, WorkspaceRole } from '../types';
import { MOCK_USERS } from '../mock/mockData';

interface AuthContextType {
  currentUser: User | null;
  workspaceRole: WorkspaceRole;
  isSysAdmin: boolean;
  login: (user: User) => void;
  logout: () => void;
  switchUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to Workspace Admin (Nguyen Van An) on first load
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedId = localStorage.getItem('carbonledger_user_id');
    const found = MOCK_USERS.find((u) => u.id === savedId);
    return found || MOCK_USERS[0];
  });

  const [workspaceRole, setWorkspaceRole] = useState<WorkspaceRole>(() => {
    return currentUser?.workspaceRole || 'REVIEWER';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('carbonledger_user_id', currentUser.id);
      if (currentUser.globalRole === 'SYSTEM_ADMIN') {
        setWorkspaceRole('REVIEWER');
      } else {
        setWorkspaceRole(currentUser.workspaceRole || 'REVIEWER');
      }
    } else {
      localStorage.removeItem('carbonledger_user_id');
    }
  }, [currentUser]);

  const login = (user: User) => {
    setCurrentUser(user);
    if (user.globalRole === 'SYSTEM_ADMIN') {
      setWorkspaceRole('REVIEWER');
    } else {
      setWorkspaceRole(user.workspaceRole || 'REVIEWER');
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchUser = (userId: string) => {
    const found = MOCK_USERS.find((u) => u.id === userId);
    if (found) {
      login(found);
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
