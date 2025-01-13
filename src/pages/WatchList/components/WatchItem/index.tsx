import React from 'react';
import { Message } from '@/types/chat';
import { ReactSVG } from 'react-svg';
import ShareSVG from '@/assets/icons/share.svg';
import MemoSVG from '@/assets/icons/memo.svg';
import TranslateSVG from '@/assets/icons/translate.svg';
import CopySVG from '@/assets/icons/copy.svg';
import RefreshSVG from '@/assets/icons/refresh.svg';

export const WatchItem: React.FC<Message> = ({ text, user, title, updatedAt }) => {
  const isUser = user === 'user';

  return (
    <div className={`flex justify-center mb-4 animate-fade-in`}>
      <div
        className={`flex flex-col max-w-[80%] items-center px-6 py-2 ${
          isUser
            ? 'bg-#2A2A2A text-white rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-none'
            : 'bg-#F3F3F3 text-black rounded-tl-[24px] rounded-tr-[24px] rounded-bl-none rounded-br-[24px]'
        }`}
      >
        {updatedAt && (
          <p className="w-full text-[12px] inknut-antiqua text-gray-600" style={{ textAlign: 'left' }}>
            {updatedAt}
          </p>
        )}
        {title && (
          <p className="w-full text-[14px] inknut-antiqua" style={{ textAlign: 'left', fontWeight: 'bold' }}>
            {title}
          </p>
        )}
        {title ? (
          <p className="text-[12px] inknut-antiqua text-gray-800" style={{ whiteSpace: 'pre-line' }}>
            {text}
          </p>
        ) : (
          <p className="text-[12px] inknut-antiqua">{text}</p>
        )}
        {!isUser && (
          <div className="w-full flex items-center justify-end gap-4">
            <ReactSVG src={ShareSVG} className="text-#C7C7C7 hover:text-gray-500" />
            <ReactSVG src={MemoSVG} className="text-#C7C7C7 hover:text-gray-500" />
            <ReactSVG src={TranslateSVG} className="text-#C7C7C7 hover:text-gray-500" />
            <ReactSVG src={CopySVG} className="text-#C7C7C7 hover:text-gray-500" />
            <ReactSVG src={RefreshSVG} className="text-#C7C7C7 hover:text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};
