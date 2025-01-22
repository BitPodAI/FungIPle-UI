import { usePrivy } from '@privy-io/react-auth';
import { useEffect } from 'react';

const LoginPopup = () => {
  const { login, user, getAccessToken, ready } = usePrivy();

  const handleAuth = async () => {
    // 如果已登录，获取用户信息并发送
    const token = await getAccessToken();
    window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', data: { ...user, token } }, '*'); // 第二个参数是目标窗口的origin，' * ' 允许任何来源
    window.close(); // 登录成功后关闭弹窗
  };

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
