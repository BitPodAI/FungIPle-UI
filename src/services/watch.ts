//import { Message } from '../types/chat';
import api from './axios';
import { useUserStore } from '@/stores/useUserStore';

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

  // Get watch text by my watchlist
  async getMyWatchList(): Promise<WatchResponse['items']> {
    if (!this.hasMore) {
      return [];
    }
    const watchlist = useUserStore.getState().getWatchlist();

    try {
      const response = await api.post(`/watch`, {
        watchlist: watchlist,
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

  /**
   * Search the twitter profiles by word of username
   * @returns Array of profiles
   */
  async searchTwitterProfiles(username: string, count: number): Promise<any> {
    try {
      const response = await api.post(`/twitter_profile_search`, {username, count});
      return response;
    } catch (error) {
      console.error('Search tw user error:', error);
      throw error;
    }
  }
}

export const watchApi = new WatchApi();
