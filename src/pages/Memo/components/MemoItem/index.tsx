import React from 'react';

interface MemoItemProps {
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  collectedTime?: number;
}

const MemoItem: React.FC<MemoItemProps> = ({ title, content, date, imageUrl, collectedTime }) => {
  return (
    <div className="p-4 border-b border-gray-200 flex items-start">
      {imageUrl && <img src={imageUrl} alt={title} className="w-16 h-16 rounded mr-4" />}
      <div className="flex-1">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{content}</p>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <div>
        <div>collected at: {collectedTime}</div>
        <button className="text-gray-500 hover:text-red-500 ml-2">...</button>
      </div>
    </div>
  );
};

export default MemoItem;
