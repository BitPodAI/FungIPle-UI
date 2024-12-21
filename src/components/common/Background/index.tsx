/**
 * description: 页面通用背景组件
 * author: victor
 * date: 2024-12-21
 */
import ground from '@/assets/images/background/ground.svg';
import mountain from '@/assets/images/background/mountain.svg';
import aniya from '@/assets/images/aniya/1.gif';

const Background: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full relative flex flex-col items-center justify-end">
        <div>
          <img src={mountain} alt="mountain" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-[76px] right-[100px]">
          <img src={aniya} alt="aniya" className="w-[65px] h-full object-cover" />
        </div>
        <div>
          <img src={ground} alt="ground" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Background;
