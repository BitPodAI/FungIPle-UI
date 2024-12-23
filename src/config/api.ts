/**
 * API配置
 */

// 环境判断
const isDev = process.env.NODE_ENV === 'development';

// API基础配置
export const API_CONFIG = {
  // 基础URL
  BASE_URL: isDev ? 'http://localhost:3000' : 'http://web3ai.cloud/openai/v0',

  // API路径前缀
  API_PREFIX: '/pod',

  // 完整的API基础路径
  get API_BASE_URL() {
    return `${this.BASE_URL}${this.API_PREFIX}`;
  },
} as const;
