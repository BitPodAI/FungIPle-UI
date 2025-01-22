import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useEffect } from 'react';

const PopupWallet = () => {
    
  const { linkWallet,ready } = usePrivy();
  const { wallets } = useWallets();

  useEffect(() => {
    if (!ready) return;
    linkWallet();
  }, [ready]);

  useEffect(() => {
    if (wallets.length > 0) {
      window.opener.postMessage({ type: 'LINK_WALLET_SUCCESS', data: wallets[0].address }, '*'); // 第二个参数是目标窗口的origin，' * ' 允许任何来源
      window.close(); // 登录成功后关闭弹窗
    }
  }, [wallets]);

  return <></>;
};

export default PopupWallet;
