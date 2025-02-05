import { watchApi } from '@/services/watch';
import { useUserStore } from '@/stores/useUserStore';
import { toast } from 'react-toastify';

const useShare = () => {
  const userId = useUserStore.getState().getUserId();
  const enable = useUserStore.getState().userProfile?.agentCfg?.enabled;

  const handleShareClick = (text: string) => {
    toast('Shared on X');
    watchApi.reTweeted(text, userId ? userId : '');
  };

  if (!enable) {
    return {
      handleShareClick: () => {
        toast('The switch isn\'t enabled yet. Please enable the \"X Takeover by Agent\" switch to continue.');
      },
    };
  } else {
    return {
      handleShareClick,
    };
  }
};

export default useShare;
