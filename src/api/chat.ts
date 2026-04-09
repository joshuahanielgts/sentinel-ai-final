import { apiClient } from './client';
import type { ChatSession, ChatMessage } from '@/types/api';

export const chatApi = {
  getSessions(contractId: string) {
    return apiClient.get<ChatSession[]>(`/contracts/${contractId}/chat/sessions`);
  },

  createSession(contractId: string) {
    return apiClient.post<ChatSession>(`/contracts/${contractId}/chat/sessions`);
  },

  getMessages(sessionId: string) {
    return apiClient.get<ChatMessage[]>(`/chat/sessions/${sessionId}/messages`);
  },

  async sendMessage(
    sessionId: string,
    content: string,
    mode: 'normal' | 'redteam',
    onChunk: (text: string) => void
  ): Promise<string> {
    const response = await apiClient.stream(`/chat/sessions/${sessionId}/messages`, {
      content,
      mode,
    });

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let accumulated = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      accumulated += chunk;
      onChunk(accumulated);
    }

    return accumulated;
  },
};
