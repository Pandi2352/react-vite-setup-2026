export interface RevenueDataPoint {
  month: string;
  revenue: number;
  profit: number;
  expenses: number;
  forecast: number;
}

export const MOCK_REVENUE_6M: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 78000, profit: 42000, expenses: 36000, forecast: 75000 },
  { month: 'Feb', revenue: 92000, profit: 54000, expenses: 38000, forecast: 88000 },
  { month: 'Mar', revenue: 86000, profit: 49000, expenses: 37000, forecast: 95000 },
  { month: 'Apr', revenue: 114000, profit: 68000, expenses: 46000, forecast: 110000 },
  { month: 'May', revenue: 138000, profit: 85000, expenses: 53000, forecast: 130000 },
  { month: 'Jun', revenue: 162000, profit: 104000, expenses: 58000, forecast: 155000 },
];

export const MOCK_REVENUE_12M: RevenueDataPoint[] = [
  { month: 'Jul 25', revenue: 64000, profit: 35000, expenses: 29000, forecast: 62000 },
  { month: 'Aug 25', revenue: 72000, profit: 40000, expenses: 32000, forecast: 70000 },
  { month: 'Sep 25', revenue: 81000, profit: 46000, expenses: 35000, forecast: 78000 },
  { month: 'Oct 25', revenue: 95000, profit: 55000, expenses: 40000, forecast: 90000 },
  { month: 'Nov 25', revenue: 110000, profit: 65000, expenses: 45000, forecast: 105000 },
  { month: 'Dec 25', revenue: 128000, profit: 78000, expenses: 50000, forecast: 120000 },
  ...MOCK_REVENUE_6M,
];

export interface TrafficDataPoint {
  time: string;
  ingress: number;
  egress: number;
  requests: number;
}

export const MOCK_TRAFFIC_DATA: TrafficDataPoint[] = [
  { time: '00:00', ingress: 42, egress: 28, requests: 1420 },
  { time: '03:00', ingress: 28, egress: 19, requests: 980 },
  { time: '06:00', ingress: 58, egress: 38, requests: 2100 },
  { time: '09:00', ingress: 96, egress: 72, requests: 4850 },
  { time: '12:00', ingress: 125, egress: 94, requests: 6200 },
  { time: '15:00', ingress: 138, egress: 108, requests: 7100 },
  { time: '18:00', ingress: 112, egress: 85, requests: 5600 },
  { time: '21:00', ingress: 78, egress: 54, requests: 3400 },
];

export interface StorageSegment {
  name: string;
  value: number;
  color: string;
  sizeGb: string;
  iops: string;
}

export const MOCK_STORAGE_SEGMENTS: StorageSegment[] = [
  { name: 'PostgreSQL DB', value: 38, color: '#3b82f6', sizeGb: '1,830 GB', iops: '12,500 IOPS' },
  { name: 'S3 Object Store', value: 28, color: '#10b981', sizeGb: '1,350 GB', iops: '4,200 IOPS' },
  { name: 'Redis Memory Cache', value: 18, color: '#f59e0b', sizeGb: '868 GB', iops: '45,000 IOPS' },
  { name: 'Encrypted Audit Vault', value: 16, color: '#ec4899', sizeGb: '772 GB', iops: '1,800 IOPS' },
];

export interface SecurityRadarPoint {
  subject: string;
  current: number;
  target: number;
  benchmark: number;
}

export const MOCK_SECURITY_RADAR: SecurityRadarPoint[] = [
  { subject: 'Identity & Auth', current: 98, target: 100, benchmark: 85 },
  { subject: 'Data Encryption', current: 95, target: 95, benchmark: 80 },
  { subject: 'Audit Logging', current: 92, target: 90, benchmark: 75 },
  { subject: 'WAF & DDoS', current: 96, target: 95, benchmark: 88 },
  { subject: 'Vulnerability Patch', current: 94, target: 90, benchmark: 82 },
  { subject: 'API Rate Limiting', current: 99, target: 95, benchmark: 84 },
];

export interface SystemResourcePoint {
  time: string;
  cpu: number;
  memory: number;
  gpu: number;
  disk: number;
}

export const MOCK_SYSTEM_RESOURCES: SystemResourcePoint[] = [
  { time: '10:00', cpu: 22, memory: 42, gpu: 15, disk: 30 },
  { time: '11:00', cpu: 38, memory: 48, gpu: 28, disk: 32 },
  { time: '12:00', cpu: 29, memory: 45, gpu: 20, disk: 31 },
  { time: '13:00', cpu: 56, memory: 62, gpu: 46, disk: 35 },
  { time: '14:00', cpu: 48, memory: 55, gpu: 38, disk: 34 },
  { time: '15:00', cpu: 32, memory: 48, gpu: 22, disk: 32 },
];
