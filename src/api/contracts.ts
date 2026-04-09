import { apiClient } from './client';
import { supabase } from '@/lib/supabase';
import type { Contract, ContractClause, UploadContractResponse } from '@/types/api';

export const contractsApi = {
  list(workspaceId: string) {
    return apiClient.get<Contract[]>(`/workspaces/${workspaceId}/contracts`);
  },

  get(contractId: string) {
    return apiClient.get<Contract>(`/contracts/${contractId}`);
  },

  getClauses(contractId: string) {
    return apiClient.get<ContractClause[]>(`/contracts/${contractId}/clauses`);
  },

  async upload(workspaceId: string, file: File, name: string): Promise<Contract> {
    // Step 1: Get upload URL
    const { contract_id, upload_url, upload_path, token } = await apiClient.post<UploadContractResponse>(
      `/workspaces/${workspaceId}/contracts/upload`,
      { name, file_name: file.name, file_size: file.size, mime_type: file.type }
    );

    // Step 2: Upload file to signed URL
    const { error } = await supabase.storage
      .from('contracts')
      .uploadToSignedUrl(upload_path, token, file);

    if (error) throw new Error(`Upload failed: ${error.message}`);

    // Step 3: Confirm upload
    return apiClient.patch<Contract>(`/contracts/${contract_id}/confirm`);
  },

  analyze(contractId: string) {
    return apiClient.post<{ status: string }>(`/contracts/${contractId}/analyze`);
  },
};
