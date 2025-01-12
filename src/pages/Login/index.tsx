import Background from '@/components/common/Background';
import Button from '@/components/common/Button';
import { BTNCOLOR } from '@/constant/button';
import { usePrivy } from '@privy-io/react-auth';

export default function Login() {
  const { login } = usePrivy();

  const handleTwitterAuth = async () => {
    login();
  };
  return (
    <div className="page press-start-2p">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full bg-white">
        <Background />
      </div>
      <div className="text-center w-auto min-w-[290px] mx-[50px] mt-[100px] mb-[50px]">
        <h1 className="press-start-2p text-xl">CREATE YOUR OWN</h1>
        <h1 className="press-start-2p text-xl">SOCIAL AGENT</h1>
      </div>
      <div className="fcc-center gap-[20px] box-border mx-[50px]">
        <Button
          color={BTNCOLOR.PURPLE} // Twitter Color?
          className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px] text-white frc-center gap-[10px]"
          onClick={handleTwitterAuth}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
