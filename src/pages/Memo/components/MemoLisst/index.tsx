import React from 'react';
import MemoItem from '../MemoItem';

const MemoList: React.FC = () => {
  const memos = [
    {
      title: 'Introducing Memo',
      content: 'Memo is your exclusive AI knowledge base. You can collect any webpage, AI chat records, images, and PDF...',
      date: '2024/12/20',
      imageUrl: 'https://example.com/image1.jpg',
    },
    {
      title: 'IPLAUSDT for BINANCE: PLAUSDT by TraianIonita',
      content: 'In this article, the author expresses their belief that Bitcoin will never reach certain past prices again...',
      date: '2024/12/20',
    },
  ];

  return (
    <div className="p-4">
      {memos.map((memo, index) => (
        <MemoItem key={index} title={memo.title} content={memo.content} date={memo.date} imageUrl={memo.imageUrl} />
      ))}
    </div>
  );
};

export default MemoList;
