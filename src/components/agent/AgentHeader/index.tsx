import avatarIcon from '@/assets/images/chat/avatar.png';
import lifeBarIcon from '@/assets/icons/life-bar.svg';
import BoyIcon from '@/assets/icons/boy.svg';
import GirlIcon from '@/assets/icons/girl.svg';
import './index.css';
import { useAgentInfo } from '@/hooks/useAgentInfo';
import { useUserStore } from '@/stores/useUserStore';
import ConnectBtn from '@/components/ConnectBtn';


type AgentHeaderProps = {
  isShowConnect?: boolean;
};

const AgentHeader: React.FC<AgentHeaderProps> = ({ isShowConnect = true }) => {
  const { level, experience, nextLevelExp, agentname } = useAgentInfo();
  const { userProfile } = useUserStore();


  return (
    <div className="w-[calc(100%-40px)] mx-[20px] mt-[20px] flex items-center justify-between">
      <div className="flex items-center justify-start">
        <div className="relative frc-center agent-stage-avatarwrap">
          <img src={avatarIcon} alt="avatar" className="w-[30px] h-[30px] object-cover" />
          <div
            className="absolute bottom-[-6px] right-[-6px] agent-stage-avatarwrap flex items-center justify-center"
            style={{ width: '16px', height: '16px', backgroundSize: '16px 16px' }}
          >
            <img src={userProfile?.gender === 'Girl' ? GirlIcon : BoyIcon} className="ml-[2px] h-[12px]"></img>
          </div>
        </div>
        <div className="ml-[16px] flex flex-col items-start justify-center gap-1 Tiny5">
          <span className="flex items-center gap-2">
            <span className="text-[18px] Tiny5">{agentname}</span>
            {/* <span className="text-[12px] text-[#39CE78]">Level {level}</span> */}
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[12px] text-[#39CE78]">LV{level}</span>
            <span className="relative flex items-center gap-1">
              <img src={lifeBarIcon} alt="life-bar" className="w-[106px] object-cover" />
              <span className="bg-white h-[6px] w-[96px] absolute top-[50%] left-0 rounded-full mt-[-3px] ml-4px mr-2px my-2px">
                <span
                  className="bg-[#39CE78] h-[6px] absolute top-0 left-0 rounded-full"
                  style={{ width: `${(experience * 110) / nextLevelExp}px`, transition: 'width 0.3s ease-in-out' }}
                ></span>
              </span>
            </span>
          </span>
        </div>
      </div>
      {isShowConnect && <ConnectBtn />}
    </div>
  );
};

export default AgentHeader;
