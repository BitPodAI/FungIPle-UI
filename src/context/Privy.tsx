import { PrivyProvider } from '@privy-io/react-auth';

const VITE_PRIVY_APP_ID = import.meta.env.VITE_PRIVY_APP_ID;


export default function AppPriviyProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={VITE_PRIVY_APP_ID}
      config={{
        appearance: {
          accentColor: '#000000',
          theme: '#FFFFFF',
          showWalletLoginFirst: false,
          walletList: ['detected_wallets','wallet_connect', 'coinbase_wallet'],
          logo: 'https://auth.privy.io/logos/privy-logo.png',
          walletChainType: 'ethereum-and-solana',
        },
        loginMethods: ['google', 'twitter', 'wallet'],
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
