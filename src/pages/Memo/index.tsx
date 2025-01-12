import React from 'react';
import ChatBox from './components/ChatBox';
import MemoList from './components/MemoLisst';

const Memo: React.FC = () => {
  return (
    <div className="page press-start-2p max-w-[490px]">
      <ChatBox></ChatBox>
      <MemoList />
    </div>
  );
};

export default Memo;
