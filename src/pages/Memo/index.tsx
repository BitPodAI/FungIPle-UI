import React, { useCallback, useEffect, useState } from 'react';
import MemoList from './components/MemoList';
import { ChatInput } from '../Chat/components/ChatInput';
import PixBorder from '@/components/common/PixBorder';
import topImg from '@/assets/images/border-bg/top.png';
import bottomImg from '@/assets/images/border-bg/bottom.png';
import leftImg from '@/assets/images/border-bg/left.png';
import rightImg from '@/assets/images/border-bg/right.png';
import { memoApi } from '@/services/memo';
import { Memo } from '@/types/memo';
import PixLoading from '@/components/common/PixLoading';

const MemoApp: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(true);

  const createMemo = async (content: string) => {
    if (!content) return;

    const data: Memo = await memoApi.addMemo(content);

    setMemos(prev => [data, ...prev]);
  };

  const deleteMemo = useCallback((data: string[]) => {
    memoApi.deleteMomo(data);
    setMemos(prev => prev.filter(memo => !data.includes(memo.id)));
  }, []);

  useEffect(() => {
    memoApi.getMemoList().then(data => {
      setMemos(data);
      setLoading(false);
    });
  }, []);
  if (loading)
    return (
      <div className="page press-start-2p max-w-[490px] fcc-center">
          <PixLoading />
      </div>
    );
  return (
    <div className="page press-start-2p max-w-[490px]">
      <div className="w-full text-left GeologicaRegular">
        <h3 className="ml-20px p-0 mb-0">Memo</h3>
      </div>
      <PixBorder top={topImg} bottom={bottomImg} left={leftImg} right={rightImg} className="bg-transparent box-border w-[calc(100%-40px)]">
        <ChatInput placeholder={'Chat with me...'} onSend={createMemo} />
      </PixBorder>
      <MemoList memos={memos} onDelete={deleteMemo} />
    </div>
  );
};

export default MemoApp;
