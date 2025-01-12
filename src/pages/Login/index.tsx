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

  function simpleHash(input: string) {
    let hash = 0;
    if (input.length === 0) return hash;

    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
    }

    return hash.toString();
  }

  function generateGuestName() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return "Guest-" + timestamp + randomNum;
  }

  function generateGuestPassword(name: string) {
    return simpleHash(name).toString();
  }

  
  function generateGuestEmail() {
    return "Guest@placeholder.com";
  }
  
  const handleGuestAuth = async () => {
    const userId = localStorage.getItem('userId');
    const userProfile = localStorage.getItem('userProfile');
    const twitterProfile = localStorage.getItem('twitterProfile');
    console.log("Guest info: " + userId + " " + userProfile?.toString().length + " " + twitterProfile?.toString().length);

    if (userId && userProfile && twitterProfile) {
      navigate('/plugin/chat'); // already login
      return;
    }
    setLoading(true);
    try {
      // Guest
      const username = generateGuestName();
      const password = generateGuestPassword(username);
      const email = generateGuestEmail();
      const credentials = { username, password, email };
      const response = await authService.login(credentials);
      console.log("guest auth, res: " + response);
      // Navigate to next page
      navigate('/egg-select');
    } catch (err) {
      console.error('Guest auth error:', err);
      setError(err instanceof Error ? err.message : 'Guest authentication failed');
    } finally {
      setLoading(false);
    }
  };

    const handleGoogleAuth = async () => {
      setLoading(true);
      try {
        // Navigate to next page
        navigate('/egg-select');
      } catch (err) {
        console.error('Google auth error:', err);
        setError(err instanceof Error ? err.message : 'Google auth failed');
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

      {/* Google */}
            <div className="fcc-center gap-[20px] box-border mx-[50px]">
        {/* {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )} */}
        <Button
          color={BTNCOLOR.PURPLE}
          className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px] text-white frc-center gap-[10px]"
          onClick={handleGoogleAuth}
          disabled={loading}
        >
          <img src={googleIcon} alt="Google" className="w-[24px] h-[24px]" />
          {/* {loading ? 'CONNECTING...' : 'CONNECT WITH GOOGLE'} */}
          {false ? 'CONNECTING...' : 'LOGIN WITH GOOGLE'}

        </Button>
      </div>
      {/* <div className="my-[12px] text-sm">(Authorize with your Google account)</div> */}



      {/* Twitter */}
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

      {/* Guest */}
      <div className="fcc-center gap-[20px] box-border mx-[50px]">
        {/* {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )} */}
        <Button
          color={BTNCOLOR.PURPLE}
          className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px] text-white frc-center gap-[10px]"
          onClick={handleGuestAuth}
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
