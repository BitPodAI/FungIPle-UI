import { useState } from 'react';
import AgentStage from './components/AgentStage';
import ChatPanel from './components/ChatPanel';

const Chat: React.FC = () => {
  const [isChatFullScreen, setIsChatFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setIsChatFullScreen(!isChatFullScreen);
  };

  return (
    <div className="page press-start-2p max-w-[490px] justify-between bg-[#eef8f0]">
      <AgentStage isHidden={isChatFullScreen} />
      <ChatPanel isFullScreen={isChatFullScreen} toggleFullScreen={toggleFullScreen} />
    </div>
  );
};

export default Chat;
