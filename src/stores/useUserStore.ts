import { create } from 'zustand';
import { UserProfile, TwitterProfile } from '@/types/auth';

interface UserState {
  userProfile: UserProfile | null;
  twitterProfile: TwitterProfile | null;
  isAuthenticated: boolean;
  setUserProfile: (profile: UserProfile | null) => void;
  setTwitterProfile: (profile: TwitterProfile | null) => void;
  login: (userProfile: UserProfile, twitterProfile: TwitterProfile) => void;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  getUserId: () => string | null;
}

export const useUserStore = create<UserState>((set, get) => ({
  userProfile: null,
  twitterProfile: null,
  isAuthenticated: false,
  setUserProfile: profile => set({ userProfile: profile }),
  setTwitterProfile: profile => set({ twitterProfile: profile }),
  login: (userProfile, twitterProfile) => {
    set({
      userProfile,
      twitterProfile,
      isAuthenticated: true,
    });
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('twitterProfile', JSON.stringify(twitterProfile));
    localStorage.setItem('userId', userProfile?.username || '');  // todo
  },
  logout: () => {
    set({
      userProfile: null,
      twitterProfile: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('userProfile');
    localStorage.removeItem('twitterProfile');
    localStorage.removeItem('userId');
  },
  updateProfile: profile => {
    set({ userProfile: profile });
    localStorage.setItem('userProfile', JSON.stringify(profile));
  },
  getUserId: () => get().userProfile?.username || null,
}));
