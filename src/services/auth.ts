import {
  LoginForm,
  LoginResponse,
  ApiResponse,
  ProfileUpdateResponse,
  UserProfile,
  ProfileQueryResponse,
  AgentConfig,
} from '../types/auth';
import { useUserStore } from '@/stores/useUserStore';
import api from '@/services/axios';

export const authService = {
  /**
   * 用户登录
   * @param credentials 登录凭证（用户名、密码、邮箱）
   * @returns 登录响应数据
   * @throws 登录失败时抛出错误
   */
  async login(credentials: LoginForm): Promise<ApiResponse<LoginResponse['data']>> {
    try {
      const response = await api.post<LoginResponse>('/login', credentials);

      if (!response?.data.success) {
        throw new Error(response.data.message || '登录失败');
      }

      if (response.data.data) {
        useUserStore.getState().login(response.data.data.profile, response.data.data.twitterProfile);
      }

      return response.data;
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
      const response = await api.post<ProfileUpdateResponse>(`/profile_upd`, {
        username: userId,
        profile,
      });
      return response.data;
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
      const response = await api.post<ProfileQueryResponse>(`/profile`, {
        username: userId,
      });
      return response.data;
    } catch (error) {
      console.error('Profile query error:', error);
      throw error;
    }
  },

  /**
   * 获取所有配置数据
   * @returns 包含styles、kols和quote的配置数据
   */
  async getConfig(): Promise<ApiResponse<AgentConfig>> {
    try {
      const response = await api.get<ApiResponse<AgentConfig>>('/config');
      return response.data;
    } catch (error) {
      console.error('Get config error:', error);
      throw error;
    }
  },
  /**
   * 转账 SOL 或代币
   * @param transferData 转账数据
   * @returns 转账结果
   */
  async transferSol(transferData: {
    fromTokenAccountPubkey: string;
    toTokenAccountPubkey: string;
    ownerPubkey: string;
    tokenAmount: number;
  }): Promise<ApiResponse<{ signature: string }>> {
    try {
      const response = await api.post<ApiResponse<{ signature: string }>>('/transfer_sol', transferData);
      return response.data;
    } catch (error) {
      console.error('Transfer SOL error:', error);
      throw error;
    }
  },

  /**
   * 创建代理
   * @param userId 用户ID
   * @returns 创建结果
   */
  async createAgent(userId: string): Promise<ApiResponse<{ agentId: string }>> {
    try {
      const response = await api.post<ApiResponse<{ agentId: string }>>('/create_agent', {
        username: userId,
      });
      return response.data;
    } catch (error) {
      console.error('Create agent error:', error);
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

  twitterOAuth: {
    async getAuthUrl() {
      const response = await api.get('/twitter_oauth_init');
      const result = response.data;
      return result.data;
    },

    async handleCallback(code: string) {
      const tokenResponse = await api.get('/twitter_oauth_callback?code=' + code);
      const result = tokenResponse.data;

      if (!result.ok) {
        throw new Error('Failed to exchange code for token');
      }

      return result;
    },

    createAuthWindow(url: string) {
      return window.open(url, 'twitter-auth', 'width=600,height=600,status=yes,scrollbars=yes');
    },

    listenForAuthMessage() {
      return new Promise((resolve, reject) => {
        const handler = async (event: MessageEvent) => {
          // Message origin
          //if (event.origin !== window.location.origin) return;
          const allowedOrigins = ['https://web3ai.cloud', 'http://localhost:3000'];

          if (!allowedOrigins.includes(event.origin)) {
            console.warn('Received message from unauthorized origin:', event.origin);
            return;
          }

          if (event.data.type === 'TWITTER_AUTH_SUCCESS') {
            const { code, state: returnedState } = event.data;

            // 验证 state 以防止 CSRF 攻击
            const savedState = sessionStorage.getItem('twitter_oauth_state');
            if (savedState !== returnedState) {
              reject(new Error('Invalid state parameter'));
              return;
            }

            try {
              const result = await this.handleCallback(code);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          } else if (event.data.type === 'TWITTER_AUTH_ERROR') {
            reject(new Error(event.data.error));
          }

          // 清理事件监听器
          window.removeEventListener('message', handler);
        };

        window.addEventListener('message', handler);
      });
    },
  },
};
