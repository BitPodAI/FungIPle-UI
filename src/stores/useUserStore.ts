import { create } from 'zustand';
import { UserProfile, TwitterProfile } from '@/types/auth';

interface UserState {
  // 状态
  userProfile: UserProfile | null;      // 用户档案
  twitterProfile: TwitterProfile | null; // Twitter档案
  isAuthenticated: boolean;             // 是否已认证
  
  // 操作方法
  setUserProfile: (profile: UserProfile | null) => void;           // 设置用户档案
  setTwitterProfile: (profile: TwitterProfile | null) => void;     // 设置Twitter档案
  login: (userProfile: UserProfile, twitterProfile: TwitterProfile) => void;  // 登录
  logout: () => void;                                             // 登出
  
  // 获取器
  getUserId: () => string | null;  // 获取用户ID
}

export const useUserStore = create<UserState>((set, get) => ({
  // 初始状态
  userProfile: null,
  twitterProfile: null,
  isAuthenticated: false,

  // 状态操作方法
  setUserProfile: (profile) => 
    set({ userProfile: profile }),

  setTwitterProfile: (profile) =>
    set({ twitterProfile: profile }),

  login: (userProfile, twitterProfile) => {
    set({
      userProfile,
      twitterProfile,
      isAuthenticated: true,
    });

    // 持久化到本地存储
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('twitterProfile', JSON.stringify(twitterProfile));
    localStorage.setItem('userId', userProfile.username);
  },

  logout: () => {
    set({
      userProfile: null,
      twitterProfile: null,
      isAuthenticated: false,
    });

    // 清除本地存储
    localStorage.removeItem('userProfile');
    localStorage.removeItem('twitterProfile');
    localStorage.removeItem('userId');
  },

  // 工具方法
  getUserId: () => get().userProfile?.username || null,
}));
