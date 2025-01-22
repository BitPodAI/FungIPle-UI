import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from '@/components/common/Background';
//import Button from '@/components/common/Button';
//import { BTNCOLOR } from '@/constant/button';
//import guestIcon from '@/assets/icons/agent.svg';
import { authService } from '@/services/auth';
import { storage } from '@/utils/storage';
import { useUserStore } from '@/stores/useUserStore';
import Yun from '@/assets/images/login/yun.png';
import Sun from '@/assets/images/login/sun.png';
import LoginGoogle from '@/assets/images/login/login-google.png';
import LoginOther from '@/assets/images/login/login-other.png';
import GuestLogin from '@/assets/images/login/guest-login.png';
import { usePrivy } from '@privy-io/react-auth';


export default function Login() {
  const { login, user, getAccessToken } = usePrivy();
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { userProfile } = useUserStore();
  //const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!user) {
        let res = await login();
        console.log(res);
      }
      else {
        console.log(user);
        setError("Already logged in.");
      }
  };

  useEffect(() => {
    const login = async () => {
      try {
        if (user && user.google) {
          const token = await getAccessToken();
          if (token) {
            storage.setToken(token);
          }
          const userId = user.id || "guest";
          const gmail = user.google.email || "gmail";
          await authService.login(userId, gmail);
          navigate('/egg-select');
        }
      } catch (error) {
        console.error("Failed to update wallet address:", error);
      }
    };

    if (userProfile && userProfile.gmail) {
      navigate('/plugin/chat'); // already login
      return;
    }

    // Firstly login by privy
    if (user && (user.google || user.twitter)) {
      login();
    }
  });

  function simpleHash(input: string) {
    let hash = 0;
    if (input.length === 0) return hash;

    for (let i = 0; i < input.length; i++) {
      let char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }

    return hash.toString();
  }

  function generateGuestName() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    return 'Guest-' + timestamp + randomNum;
  }

  function generateGuestPassword(name: string) {
    return simpleHash(name).toString();
  }

  // function generateGuestEmail() {
  //   return 'Guest@placeholder.com';
  // }

  const handleGuestAuth = async () => {
    const userId = localStorage.getItem('userId');
    const userProfile = localStorage.getItem('userProfile');
    const twitterProfile = localStorage.getItem('twitterProfile');
    console.log('Guest info: ' + userId + ' ' + userProfile?.toString().length + ' ' + twitterProfile?.toString().length);

    if (userId && userProfile) {
      navigate('/plugin/chat'); // already login
      return;
    }
    try {
      // Guest
      const username = generateGuestName();
      const password = generateGuestPassword(username);
      const email = '';
      const credentials = { username, password, email };
      const response = await authService.guestLogin(credentials);
      console.log('guest auth, res: ' + response);
      // Navigate to next page
      navigate('/egg-select');
    } catch (err) {
      console.error('Guest auth error:', err);
      setError(err instanceof Error ? err.message : 'Guest authentication failed');
      console.log(error);
    } finally {
      //setLoading(false);
    }
  };

  return (
    <div className="page press-start-2p">
      <div className="absolute top-0 left-0 z-[-1] w-full h-full bg-white">
        <Background />
      </div>
      <div className="m-x-auto max-w-[450px] relative w-full h-[161px]">
        <img src={Yun} className="absolute top-[10%] left-[5%] w-[98px] h-[98px]" />
        <img src={Yun} className="absolute top-[50px] right-[80px] w-[98px] h-[98px]" />
        <img src={Sun} className="absolute top-0 right-0 w-[89px] h-[89px]" />
      </div>
      <div className="text-center w-auto mt-[33px] mb-[50px]">
        <h1 className="press-start-2p font-size-5 text-xl">CREATE YOUR OWN</h1>
        <h1 className="press-start-2p font-size-5 text-xl">SOCIAL AGENT</h1>
      </div>
      {/* <div className="m-x-auto w-[298px] relative">
        <img src={LoginGoogle} className="w-[298px]" />
        <div className="h-[48px] w-full absolute top-0" onClick={handleAuth}></div>
        <div className="h-[25px] w-[120px] absolute bottom-0 left-[50%] ml-[-60px]" onClick={handleGuestAuth}></div>
      </div> */}
      <img src={LoginGoogle} className="w-[298px] btn-scale" onClick={handleAuth} />
      <div className='text-center mt-[30px] Geologica text-[15px] color-[#b9b9b9] mr-[10px]'>or</div>
      <img className='w-[90px] mt-[29px]' src={GuestLogin} onClick={handleGuestAuth}></img>
      <div className="m-x-auto mt-[100px] w-[283px] relative">
        <img src={LoginOther} className="w-[283px]" />
        <div className="h-[25px] w-full absolute flex top-0">
          <div className="h-[25px] flex-1"></div>
          <div className="h-[25px] flex-1"></div>
          <div className="h-[25px] flex-1"></div>
        </div>
      </div>
    </div>
  );
}
