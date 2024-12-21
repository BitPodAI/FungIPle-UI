import Background from '@/components/common/Background';
import Button from '@/components/common/Button';
import { BTNCOLOR } from '@/constant/button';
import userIcon from '@/assets/icons/user.svg';
import passwordIcon from '@/assets/icons/lock.svg';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log('login');
    navigate('/egg-select');
  };

  return (
    <div className="page press-start-2p">
      <div className="absolute top-0 left-0 z-[-1] bg-white">
        <Background />
      </div>
      <div className="text-center w-auto min-w-[290px] mx-[50px] mt-[100px] mb-[50px]">
        <h1 className="press-start-2p text-xl">CREATE YOUR OWN</h1>
        <h1 className="press-start-2p text-xl">SOCIAL AGENT</h1>
      </div>
      <form className="fcc-center gap-[20px] box-border mx-[50px]">
        <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
          <img src={userIcon} alt="x" className="w-[20px] h-[20px]" />
          <div className="w-[1px] h-[16px] bg-[#E3E3E3] mx-[12px]"></div>
          <input type="text" placeholder="X ACCOUNT" className="w-full h-full bg-transparent text-sm" />
        </div>
        <div className="pix-input w-auto min-w-[290px] h-[48px] px-[28px] frc-start">
          <img src={passwordIcon} alt="x" className="w-[20px] h-[20px]" />
          <div className="w-[1px] h-[16px] bg-[#E3E3E3] mx-[12px]"></div>
          <input type="password" placeholder="PASSWORD" className="w-full h-full bg-transparent text-sm" />
        </div>
        <Button color={BTNCOLOR.ORANGE} className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px]" type="submit" onClick={handleLogin}>
          LOGIN IN
        </Button>
      </form>
      <div className="my-[20px]">or</div>
      <Button color={BTNCOLOR.PURPLE} className="w-auto min-w-[346px] px-[28px] h-[48px]" type="submit" onClick={handleLogin}>
        PHANTOM WALLET
      </Button>
    </div>
  );
};

export default Login;
