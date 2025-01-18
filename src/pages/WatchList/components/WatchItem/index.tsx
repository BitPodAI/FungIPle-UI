import React, { useState } from 'react';
import { Message } from '@/types/chat';
import { ReactSVG } from 'react-svg';
import ShareSVG from '@/assets/icons/share.svg';
import MemoSVG from '@/assets/icons/memo.svg';
import TranslateSVG from '@/assets/icons/translate.svg';
import CopySVG from '@/assets/icons/copy.svg';
import HYTickSVG from '@/assets/icons/hy_tick.svg';
//import CloseSVG from '@/assets/icons/close.svg';
import 'react-toastify/dist/ReactToastify.css';
import useShare from '@/hooks/useShare';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import useTranslate from '@/hooks/useTranslate';

export const WatchItem: React.FC<Message> = ({ text: initialText, user, title, updatedAt }) => {
  const [text, setText] = useState(initialText);

  const isUser = user === 'user';
  const { handleShareClick } = useShare();
  const { handleTranslateClick } = useTranslate();
  const { copy, isCopied } = useCopyToClipboard();
  const handleCopy = async (text: string) => {
    await copy(text);
  };

  const handleTranslate = async (text: string) => {
    const translatedText = await handleTranslateClick(text);
    setText(translatedText);
  };

  const formatTimeDifference = (timestampString: string) => {
    if (/[^0-9]/.test(timestampString)) {
      return timestampString; // not numberic
    }
  
    // Get the current time's timestamp
    const now = Date.now();
  
    let timestamp;
    
    try {
      // Try to convert the provided timestamp string to a number
      timestamp = parseInt(timestampString, 10);
      // If parseInt fails and returns NaN, we should catch that
      if (isNaN(timestamp)) {
        return timestampString;
        //throw new Error('Invalid timestamp');
      }
    } catch (error) {
      // If there's an error (e.g., invalid timestamp), return the original string
      return timestampString;
    }
  
    // Calculate the time difference in milliseconds
    const timeDifference = now - timestamp;
  
    // Get the difference in seconds
    const seconds = Math.floor(timeDifference / 1000);
    
    // Determine the appropriate unit for the time difference
    if (seconds < 60) {
      // Less than 1 minute
      return `About ${seconds} seconds ago`;
    } else if (seconds < 3600) {
      // Less than 1 hour
      const minutes = Math.floor(seconds / 60);
      return `About ${minutes} mins ago`;
    } else if (seconds < 86400) {
      // Less than 24 hours
      const hours = Math.floor(seconds / 3600);
      return `About ${hours} hours ago`;
    } else {
      // More than 24 hours, format date and time
      const date = new Date(timestamp);
      const options: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: false 
      };
    
      // Format the date in "YYYY-MM-DD HH:mm:ss"
      const formattedDate = date.toLocaleString('en-US', options).replace(',', '').replace(/\/\d+/g, '-'); 
      return formattedDate;
    }
  };

  return (
    <div className={`flex justify-center mb-4 animate-fade-in averia-serif-libre`}>
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
            {formatTimeDifference(updatedAt)}
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
            <ReactSVG src={TranslateSVG} className="text-#C7C7C7 hover:text-gray-500" onClick={() => handleTranslate(text)}/>
            {!isCopied ? (
              <ReactSVG src={CopySVG} className="text-gray-400 hover:text-gray-500" onClick={() => handleCopy(text)} />
            ) : (
              <ReactSVG src={HYTickSVG} className="w-[15px] h-[24px] text-green-400 hover:text-green-500" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
