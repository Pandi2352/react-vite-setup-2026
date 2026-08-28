export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'DEVELOPER' | 'VIEWER';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  createdAt: string;
}

export const MOCK_USERS_DATA: MockUser[] = [
  { id: 'usr-1', name: 'Alex Rivera', email: 'alex.rivera@forgeui.io', role: 'ADMIN', status: 'ACTIVE', createdAt: '2026-01-15' },
  { id: 'usr-2', name: 'Sophia Chen', email: 'sophia.chen@forgeui.io', role: 'MANAGER', status: 'ACTIVE', createdAt: '2026-02-01' },
  { id: 'usr-3', name: 'Marcus Vance', email: 'marcus.vance@forgeui.io', role: 'DEVELOPER', status: 'ACTIVE', createdAt: '2026-02-12' },
  { id: 'usr-4', name: 'Elena Rostova', email: 'elena.rostova@forgeui.io', role: 'VIEWER', status: 'PENDING', createdAt: '2026-02-20' },
  { id: 'usr-5', name: 'Liam O’Connor', email: 'liam.oconnor@forgeui.io', role: 'DEVELOPER', status: 'INACTIVE', createdAt: '2026-02-24' },
];

export async function fetchMockUsers(): Promise<MockUser[]> {
  // Simulate network latency (200ms)
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_USERS_DATA;
}
