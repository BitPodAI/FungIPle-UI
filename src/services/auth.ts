import { LoginForm, LoginResponse, ApiResponse } from '../types/auth';

const API_BASE = '/podai';

export const authService = {
  async login(credentials: LoginForm): Promise<ApiResponse<LoginResponse['data']>> {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      return data;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Login failed');
    }
  },

  storeUserData(data: LoginResponse['data']) {
    if (!data) return;

    localStorage.setItem('userProfile', JSON.stringify(data.profile));
    localStorage.setItem('twitterProfile', JSON.stringify(data.twitterProfile));
    localStorage.setItem('userId', data.profile.username);
  },

  clearUserData() {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('twitterProfile');
    localStorage.removeItem('userId');
  },
};
