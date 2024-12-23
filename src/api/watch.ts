import { Message } from '../types/chat';
import { API_CONFIG } from '@/config/api';


export const watchApi = {
  getWatch: async (): Promise<Message> => {
    try {
      const response = await fetch(API_CONFIG.API_BASE_URL + `/watch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let result = await response.json();
      let json = JSON.parse(result.data.report);
      return {
        text: json.text,
        title: json.title,
        updatedAt: json.updateAt,
        user: 'agent',
        action: 'NONE'
      };
    } catch (error) {
      console.error('Error on watch:', error);
    }
    return {
      text: "Error in watch list generation",
      user: 'agent',
      action: 'NONE'
    };
  },

};
