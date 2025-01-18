import { watchApi } from '@/services/watch';
import { useUserStore } from '@/stores/useUserStore';
import { toast } from 'react-toastify';

const useShare = () => {
  const userId = useUserStore.getState().getUserId();
  const notify = () => toast('Shared on X');
  const handleShareClick = (text: string) => {
    notify();
    watchApi.reTweeted(text, userId ? userId : '');
  };

  return {
    handleShareClick,
  };
};

export default useShare;
