import api from './axios';
import { Chat, Message } from '../types/chat';
import { API_CONFIG } from '@/config/api';

export const chatApi = {
  // chat with cuckoo, send message to cuckoo and get response
  getChatList: async (): Promise<Chat[]> => {
    const response = await api.get<{ chats: Chat[] }>('/chat/list');
    return response.data.chats;
  },

  createChat: async (initialMessage: string): Promise<Message> => {
    try {
      const response = await fetch(API_CONFIG.API_BASE_URL + `/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: initialMessage,
        }),
      });

      let result = await response.json();
      let json = JSON.parse(result.data.response);
      return {
        text: json.text,
        user: 'agent',
        action: 'NONE'
      };
    } catch (error) {
      console.error('Error on chat:', error);
    }
    return {
      text: "Error occured on the chat response.",
      user: 'agent',
      action: 'NONE'
    };
  },

  deleteChat: async (chatId: string): Promise<void> => {
    await api.delete(`/chat/${chatId}`);
  },

  getChatMessages: async (chatId: string): Promise<Message[]> => {
    const response = await api.get(`/chat/${chatId}/messages`);
    return response.data.data;
  },
};
