import {
  LoginForm,
  LoginResponse,
  ApiResponse,
  ProfileUpdateRequest,
  ProfileUpdateResponse,
  UserProfile,
  ProfileQueryResponse,
} from '../types/auth';
import { useUserStore } from '@/stores/useUserStore';
import { API_CONFIG } from '@/config/api';

export const authService = {
  /**
   * 用户登录
   * @param credentials 登录凭证（用户名、密码、邮箱）
   * @returns 登录响应数据
   * @throws 登录失败时抛出错误
   */
  async login(credentials: LoginForm): Promise<ApiResponse<LoginResponse['data']>> {
    try {
      const response = await fetch(API_CONFIG.API_BASE_URL + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '登录失败');
      }

      if (!data.success) {
        throw new Error(data.message || '登录失败');
      }

      if (data.data) {
        // 更新全局状态
        useUserStore.getState().login(data.data.profile, data.data.twitterProfile);
      }

      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('登录失败');
    }
  },

  /**
   * 更新用户档案
   * @param userId 用户ID
   * @param profile 要更新的档案字段
   * @returns 更新后的用户档案
   * @throws 更新失败时抛出错误
   */
  async updateProfile(userId: string, profile: UserProfile): Promise<ProfileUpdateResponse> {
    try {
      const response = await fetch(API_CONFIG.API_BASE_URL + `/profile_upd`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userId,
          profile,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },

  /**
   * 获取用户档案
   * @param userId 用户ID
   * @returns 用户档案
   * @throws 获取失败时抛出错误
   */
  async getProfile(userId: string): Promise<ProfileQueryResponse> {
    try {
      const response = await fetch(API_CONFIG.API_BASE_URL + `/profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userId,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Profile query error:', error);
      throw error;
    }
  },

  /**
   * 获取所有配置数据
   * @returns 包含styles、kols和quote的配置数据
   */
  async getConfig(): Promise<
    ApiResponse<{
      styles: string[];
      kols: string[];
      quote: string;
    }>
  > {
    try {
      const response = await fetch(API_CONFIG.API_BASE_URL + '/config', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get config error:', error);
      throw error;
    }
  },

  /**
   * 获取watch text数据
   * @returns watch text报告
   */
  async getWatchText(): Promise<ApiResponse<{ report: string }>> {
    try {
      const response = await fetch(API_CONFIG.API_BASE_URL + `/watch`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get watch text error:', error);
      throw error;
    }
  },

  /**
   * 用户登出
   * 清除用户状态和本地存储
   */
  logout() {
    useUserStore.getState().logout();
  },
};
