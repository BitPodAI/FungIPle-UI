/**
 * API配置
 */


//const AGENT_ID = import.meta.env.VITE_API_AGENTID;
const AGENT_ID = '91edd400-9c4a-0eb5-80ce-9d32973f2c49';

// 环境判断
const isDev = import.meta.env.MODE === 'development';
const BASE_URL_DEV = import.meta.env.VITE_BASE_URL_DEV;
const BASE_URL_PRD = import.meta.env.VITE_BASE_URL_PRD;

// API基础配置
export const API_CONFIG = {
  // 基础URL

  BASE_URL: isDev ? 'http://localhost:3000/' : 'https://web3ai.cloud/api/',

  // API路径前缀
  API_PREFIX: '91edd400-9c4a-0eb5-80ce-9d32973f2c49',

  // 完整的API基础路径
  get API_BASE_URL() {
    return `${this.BASE_URL}/${this.API_PREFIX}`;
  },
} as const;
