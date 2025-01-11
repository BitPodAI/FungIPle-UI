import { XUserProfile } from '@/types/account';
import { useEffect, useState } from 'react';
import { watchApi } from '@/services/watch';

export const useGetXList = () => {
  const username = 'victor_test';
  const count = 10;
  const [xList, setXList] = useState<XUserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  const initList = async () => {
    setLoading(true);
    try {
      const response = await watchApi.searchTwitterProfiles(username, count);
      setXList(response?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const searchUser = async (keyword?: string) => {
    setLoading(true);
    try {
      const response = await watchApi.searchTwitterProfiles(keyword || username, count);
      setXList(response?.data?.data || []);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    initList();
  }, []);

  return {
    xList,
    loading,
    searchUser,
  };
};
