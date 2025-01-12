//import { Message } from '../types/chat';
import api from './axios';

interface WatchResponse {
  items: {
    token: string;
    title: string;
    text: string;
    updatedAt: string;
    user: 'agent';
    action: 'NONE';
  }[];
  cursor: string;
  hasMore: boolean;
}

class WatchApi {
  private cursor: string = '';
  private hasMore: boolean = true;

  // reset
  reset() {
    this.cursor = '';
    this.hasMore = true;
  }

  // Check more
  hasMoreData(): boolean {
    return this.hasMore;
  }

  // Get from server
  async getWatchList(): Promise<WatchResponse['items']> {
    if (!this.hasMore) {
      return [];
    }

    try {
      const response = await api.post(`/watch`, {
        cursor: this.cursor
      });
      const data: WatchResponse = response.data.data.watchlist;

      // Update
      this.cursor = data.cursor;
      this.hasMore = data.hasMore;

      // set for each item
      return data.items.map(item => ({
        ...item,
        user: 'agent' as const,
        action: 'NONE' as const
      }));
    } catch (error) {
      console.error('Error fetching watch list:', error);
      return [];
    }
  }
}

export const watchApi = new WatchApi();
