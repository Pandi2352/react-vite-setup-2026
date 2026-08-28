import { z } from 'zod';
import { ROLES } from '@/utils/constants';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.USER]),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']),
});

export type UserFormData = z.infer<typeof userSchema>;
