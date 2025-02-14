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
      window.opener.postMessage({ type: 'LINK_WALLET_SUCCESS', data: wallets[0].address }, '*'); 
      window.close(); 
    }
  }, [wallets]);

  return <></>;
};

export default PopupWallet;
