import React from 'react';
import { SearchInput } from '../SearchInput';
import PixBorder from '@/components/common/PixBorder';
import topImg from '@/assets/images/border-bg/top.png';
import bottomImg from '@/assets/images/border-bg/bottom.png';
import leftImg from '@/assets/images/border-bg/left.png';
import rightImg from '@/assets/images/border-bg/right.png';

interface Account {
  avatar: string;
  name: string;
  handle: string;
  tags: string[];
}

interface XAccountListProps {
  accounts: Account[];
}

const XAccountList: React.FC<XAccountListProps> = ({ accounts }) => {
  const handleSend = async (message: string) => {
    console.log(message);
  };

  return (
    <div className="w-100 border border-gray-300 p-4">
      <PixBorder top={topImg} bottom={bottomImg} left={leftImg} right={rightImg} className="bg-transparent py-0" height={42}>
        <SearchInput
          onSend={handleSend}
          className="box-border w-full h-42px flex items-center justify-between p-2 border border-gray-600 rounded-md"
        />
      </PixBorder>
      {accounts.map((account, index) => (
        <div key={index} className="flex items-center mb-4 border-b border-gray-200 pb-2">
          <img src={account.avatar} alt={account.name} className="w-10 h-10 rounded-md mr-3" />
          <div className="flex-1">
            <div className="font-bold text-sm text-gray-800">{account.name}</div>
            <div className="text-xs text-gray-500">{account.handle}</div>
            <div className="flex gap-1 mt-1">
              {account.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button className="px-3 py-1 text-xs text-white bg-blue-500 rounded-md">Unfollow</button>
        </div>
      ))}
    </div>
  );
};

export default XAccountList;