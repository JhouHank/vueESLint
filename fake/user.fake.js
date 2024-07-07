import Mock from 'mockjs';
import { defineFakeRoute } from 'vite-plugin-fake-server/client';

export default defineFakeRoute([
  {
    url: '/mock/getUserInfo',
    timeout: 1000,
    method: 'GET',
    response: () => {
      return {
        status: 'success',
        code: 200,
        data: Mock.mock({
          'users|10-20': [
            {
              id: '@guid',
              username: '@first',
              email: '@email',
              avatar: '@image("200x200")',
              role: '@pick(["admin", "user", "dealer"])',
            },
          ],
        }),
      };
    },
  },
]);
