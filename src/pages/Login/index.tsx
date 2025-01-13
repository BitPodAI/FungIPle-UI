import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/common/Background';
import Button from '@/components/common/Button';
import { BTNCOLOR } from '@/constant/button';
import { usePrivy } from '@privy-io/react-auth';
//import guestIcon from '@/assets/icons/agent.svg';
import { authService } from '@/services/auth';


export default function Login() {
  const { login } = usePrivy();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    login();
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

    if (userId && userProfile) {
      navigate('/plugin/chat'); // already login
      return;
    }
    try {
      // Guest
      const username = generateGuestName();
      const password = generateGuestPassword(username);
      const email = generateGuestEmail();
      const credentials = { username, password, email };
      const response = await authService.guestLogin(credentials);
      console.log("guest auth, res: " + response);
      // Navigate to next page
      navigate('/egg-select');
    } catch (err) {
      console.error('Guest auth error:', err);
      setError(err instanceof Error ? err.message : 'Guest authentication failed');
      console.log(error);
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
      <div className="fcc-center gap-[20px] box-border mx-[50px]">
        <Button
          color={BTNCOLOR.PURPLE} // Twitter Color?
          className="w-auto min-w-[346px] px-[28px] h-[48px] mt-[42px] text-white frc-center gap-[10px]"
          onClick={handleAuth}
        >
          Login
        </Button>
      </div>
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
          {/* <img src={guestIcon} alt="guest" className="w-[24px] h-[24px]" /> */}
          {/* {loading ? 'CONNECTING...' : 'Guest visit'} */}
          {false ? 'CONNECTING...' : 'Anonymous '}
        </Button>
      </div>
    </div>
  );
}
