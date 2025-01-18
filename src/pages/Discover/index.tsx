import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import BackIcon from '@/assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';
import XAccountList from './XAccountList';
import { useGetXList } from './hook/useGetXList';

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const { xList, loading, searchUser, refresh } = useGetXList();

  const handleBack = async () => {
    navigate('/plugin/watch-list');
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="page press-start-2p max-w-[490px] averia-serif-libre">
      <div className="press-start-2p flex flex-row flex-start gap-1 w-full m-6" style={{ textAlign: 'left' }}>
        <ReactSVG src={BackIcon} className="color-inherit averia-serif-libre" style={{ marginLeft: '20px', marginRight: '20px' }} onClick={handleBack} />
        My Watch List
      </div>
      <XAccountList xList={xList} handleSearch={searchUser} loading={loading} onRefresh={refresh} />
    </div>
  );
};

export default Discover;
