import React, { useState } from 'react';
import './index.css';
import { ChatInput } from '../../../Chat/components/ChatInput';
import { Message } from '@/types/chat';
import { chatApi } from '@/services/chat';
import { watchApi } from '@/services/watch';
import { useEffect } from 'react';
import { WatchList } from '../WatchList';
//import WatchPng from '@/assets/images/temp/watchlist.png';

const LOCALSTORAGE_ITEM_WATCHLIST = '_web3agent_watchlist_';

const WatchPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMsgs = localStorage.getItem(LOCALSTORAGE_ITEM_WATCHLIST);
    return savedMsgs ? JSON.parse(savedMsgs) : [];
  });

  const [inputValue, setInputValue] = useState('');
  //const [cursor, setCursor] = useState('');
  //const GEN_TOKEN_REPORT_DELAY = 1000 * 60 * 10; // 10 mins

  //const addMessage = (newMsg: Message) => {
  //  setMessages([...messages, newMsg]);
  //  const msgsToSave = messages.length > 20 ? messages.slice(-20) : messages;
  //  localStorage.setItem(LOCALSTORAGE_ITEM_WATCHLIST, JSON.stringify(msgsToSave));
  //};

  const addMessages = (newMsgs: Message[]) => {
    setMessages(() => {
      const updatedMsgs = [...messages, ...newMsgs];
      const msgsToSave = updatedMsgs.length > 20 ? updatedMsgs.slice(-20) : updatedMsgs;
      localStorage.setItem(LOCALSTORAGE_ITEM_WATCHLIST, JSON.stringify(msgsToSave));
      return msgsToSave;
    });
  };

  const handleChatMessage = async (message: string) => {
    if (message.trim()) {
      setMessages([...messages, { text: message, user: 'user', action: 'NONE' }]);
      setInputValue('');
      const resp = await chatApi.createChat(message);
      if (resp) {
        addMessages([{ text: message, user: 'user', action: 'NONE' }, resp]);
      }
    }
  };

  const handleWatchMessage = async (message: string) => {
    try {
      const items = await watchApi.getMyWatchList();
      addMessages(items); // new msgs

      if (message.trim()) {
        setInputValue('');
      }
    } catch (error) {
      console.error('Error fetching watch list:', error);
    }
  };

  const getWatchTextLoop = async () => {
    console.log('genReportLoop loop');
    await handleWatchMessage('');

    //setTimeout(() => {
    //getWatchTextLoop(); //next iteration
    //}, GEN_TOKEN_REPORT_DELAY);
  };

  useEffect(() => {
    //watchApi.reset();
    setMessages([]);
    getWatchTextLoop();
  }, []);

  return (
    <div className={`bg-white z-10 w-full h-[calc(100%-184px)] flex flex-col justify-between transition-all duration-300`}>
      <div className="flex-1 overflow-y-auto pb-[16px] border border-gray-300 relative">
        <WatchList messages={messages} />
      </div>
      <div className="absolute bottom-0 right-60px textarea-border box-border flex items-center justify-between p-2 w-full max-w-490px bg-gray-100">
        <ChatInput placeholder={inputValue ? '' : 'Chat with me...'} onSend={handleChatMessage} />
      </div>
    </div>
  );
};

export default WatchPanel;
//<ChatHistory messages={messages} />
//<img src={WatchPng} style={{ margin: '3px', width: '80%', height: '100%' }}/>
