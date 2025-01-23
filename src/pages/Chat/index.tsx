import { useEffect, useState } from 'react';
import AgentStage from './components/AgentStage';
import ChatPanel from './components/ChatPanel';
import GiftModal from './components/GiftModal';
import TokenModal from './components/TokenModal';
import { usePixModalStore } from '@/stores/usePixModalStore';
import { usePixModal } from '@/hooks/usePixModal.hook';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/useUserStore';

const Chat: React.FC = () => {
  const { giftModalVisible, tokenModalVisible } = usePixModalStore();
  const { closeGiftModal, closeTokenModal, openTokenModal } = usePixModal();
  const [isChatFullScreen, setIsChatFullScreen] = useState(false);
  const navigate = useNavigate();
  const { userProfile } = useUserStore();

  const toggleFullScreen = () => {
    setIsChatFullScreen(!isChatFullScreen);
  };

  const handleConfirmGiftModal = () => {
    closeGiftModal();
    openTokenModal();
  };

  useEffect(() => {
    if (!userProfile || !userProfile.userId) {
      navigate('/login'); // has not login
      return;
    }
  });

  return (
    <div className="page press-start-2p justify-between bg-[#eef8f0] max-w-[490px]">
      <AgentStage isHidden={isChatFullScreen} />
      <ChatPanel isFullScreen={isChatFullScreen} toggleFullScreen={toggleFullScreen} />
      <GiftModal isOpen={giftModalVisible} onConfirm={handleConfirmGiftModal} onClose={closeGiftModal} />
      <TokenModal isOpen={tokenModalVisible} onConfirm={closeTokenModal} onClose={closeTokenModal} />
    </div>
  );
};

export default Chat;
