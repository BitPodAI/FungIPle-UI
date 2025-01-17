import './index.css';
import lockBg from '@/assets/icons/egg-lockbg.svg';
import Lock from '@/assets/images/agent/lock.png';
import { EGG_COLOR } from '@/constant/egg';
import eggRed from '@/assets/images/eggs/egg-red.svg';
import eggBlue from '@/assets/images/eggs/egg-blue.svg';
import eggGreen from '@/assets/images/eggs/egg-green.svg';
import eggYellow from '@/assets/images/eggs/egg-yellow.svg';
import eggPurple from '@/assets/images/eggs/egg-purple.svg';
import eggPink from '@/assets/images/eggs/egg-pink.svg';
import eggBrown from '@/assets/images/eggs/egg-brown.svg';
import eggDarkblue from '@/assets/images/eggs/egg-darkblue.svg';

type Props = {
  color: EGG_COLOR;
  isLocked?: boolean;
};

const EggItem: React.FC<Props> = ({ color, isLocked = false }) => {
  const eggImg = {
    red: eggRed,
    blue: eggBlue,
    green: eggGreen,
    yellow: eggYellow,
    purple: eggPurple,
    pink: eggPink,
    brown: eggBrown,
    darkblue: eggDarkblue,
  };

  return (
    <div className={`egg-item ${isLocked && 'cursor-not-allowed'}`}>
      {isLocked && (
        <>
          <div className="absolute left-0 top-0 z-10">
            <img alt="lockbg" src={lockBg} />
          </div>
          <div className="absolute left-35px top-32px z-20">
            <img alt="lock" src={Lock} />
          </div>
        </>
      )}
      <img src={`${eggImg[color]}`} alt={color} className={`z-0 ${isLocked && 'blur'}`} />
    </div>
  );
};

export default EggItem;
