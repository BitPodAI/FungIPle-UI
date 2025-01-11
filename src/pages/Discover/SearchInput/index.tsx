import React, { useState, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface SearchInputProps {
  onSend: (message: string) => Promise<void>;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSend, disabled = false, placeholder = 'Hello, I want to...', className }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading || disabled) return;

    setIsLoading(true);
    try {
      await onSend(message.trim());
      setMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <button
        type="submit"
        disabled={!message.trim() || isLoading || disabled}
        className={`frc-center font-medium text-[#B6B6B6] ${
          !message.trim() || isLoading || disabled ? 'cursor-not-allowed' : 'hover:text-blue-600'
        }`}
      >
        <MagnifyingGlassIcon className="h-5 w-5 frc-center" />
      </button>
      <textarea
        ref={textareaRef}
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        rows={1}
        className="w-full text-black bg-white border-none outline-none resize-none"
      />
    </form>
  );
};
