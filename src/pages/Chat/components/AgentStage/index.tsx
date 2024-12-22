import './index.css';
import avatarIcon from '@/assets/images/chat/avatar.png';
import walletIcon from '@/assets/icons/wallet.svg';
import lifeBarIcon from '@/assets/icons/life-bar.svg';
import dialogIcon from '@/assets/images/border-bg/dialog.svg';
import agentIcon from '@/assets/images/agent/hw.gif';
import stageIcon from '@/assets/images/agent/stage.png';

const AgentStage = ({ isHidden }: { isHidden: boolean }) => {
  return (
    <div className={`relative transition-all duration-300 w-full ${isHidden ? 'h-0' : 'h-2/5'}`}>
      <div className={`absolute top-0 left-0 w-full h-full`}>
        {/* 头像名称血条 */}
        <div className="flex items-center justify-center">
          <div className="relative agent-stage-avatarwrap">
            <img src={avatarIcon} alt="avatar" className="w-[100px] h-[100px] object-cover" />
          </div>
          <div className="text-white text-2xl font-bold">
            <span>
              <span>Blommy</span>
              <span>Level 7</span>
            </span>
            <span className="flex items-center gap-2">
              <span>Exp</span>
              <img src={lifeBarIcon} alt="life-bar" className="w-[16px] h-[16px] object-cover" />
              <span>100</span>
            </span>
          </div>
        </div>
        {/* 钱包入口 */}
        <img src={walletIcon} alt="wallet" className="w-[44px] h-[44px] object-cover" />
        {/* agent(脚下椭圆，图片，礼物，血瓶，爱心) */}
        <img src={agentIcon} alt="agent" className="w-[160px] h-[160px] object-cover" />
        <img src={stageIcon} alt="stage" className="w-[160px] h-[160px] object-cover" />
        {/* 说话框 */}
        <img src={dialogIcon} alt="dialog" className="w-[44px] h-[44px] object-cover" />
        {/* 背景 */}
        <div className="agent-stage-bg"></div>
      </div>
    </div>
  );
};

export default AgentStage;
