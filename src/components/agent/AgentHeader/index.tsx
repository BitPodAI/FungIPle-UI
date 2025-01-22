import avatarIcon from '@/assets/images/chat/avatar.png';
import walletIcon from '@/assets/icons/wallet.svg';
import lifeBarIcon from '@/assets/icons/life-bar.svg';
import './index.css';
import { useEffect } from 'react';
import { useAgentInfo } from '@/hooks/useAgentInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PixModal from '@/components/common/PixModal';
import ShortButton from '../../../pages/Chat/components/ShortButton';
//import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { authService } from '@/services/auth';
import { useUserStore } from '@/stores/useUserStore';

type AgentHeaderProps = {
  isShowConnect?: boolean;
};

const AgentHeader: React.FC<AgentHeaderProps> = ({ isShowConnect = true }) => {
  const { level, experience, nextLevelExp, agentname } = useAgentInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { userProfile, setUserProfile } = useUserStore();
  const handleWalletConnect = async () => {
    if (userProfile?.gmail) {
      window.open('https://web3ai.cloud/#/popup-wallet', 'popup', 'width=600,height=600,status=yes,scrollbars=yes');
    } else {
      // Popup tips
      setIsModalOpen(true);
    }
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

  const closeModal = (e?: React.MouseEvent) => {
    e?.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="w-[calc(100%-40px)] mx-[20px] mt-[20px] flex items-center justify-between">
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

      <div className="flex items-center justify-start">
        <div className="relative frc-center agent-stage-avatarwrap">
          <img src={avatarIcon} alt="avatar" className="w-[30px] h-[30px] object-cover" />
        </div>
        <div className="ml-[16px] flex flex-col items-start justify-center gap-1">
          <span className="flex items-center gap-2">
            <span className="text-[12px]">{agentname}</span>
            <span className="text-[12px] text-[#39CE78]">Level {level}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[12px]">Exp</span>
            <span className="relative flex items-center gap-1">
              <img src={lifeBarIcon} alt="life-bar" className="w-[120px] h-[16px] object-cover" />
              <span className="bg-white h-[10px] w-[110px] absolute top-0 left-0 rounded-full ml-4px mr-2px my-2px">
                <span
                  className="bg-[#39CE78] h-[10px] absolute top-0 left-0 rounded-full"
                  style={{ width: `${(experience * 110) / nextLevelExp}px`, transition: 'width 0.3s ease-in-out' }}
                ></span>
              </span>
            </span>
          </span>
        </div>
      </div>
      {isShowConnect && (
        <div
          className="flex items-center justify-around gap-2 box-border border-1.5 hover:border-2 border-black border-solid rounded-xl px-4 py-2 averia-serif-libre"
          onClick={handleWalletConnect}
        >
          <img src={walletIcon} alt="wallet" className="w-[20px] h-[20px] object-contain link-cursor" />
          {userProfile?.walletAddress ? (
            <span className="capitalize text-black text-xs ellipsis">{userProfile.walletAddress}</span>
          ) : (
            <span className="capitalize text-black text-xs">connect</span>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentHeader;
