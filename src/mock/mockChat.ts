import { baseURL } from './config';

const mockChat = [
  {
    url: `${baseURL}/chat`,
    method: 'post',
    response: {
      success: true,
      message: '登录成功',
      data: {
        code: 0,
        data: [
          {
            text: '@sentence',
            user: 'agent',
            action: 'NONE',
          },
        ],
      },
    },
  },
];

export default mockChat;
