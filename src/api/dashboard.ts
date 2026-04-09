import { apiClient } from './client';
import type { DashboardStats } from '@/types/api';

export const dashboardApi = {
  getStats(workspaceId: string) {
    return apiClient.get<DashboardStats>(`/workspaces/${workspaceId}/dashboard`);
  },
};
