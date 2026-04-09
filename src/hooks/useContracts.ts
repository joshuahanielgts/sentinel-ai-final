import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contractsApi } from '@/api/contracts';
import type { Contract } from '@/types/api';

export function useContracts(workspaceId: string | undefined) {
  return useQuery({
    queryKey: ['contracts', workspaceId],
    queryFn: () => contractsApi.list(workspaceId!),
    enabled: !!workspaceId,
  });
}

export function useContract(contractId: string | undefined) {
  const query = useQuery({
    queryKey: ['contract', contractId],
    queryFn: () => contractsApi.get(contractId!),
    enabled: !!contractId,
    refetchInterval: (query) => {
      const data = query.state.data as Contract | undefined;
      if (data?.status === 'analyzing') return 3000;
      return false;
    },
  });
  return query;
}

export function useContractClauses(contractId: string | undefined) {
  return useQuery({
    queryKey: ['contract-clauses', contractId],
    queryFn: () => contractsApi.getClauses(contractId!),
    enabled: !!contractId,
  });
}

export function useUploadContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ workspaceId, file, name }: { workspaceId: string; file: File; name: string }) =>
      contractsApi.upload(workspaceId, file, name),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['contracts', variables.workspaceId] });
    },
  });
}

export function useAnalyzeContract() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contractId: string) => contractsApi.analyze(contractId),
    onSuccess: (_data, contractId) => {
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      queryClient.invalidateQueries({ queryKey: ['contracts'] });
    },
  });
}
