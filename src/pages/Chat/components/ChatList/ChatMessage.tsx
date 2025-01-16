import React from 'react';
import { Message } from '@/types/chat';
import { ReactSVG } from 'react-svg';
import ShareSVG from '@/assets/icons/share.svg';
import MemoSVG from '@/assets/icons/memo.svg';
import TranslateSVG from '@/assets/icons/translate.svg';
import CopySVG from '@/assets/icons/copy.svg';
import RefreshSVG from '@/assets/icons/refresh.svg';
import HYTickSVG from '@/assets/icons/hy_tick.svg';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import useShare from '@/hooks/useShare';

export const ChatMessage: React.FC<Message> = ({ text, user, title, updatedAt }) => {
  const isUser = user === 'user';
  const { handleShareClick } = useShare();
  const { copy, isCopied } = useCopyToClipboard();
  const handleCopy = async (text: string) => {
    await copy(text);
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div
        className={`flex flex-col max-w-[80%] items-center px-6 py-2 ${
          isUser
            ? 'bg-#2A2A2A text-white rounded-tl-[24px] rounded-tr-[24px] rounded-bl-[24px] rounded-br-none'
            : 'bg-#F3F3F3 text-black rounded-tl-[24px] rounded-tr-[24px] rounded-bl-none rounded-br-[24px]'
        }`}
      >
        {updatedAt && (
          <p className="w-full text-[12px] averia-serif-libre text-gray-600" style={{ textAlign: 'left' }}>
            {updatedAt}
          </p>
        )}
        {title && (
          <p className="w-full text-[14px] averia-serif-libre" style={{ textAlign: 'left', fontWeight: 'bold' }}>
            {title}
          </p>
        )}
        {title ? (
          <p className="text-[12px] averia-serif-libre text-gray-800" style={{ whiteSpace: 'pre-line' }}>
            {text}
          </p>
        ) : (
          <p className="text-[12px] averia-serif-libre">{text}</p>
        )}
        {!isUser && (
          <div className="w-full flex items-center justify-end gap-4">
            <ReactSVG
              src={ShareSVG}
              className="text-#C7C7C7 hover:text-gray-500"
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                handleShareClick(text);
              }}
            />
            <ReactSVG src={MemoSVG} className="text-#C7C7C7 hover:text-gray-500" />
            <ReactSVG src={TranslateSVG} className="text-#C7C7C7 hover:text-gray-500" />
            {!isCopied ? (
              <ReactSVG
                src={CopySVG}
                className="text-gray-400 hover:text-gray-500"
                onClick={e => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleCopy(text);
                }}
              />
            ) : (
              <ReactSVG src={HYTickSVG} className="w-[15px] h-[24px] text-green-400 hover:text-green-500" />
            )}
            <ReactSVG src={RefreshSVG} className="text-#C7C7C7 hover:text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
};
