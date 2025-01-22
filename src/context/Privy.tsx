import { PrivyProvider } from '@privy-io/react-auth';

const VITE_PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;

export default function AppPriviyProvider({ children }: { children: React.ReactNode }) {
  // 检查当前环境是否为 HTTPS
  const isHttps = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
  
  // 如果不在 HTTPS 环境中，直接返回子组件
  if (!isHttps) {
    console.warn('PrivyProvider 未启用：当前协议不是 HTTPS');
    return <>{children}</>;
  }
  console.warn('PrivyProvider 启用');
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
