import { PrivyProvider } from '@privy-io/react-auth';
import { isWeb } from '@/utils/config';

const VITE_PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

export default function AppPriviyProvider({ children }: { children: React.ReactNode }) {
  // Check HTTPS
  //const isHttps = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  
  // Whether Chrome Extension
  if (!isWeb()) {
    //console.warn('PrivyProvider Un-used for not HTTPS');
    return <>{children}</>;
  }
  //console.warn('PrivyProvider used');
  return (
    <PrivyProvider
      appId={VITE_PRIVY_APP_ID}
      config={{
        appearance: {
          accentColor: '#000000',
          theme: '#FFFFFF',
          showWalletLoginFirst: false,
          walletList: ['detected_wallets', 'wallet_connect', 'coinbase_wallet'],
          logo: 'https://auth.privy.io/logos/privy-logo.png',
          walletChainType: 'ethereum-and-solana',
        },
        loginMethods: ['google'],
        externalWallets: {
          walletConnect: {
            enabled: true,
          },
          coinbaseWallet: {
            connectionOptions: 'all',
          },
        },
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        embeddedWallets: {
          createOnLogin: 'off',
          requireUserPasswordOnCreate: false,
          showWalletUIs: true,
        },
        mfa: {
          noPromptOnMfaRequired: false,
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
