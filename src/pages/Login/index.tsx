import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/common/Background';
import Button from '@/components/common/Button';
import { BTNCOLOR } from '@/constant/button';
import twitterIcon from '@/assets/icons/x.svg';
import guestIcon from '@/assets/icons/agent.svg';
import googleIcon from '@/assets/icons/google.svg';
import { authService } from '@/services/auth';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleTwitterAuth = async () => {
    setLoading(true);
    try {
      // 1. Get URL
      const { url, state } = await authService.twitterOAuth.getAuthUrl();

      // 2. Store state
      sessionStorage.setItem('twitter_oauth_state', state);

      // 3. Open auth window
      authService.twitterOAuth.createAuthWindow(url);

      // 4. Wait for auth result
      await authService.twitterOAuth.listenForAuthMessage();

      // Navigate to next page
      navigate('/egg-select');
    } catch (err) {
      console.error('Twitter auth error:', err);
      setError(err instanceof Error ? err.message : 'Twitter authentication failed');
    } finally {
      setLoading(false);
    }
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

      {/* 下面是谷歌 */}
            <div className="fcc-center gap-[20px] box-border mx-[50px]">
        {/* {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )} */}
        <Button
          color={BTNCOLOR.PURPLE}  // Twitter Color?
          className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px] text-white frc-center gap-[10px]"
          // onClick={handleTwitterAuth}
          disabled={loading}
        >
          <img src={googleIcon} alt="Google" className="w-[24px] h-[24px]" />
          {/* {loading ? 'CONNECTING...' : 'CONNECT WITH GOOGLE'} */}
          {false ? 'CONNECTING...' : 'LOGIN WITH GOOGLE'}

        </Button>
      </div>
      {/* <div className="my-[12px] text-sm">(Authorize with your Google account)</div> */}



      {/* 下面是 twitter 登录 */}
      <div className="fcc-center gap-[20px] box-border mx-[50px]">
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        <Button
          color={BTNCOLOR.PURPLE}  // Twitter Color?
          className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px] text-white frc-center gap-[10px]"
          onClick={handleTwitterAuth}
          disabled={loading}
        >
          <img src={twitterIcon} alt="twitter" className="w-[24px] h-[24px]" />
          {loading ? 'CONNECTING...' : 'CONNECT WITH TWITTER'}
        </Button>
      </div>
      {/* <div className="my-[12px] text-sm">(Authorize with your Twitter account)</div> */}

      {/* 下面是访客 */}
      <div className="fcc-center gap-[20px] box-border mx-[50px]">
        {/* {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )} */}
        <Button
          color={BTNCOLOR.PURPLE}  // Twitter Color?
          className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px] text-white frc-center gap-[10px]"
          // onClick={handleTwitterAuth}
          disabled={loading}
        >
          <img src={guestIcon} alt="guest" className="w-[24px] h-[24px]" />
          {/* {loading ? 'CONNECTING...' : 'Guest visit'} */}
          {false ? 'CONNECTING...' : 'Use as Guest'}

        </Button>
      </div>
      {/* <div className="my-[12px] text-sm">(Guest visit)</div> */}
    </div>
  );
};

export default Login;
