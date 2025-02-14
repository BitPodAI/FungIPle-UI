import React, { useState } from 'react';
import './index.css';
import { ChatInput } from '../ChatInput';
import { ChatHistory } from '../ChatList/ChatHistory';
import { Message } from '@/types/chat';
import { chatApi } from '@/services/chat';
import { ReactSVG } from 'react-svg';
import arrowUpIcon from '@/assets/icons/arrow2-up.svg';
// import PixBorder from '@/components/common/PixBorder';
// import topImg from '@/assets/images/border-bg/top.png';
// import bottomImg from '@/assets/images/border-bg/bottom.png';
// import leftImg from '@/assets/images/border-bg/left.png';
// import rightImg from '@/assets/images/border-bg/right.png';
import { useAgentInfo } from '@/hooks/useAgentInfo';
import ArenaKOLList from '@/config/ArenaKOLList';

const TokenName = [
  'btc',
  'eth',
  'sol',
  'bnb',
  'xrp',
  'sui',
  'doge',
  'pepe',
  'trump',
  'ton',
  'shib',
  'ondo',
  'wif',
  'ai16z',
  'aixbt',
  'pnut',
  'bera',
];

const ChatPanel: React.FC<{ isFullScreen: boolean; toggleFullScreen: () => void }> = ({ isFullScreen, toggleFullScreen }) => {
  const [bnbQueryLoading, setBnbQueryLoading] = useState(false);
  const [kolQueryLoading, setKolQueryLoading] = useState(false);
  const { agentname } = useAgentInfo();
  let mname = 'Blommy';
  if (agentname) {
    mname = agentname;
  }
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Hey, ' + mname + '! Can u tell me how to find 100x Crypto Gems?',
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
      const resp = await chatApi.createChat(message);
      if (resp) {
        setMessages([...messages, { text: message, user: 'user', action: 'NONE' }, resp]);
      }
    }
  };

  const bnbQuery = async () => {
    if (bnbQueryLoading) {
      return;
    }
    setBnbQueryLoading(true);
    // 20 choose 1
    const query = TokenName[Math.floor(Math.random() * TokenName.length)];
    try {
      const response = await chatApi.bnbQuery(query);
      const queryUpperCase = query.toUpperCase();
      // setMessages([
      //   ...messages,
      //   { title: 'AI Analysis', text: `${response.coin_analysis}`, user: 'agent', action: 'NONE', noRefresh: true },
      //   { title: 'AI Prediction', text: `${response.coin_prediction}`, user: 'agent', action: 'NONE', noRefresh: true },
      // ]);
      setMessages([
        ...messages,
        {
          text: `${queryUpperCase} Analysis\n\n${response.coin_analysis}\n\n\n${queryUpperCase} Prediction\n\n${response.coin_prediction}`,
          user: 'agent',
          action: 'NONE',
          noRefresh: true,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setBnbQueryLoading(false);
    }
  };

  const kolQuery = async () => {
    if (kolQueryLoading) {
      return;
    }
    setKolQueryLoading(true);
    const query = ArenaKOLList[Math.floor(Math.random() * ArenaKOLList.length)];
    try {
      const response = await chatApi.kolQuery(query);
      const queryUpperCase = query.toUpperCase();
      setMessages([
        ...messages,
        {
          text: `${queryUpperCase} Analysis\n\n${response.coin_analysis}`,
          user: 'agent',
          action: 'NONE',
          noRefresh: true,
        },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setKolQueryLoading(false);
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
      <div className="chat-tag">
        <div className="chat-tag-item btn-scale" onClick={bnbQuery}>
          {bnbQueryLoading ? 'AI Prediction...' : 'AI Prediction'}
        </div>
        <div className="chat-tag-item btn-scale" onClick={kolQuery}>
          {kolQueryLoading ? 'Arena Assist...' : 'Arena Assist'}
        </div>
      </div>
      <div className="textarea-border border-box flex items-center justify-between m-x-[16px] m-y-[10px] p-[12px]">
        <ChatInput placeholder={inputValue ? '' : 'Chat with me...'} onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPanel;
