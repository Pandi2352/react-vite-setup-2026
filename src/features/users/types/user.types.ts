import { Role, Permission } from '@/utils/constants';

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: Role;
  department: string;
  location: string;
  tier: 'ENTERPRISE' | 'PRO' | 'STARTER';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  twoFactorEnabled: boolean;
  lastLogin: string;
  ipAddress: string;
  usageQuota: string;
  billingPlan: 'ANNUAL' | 'MONTHLY';
  riskScore: number;
  permissions: Permission[];
  createdAt: string;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: Role;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
}
