import React from 'react';
import { SearchInput } from '../SearchInput';
import PixBorder from '@/components/common/PixBorder';
import topImg from '@/assets/images/border-bg/top.png';
import bottomImg from '@/assets/images/border-bg/bottom.png';
import leftImg from '@/assets/images/border-bg/left.png';
import rightImg from '@/assets/images/border-bg/right.png';
import { XUserProfile } from '@/types/account';
import defaultAvatar from '@/assets/images/chat/avatar.png';
import PixLoading from '@/components/common/PixLoading';

interface XAccountListProps {
  xList: XUserProfile[];
  handleSearch: (keyword?: string) => Promise<void>;
  loading: boolean;
}

const XAccountList: React.FC<XAccountListProps> = ({ loading, xList, handleSearch }) => {
  return (
    <div className="w-100 border border-gray-300 mx-4">
      <PixBorder
        top={topImg}
        bottom={bottomImg}
        left={leftImg}
        right={rightImg}
        className="bg-transparent py-0 px-6px mx-0 mb-8"
        height={42}
        width={8}
      >
        <SearchInput
          onSearch={handleSearch}
          className="box-border w-full h-42px flex items-center justify-between border border-gray-600 rounded-md"
        />
      </PixBorder>
      {loading && (
        <div className="relative w-full frc-center">
          <PixLoading />
        </div>
      )}
      {xList?.map((account, index) => (
        <div key={index} className="flex items-center mb-2 border-b border-gray-200 pb-2">
          <img
            src={account.avatar}
            alt={account.name}
            onError={e => {
              const img = e.target as HTMLImageElement;
              img.onerror = null;
              img.src = defaultAvatar;
            }}
            className="w-12 h-12 rounded-md mr-3"
          />
          <div className="flex-1">
            <div className="font-bold text-sm text-gray-800 mb-2 inknut-antiqua">{account.name}</div>
            <div className="text-xs text-gray-500 inknut-antiqua">@{account.username}</div>
            {/* <div className="flex gap-1 mt-1">
              {account.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div> */}
          </div>
          <div className="w-100px box-border text-center px-3 py-2 text-10px text-gray-500 border border-solid border-gray-400 rounded-2xl hover:border-2 inknut-antiqua">
            {account.isWatched ? 'UnWatch' : 'Watch'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default XAccountList;
