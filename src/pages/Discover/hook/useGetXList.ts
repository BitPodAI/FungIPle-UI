import { XUserProfile } from '@/types/account';
import { useState } from 'react';
import { watchApi } from '@/services/watch';
import { useUserStore } from '@/stores/useUserStore';

export const useGetXList = () => {
  const username = 'shawmakesmagic';
  const count = 10;
  const [xList, setXList] = useState<XUserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { getUserId } = useUserStore();
  const userId = getUserId();

  const initList = async () => {
    setLoading(true);
    try {
      if (userId && username) {
        const response = await watchApi.searchTwitterProfiles(username, count, userId);
        setXList(response?.data || []);
      } else {
        throw 'error: miss user info';
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const searchUser = async (keyword?: string) => {
    setLoading(true);
    try {
      if (userId && username) {
        const response = await watchApi.searchTwitterProfiles(keyword || username, count, userId);
        setXList(response?.data || []);
      } else {
        throw 'error: miss user info';
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const refresh = async () => {
    initList();
  };

  return {
    xList,
    loading,
    searchUser,
    refresh,
  };
};
