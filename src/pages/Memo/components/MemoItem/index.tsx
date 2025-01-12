import React from 'react';

interface MemoItemProps {
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  checked: boolean;
  onCheck: (checked: boolean) => void;
}

const MemoItem: React.FC<MemoItemProps> = ({ title, content, date, imageUrl, checked, onCheck }) => {
  return (
    <div className="p-4 border-b border-gray-200 flex items-start">
      <input type="checkbox" className="w-5 h-5 mr-4 cursor-pointer" checked={checked} onChange={e => onCheck(e.target.checked)} />
      {imageUrl && <img src={imageUrl} alt={title} className="w-16 h-16 rounded mr-4" />}
      <div className="flex-1">
        <h3 className="font-bold text-lg mt-0 ">{title}</h3>
        <p className="text-sm text-gray-600">{content}</p>
        <span className="text-xs text-gray-400">collected on:{date}</span>
      </div>
    </div>
  );
};

export default MemoItem;
