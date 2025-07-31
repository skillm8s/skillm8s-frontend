import { AuthUser } from '@/lib/auth';

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}