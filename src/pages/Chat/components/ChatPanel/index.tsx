import React, { useState } from 'react';
import './index.css';
import { ChatInput } from '../ChatInput';
import { ChatHistory } from '../ChatList/ChatHistory';
import { Message } from '@/types/chat';
import { ReactSVG } from 'react-svg';
import arrowUpIcon from '@/assets/icons/arrow2-up.svg';

const ChatPanel: React.FC<{ isFullScreen: boolean; toggleFullScreen: () => void }> = ({ isFullScreen, toggleFullScreen }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hey, Blommy! Can u tell me how to find 100x Crypto Gems?',
      user: 'user',
      action: 'NONE',
    },
    {
      text: `Finding potential 100x crypto gems involves a mix of research, strategy, and a bit of luck. Here are some tips to help you identify promising cryptocurrencies:
  Research Projects: Read their whitepapers, understand their goals, and evaluate their use cases.
  Team and Advisors: Experienced and reputable team members can significantly increase the project's chances of success.
  Community Engagement: A strong, active community can indicate a project's potential.`,
      user: 'agent',
      action: 'NONE',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async (message: string) => {
    if (message.trim()) {
      setMessages([...messages, { text: message, user: 'user', action: 'NONE' }]);
      setInputValue('');
    }
  };

  return (
    <div
      className={`bg-white z-10 w-full flex flex-col justify-between transition-all duration-300 ${
        isFullScreen ? 'h-screen' : 'h-[70%] rounded-t-3xl'
      }`}
    >
      <div className="flex-1 overflow-y-auto pt-[48px] pb-[16px] border border-gray-300 relative">
        <div className="absolute top-0 left-0 p-[16px] box-border w-full frc-center" onClick={toggleFullScreen}>
          {isFullScreen ? (
            <ReactSVG src={arrowUpIcon} className="w-4 h-4 rotate-180 link-cursor" />
          ) : (
            <ReactSVG src={arrowUpIcon} className="w-4 h-4 link-cursor" />
          )}
        </div>
        <ChatHistory messages={messages} />
      </div>
      <div className="textarea-border border-box flex items-center justify-between m-2 p-2">
        <ChatInput placeholder={inputValue ? '' : 'Chat with me...'} onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPanel;
