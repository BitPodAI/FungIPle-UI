import { useUserStore } from '@/stores/useUserStore';
import PixModal from '../common/PixModal';
import ShortButton from '@/pages/Chat/components/ShortButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import walletIcon from '@/assets/icons/wallet.svg';
import { usePrivy } from '@privy-io/react-auth';
import { authService } from '@/services/auth';

const HOST_URL = import.meta.env.VITE_API_HOST_URL;

const ConnectBtn = () => {
  const { userProfile, setUserProfile } = useUserStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { linkWallet } = usePrivy();

  const handleWalletConnect = async () => {
    // 检查当前环境是否为 HTTPS
    const isHttps = window.location.protocol === 'https:';
    if (userProfile?.gmail) {
      if (isHttps) {
        linkWallet();
      } else {
        window.open(`${HOST_URL}/#/popup-wallet`, 'popup', 'width=600,height=600,status=yes,scrollbars=yes');
      }
    } else {
      // Popup tips
      setIsModalOpen(true);
    }
  };

  const closeModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsModalOpen(false);
  };

  // 提取更新钱包地址的逻辑
  const updateWalletAddress = async (address: string) => {
    try {
      if (userProfile) {
        const updatedProfile = { ...userProfile, walletAddress: address };
        setUserProfile(updatedProfile); // 更新状态
        await authService.updateProfile(updatedProfile.userId, updatedProfile); // 更新后台数据
      }
    } catch (error) {
      console.error('Failed to update wallet address:', error);
    }
  };

  // 处理父窗口消息
  const handleWalletMessage = async (event: MessageEvent) => {
    console.warn('handleWalletMessage', event);
    const { type, data } = event.data;

    // 安全检查：确保我们只处理 LINK_WALLET_SUCCESS 类型的消息
    if (type === 'LINK_WALLET_SUCCESS' && data) {
      await updateWalletAddress(data); // 更新后台数据
    }
  };

  useEffect(() => {
    // 监听父窗口发送的消息
    window.addEventListener('message', handleWalletMessage);

    // 清理事件监听器
    return () => {
      window.removeEventListener('message', handleWalletMessage);
    };
  }, [userProfile]);

  return (
    <>
      <PixModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col gap-4 max-w-[400px] averia-serif-libre">
          <h2 className="text-center my-0">Login Tips</h2>
          <h3 className="text-center my-10">Please login firstly before connect wallet.</h3>
          <div className="flex justify-center gap-4">
            <ShortButton
              onClick={() => {
                navigate('/login');
              }}
              className="text-black text-center"
            >
              Login
            </ShortButton>
            <ShortButton onClick={closeModal} className="text-black text-center">
              Cancel
            </ShortButton>
          </div>
        </div>
      </PixModal>
      <div className="flex items-center justify-around gap-2 box-border border-1.5 hover:border-2 border-black border-solid rounded-xl px-4 py-2 averia-serif-libre bg-white"
        onClick={handleWalletConnect}>
        <img src={walletIcon} alt="wallet" className="w-[20px] h-[20px] object-contain link-cursor" />
        {userProfile?.walletAddress ? (
          <span className="capitalize text-black text-xs ellipsis">{userProfile.walletAddress}</span>
        ) : (
          <span className="capitalize text-black text-xs">
            connect
          </span>
        )}
      </div>
    </>
  );
};

export default ConnectBtn;
