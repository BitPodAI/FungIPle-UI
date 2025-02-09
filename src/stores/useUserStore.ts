import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserProfile, TwitterProfile } from '@/types/auth';
import { BaseConnectedWalletType } from '@privy-io/react-auth';

interface UserState {
  // State
  userProfile: UserProfile | null; // UserProfile
  twitterProfile: TwitterProfile | null; // Twitter
  isAuthenticated: boolean; // Authed
  wallet: BaseConnectedWalletType | null;

  // Operation
  setUserProfile: (profile: UserProfile | null) => void;
  setTwitterProfile: (profile: TwitterProfile | null) => void;
  login: (userProfile: UserProfile) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  setWallet: (wallet: BaseConnectedWalletType | null) => void;

  // Getter
  getUserId: () => string | null;
  getXUsername: () => string | null;
  getXAccessToken: () => string | null;
  getWatchlist: () => string[] | null;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Init State
      userProfile: null,
      twitterProfile: null,
      isAuthenticated: false,
      wallet: null,

      // Operations
      setUserProfile: profile => set({ userProfile: profile }),

      setTwitterProfile: profile => set({ twitterProfile: profile }),

      setWallet: wallet => set({ wallet }),

      login: userProfile => {
        set({
          userProfile,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          userProfile: null,
          twitterProfile: null,
          isAuthenticated: false,
          wallet: null,
        });
      },

      updateProfile: profile => {
        if (!profile) return;
        set({ userProfile: profile });
      },

      // Getter
      getUserId: () => get().userProfile?.userId || null,
      getXUsername: () => get().userProfile?.tweetProfile?.username || null,
      getXAccessToken: () => get().userProfile?.tweetProfile?.accessToken || null,
      getWatchlist: () => get().userProfile?.twitterWatchList?.map(item => item.username) || [],
    }),
    {
      name: 'user-store', // Key used in localStorage
      partialize: state => ({
        userProfile: state.userProfile,
        wallet: state.wallet,
      }),
    }
  )
);
