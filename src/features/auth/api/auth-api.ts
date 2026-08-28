import { LoginInput } from '../schemas/auth.schema';
import { LoginResponse } from '@/types/auth.types';
import { ROLES, PERMISSIONS } from '@/utils/constants';

export const authApi = {
  login: async (credentials: LoginInput): Promise<LoginResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (credentials.email === 'error@example.com') {
      throw new Error('Invalid email or password');
    }

    return {
      user: {
        id: 'usr_1001',
        name: credentials.email.split('@')[0].replace('.', ' ').toUpperCase() || 'Admin User',
        email: credentials.email,
        role: ROLES.SUPER_ADMIN,
        permissions: Object.values(PERMISSIONS),
        createdAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: 'mock_jwt_access_token_' + Date.now(),
        refreshToken: 'mock_jwt_refresh_token_' + Date.now(),
      },
    };
  },

  logout: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
};
