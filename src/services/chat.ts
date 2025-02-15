import api from './axios';
import { Chat, Message } from '../types/chat';
import { useUserStore } from '@/stores/useUserStore';
import useRespeak from '@/hooks/useRespeak';

export const chatApi = {
  // chat with cuckoo, send message to cuckoo and get response
  getChatList: async (): Promise<Chat[]> => {
    const response = await api.get<{ chats: Chat[] }>('/chat/list');
    return response.data.chats;
  },

  createChat: async (initialMessage: string): Promise<Message> => {
    const userId = useUserStore.getState().getUserId();
    const result = await api.post(`/chat`, {
      text: initialMessage,
      userId: userId,
    });
    const response = result.data.data?.response;
    const profile = result.data.data?.profile;
    useUserStore.getState().updateProfile(profile);

    const json = JSON.parse(response);
    const { cacheChatPromtp } = useRespeak();
    cacheChatPromtp(initialMessage, json.text);
    return {
      text: json.text,
      user: 'agent',
      action: 'NONE',
    };
  },

  deleteChat: async (chatId: string): Promise<void> => {
    await api.delete(`/chat/${chatId}`);
  },

  getChatMessages: async (chatId: string): Promise<Message[]> => {
    const response = await api.get(`/chat/${chatId}/messages`);
    return response.data.data;
  },

  bnbQuery: async (
    query: string
  ): Promise<{
    coin_analysis: string;
    coin_prediction: string;
  }> => {
    const response = await api.get(`/bnb_query?coinsymbol=` + query);
    return response.data;
  },
  kolQuery: async (
    query: string
  ): Promise<{
    coin_analysis: string;
    coin_prediction: string;
  }> => {
    const response = await api.get(`/arena_query?username=` + query);
    return response.data;
  },
};
