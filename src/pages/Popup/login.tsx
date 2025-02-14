import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';

const LoginPopup = () => {
  const { login, user, getAccessToken, ready } = usePrivy();

  const handleAuth = async () => {
    const token = await getAccessToken();
    window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', data: { ...user, token } }, '*');
    window.close();

  const handleLogin = async () => {
    await login();
  };

  useEffect(() => {
    if (ready) {
      if (user) handleAuth();
      else handleLogin();
    }
  }, [ready, user]);

  return <></>;
};

export default LoginPopup;
