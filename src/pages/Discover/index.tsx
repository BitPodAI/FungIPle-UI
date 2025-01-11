import React from 'react';
import { ReactSVG } from 'react-svg';
import BackIcon from '@/assets/icons/back.svg';
import { useNavigate } from 'react-router-dom';
import XAccountList from './XAccountList';

const Discover: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = async () => {
    navigate('/plugin/watch-list');
  };

  // 示例数据
  const accounts = [
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'ai6z',
      handle: '@ai6zdao',
      tags: ['AI', 'A16z'],
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Shaw',
      handle: '@shawmakesmagic',
      tags: ['AI', 'Agent'],
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'toly',
      handle: '@aeyakovenko',
      tags: ['Sol', 'Co-Founder'],
    },
    {
      avatar: 'https://via.placeholder.com/40',
      name: 'Solana',
      handle: '@solana',
      tags: ['Sol', 'Layer 1'],
    },
  ];

  return (
    <div className="page press-start-2p max-w-[490px]">
      <div className="press-start-2p flex flex-row flex-start gap-1 w-full" style={{ textAlign: 'left' }}>
        <ReactSVG src={BackIcon} className="color-inherit" style={{ marginLeft: '20px', marginRight: '20px' }} onClick={handleBack} />
        My Watch List
      </div>
      <XAccountList accounts={accounts} />
    </div>
  );
};

export default Discover;
