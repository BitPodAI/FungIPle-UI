import { PrivyProvider } from '@privy-io/react-auth';
export default function AppPriviyProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cm5tjogei0227z9w3d620xacw"
      config={{
        appearance: {
          accentColor: '#000000',
          theme: '#FFFFFF',
          showWalletLoginFirst: false,
          logo: 'https://auth.privy.io/logos/privy-logo.png',
        },
        loginMethods: ['google', 'twitter'],
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
