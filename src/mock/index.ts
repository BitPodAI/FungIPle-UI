import Mock from 'mockjs';
import mockAuth from './mockAuth';
import mockChat from './mockChat';
import mockWatch from './mockWatch';

const mocks = [...mockAuth, ...mockChat, ...mockWatch];

if (import.meta.env.MODE === 'development') {
  mocks.forEach(item => {
    Mock.mock(item.url, item.method, item.response);
  });
}

// 导出所有的mock数据
export default mocks;
