import React from 'react';
//import { useState } from 'react';
import WatchPanel from './components/WatchPanel';

const WatchList: React.FC = () => {

  return (
    <div className="page press-start-2p max-w-[490px]">
      <div className="press-start-2p">Watch List</div>
      <WatchPanel />
    </div>
  );
};

export default WatchList;
