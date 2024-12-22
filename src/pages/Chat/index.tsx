import { useState } from 'react';
import AgentStage from './components/AgentStage';
import ChatPanel from './components/ChatPanel';
import GiftModal from './components/GiftModal';
import TokenModal from './components/TokenModal';
import { usePixModalStore } from '@/stores/usePixModalStore';
import { usePixModal } from '@/hooks/usePixModal.hook';

const Chat: React.FC = () => {
  const { giftModalVisible, tokenModalVisible } = usePixModalStore();
  const { closeGiftModal, closeTokenModal, openTokenModal } = usePixModal();
  const [isChatFullScreen, setIsChatFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsChatFullScreen(!isChatFullScreen);
  };

  // todo: 如果礼物弹窗关闭，则紧跟着打开token弹窗，这个逻辑后面要改
  const handleConfirmGiftModal = () => {
    closeGiftModal();
    openTokenModal();
  };

  return (
    <div className="page press-start-2p max-w-[490px] justify-between bg-[#eef8f0]">
      <AgentStage isHidden={isChatFullScreen} />
      <ChatPanel isFullScreen={isChatFullScreen} toggleFullScreen={toggleFullScreen} />
      <GiftModal isOpen={giftModalVisible} onConfirm={handleConfirmGiftModal} onClose={closeGiftModal} />
      <TokenModal isOpen={tokenModalVisible} onConfirm={closeTokenModal} onClose={closeTokenModal} />
    </div>
  );
};

export default Chat;
