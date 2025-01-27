/**
 * description: 页面通用背景组件
 * author: victor
 * date: 2024-12-21
 */
import aniya from '@/assets/images/aniya/buzhihuowu.gif';
import './index.css';

const Background: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full relative flex flex-col items-center justify-end">
        <div className="bg-mountain"></div>
        <div className="absolute bottom-[46px] right-[44px]">
          <img src={aniya} alt="aniya" className="w-[220px] h-full object-cover" />
        </div>
        <div className="bg-ground"></div>
      </div>
    </div>
  );
};

export default Background;
