'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type Role = 'User' | 'Admin' | 'Super Admin' | null;

interface AuthContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType>({ role: null, setRole: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const router = useRouter();

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    if (newRole) {
      router.push(`/dashboard/${newRole.toLowerCase().replace(' ', '-')}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ role, setRole: handleSetRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);