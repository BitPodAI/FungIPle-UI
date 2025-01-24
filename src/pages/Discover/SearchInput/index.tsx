import React, { useState, useRef } from 'react';
import magnifier from '@/assets/icons/magnifier.svg';
import { ReactSVG } from 'react-svg';

interface SearchInputProps {
  onSearch: (message: string) => Promise<void>;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  disabled = false,
  placeholder = 'Enter X’s Username',
  className,
}) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!message.trim() || isLoading || disabled) return;

    setIsLoading(true);
    try {
      await onSearch(message.trim());
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
        handleSubmit();
    }
  };

  return (
    <div className={className}>
      <button
        disabled={!message.trim() || isLoading || disabled}
        className={`frc-center font-medium bg-white ml-[5px] text-[#B6B6B6] ${
          !message.trim() || isLoading || disabled ? 'cursor-not-allowed' : 'hover:text-blue-600'
        }`}
      >
        <ReactSVG src={magnifier} className="h-5 w-5 frc-center" />
      </button>
      <div className='w-[1px] h-[20px] bg-[#ccc] ml-[10px]'></div>
      <input
        ref={textareaRef}
        value={message}
        onChange={e => {
          e.preventDefault();
          setMessage(e.target.value);
        }}
        onKeyUp={handleKeyUp}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className="ml-[10px] w-full text-black bg-white border-none outline-none resize-none text-xs averia-serif-libre"
      />
    </div>
  );
};
