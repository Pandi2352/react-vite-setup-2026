import { z } from 'zod';

export const wizardSchema = z.object({
  // Step 1: Organization
  orgName: z.string().min(2, 'Organization name must be at least 2 characters'),
  orgEmail: z.string().email('Invalid email address'),
  orgWebsite: z.string().url('Must be a valid URL starting with http:// or https://'),

  // Step 2: License Quota & Access
  planTier: z.enum(['ENTERPRISE', 'PRO', 'STARTER']),
  userSlots: z.number().min(1, 'At least 1 user slot is required'),
  enableAuditLogs: z.boolean(),
  enableSSO: z.boolean(),

  // Step 3: Deployment Schedule
  startDate: z.string().min(1, 'Start date is required'),
  region: z.string().min(1, 'Cloud region selection is required'),
});

export type WizardFormData = z.infer<typeof wizardSchema>;
