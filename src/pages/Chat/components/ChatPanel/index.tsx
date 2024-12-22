import React, { useState } from 'react';
import './index.css';
import { ChatInput } from '../ChatInput';
import { ChatHistory } from '../ChatList/ChatHistory';
import { Message } from '@/types/chat';

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
      className={`bg-white w-full flex flex-col justify-between rounded-t-3xl transition-all duration-300 ${
        isFullScreen ? 'h-screen' : 'h-[3/5]'
      }`}
    >
      <div className="flex-1 overflow-y-auto p-4 border border-gray-300 relative">
        <ChatHistory messages={messages} />
        <div className="absolute top-2 right-2 cursor-pointer text-sm text-blue-500" onClick={toggleFullScreen}>
          {isFullScreen ? 'Switch to 3/5' : 'Switch to Fullscreen'}
        </div>
      </div>
      <div className="textarea-border border-box flex items-center justify-between m-2 p-2">
        <ChatInput placeholder={inputValue ? '' : 'Chat with me...'} onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPanel;
