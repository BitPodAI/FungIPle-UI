import React from 'react';
import { Message } from '@/types/chat';
import { ReactSVG } from 'react-svg';
import ShareSVG from '@/assets/icons/share.svg';
import MemoSVG from '@/assets/icons/memo.svg';
import TranslateSVG from '@/assets/icons/translate.svg';
import CopySVG from '@/assets/icons/copy.svg';
import RefreshSVG from '@/assets/icons/refresh.svg';
import HYTickSVG from '@/assets/icons/hy_tick.svg';
//import CloseSVG from '@/assets/icons/close.svg';
import 'react-toastify/dist/ReactToastify.css';
import useShare from '@/hooks/useShare';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import useTranslate from '@/hooks/useTranslate';

export const WatchItem: React.FC<Message> = ({ text, user, title, updatedAt }) => {
  const isUser = user === 'user';
  const { handleShareClick } = useShare();
  const { handleTranslateClick } = useTranslate();
  const { copy, isCopied } = useCopyToClipboard();
  const handleCopy = async (text: string) => {
    await copy(text);
  };

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
        <div className="w-full flex items-center justify-end gap-4">
          <p className="w-full text-[12px] averia-serif-libre text-gray-600" style={{ textAlign: 'left' }}>
            {updatedAt}
          </p>
        </div>
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
            <ReactSVG src={ShareSVG} className="text-#C7C7C7 hover:text-gray-500" onClick={() => handleShareClick(text)} />
            <ReactSVG src={MemoSVG} className="text-#C7C7C7 hover:text-gray-500" />
            <ReactSVG src={TranslateSVG} className="text-#C7C7C7 hover:text-gray-500" onClick={() => handleTranslateClick(text)}/>
            {!isCopied ? (
              <ReactSVG src={CopySVG} className="text-gray-400 hover:text-gray-500" onClick={() => handleCopy(text)} />
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
