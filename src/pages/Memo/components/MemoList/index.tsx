import React, { useState } from 'react';
import MemoItem from '../MemoItem';
import TrashSVG from '@/assets/icons/trash.svg';

interface Memo {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

const MemoList: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([
    {
      id: '1',
      title: 'Introducing Memo',
      content: 'Memo is your exclusive AI knowledge base. You can collect any webpage, AI chat records, images, and PDF...',
      date: '2024/12/20',
    },
    {
      id: '2',
      title: 'IPLAUSDT for BINANCE: PLAUSDT by TraianIonita',
      content: 'In this article, the author expresses their belief that Bitcoin will never reach certain past prices again...',
      date: '2024/12/20',
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(memos.map(memo => memo.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleDeleteSelected = () => {
    setMemos(prev => prev.filter(memo => !selectedIds.includes(memo.id)));
    setSelectedIds([]);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center space-x-2">
          <input
            className="w-5 h-5 mr-4 cursor-pointer"
            type="checkbox"
            checked={selectedIds.length === memos.length && memos.length > 0}
            onChange={e => handleSelectAll(e.target.checked)}
          />
          <span>Select All</span>
        </label>
        <div
          className="px-3 py-1 border-2 border-solid border-#CFCFCF rounded-xl text-black text-10px py-2 rounded disabled:opacity-50 frc-center gap-2"
          onClick={handleDeleteSelected}
        >
          <img src={TrashSVG} className="w-5 h-5" />
          <span>Delete</span>
        </div>
      </div>

      {memos.map(memo => (
        <MemoItem
          key={memo.id}
          title={memo.title}
          content={memo.content}
          date={memo.date}
          imageUrl={memo.imageUrl}
          checked={selectedIds.includes(memo.id)}
          onCheck={checked => handleSelect(memo.id, checked)}
        />
      ))}
    </div>
  );
};

export default MemoList;
