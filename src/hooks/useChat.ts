import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '@/api/chat';
import { useState, useCallback } from 'react';

export function useChatSessions(contractId: string | undefined) {
  return useQuery({
    queryKey: ['chat-sessions', contractId],
    queryFn: () => chatApi.getSessions(contractId!),
    enabled: !!contractId,
  });
}

export function useCreateChatSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (contractId: string) => chatApi.createSession(contractId),
    onSuccess: (_data, contractId) => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions', contractId] });
    },
  });
}

export function useChatMessages(sessionId: string | undefined) {
  return useQuery({
    queryKey: ['chat-messages', sessionId],
    queryFn: () => chatApi.getMessages(sessionId!),
    enabled: !!sessionId,
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = useCallback(async (sessionId: string, content: string, mode: 'normal' | 'redteam') => {
    setIsStreaming(true);
    setStreamingText('');
    try {
      const fullText = await chatApi.sendMessage(sessionId, content, mode, (text) => {
        setStreamingText(text);
      });
      queryClient.invalidateQueries({ queryKey: ['chat-messages', sessionId] });
      setStreamingText('');
      return fullText;
    } finally {
      setIsStreaming(false);
    }
  }, [queryClient]);

  return { sendMessage, streamingText, isStreaming };
}
