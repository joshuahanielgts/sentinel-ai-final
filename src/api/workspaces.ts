import { apiClient } from './client';
import type { Workspace, WorkspaceMember } from '@/types/api';

export const workspacesApi = {
  list() {
    return apiClient.get<Workspace[]>('/workspaces');
  },

  create(data: { name: string; slug: string }) {
    return apiClient.post<Workspace>('/workspaces', data);
  },

  getMembers(workspaceId: string) {
    return apiClient.get<WorkspaceMember[]>(`/workspaces/${workspaceId}/members`);
  },

  addMember(workspaceId: string, data: { email: string; role: string }) {
    return apiClient.post<WorkspaceMember>(`/workspaces/${workspaceId}/members`, data);
  },

  removeMember(workspaceId: string, memberId: string) {
    return apiClient.delete(`/workspaces/${workspaceId}/members/${memberId}`);
  },
};
