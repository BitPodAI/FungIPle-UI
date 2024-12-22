import React from 'react';
import { Message } from '@/types/chat';
import { ReactSVG } from 'react-svg';
import tempGroupIcon from '@/assets/icons/temp-group-1.svg';

export const ChatMessage: React.FC<Message> = ({ text, user }) => {
  const isUser = user === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div
        className={`flex flex-col max-w-[80%] items-center px-6 py-2 ${
          isUser
            ? 'bg-#2A2A2A text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-none'
            : 'bg-#F3F3F3 text-black rounded-tl-xl rounded-tr-xl rounded-bl-none rounded-br-xl'
        }`}
      >
        <p className="text-[12px] inknut-antiqua">{text}</p>
        {!isUser && (
          <div className="w-full flex items-center justify-end">
            <ReactSVG src={tempGroupIcon} />
          </div>
        )}
      </div>
    </div>
  );
};
