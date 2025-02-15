import React, { useRef, useEffect, useCallback } from 'react';
import { Message } from '@/types/chat';
import { debounce } from 'lodash';
import styles from './WatchList.module.css';
import { WatchItem } from '../WatchItem';

interface WatchListProps {
  messages: Message[];
  loading?: boolean;
  className?: string;
}

export const WatchList: React.FC<WatchListProps> = ({ messages, loading = false, className = '' }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = React.useState(true);

  const scrollToBottom = useCallback(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [autoScroll]);

  const handleScroll = debounce(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setAutoScroll(isNearBottom);
  }, 100);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [loading, scrollToBottom]);

  if (messages.length === 0) {
    return <div className="flex flex-1 items-center justify-center text-gray-500"></div>;
  }

  return (
    <div ref={containerRef} onScroll={handleScroll} className={`flex-1 overflow-y-auto p-4 pt-0 space-y-4 ${className} Geologica`}>
      {messages.length > 10 && !autoScroll && (
        <button
          onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full p-2 shadow-lg hover:bg-blue-600 transition-colors"
          title="back to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {messages.map((message, index) => (
        <WatchItem
          key={`${message.user}-${index}-${message.action}`}
          text={message.text}
          user={message.user}
          title={message.title}
          updatedAt={message.updatedAt}
          action={message.action}
          kol={message.kol}
        />
      ))}

      {loading && (
        <div className="flex justify-start animate-fade-in">
          <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
            <div className="flex space-x-2">
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
            </div>
          </div>
        </div>
      )}

      {!autoScroll && messages.length > 0 && (
        <button
          onClick={() => {
            setAutoScroll(true);
            scrollToBottom();
          }}
          className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full px-4 py-2 shadow-lg hover:bg-blue-600 transition-colors Geologica"
        >
          latest
        </button>
      )}

      <div ref={messagesEndRef} className="h-0" />
    </div>
  );
};
