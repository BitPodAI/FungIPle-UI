import { LoginForm, LoginResponse, ApiResponse } from '../types/auth';
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
   * 用户登出
   * 清除用户状态和本地存储
   */
  logout() {
    useUserStore.getState().logout();
  },
};
