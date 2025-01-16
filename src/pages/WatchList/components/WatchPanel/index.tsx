import React, { useState } from 'react';
import './index.css';
import { Message } from '@/types/chat';
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

  const handleWatchMessage = async () => {
    try {
      const items = await watchApi.getMyWatchList();
      addMessages(items); // new msgs
    } catch (error) {
      console.error('Error fetching watch list:', error);
    }
  };

  const getWatchTextLoop = async () => {
    await handleWatchMessage();
  };

  useEffect(() => {
    //watchApi.reset();
    setMessages([]);
    getWatchTextLoop();
  }, []);

  return (
    <div className={`bg-white z-10 w-full h-[calc(100%-72px)] flex flex-col justify-between transition-all duration-300`}>
      <div className="flex-1 overflow-y-auto pb-[16px] border border-gray-300 relative">
        <WatchList messages={messages} />
      </div>
    </div>
  );
};

export default WatchPanel;
