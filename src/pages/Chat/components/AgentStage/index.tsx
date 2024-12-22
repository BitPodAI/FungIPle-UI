import './index.css';
import avatarIcon from '@/assets/images/chat/avatar.png';
import walletIcon from '@/assets/icons/wallet.svg';
import lifeBarIcon from '@/assets/icons/life-bar.svg';
import agentIcon from '@/assets/images/agent/hw.gif';
import stageIcon from '@/assets/images/agent/stage.png';
import { useEffect, useState } from 'react';

const AgentStage = ({ isHidden }: { isHidden: boolean }) => {
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

  return (
    <div className={`relative transition-all duration-300 w-full ${isHidden ? 'h-0 opacity-0' : 'h-[30%] opacity-100'}`}>
      <div className={`absolute top-0 left-0 w-full flex flex-col justify-between ${isHidden ? 'h-0' : 'h-full'}`}>
        <div className="flex items-center justify-between mx-[20px] mt-[20px]">
          <div className="flex items-center justify-start">
            <div className="relative frc-center agent-stage-avatarwrap">
              <img src={avatarIcon} alt="avatar" className="w-[30px] h-[30px] object-cover" />
            </div>
            <div className="ml-[16px] flex flex-col items-start justify-center gap-1">
              <span className="flex items-center gap-2">
                <span className="text-[12px]">Blommy</span>
                <span className="text-[12px] text-[#39CE78]">Level 7</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="text-[12px]">Exp</span>
                <img src={lifeBarIcon} alt="life-bar" className="w-[16px] h-[16px] object-cover" />
                <span className="text-[12px]">100</span>
              </span>
            </div>
          </div>
          <img src={walletIcon} alt="wallet" className="w-[25px] h-[25px] object-contain" />
        </div>
        {/* agent(脚下椭圆，图片，礼物，血瓶，爱心) */}
        <div className="relative w-full">
          <div className="absolute z-1 bottom-[50px] left-[70px] frc-center">
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
        </div>

        {/* 背景 */}
        <div className="agent-stage-bg"></div>
      </div>
    </div>
  );
};

export default AgentStage;
