import React, { useState, useRef } from 'react';
import sendIcon from '@/assets/icons/send.svg';
import { ReactSVG } from 'react-svg';
import loadingIcon from '@/assets/icons/loading.svg';

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false, placeholder = 'I want to...' }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {   
    e.preventDefault();
    if (!message.trim() || isLoading || disabled) return;

    setIsLoading(true);
    try {
      await onSend(message.trim());
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setMessage('');
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 border-t border-gray-200">
      <div className="flex flex-items-end">
        <div className="flex-1 w-full h-full">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyUp}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled || isLoading}
            className="Geologica box-border p0 w-full  resize-none rounded-lg bg-white text-[13px]  line-height-[13px] text-black averia-serif-libre border border-gray-300 placeholder-gray-400 focus:outline-none transition-all duration-300"
            style={{
              height: isFocused || message ? '60px' : '13px', // 高度变化
              maxHeight: '83px',
              outline: 'none',
              borderRadius: '0px',
            }}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={!message.trim() || isLoading || disabled}
            className={`frc-center font-medium text-[#B6B6B6] bg-[#fff] ${
              !message.trim() || isLoading || disabled ? 'cursor-not-allowed' : 'hover:text-blue-600'
            }`}
          >
            {isLoading ? (
              <div className="relative w-5 h-5 frc-center rotate">
                <img src={loadingIcon} alt="loading" className="w-5 h-5" />
              </div>
            ) : (
              <ReactSVG src={sendIcon} className="h-5 w-5 frc-center" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
