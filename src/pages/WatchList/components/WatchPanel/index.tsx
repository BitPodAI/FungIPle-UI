import React, { useState } from 'react';
import './index.css';
import { ChatInput } from '../../../Chat/components/ChatInput';
//import { ChatHistory } from '../../../Chat/components/ChatList/ChatHistory';
import { Message } from '@/types/chat';
import { watchApi } from '@/api/watch'
import WatchPng from '@/assets/images/temp/watchlist.png';

const WatchPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      title: "Watchlist Information",
      updatedAt: "2024-12-20",
      text: `Finding your faver in this page.`,
      user: 'agent',
      action: 'NONE',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async (message: string) => {
    let resp = await watchApi.getWatch();
    setMessages([...messages, { text: resp.text, user: 'agent', title: resp.title, updatedAt: resp.updatedAt, action: 'NONE' }]);
    if (message.trim()) {
      setInputValue('');
    }
  };

  return (
    <div className={`bg-white z-10 w-full h-full flex flex-col justify-between transition-all duration-300`}>
      <div className="flex-1 overflow-y-auto pt-[48px] pb-[16px] border border-gray-300 relative">
        <img src={WatchPng} style={{ margin: '3px', width: '80%', height: '100%' }}/>
      </div>
      <div className="textarea-border border-box flex items-center justify-between m-2 p-2">
        <ChatInput placeholder={inputValue ? '' : 'Chat with me...'} onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default WatchPanel;
//<ChatHistory messages={messages} />
