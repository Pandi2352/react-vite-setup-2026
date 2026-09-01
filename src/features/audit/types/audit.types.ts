export type AuditSeverity = 'CRITICAL' | 'WARNING' | 'INFO' | 'SUCCESS';

export type AuditCategory =
  | 'AUTH'
  | 'IAM'
  | 'SECURITY'
  | 'SYSTEM'
  | 'BILLING'
  | 'API'
  | 'DATABASE';

export type AuditStatus = 'SUCCEEDED' | 'BLOCKED' | 'FAILED' | 'PENDING_REVIEW';

export interface AuditActor {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  isSystemBot?: boolean;
}

export interface AuditResource {
  type: string; // e.g. "User", "Role", "APIKey", "BillingPlan", "Database"
  id: string;
  name: string;
}

export interface AuditGeoLocation {
  city: string;
  country: string;
  countryCode: string;
  flag: string;
}

export interface AuditDiff {
  before?: Record<string, any>;
  after?: Record<string, any>;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string; // ISO string
  formattedTime: string; // e.g. "Aug 28, 2026 11:45:12 UTC"
  action: string; // e.g. "AUTH_LOGIN_SUCCESS", "ROLE_MODIFIED"
  title: string; // Human friendly title
  description: string;
  category: AuditCategory;
  severity: AuditSeverity;
  status: AuditStatus;
  actor: AuditActor;
  resource: AuditResource;
  ipAddress: string;
  geoLocation: AuditGeoLocation;
  userAgent: string;
  durationMs: number;
  hashSha256: string; // Cryptographic immutable integrity hash
  diff?: AuditDiff;
}

export interface AuditKpiStats {
  total24h: number;
  securityBlocks: number;
  uniqueActors: number;
  avgLatencyMs: number;
}
