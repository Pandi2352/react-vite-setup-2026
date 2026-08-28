import { Role, Permission } from '@/utils/constants';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  permissions: Permission[];
  avatar?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}
