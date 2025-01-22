import './index.css';
import { AGENT_IMAGES_1 } from '@/config/image';
import stageIcon from '@/assets/images/agent/stage.png';
import giftBoxIcon from '@/assets/icons/gift-box.svg';
import heartIcon from '@/assets/icons/heart.svg';
import battleIcon from '@/assets/icons/bottle.svg';
import { useEffect, useMemo, useState } from 'react';
import { usePixModal } from '@/hooks/usePixModal.hook';
import AgentHeader from '@/components/agent/AgentHeader';
import { useAgentInfo } from '@/hooks/useAgentInfo';

const AgentStage = ({ isHidden }: { isHidden: boolean }) => {
  const { openGiftModal } = usePixModal();
  const tips = [
    'Always remember invest in the feature, not just the present!',
    'The world doesn’t pay you for what you know; it pays you for what you do.',
    'Wise spending is part of wise investing. And it’s never too late to start.',
    'Investing puts money to work. The only reason to save money is to invest it.',
    'If you’re saving, you’re succeeding.',
    'The first rule of compounding: Never interrupt it unnecessarily.',
    'Never depend on a single income. Make an investment to create a second source.',
    'When you invest, you are buying a day that you don’t have to work.',
    'Live within your income and save so you can invest. Learn what you need to learn.',
    '‘Experience’ is what you got when you didn’t get what you wanted.',
    'Invest in yourself. Your career is the engine of your wealth.',
    'Rapidly changing industries are the enemy of the investor.',
    'When you’re in a major market downturn, the beta eats the alpha.',
    'You can’t predict, but you can prepare.',
    'If investing wasn’t hard, everyone would be rich.',
    'Never stop investing. Never stop improving. Never stop doing something new.',
    'A great business at a fair price is superior to a fair business at a great price.',
    //'I am a smart agent, I can help you solve problems and answer questions.',
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];

  const [currentTip, setCurrentTip] = useState(tip);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenGiftbox = () => {
    openGiftModal();
  };

  const { level } = useAgentInfo();

  const agentIcon = useMemo(() => {
    const s = `1_${level}_0`;
    return AGENT_IMAGES_1[s];
  }, [level]);

  const [statusIcon, setStatusIcon] = useState('');

  const handleHeartMode = () => {
    setStatusIcon(AGENT_IMAGES_1[`1_${level}_1`]);
    setTimeout(() => {
      setStatusIcon('');
    }, 5000);
  };

  const handleBattleMode = () => {
    setStatusIcon(AGENT_IMAGES_1[`1_${level}_2`]);
    setTimeout(() => {
      setStatusIcon('');
    }, 5000);
  };

  return (
    <div className={`relative transition-all duration-300 w-full ${isHidden ? 'h-0 opacity-0' : 'h-[30%] opacity-100'}`}>
      <div className={`absolute top-0 left-0 w-full flex flex-col justify-between ${isHidden ? 'h-0' : 'h-full'}`}>
        <AgentHeader isShowConnect={true} />
        <div className="relative w-full">
          <div className="absolute z-1 bottom-[50px] right-200px frc-center">
            <div className="dialog-wrap">
              <p className="w-[180px] text-[12px] averia-serif-libre">{currentTip}</p>
            </div>
          </div>
          {statusIcon?.length > 0 ? (
            <img src={statusIcon} alt="status" className="w-[120px] h-[120px] object-contain absolute z-2 bottom-3 right-110px" />
          ) : (
            <img src={agentIcon} alt="agent"  onClick={handleHeartMode} className="w-[120px] h-[120px] object-contain transform absolute z-2 bottom-3 right-110px" />
          )}
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
          {/* <img
            src={heartIcon}
            alt="heart"
            className="w-[16px] h-[16px] object-contain absolute z-2 bottom-[136px] right-[130px] hover:scale-120"
            onClick={handleHeartMode}
          />
          <img
            src={battleIcon}
            alt="battle"
            className="w-[16px] h-[16px] object-contain absolute z-2 bottom-[110px] right-[130px] hover:scale-120"
            onClick={handleBattleMode}
          /> */}
        </div>

        <div className="agent-stage-bg"></div>
      </div>
    </div>
  );
};

export default AgentStage;
