import React from 'react';
import MemoList from './components/MemoList';
import { ChatInput } from '../Chat/components/ChatInput';
import PixBorder from '@/components/common/PixBorder';
import topImg from '@/assets/images/border-bg/top.png';
import bottomImg from '@/assets/images/border-bg/bottom.png';
import leftImg from '@/assets/images/border-bg/left.png';
import rightImg from '@/assets/images/border-bg/right.png';

const Memo: React.FC = () => {
  const createMemo = async (notes: string) => {
    console.log(notes);
  };

  return (
    <div className="page press-start-2p max-w-[490px]">
      <div className="w-full text-left">
        <h3 className="ml-20px p-0 mb-0">Memo</h3>
      </div>
      <PixBorder top={topImg} bottom={bottomImg} left={leftImg} right={rightImg} className="bg-transparent w-[calc(100%-80px)]">
        <ChatInput placeholder={'write something...'} onSend={createMemo} />
      </PixBorder>
      <MemoList />
    </div>
  );
};

export default Memo;
