import React, { useState } from 'react';
import './index.css';
import { Message } from '@/types/chat';
import { watchApi } from '@/services/watch';
import { useEffect } from 'react';
import { WatchList } from '../WatchList';
//import WatchPng from '@/assets/images/temp/watchlist.png';

const LOCALSTORAGE_ITEM_WATCHLIST = '_web3agent_watchlist_new_';

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
      const cachedMsgsObj = localStorage.getItem(LOCALSTORAGE_ITEM_WATCHLIST);
      const cachedMsgs = cachedMsgsObj ? JSON.parse(cachedMsgsObj) : [];

       // Use the 'msg. updatedAt + msg.title' field as the key to remove duplicates
      const existingMessageIdsSet = new Set(cachedMsgs.map((msg: Message) => (msg.updatedAt ?? '') + msg.title));
      newMsgs.forEach(msg => {
        if (!existingMessageIdsSet.has((msg.updatedAt ?? '') + msg.title)) {
          cachedMsgs.push(msg);
        }
      });

      const msgsToSave = cachedMsgs.length > 20 ? cachedMsgs.slice(-20) : cachedMsgs;
      localStorage.setItem(LOCALSTORAGE_ITEM_WATCHLIST, JSON.stringify(msgsToSave));
      return msgsToSave;
    });
  };

  const handleWatchMessage = async () => {
    try {
      const items = await watchApi.getMyWatchList();
      console.log('handleWatchMessage called items length : ', items.length);
      // console.log('handleWatchMessage called items: ', JSON.stringify(items));

      addMessages(items); // new msgs
    } catch (error) {
      console.error('Error fetching watch list:', error);
    }
  };

  const getWatchTextLoop = async () => {
    const timerlooper = setInterval(handleWatchMessage, 60000);
    // console.log('getWatchTextLoop timeerlooper: ' + timerlooper);
  };

  useEffect(() => {
    setMessages([]);
    const timer = setTimeout(() => {
      handleWatchMessage();
      getWatchTextLoop();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
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
