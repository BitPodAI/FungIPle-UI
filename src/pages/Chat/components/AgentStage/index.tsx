import './index.css';
import agentIcon from '@/assets/images/agent/hw.gif';
import stageIcon from '@/assets/images/agent/stage.png';
import giftBoxIcon from '@/assets/icons/gift-box.svg';
import heartIcon from '@/assets/icons/heart.svg';
import battleIcon from '@/assets/icons/bottle.svg';
import { useEffect, useState } from 'react';
import { usePixModal } from '@/hooks/usePixModal.hook';
import AgentHeader from '@/components/agent/AgentHeader';

const AgentStage = ({ isHidden }: { isHidden: boolean }) => {
  const { openGiftModal } = usePixModal();
  const tips = [
    'I am a smart agent, I can help you solve problems and answer questions.',
    'I am a smart agent, I can help you solve problems and answer questions.',
    'I am a smart agent, I can help you solve problems and answer questions.',
    'I am a smart agent, I can help you solve problems and answer questions.',
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];

  const [currentTip, setCurrentTip] = useState(tip);

  // 每10秒换一个tip
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenGiftbox = () => {
    openGiftModal();
  };

  return (
    <div className={`relative transition-all duration-300 w-full ${isHidden ? 'h-0 opacity-0' : 'h-[30%] opacity-100'}`}>
      <div className={`absolute top-0 left-0 w-full flex flex-col justify-between ${isHidden ? 'h-0' : 'h-full'}`}>
        <AgentHeader />
        <div className="relative w-full">
          <div className="absolute z-1 bottom-[50px] right-200px frc-center">
            <div className="dialog-wrap">
              <p className="w-[180px] text-[12px] inknut-antiqua">{currentTip}</p>
            </div>
          </div>
          <img
            src={agentIcon}
            alt="agent"
            className="w-[120px] h-[120px] object-contain transform scale-x-[-1] absolute z-2 bottom-0 right-110px"
          />
          <img
            src={stageIcon}
            alt="stage"
            className="w-[130px] h-[130px] object-contain absolute z-1 bottom-0 right-110px translate-y-[30%]"
          />
          <img
            src={giftBoxIcon}
            alt="gift-box"
            className="w-[16px] h-[16px] object-contain absolute z-2 bottom-[20px] right-[205px] link-cursor hover:scale-120"
            onClick={handleOpenGiftbox}
          />
          <img
            src={heartIcon}
            alt="heart"
            className="w-[16px] h-[16px] object-contain absolute z-2 bottom-[126px] right-[130px] hover:scale-120"
          />
          <img
            src={battleIcon}
            alt="battle"
            className="w-[16px] h-[16px] object-contain absolute z-2 bottom-[100px] right-[130px] hover:scale-120"
          />
        </div>

        {/* 背景 */}
        <div className="agent-stage-bg"></div>
      </div>
    </div>
  );
};

export default AgentStage;
