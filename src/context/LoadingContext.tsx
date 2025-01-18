import SuperLoading from '@/components/common/SuperLoading';
import { createContext, useState, useContext, ReactNode } from 'react';
import AppPriviyProvider from './Privy';

interface LoadingContextProps {
  showLoading: (desc?: string) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState<string | undefined>(undefined);

  const showLoading = (desc?: string) => {
    setDesc(desc);
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
    setDesc(undefined);
  };

  return (
    <AppPriviyProvider>
      <LoadingContext.Provider value={{ showLoading, hideLoading }}>
        {children}
        {loading && <SuperLoading desc={desc} />}
      </LoadingContext.Provider>
    </AppPriviyProvider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
